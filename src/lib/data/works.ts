import type { Work } from '@/lib/types';
import { works as staticWorks } from '@/content/works';

// Data-access seam: Phase 1 = static, Phase 3 = Supabase
// Both implementations MUST return the same Work type (§4.2)
// Phase 3: replace with unstable_cache(supabaseQuery, ['works'], { tags: ['works'], revalidate: false })

export async function getWorks(): Promise<Work[]> {
  return staticWorks.filter((w) => w.published);
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  return staticWorks.find((w) => w.slug === slug && w.published) ?? null;
}
