import type { Work } from '@/lib/types';
import { works as staticWorks } from '@/content/works';

// Only import the fs-based store on server; Supabase path is preferred.
// We lazy-import to avoid bundling fs in edge runtimes.

async function getSupabaseOverrides(): Promise<{
  overrides: Record<string, Partial<Work>>;
  additions: Work[];
  deletions: string[];
} | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const client = createClient(url, key);

    const { data, error } = await client
      .from('works_overrides')
      .select('*')
      .single();

    if (error || !data) return null;
    return data.payload as {
      overrides: Record<string, Partial<Work>>;
      additions: Work[];
      deletions: string[];
    };
  } catch {
    return null;
  }
}

function applyOverrides(
  overrides: Record<string, Partial<Work>>,
  additions: Work[],
  deletions: string[],
): Work[] {
  return [
    ...staticWorks
      .filter((w) => !deletions.includes(w.id))
      .map((w) => ({ ...w, ...overrides[w.id] } as Work)),
    ...additions,
  ];
}

async function getAllWorksResolved(): Promise<Work[]> {
  const supabaseData = await getSupabaseOverrides();

  if (supabaseData) {
    return applyOverrides(
      supabaseData.overrides,
      supabaseData.additions,
      supabaseData.deletions,
    );
  }

  // Fallback: local JSON file (dev / missing env vars)
  const { readStore } = await import('@/lib/admin/store');
  const { overrides, additions, deletions } = readStore();
  return applyOverrides(overrides, additions, deletions);
}

export async function getWorks(): Promise<Work[]> {
  const all = await getAllWorksResolved();
  return all.filter((w) => w.published);
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const all = await getAllWorksResolved();
  return all.find((w) => w.slug === slug) ?? null;
}

// Admin: all works regardless of published state
export async function getAllWorks(): Promise<Work[]> {
  return getAllWorksResolved();
}
