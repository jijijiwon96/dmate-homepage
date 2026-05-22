import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#e5e5e5] bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="font-bold text-sm tracking-widest uppercase text-[#0a0a0a]">D-MATE</p>
          <p className="text-[#6b6b6b] text-xs mt-1">© {year} D-MATE. All rights reserved.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-8 text-xs text-[#6b6b6b]">
          <a
            href="mailto:oddin@dmate.kr"
            className="hover:text-[#0a0a0a] transition-colors"
          >
            oddin@dmate.kr
          </a>
          <Link href="/work" className="hover:text-[#0a0a0a] transition-colors uppercase tracking-wider">Work</Link>
          <Link href="/about" className="hover:text-[#0a0a0a] transition-colors uppercase tracking-wider">About</Link>
          <Link href="/contact" className="hover:text-[#0a0a0a] transition-colors uppercase tracking-wider">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
