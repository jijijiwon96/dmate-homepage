import FadeUp from '@/components/ui/FadeUp';
import { EmailSendButton, CopyEmailButton } from '@/components/contact/CopyEmail';

export const metadata = {
  title: 'Contact',
  description: 'D-MATE에 문의하세요. oddin@dmate.kr',
};

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen bg-black">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto">
        <FadeUp delay={0}>
          <p className="text-[11px] tracking-[0.5em] uppercase text-white/45 mb-10">Contact</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1
            className="font-black leading-[1.0] tracking-tight text-white uppercase"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            }}
          >
            Let&apos;s
            <br />
            talk.
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="mt-8 text-white/65 text-base md:text-lg leading-relaxed max-w-md">
            브랜드를 활성화시킬 준비가 되셨나요?
            <br />
            D-MATE와 함께 새로운 가능성을 열어보세요.
          </p>
        </FadeUp>
      </section>

      {/* ── CTA bar ───────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-black text-lg md:text-xl font-semibold">
            프로젝트 문의를 남겨주세요.
          </p>
          <EmailSendButton />
        </div>
      </section>

      {/* ── Info + Map ────────────────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">

          {/* Left: contact info */}
          <div className="space-y-14">

            <FadeUp delay={0}>
              <div>
                <p className="text-[11px] tracking-[0.5em] uppercase text-white/45 mb-4">Email</p>
                <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                  oddin@dmate.kr
                </p>
                <CopyEmailButton />
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div>
                <p className="text-[11px] tracking-[0.5em] uppercase text-white/45 mb-4">Tel / Fax</p>
                <a
                  href="tel:0251500625"
                  className="text-2xl md:text-3xl font-bold text-white hover:opacity-40 transition-opacity block"
                >
                  02-515-0625
                </a>
                <p className="text-[15px] text-white/45 mt-2">F. 02-6455-0624</p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div>
                <p className="text-[11px] tracking-[0.5em] uppercase text-white/45 mb-4">Address</p>
                <p className="text-base text-white leading-[1.9]">
                  서울특별시 강남구 선릉로 703
                  <br />
                  HS TOWER 13F
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div>
                <p className="text-[11px] tracking-[0.5em] uppercase text-white/45 mb-4">Hours</p>
                <p className="text-[15px] text-white/65 leading-[1.9]">
                  월 – 금 &nbsp; 10:00 – 17:00
                  <br />
                  토·일·공휴일 휴무
                </p>
              </div>
            </FadeUp>

          </div>

          {/* Right: map */}
          <FadeUp delay={0.2}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] tracking-[0.5em] uppercase text-white/45">Location</p>
                {/* Map links */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://map.naver.com/p/search/서울특별시+강남구+선릉로+703+HS타워"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-white/65 border border-white/30 px-3 py-1.5 hover:bg-[#03C75A] hover:text-white hover:border-[#03C75A] transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    네이버 지도
                  </a>
                  <a
                    href="https://maps.google.com/?q=서울특별시+강남구+선릉로+703"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-white/65 border border-white/30 px-3 py-1.5 hover:bg-[#4285F4] hover:text-white hover:border-[#4285F4] transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Google Maps
                  </a>
                </div>
              </div>
              <div className="w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3164.5877269297002!2d127.03828191196123!3d37.51764072193466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z6rCV64Ko6rWsIOyEoOumieuhnCA3MDMgSFMgVE9XRVI!5e0!3m2!1sko!2skr!4v1780235430021!5m2!1sko!2skr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="D-MATE 위치"
                />
              </div>
              <p className="text-[13px] text-white/45 mt-3">
                선릉역 3번 출구에서 도보 5분
              </p>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ── Bottom strip ──────────────────────────────────────────── */}
      <div className="border-t border-white/10 px-6 md:px-12 max-w-[1440px] mx-auto py-8">
        <p className="text-[13px] text-white/40 tracking-wide">
          © 2026 D-MATE Inc. All rights reserved.
        </p>
      </div>

    </div>
  );
}
