import Link from 'next/link';
import FadeUp from '@/components/ui/FadeUp';

export default function ContactPreview() {
  return (
    <section className="bg-black border-t border-white/10 py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-[1440px] mx-auto">
        <FadeUp delay={0}>
          <p className="text-white/45 text-[10px] tracking-[0.5em] uppercase mb-10">Contact</p>
          <h2
            className="text-white font-black leading-[0.9] tracking-[-0.02em] uppercase"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 5rem)',
            }}
          >
            Let&apos;s activate
            <br />
            your brand.
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <a
            href="mailto:oddin@dmate.kr?subject=[D-MATE]%20문의"
            className="block mt-10 text-white/85 hover:text-white transition-colors tracking-tight"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(1.5rem, 4vw, 4.5rem)',
            }}
          >
            oddin@dmate.kr
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-[#0B63AD] text-white text-xs tracking-[0.3em] uppercase px-6 py-3 hover:bg-[#0a5699] transition-colors"
          >
            Contact Us
            <svg width="18" height="8" viewBox="0 0 18 8" fill="none">
              <path d="M0 4h16M11 1l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
