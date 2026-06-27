import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-black overflow-hidden">
      {/* Small info bar */}
      <div className="px-6 md:px-10 pt-10 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-black/10">
        <div className="flex items-center gap-6">
          <Image
            src="/dmate-logo.jpg"
            alt="D-MATE"
            width={90}
            height={30}
            className="h-6 w-auto object-contain"
          />
          <p className="text-black/40 text-xs">© {year} D-MATE Inc.</p>
        </div>
        <div className="flex items-center gap-6 text-xs text-black/50">
          <a href="mailto:oddin@dmate.kr" className="hover:text-[#0B63AD] transition-colors">
            oddin@dmate.kr
          </a>
          <Link href="/work" className="uppercase tracking-wider hover:text-[#0B63AD] transition-colors">Work</Link>
          <Link href="/about" className="uppercase tracking-wider hover:text-[#0B63AD] transition-colors">About</Link>
          <Link href="/contact" className="uppercase tracking-wider hover:text-[#0B63AD] transition-colors">Contact</Link>
        </div>
      </div>

    </footer>
  );
}
