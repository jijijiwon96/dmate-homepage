'use server';

import { createHash } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  const expected = process.env.ADMIN_PASSWORD ?? '0815';

  if (password !== expected) {
    return { error: '비밀번호가 틀렸습니다.' };
  }

  const token = createHash('sha256').update(password).digest('hex');
  const cookieStore = await cookies();
  cookieStore.set('dmate_admin', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect('/admin');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('dmate_admin');
  redirect('/admin/login');
}
