import { leadership } from '@/content/leadership';
import { clients } from '@/content/clients';
import FadeUp from '@/components/ui/FadeUp';
import ClientCard from '@/components/about/ClientCard';

export const metadata = {
  title: 'About us',
  description: 'D-MATE는 브랜드를 활성화시키는 광고대행사입니다.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 bg-black">

      {/* ── Section 1  Philosophy ──────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <FadeUp delay={0}>
              <p className="text-[11px] tracking-[0.5em] uppercase text-white/45 mb-10">Philosophy</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1
                className="font-black leading-[1.05] tracking-tight text-white uppercase"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2.6rem, 6vw, 5.5rem)',
                }}
              >
                We Activate
                <br />
                Your Brand
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="mt-10 space-y-5 text-white/60 text-[15px] md:text-base leading-[1.85] max-w-[480px]">
                <p>
                  우리는 브랜드를 활성화시키는 걸 사명으로 알고 최선을 다합니다.
                </p>
                <p>
                  브랜드의 문제점을 발견하고, 그를 해결하기 위한 전략과 아이디어를 제안합니다.
                </p>
                <p>
                  여러 Data를 수집하고 분석하여 문제를 해결할 수 있는 전략에 집중하고,
                  전략을 실행하기 위한 다양한 융합으로 최적의 아이디어를 제안하며 실행합니다.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* 3D 로고 */}
          <div className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/3D%20%EB%A1%9C%EA%B3%A0.png"
              alt="D-MATE 3D 로고"
              className="w-full max-w-lg object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── Section 2  IEC ────────────────────────────────────────── */}
      <section className="py-28 md:py-40 bg-[#0a0a0a] text-white">
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto">
          <FadeUp delay={0}>
            <p className="text-[11px] tracking-[0.5em] uppercase text-white/45 mb-10">Methodology</p>
          </FadeUp>

          <div className="grid md:grid-cols-[1fr_1px_1fr] gap-0 md:gap-0 items-start">
            <FadeUp delay={0.1}>
              <div>
                <h2
                  className="font-black leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
                >
                  Integrated
                  <br />
                  Experience
                  <br />
                  Connecting
                </h2>
                <div className="mt-8 flex items-center gap-4 text-sm">
                  <span className="border border-white/30 px-4 py-2 text-white/45 tracking-wider text-[13px]">IMC</span>
                  <svg width="32" height="10" viewBox="0 0 32 10" fill="none">
                    <path d="M0 5h28M23 1l5 4-5 4" stroke="white" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  <span className="border border-[#0B63AD] px-4 py-2 text-[#0B63AD] tracking-wider text-xs font-semibold">IEC</span>
                </div>
              </div>
            </FadeUp>

            {/* divider */}
            <div className="hidden md:block bg-white/10 self-stretch" />

            <FadeUp delay={0.2}>
              <div className="mt-12 md:mt-0 md:pl-16 space-y-8">
                <div>
                  <p className="text-[11px] tracking-[0.4em] uppercase text-white/45 mb-3">Beyond IMC</p>
                  <p className="text-white/60 text-[15px] leading-[1.9]">
                    우리는 단순 IMC를 넘어 IEC를 추구합니다.
                    브랜드 경험을 하나로 연결하는 것이 중요하다고 생각합니다.
                  </p>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.4em] uppercase text-white/45 mb-3">Touchpoints</p>
                  <p className="text-white/60 text-[15px] leading-[1.9]">
                    경험의 접점은 On &amp; Off 경계없이 브랜드를 이야기할 수 있는 모든 곳,
                    그 접점들을 연결하여 브랜드를 경험할 수 있도록 제안하고 실행합니다.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Section 3  Services ───────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto">
        <FadeUp delay={0}>
          <p className="text-[11px] tracking-[0.5em] uppercase text-white/45 mb-10">Services</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            className="font-black leading-tight tracking-tight mb-20 text-white"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
          >
            Communication
            <br />
            Full-service Agency
          </h2>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: '01',
                title: 'Strategy',
                label: '전략 기획',
                desc: '브랜드 전략 수립 및 마켓 포지셔닝 설계. 데이터 기반으로 브랜드의 방향성을 정의합니다.',
              },
              {
                num: '02',
                title: 'Content',
                label: '콘텐츠 제작',
                desc: '브랜드 스토리를 담은 크리에이티브 콘텐츠 제작. 캠페인 영상부터 디지털 소재까지.',
              },
              {
                num: '03',
                title: 'Campaign',
                label: '캠페인 운영',
                desc: '전략적 캠페인 기획 및 멀티채널 실행. On/Off 통합 캠페인으로 브랜드를 확산시킵니다.',
              },
              {
                num: '04',
                title: 'Data',
                label: '데이터 분석',
                desc: '데이터 기반 인사이트 도출 및 성과 측정. 숫자로 증명하는 마케팅 효과.',
              },
            ].map((s) => (
              <div
                key={s.num}
                className="border-t border-white/10 pt-8 pb-10 pr-8"
              >
                <p className="text-[11px] text-white/40 font-mono mb-6">{s.num}</p>
                <p className="text-[11px] tracking-[0.4em] uppercase text-white/45 mb-2">{s.title}</p>
                <p className="text-xl font-bold text-white mb-5">{s.label}</p>
                <p className="text-white/65 text-[15px] leading-[1.85]">{s.desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── Section 4  History & Leadership ──────────────────────── */}
      <section className="py-28 md:py-40 bg-[#0a0a0a]">
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto">
          <FadeUp delay={0}>
            <p className="text-[11px] tracking-[0.5em] uppercase text-white/45 mb-10">Our Story</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-black leading-tight tracking-tight mb-20 text-white"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              History &amp;
              <br />
              Leadership
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-20 md:gap-28">

            {/* Timeline */}
            <FadeUp delay={0.2}>
              <div>
                <p className="text-[11px] tracking-[0.4em] uppercase text-white/45 mb-10">Timeline</p>
                <div className="space-y-0">
                  {[
                    { year: '2016', desc: 'D-MATE 창립 — 브랜드 활성화 전문 광고대행사의 시작' },
                    { year: '2018', desc: '주요 글로벌 브랜드 캠페인 성공 수행으로 업계 인지도 확립' },
                    { year: '2020', desc: '디지털 퍼포먼스 마케팅 역량 강화 및 데이터 드리븐 체계 구축' },
                    { year: '2022', desc: '통합 경험 커넥팅(IEC) 방법론 정립 — IMC를 넘어선 새 패러다임' },
                    { year: '2024', desc: '누적 캠페인 67건 이상 수행, 지속 성장으로 업계 선도 대행사로 발전' },
                  ].map((item, i) => (
                    <div key={item.year} className={`flex gap-8 py-6 ${i < 4 ? 'border-b border-white/10' : ''}`}>
                      <span className="text-xs font-black text-[#0B63AD] w-10 shrink-0 pt-0.5 font-mono">{item.year}</span>
                      <p className="text-[15px] text-white/65 leading-[1.8]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Leadership */}
            <FadeUp delay={0.3}>
              <div>
                <p className="text-[11px] tracking-[0.4em] uppercase text-white/45 mb-10">Leadership</p>
                <div className="space-y-10">
                  {leadership.map((leader) => (
                    <div key={leader.id} className="flex gap-6">
                      <div className="w-14 h-14 bg-white/10 shrink-0 flex items-center justify-center">
                        <span className="text-white text-lg font-black">{leader.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-black text-white text-base">{leader.name}</p>
                        <p className="text-[11px] tracking-[0.3em] uppercase text-white/45 mt-1 mb-4">{leader.role}</p>
                        <p className="text-[15px] text-white/65 leading-[1.85]">{leader.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Section 5  Clients ────────────────────────────────────── */}
      <section className="py-28 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto">
        <FadeUp delay={0}>
          <p className="text-[11px] tracking-[0.5em] uppercase text-white/45 mb-4">Clients</p>
          <div className="flex items-end justify-between mb-16">
            <h2
              className="font-black leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              Our Clients
            </h2>
            <p className="text-[15px] text-white/45 hidden md:block">{clients.length} brands &amp; counting</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
            {clients.map((client) => (
              <ClientCard
                key={client.id}
                id={client.id}
                name={client.name}
                category={client.category}
                logo_url={client.logo_url}
              />
            ))}
          </div>
        </FadeUp>
      </section>

    </div>
  );
}
