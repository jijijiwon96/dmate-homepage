import Link from 'next/link';

export default function ContactPreview() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
      <p className="text-xs tracking-[0.4em] uppercase text-[#6b6b6b] mb-8">Contact</p>
      <h2
        className="font-bold leading-tight tracking-tight"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
      >
        Let&apos;s activate your
        <br />
        brand together.
      </h2>
      <a
        href="mailto:oddin@dmate.kr?subject=[D-MATE]%20문의"
        className="block mt-10 font-bold tracking-tight hover:opacity-50 transition-opacity"
        style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)' }}
      >
        oddin@dmate.kr
      </a>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 mt-8 text-xs tracking-[0.3em] uppercase text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
      >
        Contact Us
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
          <path d="M0 5h18M13 1l5 4-5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </section>
  );
}
