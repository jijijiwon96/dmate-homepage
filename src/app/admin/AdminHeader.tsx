'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from './login/actions';

export default function AdminHeader() {
  const pathname = usePathname();
  if (pathname === '/admin/login') return null;

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-white/10 flex items-center justify-between px-6 h-14">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-[#0B63AD] font-black tracking-tight text-sm">
          D-MATE
        </Link>
        <span className="text-white/20 text-xs">›</span>
        <Link href="/admin" className="text-white/60 hover:text-white text-sm transition-colors">
          Admin
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/admin/new"
          className="bg-[#0B63AD] hover:bg-[#0B63AD]/80 text-white text-xs px-4 py-2 transition-colors"
        >
          + 새 캠페인
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-white/40 hover:text-white text-xs px-3 py-2 transition-colors"
          >
            로그아웃
          </button>
        </form>
      </div>
    </header>
  );
}
