'use client';

import { useActionState } from 'react';
import { sendContactEmail, type ContactState } from '@/app/(site)/contact/actions';

const initial: ContactState = { status: 'idle' };

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContactEmail, initial);

  if (state.status === 'success') {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 border border-white/20 rounded-full mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-white text-xl font-semibold mb-2">문의가 전달되었습니다.</p>
        <p className="text-white/45 text-sm">빠른 시일 내에 연락드리겠습니다.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[11px] tracking-[0.4em] uppercase text-white/45 mb-3">
            이름 <span className="text-[#0B63AD]">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="홍길동"
            className="w-full bg-transparent border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] tracking-[0.4em] uppercase text-white/45 mb-3">
            회사명
          </label>
          <input
            name="company"
            type="text"
            placeholder="(주)디메이트"
            className="w-full bg-transparent border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] tracking-[0.4em] uppercase text-white/45 mb-3">
          이메일 <span className="text-[#0B63AD]">*</span>
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="hello@company.com"
          className="w-full bg-transparent border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-[11px] tracking-[0.4em] uppercase text-white/45 mb-3">
          문의 내용 <span className="text-[#0B63AD]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="프로젝트 개요, 예산, 일정 등 간략히 적어주세요."
          className="w-full bg-transparent border border-white/15 text-white placeholder-white/25 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors resize-none"
        />
      </div>

      {state.status === 'error' && (
        <p className="text-red-400 text-sm">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-3 bg-[#0B63AD] text-white text-[11px] tracking-[0.25em] uppercase font-semibold px-10 py-4 hover:bg-[#0a5699] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? '전송 중...' : '문의 보내기'}
        {!pending && (
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
            <path d="M0 5h18M13 1l5 4-5 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </form>
  );
}
