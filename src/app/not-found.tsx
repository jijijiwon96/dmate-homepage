import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs tracking-[0.4em] uppercase text-[#6b6b6b] mb-6">404</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-[#6b6b6b] mb-10 text-base">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase border border-[#0a0a0a] px-8 py-4 hover:bg-[#0a0a0a] hover:text-white transition-all"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
