import { leadership } from '@/content/leadership';
import { clients } from '@/content/clients';

export const metadata = {
  title: 'About us',
  description: 'D-MATE는 브랜드를 활성화시키는 광고대행사입니다.',
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Section 1 — We Activate Your Brand */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#6b6b6b] mb-8">Philosophy</p>
            <h1
              className="font-bold leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              We Activate
              <br />
              Your Brand
            </h1>
            <div className="mt-8 space-y-4 text-[#6b6b6b] text-base md:text-lg leading-relaxed max-w-lg">
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
          </div>
          <div className="bg-[#f5f5f5] aspect-square flex items-center justify-center">
            <span
              className="font-bold text-[#e5e5e5] text-center leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              D-MATE
            </span>
          </div>
        </div>
      </section>

      {/* Section 2 — IEC */}
      <section className="py-24 md:py-36 bg-[#0a0a0a] text-white">
        <div className="px-6 md:px-12 max-w-[1440px] mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-8">IEC</p>
          <h2
            className="font-bold leading-tight tracking-tight max-w-3xl"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            Integrated Experience
            <br />
            Connecting
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-10 max-w-3xl">
            <div>
              <p className="text-white/60 text-base leading-relaxed">
                우리는 단순 IMC를 넘어 IEC를 추구합니다.
                우리는 브랜드 경험을 하나로 연결하는 것이 중요하다고 생각합니다.
              </p>
            </div>
            <div>
              <p className="text-white/60 text-base leading-relaxed">
                경험의 접점은 On &amp; Off 경계없이 브랜드를 이야기할 수 있는 모든 곳,
                그 접점들을 연결하여 브랜드를 경험할 수 있도록 제안하고 실행합니다.
              </p>
            </div>
          </div>

          {/* IMC → IEC diagram */}
          <div className="mt-16 flex items-center gap-6 text-sm">
            <div className="border border-white/20 px-6 py-3 text-white/40 tracking-wider">IMC</div>
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
              <path d="M0 6h36M30 1l6 5-6 5" stroke="white" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <div className="border border-white px-6 py-3 text-white tracking-wider font-medium">IEC</div>
          </div>
        </div>
      </section>

      {/* Section 3 — Full-service Agency */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1440px] mx-auto">
        <p className="text-xs tracking-[0.4em] uppercase text-[#6b6b6b] mb-8">Services</p>
        <h2
          className="font-bold leading-tight tracking-tight mb-16"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
        >
          Communication
          <br />
          Full-service Agency
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e5e5e5]">
          {[
            { title: 'Strategy', label: '전략 기획', desc: '브랜드 전략 수립 및\n마켓 포지셔닝 설계' },
            { title: 'Content', label: '콘텐츠 제작', desc: '브랜드 스토리를 담은\n크리에이티브 콘텐츠 제작' },
            { title: 'Campaign', label: '캠페인 운영', desc: '전략적 캠페인 기획 및\n멀티채널 실행' },
            { title: 'Data', label: '데이터 분석', desc: '데이터 기반 인사이트 도출\n및 성과 측정' },
          ].map((service) => (
            <div key={service.title} className="bg-white p-6 md:p-10">
              <p className="text-xs tracking-[0.3em] uppercase text-[#6b6b6b] mb-4">{service.title}</p>
              <p className="text-lg md:text-xl font-bold mb-4">{service.label}</p>
              <p className="text-[#6b6b6b] text-sm leading-relaxed whitespace-pre-line">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — History & Leadership */}
      <section className="py-24 md:py-36 bg-[#f9f9f9] px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#6b6b6b] mb-8">Our Story</p>
          <h2
            className="font-bold leading-tight tracking-tight mb-16"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            History &amp;
            <br />
            Leadership
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Timeline */}
            <div>
              <h3 className="text-sm tracking-wider uppercase text-[#6b6b6b] mb-8">Timeline</h3>
              <div className="space-y-8">
                {[
                  { year: '2016', desc: 'D-MATE 창립 — 광고대행사의 새로운 도전' },
                  { year: '2018', desc: '주요 브랜드 캠페인 성공적 수행으로 업계 인지도 확립' },
                  { year: '2020', desc: '디지털 퍼포먼스 마케팅 역량 강화' },
                  { year: '2022', desc: '통합 경험 커넥팅(IEC) 방법론 정립' },
                  { year: '2024', desc: '지속적 성장으로 업계 선도 대행사로 발전' },
                ].map((item) => (
                  <div key={item.year} className="flex gap-6">
                    <span className="text-sm font-bold text-[#0a0a0a] w-12 shrink-0">{item.year}</span>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Leadership */}
            <div>
              <h3 className="text-sm tracking-wider uppercase text-[#6b6b6b] mb-8">Leadership</h3>
              <div className="space-y-8">
                {leadership.map((leader) => (
                  <div key={leader.id} className="flex gap-5">
                    <div className="w-16 h-16 bg-[#e5e5e5] shrink-0 flex items-center justify-center text-[#6b6b6b] text-xs font-medium">
                      {leader.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-base">{leader.name}</p>
                      <p className="text-xs tracking-wider uppercase text-[#6b6b6b] mt-0.5">{leader.role}</p>
                      <p className="text-sm text-[#6b6b6b] mt-3 leading-relaxed">{leader.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Our Client */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1440px] mx-auto">
        <p className="text-xs tracking-[0.4em] uppercase text-[#6b6b6b] mb-8">Clients</p>
        <h2
          className="font-bold leading-tight tracking-tight mb-16"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
        >
          Our Client
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="w-full h-10 bg-[#e5e5e5] flex items-center justify-center">
                <span className="text-xs text-[#999] font-medium">{client.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
