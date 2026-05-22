export const metadata = {
  title: 'Contact',
  description: 'D-MATE에 문의하세요. oddin@dmate.kr',
};

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <p className="text-xs tracking-[0.4em] uppercase text-[#6b6b6b] mb-6">Contact</p>
        <h1
          className="font-bold leading-tight tracking-tight"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          Let&apos;s talk.
        </h1>
      </section>

      {/* Info + Map */}
      <section className="pb-24 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-10">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#6b6b6b] mb-3">Email</p>
                <a
                  href="mailto:oddin@dmate.kr?subject=[D-MATE]%20문의"
                  className="text-xl md:text-2xl font-medium hover:opacity-50 transition-opacity"
                >
                  oddin@dmate.kr
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#6b6b6b] mb-3">Tel</p>
                <a
                  href="tel:0251500625"
                  className="text-xl md:text-2xl font-medium hover:opacity-50 transition-opacity"
                >
                  02-515-0625
                </a>
                <p className="text-sm text-[#6b6b6b] mt-1">F. 02-6455-0624</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#6b6b6b] mb-3">Address</p>
                <p className="text-base text-[#0a0a0a]">
                  서울특별시 강남구 테헤란로
                  <br />
                  (D-MATE 사무실)
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">Inquiries</p>
                <a
                  href="mailto:oddin@dmate.kr?subject=[D-MATE]%20문의"
                  className="inline-flex items-center gap-3 bg-[#0a0a0a] text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#333] transition-colors"
                >
                  문의하기
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                    <path d="M0 5h18M13 1l5 4-5 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right: map */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">Location</p>
            <div className="w-full bg-[#f5f5f5] overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4218937234095!2d127.02765531531875!3d37.49789097980492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca157e9f97a13%3A0xbab9db3e32f6c9f1!2z7YWM7Iqk66-4IO2VmOuPhCDthYzsiqTrr7gg!5e0!3m2!1sko!2skr!4v1620000000000!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="D-MATE 위치"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
