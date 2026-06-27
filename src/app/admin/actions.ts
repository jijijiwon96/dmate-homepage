'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Work, Category } from '@/lib/types';

function formToWork(data: FormData, id?: string): Work {
  const detailRaw = (data.get('detail_images') as string) ?? '';
  const detail_images = detailRaw
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    id: id ?? `custom-${Date.now()}`,
    slug: (data.get('slug') as string).trim(),
    title: (data.get('title') as string).trim(),
    client: (data.get('client') as string).trim(),
    category: (data.get('category') as string).trim() as Category,
    thumbnail_url: (data.get('thumbnail_url') as string).trim(),
    video_url: (data.get('video_url') as string)?.trim() || undefined,
    description: (data.get('description') as string)?.trim() || undefined,
    year: parseInt(data.get('year') as string, 10) || new Date().getFullYear(),
    sort_order: parseInt(data.get('sort_order') as string, 10) || 0,
    published: data.get('published') === 'true',
    created_at: (data.get('created_at') as string) || new Date().toISOString(),
    background: (data.get('background') as string)?.trim() || undefined,
    whats_new: (data.get('whats_new') as string)?.trim() || undefined,
    result: (data.get('result') as string)?.trim() || undefined,
    detail_images: detail_images.length ? detail_images : undefined,
  };
}

async function readPayload() {
  const useSupabase =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (useSupabase) {
    const { supabaseAdmin } = await import('@/lib/supabase');
    const { data } = await supabaseAdmin
      .from('works_overrides')
      .select('*')
      .single();
    if (data) {
      return data.payload as {
        overrides: Record<string, Partial<Work>>;
        additions: Work[];
        deletions: string[];
      };
    }
    return { overrides: {}, additions: [] as Work[], deletions: [] as string[] };
  }

  const { readStore } = await import('@/lib/admin/store');
  return readStore();
}

async function writePayload(payload: {
  overrides: Record<string, Partial<Work>>;
  additions: Work[];
  deletions: string[];
}) {
  const useSupabase =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (useSupabase) {
    const { supabaseAdmin } = await import('@/lib/supabase');
    const { data } = await supabaseAdmin
      .from('works_overrides')
      .select('id')
      .single();

    if (data?.id) {
      await supabaseAdmin
        .from('works_overrides')
        .update({ payload, updated_at: new Date().toISOString() })
        .eq('id', data.id);
    } else {
      await supabaseAdmin
        .from('works_overrides')
        .insert({ payload, updated_at: new Date().toISOString() });
    }
    return;
  }

  const { writeStore } = await import('@/lib/admin/store');
  writeStore(payload);
}

export async function saveWork(formData: FormData) {
  const id = formData.get('id') as string;
  const store = await readPayload();

  if (id.startsWith('custom-') || store.additions.some((a) => a.id === id)) {
    const idx = store.additions.findIndex((a) => a.id === id);
    const work = formToWork(formData, id);
    if (idx >= 0) store.additions[idx] = work;
    else store.additions.push(work);
  } else {
    const work = formToWork(formData, id);
    const { id: _id, created_at: _ca, ...rest } = work;
    store.overrides[id] = rest;
  }

  await writePayload(store);
  revalidatePath('/admin');
  revalidatePath('/work');
  revalidatePath('/');
  redirect('/admin');
}

export async function createWork(formData: FormData) {
  const store = await readPayload();
  const work = formToWork(formData, `custom-${Date.now()}`);
  store.additions.push(work);
  await writePayload(store);
  revalidatePath('/admin');
  revalidatePath('/work');
  revalidatePath('/');
  redirect('/admin');
}

export async function togglePublished(id: string, current: boolean) {
  const store = await readPayload();
  const isAddition = store.additions.some((a) => a.id === id);
  if (isAddition) {
    const idx = store.additions.findIndex((a) => a.id === id);
    store.additions[idx].published = !current;
  } else {
    store.overrides[id] = { ...store.overrides[id], published: !current };
  }
  await writePayload(store);
  revalidatePath('/admin');
  revalidatePath('/work');
  revalidatePath('/');
}

export async function deleteWork(id: string) {
  const store = await readPayload();
  if (store.additions.some((a) => a.id === id)) {
    store.additions = store.additions.filter((a) => a.id !== id);
  } else {
    if (!store.deletions.includes(id)) store.deletions.push(id);
  }
  await writePayload(store);
  revalidatePath('/admin');
  revalidatePath('/work');
  revalidatePath('/');
}
