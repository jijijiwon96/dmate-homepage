'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name    = (formData.get('name')    as string | null)?.trim() ?? '';
  const email   = (formData.get('email')   as string | null)?.trim() ?? '';
  const company = (formData.get('company') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';

  if (!name || !email || !message) {
    return { status: 'error', message: '이름, 이메일, 문의 내용은 필수입니다.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: 'error', message: '올바른 이메일 주소를 입력해주세요.' };
  }

  try {
    await resend.emails.send({
      from: 'D-MATE 홈페이지 <onboarding@resend.dev>',
      to:   ['jijijiwon96@gmail.com'], // TODO: dmate.kr 도메인 인증 후 oddin@dmate.kr로 변경
      replyTo: email,
      subject: `[D-MATE 홈페이지 문의] ${name}${company ? ` / ${company}` : ''}`,
      text: [
        `이름: ${name}`,
        company ? `회사명: ${company}` : '',
        `이메일: ${email}`,
        '',
        '문의 내용:',
        message,
      ].filter(Boolean).join('\n'),
    });

    return { status: 'success' };
  } catch {
    return { status: 'error', message: '발송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' };
  }
}
