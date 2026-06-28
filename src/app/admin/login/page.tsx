'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <div className="mb-10 text-center">
          <span className="text-[#0B63AD] font-black tracking-tight text-2xl">D-MATE</span>
          <p className="text-white/40 text-sm mt-1">Admin</p>
        </div>
        <form action={action} className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            autoFocus
            className="bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm outline-none focus:border-[#0B63AD] transition-colors"
          />
          {state?.error && (
            <p className="text-red-400 text-xs">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="bg-[#0B63AD] hover:bg-[#0B63AD]/80 disabled:opacity-50 text-white text-sm py-3 transition-colors"
          >
            {pending ? '확인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
