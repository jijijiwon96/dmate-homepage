# D-MATE 광고대행사 홈페이지 — PRD (Product Requirements Document)

> **Mode:** RALPLAN-DR Consensus (Deliberate) — **Revision 3** (Targeted fixes: cacheComponents, security note, data seam, React.cache, encryption key, seed ordering)
> **Owner:** Planner agent → Architect/Critic re-review
> **Repo:** `jijijiwon96/dmate-homepage` (master)
> **Stack baseline:** Next.js 16.2.6 (App Router) + React 19.2 + TypeScript 5 + Tailwind CSS v4
> **Date:** 2026-05-22

---

## 0. Revision Notes (Rev 2)

이 문서는 Architect/Critic의 ITERATE 피드백을 반영한 두 번째 버전이다. 핵심 변경:

- **Next.js 16 API 정합성**: `middleware.ts` → `proxy.ts`, `middleware()` → `proxy()`. 캐시는 `unstable_cache(fn, ['works'], { tags: ['works'], revalidate: false })` + `revalidateTag('works')` 조합 채택 (`cacheTag()` 미사용 — `cacheComponents: true` 전제 회피).
- **RLS 강화**: `admins` 테이블 기반 정책으로 교체, Storage 버킷 RLS 추가, Auth signup OFF.
- **운영 가이드**: "Definition of Green" + Escape hatch protocol 추가, AI-pair 예상치로 일정 표기 보정.
- **데이터-액세스 seam**: `src/lib/data/works.ts` 도입 — Phase 1 정적 / Phase 3 Supabase 전환을 1파일에서 처리.
- **Pre-mortem 6개 시나리오로 확장**, ADR-001 Consequences에 Sanity fallback 명시.
- **이미지/폰트/모바일**: `next/font/local` + `display: 'swap'`, `next/image sizes` 정책, 16:9 썸네일 고정, `100dvh` 적용.
- **Server Action 보안**: `requireAdmin()` helper 명세, `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`, `allowedOrigins`, 파일 검증.
- **누락 라우트**: `loading.tsx` / `error.tsx` / `not-found.tsx` 명시.

---

## 1. RALPLAN-DR Summary

### 1.1 Principles (설계 원칙, 5개)

1. **Simple / Easy / Impact 우선** — RFP가 명시한 브랜드 톤. 화려한 효과보다 절제된 타이포그래피와 큰 비주얼이 핵심. (RGA, BBH 레퍼런스가 모두 이 톤).
2. **콘텐츠 우선, 코드 둘째** — Work 썸네일·영상릴이 주인공. 인터랙션·애니메이션은 콘텐츠를 "방해하지 않는" 선에서만.
3. **편집 가능성 (Editability)** — 광고대행사 특성상 캠페인 추가/삭제가 잦다. Work 페이지는 반드시 비개발자가 관리자 패널로 운영 가능해야 함.
4. **모바일 동등 (Mobile parity)** — 클라이언트 미팅 자리에서 폰으로 보여주는 시나리오가 가장 중요. PC/모바일 모두 2컬럼 그리드 + 큰 썸네일 유지.
5. **점진 배포 (Ship in slices)** — Phase 1(정적 페이지)만으로도 공개 가능해야 함. 관리자 패널은 Phase 3에서 붙임 — 초기 운영은 정적 데이터로도 OK.

### 1.2 Decision Drivers (top 3)

| # | Driver | Weight | Rationale |
|---|--------|--------|-----------|
| **D1** | **운영 자율성 (Operational autonomy)** | High | 캠페인 업데이트를 매번 개발 의뢰하면 비용/속도 모두 실패. Supabase Admin Panel 필수. |
| **D2** | **시각적 임팩트 (Visual impact)** | High | 광고대행사 자체 홈페이지가 안 예쁘면 영업 자료로 못 쓴다. RGA/BBH 수준 타이포·여백·모션. |
| **D3** | **유지보수 비용 (Maintenance cost)** | Medium | 단일 개발자 환경. 의존성 최소화, Vercel + Supabase + Next.js 표준 패턴 고수. |

부차 드라이버: 페이지 로드 성능 (LCP < 2.5s), SEO (메타데이터 + OG), 접근성 (WCAG AA 키보드 내비게이션).

### 1.3 Viable Options (>= 2)

#### Option A — **"Static-first, Supabase-later"** (RECOMMENDED)

- Phase 1: Work 데이터 = `src/content/works.ts` (정적 배열). About/Contact도 정적.
- Phase 2: 영상릴 + Hero 스크롤 인터랙션 + 폴리시.
- Phase 3: Supabase 테이블·Auth·관리자 `/admin` 라우트 추가. 정적 배열을 DB 시드로 마이그레이션.
- Phase 4: 마이그레이션·QA·런칭.

**Pros:** Phase 1만으로도 사이트 공개 가능, 검증 빠름, DB 스키마를 실제 데이터 모양 보고 확정 가능
**Cons:** 마이그레이션 단계 한 번 필요 (정적→DB), 초기엔 비개발자가 캠페인 못 올림

#### Option B — **"Supabase-first, all dynamic"**

- 모든 페이지(Work/About/Contact의 Client 로고까지) Supabase에서 fetch.

**Pros:** 처음부터 비개발자 편집 가능
**Cons:** Phase 1 일정 2배, 빈 DB 상태에서 디자인 검증 어려움, About/Contact의 거의 변하지 않는 데이터까지 DB에 두는 건 over-engineering

#### Option C — **"Headless CMS (Sanity/Contentful)"**

- Work 콘텐츠를 외부 CMS에 둠.

**Pros:** CMS UX가 셀프-구현 어드민보다 성숙
**Cons:** 월 구독료, 새 SaaS 의존성 추가 (Supabase는 어차피 Auth/DB로 쓸 거라 중복), RFP에 명시된 스택과 정합성 떨어짐. **단, Phase 3 어드민 구현이 난항을 겪을 경우 Sanity Studio로 1일 내 fallback 가능 (ADR-001 참조).**

### 1.4 Decision

→ **Option A 채택.** D1·D2·D3 모두 만족. Phase 1을 빨리 띄워서 클라이언트 피드백을 받고 Phase 3에서 운영 도구를 붙이는 게 광고대행사 워크플로우와 일치.

### 1.5 Pre-mortem (Deliberate mode — 6 failure scenarios)

| # | Failure scenario | Likelihood | Mitigation |
|---|---|---|---|
| **F1** | **영상릴 자산이 늦게 나옴 / 용량 과대** | High | 플레이스홀더 영상으로 Phase 1 진행. 최종 영상은 Mux/Cloudflare Stream 검토하되 우선은 Vercel 정적 mp4 + poster 이미지. 5MB 초과 시 webm + mp4 dual-source. |
| **F2** | **관리자 패널 Auth 부실로 캠페인 무단 변경** | Medium | Supabase RLS는 `admins` 테이블 기반(누구나 가입해도 admin 권한 X). `/admin` 라우트는 `proxy.ts`에서 세션+admins 확인. Auth signup OFF. |
| **F3** | **모바일 그리드에서 썸네일이 너무 작아 임팩트 죽음** | Medium | 모바일에서도 `grid-cols-2` 유지하되 viewport 너비의 47%까지 차지. 디자인 리뷰 단계에서 실 디바이스 확인 필수. |
| **F4** | **Supabase anon key reads fail** — RLS published=true 필터가 anon role에서 동작 안 함 | Medium | Phase 3에서 RLS 정책 작성 후 즉시 anon 키로 별도 통합 테스트 수행 (`scripts/test-rls.ts`). published=true 작품만 노출되는지, published=false는 안 보이는지 둘 다 확인. |
| **F5** | **Vercel preview env vars가 Production만 scope** → admin이 preview에서 테스트 불가 | Medium | Vercel env matrix 명시(§3.7). Supabase URL/anon key는 Production+Preview+Development 3환경 모두 설정. Service role / encryption key는 Production+Preview만(노출 줄임). |
| **F6** | **Signed URL을 DB에 저장** → 60분 후 thumbnails 404 | Medium | 업로드 후 **public URL**만 DB에 저장 (`supabase.storage.from(...).getPublicUrl()`). Server Action에서 signed URL은 업로드 단계에만 사용, DB에 저장 금지. AC-AD4 참조. |
| **F7** | **dnd-kit reorder N-update partial failure** → DB 정렬 불일치 | Medium | `reorderWorks`는 단일 SQL 트랜잭션(`update ... case id when ...`)으로 batched. 실패 시 전체 rollback, 클라이언트에 토스트+낙관적 UI 롤백. AC-AD5 참조. |
| **F9** | **Naver Maps 도메인 화이트리스트가 vercel.app preview URL 차단** | Medium | Naver Cloud Platform 콘솔에 localhost, dmate.kr, www.dmate.kr, `*.vercel.app` 등록. Phase 1.5에서 등록 + preview에서 실제 로딩 확인. 실패 시 Google Maps fallback이 자동 동작. |

---

## 2. 프로젝트 개요

### 2.1 목표 (Goals)

- **G1.** D-MATE의 영업·채용용 공식 홈페이지를 새로 구축한다.
- **G2.** Work 페이지를 비개발자가 운영 가능한 관리자 패널로 유지보수한다.
- **G3.** "We Activate Your Brand" 슬로건을 시각·인터랙션으로 체화한 Hero를 만든다.
- **G4.** RGA / BBH 수준의 타이포·여백 위주 미니멀 디자인 톤을 구현한다.

### 2.2 범위 (In Scope)

- 4개 라우트: `/` (Home), `/work`, `/about`, `/contact`
- 관리자 1개 영역: `/admin` (Work CRUD, 카테고리, 순서)
- Supabase 백엔드: 슈퍼어드민 1계정(`public.admins` 테이블 등록), `works` + `categories` + `admins` 테이블
- Vercel 자동 배포 (이미 연결됨)

### 2.3 범위 외 (Out of Scope)

- 다국어 (i18n) — 본 PRD는 한/영 혼용 단일 로케일만(`lang="ko"`). 추후 별도 계획.
- 블로그 / 인사이트 / 채용 페이지 — 본 단계 미포함.
- 다중 어드민 / 역할 분리 — 단일 슈퍼어드민으로 시작(테이블 구조는 다중 admin 확장 가능).
- 결제 / 폼 백엔드 — Contact는 `mailto:` 우선, Resend는 stretch.

### 2.4 성공 기준 (Success metrics)

- **S1.** Lighthouse Performance ≥ 90 (Home, Work), Accessibility ≥ 95, SEO ≥ 95.
- **S2.** LCP < 2.5s (4G simulated, Home).
- **S3.** 비개발자가 30초 안에 `/admin`에서 캠페인 1개 추가 가능 (UX 테스트).
- **S4.** 모든 페이지가 360px (최소)부터 1920px까지 깨지지 않음.
- **S5.** RFP 요구사항 100% 충족 (RFP checklist 별첨, 본 문서 §11).

---

## 3. 기술 아키텍처

### 3.1 스택 확정

| Layer | Choice | Version | Reason |
|---|---|---|---|
| Framework | Next.js | 16.2.6 (App Router) | 기 설치, RSC + Server Actions로 admin CRUD 간결화 |
| UI Runtime | React | 19.2 | 기 설치 |
| Styling | Tailwind CSS | v4 | 기 설치, design tokens는 `@theme` 인라인 |
| Backend | Supabase | latest | DB + Auth + Storage(영상/이미지) 일체형 |
| Forms (admin) | react-hook-form + zod | TBD Phase 3 | 검증·타입 안전 |
| Drag-reorder | dnd-kit | TBD Phase 3 | React 19 호환, 접근성 우수 |
| Email | `mailto:` (Phase 1-3) → Resend (Phase 4 stretch) | — | RFP 명시 |
| Map | Naver Map JS SDK + Google Maps iframe | — | Naver 우선, Google fallback |
| Hosting | Vercel | — | 기 연결 |
| Analytics | Vercel Analytics | — | 무료 plan으로 시작 |
| Fonts | `next/font/local` (Pretendard Variable) | — | self-hosted, display:'swap', preload:true |

### 3.2 파일 구조 (target)

```
src/
├── app/
│   ├── layout.tsx                    # <html lang="ko">, <Header/>, <Footer/>, fonts, metadata
│   ├── page.tsx                      # Home (/) — Hero + scroll sections
│   ├── globals.css                   # Tailwind + design tokens
│   ├── not-found.tsx                 # 404 (global)
│   ├── work/
│   │   ├── page.tsx                  # /work — grid + filters
│   │   └── [slug]/
│   │       ├── page.tsx              # /work/:slug — case detail (Phase 4 — Phase 2는 lightbox)
│   │       └── not-found.tsx         # /work/[slug] 404
│   ├── about/
│   │   └── page.tsx                  # /about — 5 sections
│   ├── contact/
│   │   └── page.tsx                  # /contact — map + email CTA
│   ├── admin/
│   │   ├── layout.tsx                # Server-side requireAdmin() gate
│   │   ├── loading.tsx               # admin 공통 로딩 UI
│   │   ├── error.tsx                 # admin 공통 에러 바운더리 (MUST start with "use client")
│   │   ├── login/page.tsx            # Supabase login form
│   │   ├── page.tsx                  # Dashboard (work list, drag-to-reorder)
│   │   ├── works/
│   │   │   ├── new/page.tsx
│   │   │   ├── [id]/edit/page.tsx
│   │   │   └── actions.ts            # Server Actions (createWork etc.)
│   │   └── categories/
│   │       ├── page.tsx
│   │       └── actions.ts
│   ├── api/                          # (minimal — prefer Server Actions)
│   │   └── auth/route.ts             # Supabase auth callback if needed
│   └── opengraph-image.tsx           # Auto OG image
├── components/
│   ├── nav/Header.tsx
│   ├── nav/Footer.tsx
│   ├── home/Hero.tsx
│   ├── home/Reel.tsx                 # 영상릴
│   ├── home/WorkPreview.tsx          # Work 첫단락
│   ├── home/AboutPreview.tsx
│   ├── home/ContactPreview.tsx
│   ├── work/WorkGrid.tsx
│   ├── work/WorkCard.tsx
│   ├── work/CategoryFilter.tsx
│   ├── about/PhilosophySection.tsx
│   ├── about/IECSection.tsx
│   ├── about/ServicesSection.tsx     # Strategy/Content/Campaign/Data
│   ├── about/HistoryLeadership.tsx
│   ├── about/ClientLogos.tsx
│   ├── contact/MapEmbed.tsx
│   ├── contact/EmailCTA.tsx
│   ├── admin/WorkForm.tsx
│   ├── admin/SortableWorkList.tsx
│   └── ui/                           # Primitive: Button, Input, Dialog, etc.
├── content/
│   ├── works.ts                      # Phase 1: static. Phase 3: seed file
│   ├── clients.ts
│   ├── leadership.ts
│   └── nav.ts
├── lib/
│   ├── data/
│   │   └── works.ts                  # getWorks() / getWorkBySlug() — 데이터 액세스 seam
│   ├── auth/
│   │   └── require-admin.ts          # requireAdmin() helper
│   ├── supabase/
│   │   ├── client.ts                 # Browser client
│   │   ├── server.ts                 # Server client (cookies)
│   │   └── proxy.ts                  # Session refresh helper for proxy.ts
│   ├── types.ts                      # Work, Category, ClientLogo types
│   └── utils.ts                      # cn(), formatters
├── proxy.ts                          # /admin/* 보호 (Next.js 16: was middleware.ts)
└── styles/
    └── (handled by globals.css)

supabase/
├── migrations/
│   ├── 0001_init.sql                 # categories, works tables
│   └── 0002_rls.sql                  # Row Level Security policies + admins table
├── seed.sql                          # 기존 자료 마이그레이션용
└── scripts/
    └── test-rls.ts                   # anon role RLS 검증 스크립트 (F4 대응)

public/
├── reel/                             # 영상릴 (mp4, webm, poster.jpg)
├── work/                             # 마이그레이션된 썸네일 (Phase 3에서 Supabase Storage로 이전)
├── clients/                          # 클라이언트 로고
└── fonts/                            # self-hosted (Pretendard Variable woff2)
```

> **Note (Next.js 16 API):** `src/middleware.ts`는 **deprecated**. Next.js 16부터 `src/proxy.ts`와 `export function proxy(request)` 시그니처를 사용한다. 참조: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.

### 3.3 컴포넌트 계층 (Home 예시)

```
<RootLayout lang="ko">
 ├── <Header/>                        # sticky, transparent → solid on scroll
 ├── <main>
 │    └── <HomePage>
 │         ├── <Hero/>                # "We Activate Your Brand" — 100dvh
 │         ├── <Reel/>                # autoplay muted loop, intersection-triggered
 │         ├── <WorkPreview/>         # latest 4 works → CTA "/work"
 │         ├── <AboutPreview/>        # IEC short pitch → CTA "/about"
 │         └── <ContactPreview/>      # email + CTA "/contact"
 └── <Footer/>
```

### 3.4 데이터 흐름

```
[Public pages]
  Home/About/Contact  ──(static)──> rendered at build time
  /work               ──> getWorks() in '@/lib/data/works'
                          - Phase 1-2: returns @/content/works.ts (static)
                          - Phase 3+ : supabase.from('works').select() wrapped in unstable_cache(fn, ['works'], { tags: ['works'], revalidate: false })

[Admin]
  /admin/login        ──> Supabase auth.signInWithPassword
  /admin/*            ──> src/proxy.ts (Next.js 16 file convention) refreshes session
                       ──> src/app/admin/layout.tsx calls requireAdmin() → throws if no admins row
  CRUD                ──> Server Actions ("use server") with requireAdmin() FIRST
                       ──> supabase.from('works').{insert|update|delete}
                       ──> revalidateTag('works')  // invalidates unstable_cache by tag
  Reorder             ──> dnd-kit local state → batched single-tx UPDATE on drop
  Image upload        ──> Server Action → validates (image/* + ≤5MB) → supabase.storage
                          → getPublicUrl() → DB stores public URL (NOT signed URL)

[Caching]
  Public reads wrap the Supabase fetch with `unstable_cache(fn, ['works'], { tags: ['works'], revalidate: false })`.
  Admin mutations call `revalidateTag('works')` so the next public visit sees the new state.
  `cacheComponents: true` is NOT enabled — `unstable_cache` is the chosen primitive (lower blast radius, no global render-model change). See Phase 4.10 for migration follow-up.
```

> **Data-access seam contract:** Phase 1과 Phase 3 모두 §4.2에 정의된 동일한 `Work` 타입을 반환해야 한다. Phase 3 구현 시 `categories` JOIN 후 `category_id` → `category` name (string)으로 매핑하여 타입 계약을 유지한다. 컴포넌트 시그니처는 변경되지 않는다.

> **Next.js 16 cache API 선택 (정정):** `cacheTag()` 사용은 `cacheComponents: true` 전제(`node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md:26-30`). 본 PRD는 `cacheComponents`를 활성화하지 **않고** `unstable_cache` 패턴을 채택한다:
> - **공개 read:** `unstable_cache(fn, ['works'], { tags: ['works'], revalidate: false })` 로 wrap.
> - **Server Action 내 mutation 직후:** `revalidateTag('works')` 호출 → 다음 요청부터 새 데이터.
> - **선택 이유:** blast radius가 작음(특정 fetch만 영향), global render-model 변경 없음, Next.js 16 stable API.
> - Phase 4.10에서 사이트 안정화 후 `cacheComponents: true` 마이그레이션 검토 (별도 follow-up task).

### 3.5 디자인 토큰 (초안 — 디자이너 확정 전제)

```css
@theme {
  --color-bg: #ffffff;
  --color-fg: #0a0a0a;
  --color-muted: #6b6b6b;
  --color-accent: #ff3d00;        /* impact accent — TBD by design */
  --font-display: "Pretendard Variable", system-ui, sans-serif;
  --font-body: "Pretendard Variable", system-ui, sans-serif;
  --text-hero: clamp(3rem, 10vw, 9rem);
  --space-section: clamp(4rem, 10vw, 10rem);
}
```

### 3.6 `next.config.ts` 명시 스펙

```ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '<project-ref>.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['dmate.kr', 'www.dmate.kr', '*.vercel.app'],
      bodySizeLimit: '6mb', // 5MB 이미지 + 여유분
    },
  },
};

export default config;
```

> **Security note (`allowedOrigins`):** `*.vercel.app` 와일드카드는 preview 환경에서만 안전(F5 시나리오). production 도메인은 `dmate.kr`/`www.dmate.kr`만 명시. Server Actions의 CSRF 보호는 origin 검증 + `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`(§3.7) 조합으로 동작.

### 3.7 환경 변수 매트릭스

| 변수명 | Public? | Dev | Preview | Production | 비고 |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | 필수 | 필수 | 필수 | 클라이언트 번들 포함 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | 필수 | 필수 | 필수 | RLS로 보호 |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only | 옵션 | 필수 | 필수 | Server Actions 전용. 절대 클라이언트 노출 금지 |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Server-only | 필수 | 필수 | 필수 | Server Action 페이로드 암호화. Vercel에서 한 번 생성 후 고정, 분기 12개월. **로테이션 시 모든 배포 동시 재배포 필요** |
| `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` | Public | 필수 | 필수 | 필수 | Naver Cloud Platform 도메인 화이트리스트와 짝 |
| `RESEND_API_KEY` | Server-only | 옵션 | 옵션 | 옵션 (Phase 4 stretch) | Resend 사용 시 |
| `NEXT_PUBLIC_SITE_URL` | Public | `http://localhost:3000` | preview URL | `https://dmate.kr` | OG/canonical |

> **Vercel 설정 가이드:** 각 변수의 Environment scope를 정확히 지정. Service role key/encryption key는 Development에서는 옵션(로컬은 anon key로 충분).

---

## 4. 페이지별 상세 스펙

### 4.1 Home (`/`)

#### 구조
1. **Hero** (`100dvh`)
   - 화면 가운데 큰 슬로건: **"We Activate Your Brand"**
   - 폰트: display, `clamp(3rem, 10vw, 9rem)`, font-weight 700.
   - 배경: 단색 또는 미세 모션 그라데이션. 영상은 다음 섹션에 배치(LCP 보호).
   - 상단 nav: 처음 투명 → 스크롤 후 흰 배경 + bottom-border.
   - Scroll indicator (↓) 하단 중앙.
   - **Note:** `100vh`는 모바일 브라우저 주소창 변동 이슈 → `100dvh` 사용 강제 (AC-H7).
2. **영상릴 (Reel)** — full-bleed
   - `<video autoplay muted loop playsinline>` + poster.
   - `IntersectionObserver`로 viewport 진입 시에만 play (모바일 데이터 절약).
   - Caption: "D-MATE 작업물 종합" (작게, 우하단).
3. **Work 첫단락 (preview)**
   - 최신 4개 캠페인 2x2 그리드 (모바일도 2x2).
   - CTA: "VIEW ALL WORK →" `/work` 이동.
4. **About 첫단락 (preview)**
   - 짧은 카피: "We are an Integrated Experience Connecting agency. 통합 경험을 연결합니다."
   - CTA: "MORE ABOUT US →" `/about`.
5. **Contact 첫단락 (preview)**
   - "Let's activate your brand together."
   - 이메일 `oddin@dmate.kr` 큰 텍스트 클릭 → mailto.
   - CTA: "CONTACT US →" `/contact`.

#### 인터랙션
- 섹션 진입 시 fade-up (10px translate, 0.6s ease-out).
- **`prefers-reduced-motion` 정책:** 모든 entrance 애니메이션은 `prefers-reduced-motion: reduce`에서 **opacity-only, duration ≤ 100ms 또는 즉시 표시**. transform/translate는 완전 무효화 (no scale/translate/rotate). AC-G5 참조.
- Hero 슬로건은 한 글자씩 stagger entrance (300ms, optional).
- 스크롤 스냅은 사용하지 **않음** (RGA/BBH도 자연 스크롤).

#### 반응형
- 360–767px: 단일 컬럼, hero 폰트 `clamp(2.5rem, 14vw, 4.5rem)`.
- 768–1199px: 2컬럼.
- 1200px+: full layout.

### 4.2 Work (`/work`)

#### 구조
- 페이지 상단: 타이틀 "Work" + 카테고리 필터 칩.
- 카테고리: `All` | `IMC` | `런칭` | `Issue-up` | `Sales-up`.
- 그리드: **PC/모바일 공통 2컬럼** (RFP 명시).
- 카드: 큰 썸네일 **aspect-ratio 16:9 고정**, 하단에 타이틀·클라이언트·카테고리 태그.
- 호버 시 (PC만): 이미지 살짝 zoom (1.03x, 0.4s), 오버레이로 추가 정보.
- 클릭 동작:
  - **Phase 2**: 클릭 → **라이트박스**로 영상/이미지 띄움 (별도 라우트 없음).
  - **Phase 4**: 클릭 → `/work/[slug]` 디테일 페이지로 전환.

#### `next/image` 정책
- 모든 `<WorkCard>`의 `<Image>`에 다음 적용:
  - `sizes="(min-width: 1200px) 600px, 50vw"`
  - `priority`는 첫 번째 행(2장)에만 부여, 나머지는 lazy.
  - `alt` = `work.title` (필수, fallback 없음 — 빈 title 작품은 폼 검증에서 차단).
  - `placeholder="empty"` (작품 썸네일은 일관된 16:9 → blur는 선택).

#### 필터 UX
- 클라이언트 사이드 필터링 (페이지 reload 없음).
- 선택된 칩: solid bg + white text.
- URL 동기화: `/work?category=imc` (공유 가능).

#### 데이터 모델 (단일 Work)
```ts
type Work = {
  id: string;
  slug: string;
  title: string;                  // alt text로도 사용 (필수)
  client: string;
  category: "IMC" | "런칭" | "Issue-up" | "Sales-up";
  thumbnail_url: string;          // 1600x900 권장 (16:9), Supabase Storage public URL
  video_url?: string;             // 옵션 (Vimeo/YouTube/외부 URL 권장 — Supabase Storage free tier 1GB)
  description?: string;
  year: number;
  sort_order: number;
  published: boolean;
  created_at: string;
};
```

> **Storage 비용 노트:** Supabase Storage free tier는 1GB. 영상은 가능한 한 외부 호스팅(Vimeo/YouTube/Cloudflare Stream)을 사용하고, `video_url`에는 URL만 저장. 썸네일(JPEG ~150KB)만 Supabase Storage에 업로드 권장.

#### 반응형
- 모든 viewport에서 **2컬럼 유지** (RFP 핵심 요구).
- 카드 간 gap: `clamp(0.5rem, 2vw, 1.5rem)`.
- 모바일에서 카테고리 칩은 horizontal scroll.

### 4.3 About us (`/about`)

5개 섹션, 각각 full-bleed 또는 contained, 사이에 큰 여백(`var(--space-section)`).

#### Section 1 — We Activate Your Brand (브랜드 철학)
- 큰 슬로건 + 2–3문장 본문.
- 좌측 텍스트 / 우측 키 비주얼 (이미지 또는 추상 모션).

#### Section 2 — IEC (Integrated Experience Connecting)
- 헤드라인: "IMC를 넘어, 통합 경험을 연결합니다."
- 도식: IMC → IEC 진화 (간단한 SVG diagram).
- 본문 2–4문장.

#### Section 3 — Communication Full-service Agency
- 4개 서비스 카드 그리드 (2x2 또는 4x1):
  - **Strategy** — 전략 기획
  - **Content** — 콘텐츠 제작
  - **Campaign** — 캠페인 운영
  - **Data** — 데이터 분석/측정
- 각 카드: 아이콘 + 타이틀 + 1–2문장.

#### Section 4 — Our History & Leadership
- 좌측: 타임라인 (2016 창립 → 주요 마일스톤).
- 우측: 리더십 카드 2개.
  - **김재광** — CEO (사진, 짧은 바이오).
  - **유하재** — 캠페인본부장 (사진, 짧은 바이오).
- 데이터 소스: `src/content/leadership.ts` (정적, 거의 안 바뀜).

#### Section 5 — Our Client
- 클라이언트 로고 그리드 (5–6 컬럼 PC, 3 컬럼 모바일).
- 로고는 grayscale, hover 시 컬러로 전환.
- 데이터: `src/content/clients.ts`.

### 4.4 Contact (`/contact`)

#### 구조
- 헤드라인: "Let's talk." (대형 타이포)
- 좌측: 사무실 정보
  - 주소 (전체 한 줄)
  - 대표 전화 (옵션)
  - 이메일: `oddin@dmate.kr` — 클릭 시 `mailto:oddin@dmate.kr?subject=[D-MATE]%20문의`
- 우측: 지도 embed
  - **Primary: Naver Maps** (Naver Maps JS SDK).
  - Fallback: Google Maps iframe (Naver 로드 실패 시 자동).
  - 토글 버튼으로 두 지도 전환 가능 (옵션).
- 하단: SNS 링크 (Instagram, LinkedIn 등 — 보유한 채널만).

#### Naver Maps 도메인 화이트리스트 (Phase 1.5 체크리스트)
Naver Cloud Platform 콘솔 > Maps Application > Web Service URL 등록:
- `http://localhost:3000`
- `https://dmate.kr`
- `https://www.dmate.kr`
- `https://*.vercel.app`

미등록 시 preview 환경에서 401/403으로 실패 → Google Maps fallback이 동작하지만 운영자가 인지해야 함.

#### Phase 4 stretch: Resend 문의 폼
- name, company, email, message + reCAPTCHA v3.
- Server Action → Resend API → `oddin@dmate.kr`로 전달.
- 본 PRD에서는 stretch로 분류, Phase 4에서 결정.

### 4.5 글로벌 (Layout, Nav, Footer)

#### Root Layout
- `<html lang="ko">` 필수 (AC-G6).
- 폰트 로딩: `next/font/local`로 Pretendard Variable 로드.
  ```ts
  import localFont from 'next/font/local';
  const pretendard = localFont({
    src: './fonts/PretendardVariable.woff2',
    variable: '--font-pretendard',
    display: 'swap',
    preload: true,
    weight: '45 920',
  });
  ```
- Display weight (Hero용)는 preload, body weight은 기본 swap.

#### Header
- 좌: D-MATE 로고 (SVG, 클릭 시 `/`).
- 우: `Work` / `About us` / `Contact`.
- 모바일: 햄버거 → 풀스크린 오버레이 메뉴 (큰 타이포).
- 스크롤 동작: 첫 100px 투명 → 이후 white + subtle border-bottom.

#### Footer
- 좌: D-MATE 로고 + 짧은 회사 정보 (사업자번호, 주소, 대표 이메일).
- 우: 메뉴 미러 + SNS.
- 하단: `© 2026 D-MATE. All rights reserved.`

---

## 5. 관리자 패널 스펙 (Phase 3)

### 5.1 인증 (Authentication)

- **Provider:** Supabase Auth (email + password).
- **계정 정책:** 단일 슈퍼어드민. **Supabase Auth 콘솔의 "Enable email signups" = OFF** (AC-S5). 회원가입 페이지 **없음**. 어드민 계정은 Supabase 대시보드에서 수동 생성 후, `public.admins` 테이블에 `user_id` 등록.
- **세션:** Supabase SSR helpers (`@supabase/ssr`) + cookies.
- **보호 (이중 가드):**
  1. `src/proxy.ts` (Next.js 16 file convention) — `/admin/*` 매칭, 세션 쿠키 없으면 `/admin/login`으로 302. 함수 시그니처는 `export function proxy(request: NextRequest)`.
  2. `src/app/admin/layout.tsx` — RSC에서 `requireAdmin()` 호출 → `auth.users` 세션 + `public.admins` 존재 동시 확인. 실패 시 throw → `error.tsx`가 잡거나 `/admin/login`으로 redirect.
- **로그인 페이지:** `/admin/login` — 이메일/비밀번호 입력, 에러 메시지 표시.
- **로그아웃:** 헤더 우측 버튼, Server Action으로 처리 (signOut + redirect).
- **비밀번호 재설정:** Phase 3에서는 Supabase 대시보드에서 수동. Phase 4에서 자동화 검토.

> **Security note (proxy.ts 경계):** `proxy.ts` (src/proxy.ts)는 UX 리다이렉트 전용이며 보안 경계가 아닙니다. 모든 Server Action에서 `requireAdmin()`이 반드시 첫 번째 문장이어야 하는 이유가 여기에 있습니다 — 라우트 리팩터 시 proxy.ts 매처가 변경되어도 인증은 유지됩니다.

#### `requireAdmin()` helper 명세

```ts
// src/lib/auth/require-admin.ts
import { cache } from 'react';
import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

type AdminContext = {
  user: Awaited<ReturnType<Awaited<ReturnType<typeof createServerClient>>['auth']['getUser']>>['data']['user'];
  supabase: Awaited<ReturnType<typeof createServerClient>>;
};

// React.cache() wraps so multiple RSCs in the same request dedupe the auth check.
export const requireAdmin = cache(async (): Promise<AdminContext> => {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: admin } = await supabase
    .from('admins')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (!admin) {
    // 세션은 있지만 admins 테이블에 없는 경우 → 강제 로그아웃 + 로그
    await supabase.auth.signOut();
    redirect('/admin/login?error=not_admin');
  }

  return { user, supabase };
});
```

> **React.cache() 이유:** 한 요청 안에서 layout.tsx, page.tsx, 여러 RSC가 동시에 `requireAdmin()`을 호출해도 Supabase `getUser()` + `admins` 조회는 한 번만 실행됨. Server Action에서는 매 호출이 새 요청이므로 cache는 자연스럽게 무효화됨.

> **Usage rule (AC-AD8):** 모든 Server Action의 **첫 줄**은 `const { user, supabase } = await requireAdmin();`. 누락 시 코드 리뷰에서 차단.

### 5.2 Supabase 스키마

```sql
-- 0001_init.sql

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,           -- 'imc', 'launch', 'issue-up', 'sales-up'
  name text not null,                  -- 'IMC', '런칭', 'Issue-up', 'Sales-up'
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.works (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text not null,
  category_id uuid not null references public.categories(id) on delete restrict,
  thumbnail_url text not null,
  video_url text,
  description text,
  year int not null,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index works_published_sort_idx on public.works (published, sort_order desc);
create index works_category_idx on public.works (category_id);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger works_updated_at before update on public.works
  for each row execute function public.set_updated_at();
```

```sql
-- 0002_rls.sql

-- admins 테이블: auth.users 중 어드민 권한자만 등록
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins     enable row level security;
alter table public.categories enable row level security;
alter table public.works      enable row level security;

-- admins 테이블은 admin 본인만 자기 row 조회 가능
create policy "admins self read" on public.admins
  for select to authenticated
  using (user_id = auth.uid());

-- 공개: published works + 모든 카테고리
create policy "public read categories" on public.categories
  for select using (true);

create policy "public read published works" on public.works
  for select using (published = true);

-- admin: admins 테이블에 등록된 사용자만 전체 권한
create policy "admin all categories" on public.categories
  for all to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "admin all works" on public.works
  for all to authenticated
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));
```

#### Storage RLS (work-thumbnails 버킷)

```sql
-- 0002_rls.sql 계속

-- Storage 정책: storage.objects 테이블에 정책 부여
-- (Supabase 대시보드 Storage > Policies에서 생성 또는 SQL로)
create policy "public read work-thumbnails" on storage.objects
  for select using (bucket_id = 'work-thumbnails');

create policy "admin write work-thumbnails" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'work-thumbnails'
    and exists (select 1 from public.admins where user_id = auth.uid())
  );

create policy "admin update work-thumbnails" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'work-thumbnails'
    and exists (select 1 from public.admins where user_id = auth.uid())
  );

create policy "admin delete work-thumbnails" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'work-thumbnails'
    and exists (select 1 from public.admins where user_id = auth.uid())
  );
```

> **Upload 패턴 결정:** 브라우저 직접 업로드 대신 **Server Action 경유**. 클라이언트가 `FormData`에 파일 첨부 → Server Action에서 `requireAdmin()` → MIME/사이즈 검증 → `supabase.storage.from('work-thumbnails').upload()` → `getPublicUrl()` → DB에 public URL 저장. `experimental.serverActions.bodySizeLimit: '6mb'`로 5MB 파일 허용.

### 5.3 Storage 버킷
- Bucket: `work-thumbnails` (public read, **admin-only write — RLS로 강제**).
- Bucket: `work-videos` — **권장하지 않음**. 영상은 외부 URL(Vimeo/YouTube/Cloudflare Stream) 사용. Supabase Storage free tier 1GB 제약.

### 5.4 관리자 라우트

| Route | 설명 |
|---|---|
| `/admin/login` | 로그인 폼 |
| `/admin` | 대시보드 — Work 목록(드래그로 순서 변경), 통계 카드(총 개수, published/draft), 빠른 액션 |
| `/admin/works/new` | 신규 캠페인 폼 |
| `/admin/works/[id]/edit` | 캠페인 수정 폼 |
| `/admin/categories` | 카테고리 목록 + CRUD (이름·순서) |

각 라우트 그룹에는 `loading.tsx`(스켈레톤)와 `error.tsx`(에러 바운더리) 배치 필수.

### 5.5 CRUD API (Server Actions)

```ts
// src/app/admin/works/actions.ts
"use server";

import { requireAdmin } from '@/lib/auth/require-admin';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const workSchema = z.object({
  title: z.string().min(1).max(200),
  client: z.string().min(1).max(120),
  category_id: z.string().uuid(),
  year: z.number().int().min(2000).max(2099),
  description: z.string().max(2000).optional(),
  video_url: z.string().url().optional(),
  published: z.boolean(),
});

const fileSchema = z.object({
  type: z.string().regex(/^image\//, 'image/* MIME only'),
  size: z.number().max(5 * 1024 * 1024, 'max 5MB'),
});

export async function createWork(formData: FormData) {
  const { supabase } = await requireAdmin();   // AC-AD8: 첫 줄
  // ... validate, insert, return
  revalidateTag('works');                      // invalidates unstable_cache by tag
}

export async function updateWork(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  // ... update
  revalidateTag('works');
}

export async function deleteWork(id: string) {
  const { supabase } = await requireAdmin();
  // ... delete
  revalidateTag('works');
}

export async function reorderWorks(orderedIds: string[]) {
  const { supabase } = await requireAdmin();
  // single-tx batched UPDATE (F7 fix)
  revalidateTag('works');
}

export async function uploadThumbnail(file: File) {
  const { supabase } = await requireAdmin();
  fileSchema.parse({ type: file.type, size: file.size });   // CR-4: MIME + size guard
  const path = `${crypto.randomUUID()}-${file.name}`;
  const { error } = await supabase.storage.from('work-thumbnails').upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from('work-thumbnails').getPublicUrl(path);
  return data.publicUrl;                                    // F6 fix: public URL only
}
```

> **Public read implementation (`src/lib/data/works.ts`, Phase 3):**
> ```ts
> import { unstable_cache } from 'next/cache';
> import { createServerClient } from '@/lib/supabase/server';
>
> export const getWorks = unstable_cache(
>   async () => {
>     const supabase = await createServerClient();
>     const { data } = await supabase
>       .from('works')
>       .select('*, categories(name)')
>       .eq('published', true)
>       .order('sort_order', { ascending: true });
>     // map category_id → category name to keep §4.2 Work type contract
>     return (data ?? []).map(w => ({ ...w, category: w.categories.name }));
>   },
>   ['works'],
>   { tags: ['works'], revalidate: false }
> );
> ```
> 운영 중 캐시를 강제로 비우려면 admin Server Action 또는 maintenance 스크립트에서 `revalidateTag('works')` 호출.

### 5.6 드래그 순서 변경

- `dnd-kit` `SortableContext` + `useSortable`.
- 드롭 시 `orderedIds`를 Server Action에 전달, **단일 트랜잭션**에서 batched update (`update works set sort_order = case id when ... end`).
- 낙관적 UI 업데이트 (즉시 reorder, 실패 시 rollback + toast). F7 대응.

### 5.7 기존 자료 마이그레이션

- 기존 캠페인 데이터는 `src/content/works.ts`에 정적 배열로 Phase 1부터 보존.
- Phase 3 진입 시 `supabase/seed.sql`로 변환 (스크립트 `scripts/seed-from-static.ts`).
- 한 번 실행 후 `getWorks()` 구현 본체를 정적 → Supabase로 교체.

---

## 6. 구현 순서 (Phasing)

### 6.0 Escape Hatch Protocol (모든 Phase 공통)

**Definition of Green (각 Phase 종료 조건):**
1. `npm run build` 성공 (no type errors, no `revalidateTag` single-arg deprecation).
2. `npm run lint` 통과.
3. 브라우저에서 해당 Phase 산출물의 핵심 동선 확인 (Phase별 체크리스트 §6 하단).
4. Vercel preview deploy 200 OK.

**Phase 실패 시:**
1. **STOP** — 더 진행하지 말 것.
2. `git log --oneline` 으로 마지막 Green 커밋 확인.
3. `git reset --hard <last-green-sha>` 또는 새 브랜치에서 재시도.
4. 실패 원인을 `.omc/plans/open-questions.md`에 기록.
5. Critical blocker (예: Phase 3 admin 패널 난항)는 ADR-001 fallback (Sanity Studio) 검토.

> **AI-pair 일정 추정:** 단일 개발자 + AI pair 기준 대략 4–5.5주 규모. 정확한 일정은 첫 Phase 완료 후 재추정 (rough estimate, not commitment).

### Phase 1 — 정적 골격 + Home

**목표:** 공개 가능한 정적 사이트.

- [ ] 1.1 디자인 토큰 / `next/font/local` Pretendard Variable / 글로벌 스타일 (`globals.css`).
- [ ] 1.2 `Header` / `Footer` / `RootLayout` (`<html lang="ko">`, 메타데이터, OG).
- [ ] 1.3 Home `/` — Hero (100dvh) + 영상릴 placeholder + 4개 preview 섹션.
- [ ] 1.4 About `/about` — 5개 섹션 정적 콘텐츠.
- [ ] 1.5 Contact `/contact` — 정보 + Naver/Google 지도 embed. **Naver Cloud Platform 도메인 화이트리스트 등록** (localhost, dmate.kr, *.vercel.app).
- [ ] 1.6 데이터-액세스 seam — `src/lib/data/works.ts`에 `getWorks()` / `getWorkBySlug()` 구현. Phase 1 본체는 `@/content/works.ts` 정적 배열 반환 (정적이라 캐시 wrap 불필요). 반환 타입은 §4.2 `Work`로 고정 — Phase 3 전환 시 동일 타입 계약 유지.
- [ ] 1.7 Work `/work` — `getWorks()` 사용해 그리드 렌더 + 클라이언트 필터.
- [ ] 1.8 모바일·태블릿 반응형 1차 패스 (360px / 768px / 1200px).
- [ ] 1.9 `not-found.tsx` (global, /work/[slug]용 별도) 추가.
- [ ] 1.10 Vercel 배포 확인 (PR → preview → main → production).

**Definition of Green (Phase 1):** 위 + Lighthouse Home 모바일 Perf ≥ 75 (1차 패스), 모든 라우트 200.

### Phase 2 — 인터랙션 & 폴리시

- [ ] 2.1 Hero 슬로건 stagger entrance + scroll indicator.
- [ ] 2.2 영상릴: 실제 영상 자산 통합 + IntersectionObserver autoplay.
- [ ] 2.3 섹션 fade-up 모션 (`prefers-reduced-motion` 존중 — opacity-only ≤100ms).
- [ ] 2.4 Work 카드 호버 zoom + 카테고리 필터 URL 동기화.
- [ ] 2.5 **Work 카드 클릭 → 라이트박스 (영상/이미지)**. `/work/[slug]` 라우트는 Phase 4에서.
- [ ] 2.6 메타데이터 / OG 이미지 / `sitemap.xml` / `robots.txt`.
- [ ] 2.7 Lighthouse 1차 패스 → Performance/A11y/SEO ≥ 90.
- [ ] 2.8 디자인 리뷰 (실 디바이스, 클라이언트 피드백).

**Definition of Green (Phase 2):** Lighthouse Home/Work 모바일 Perf ≥ 90, A11y ≥ 95.

### Phase 3 — Supabase 백엔드 + 관리자 패널

- [ ] 3.1 Supabase 프로젝트 생성, **환경변수 매트릭스(§3.7) 따라 Vercel Dev/Preview/Production 모두 설정**. Auth Settings → "Enable email signups" OFF.
- [ ] 3.2 Migrations `0001_init.sql` + `0002_rls.sql` (admins 테이블 + Storage RLS 포함).
- [ ] 3.3 Storage 버킷 생성 (`work-thumbnails`, public read + admin-only write).
- [ ] 3.4 Supabase clients (`lib/supabase/client.ts`, `server.ts`).
- [ ] 3.5 **`src/proxy.ts`** 생성 (Next.js 16 file convention) — `/admin/*` 가드. `export function proxy(request)`.
- [ ] 3.6 `requireAdmin()` helper + `src/app/admin/layout.tsx` 이중 가드.
- [ ] 3.7 `/admin/login` — 로그인 폼 + Server Action.
- [ ] 3.8 `/admin` 대시보드 — Work 리스트 + dnd-kit reorder (단일 트랜잭션 batched update).
- [ ] 3.9 `/admin/works/new` + `/admin/works/[id]/edit` — 폼 + 이미지 업로드 (Server Action 경유, MIME+5MB 검증).
- [ ] 3.10 `/admin/categories` CRUD.
- [ ] 3.11 `loading.tsx` / `error.tsx` for `/admin/*`.
- [ ] 3.12 **`src/lib/data/works.ts` 본체를 Supabase fetch로 교체** — `unstable_cache(fn, ['works'], { tags: ['works'], revalidate: false })` 패턴 적용. categories JOIN 후 `category_id` → `category` name 매핑하여 §4.2 `Work` 타입 계약 유지. 컴포넌트는 무변경. **`cacheComponents: true`는 활성화하지 않음** (Phase 4.10 follow-up).
- [ ] 3.13 기존 정적 데이터 → DB seed (`scripts/seed-from-static.ts`). **삽입 순서: categories를 먼저 삽입한 후 works 삽입 (FK 제약 순서 — `works.category_id` → `categories.id`).**
- [ ] 3.14 **RLS 검증 스크립트** (`supabase/scripts/test-rls.ts`): anon 키로 published=true만 보이는지, published=false는 차단되는지 자동화 테스트 (F4 대응).
- [ ] 3.15 `admins` 테이블에 슈퍼어드민 user_id 등록 (수동, Supabase 대시보드).

**Definition of Green (Phase 3):** Admin 로그인 → 작품 추가 → 공개 /work에 반영 (캐시 무효화 동작). RLS 검증 스크립트 PASS. `tsc --noEmit` deprecation 0건.

### Phase 4 — 마이그레이션·QA·런칭

- [ ] 4.1 비개발자 UX 테스트 — 30초 안에 캠페인 추가 가능한지.
- [ ] 4.2 크로스 브라우저 (Chrome/Safari/Firefox/Edge) + 실제 모바일 디바이스.
- [ ] 4.3 접근성 audit (axe-core, 키보드 내비게이션).
- [ ] 4.4 Lighthouse 2차 패스 → 모든 페이지 Perf ≥ 90, A11y ≥ 95, SEO ≥ 95.
- [ ] 4.5 (Stretch) Contact Form + Resend.
- [ ] 4.6 **`/work/[slug]` 디테일 페이지 구현** + `/work/[slug]/not-found.tsx`. Phase 2 라이트박스에서 라우트 기반으로 승격.
- [ ] 4.7 도메인 연결 + DNS + SSL 확인.
- [ ] 4.8 `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` 로테이션 정책 문서화 (분기별, Next.js 16 버전 지원 시).
- [ ] 4.9 ADR 작성 finalization (본 PRD §10), 인수인계 문서.
- [ ] 4.10 **(Follow-up)** 사이트 안정화 후 `cacheComponents: true` 마이그레이션 평가 — 활성화 시 `unstable_cache` → `'use cache'` directive + `cacheTag()`로 단순화 가능. 별도 ADR로 결정.

**Definition of Green (Phase 4 / 런칭):** S1–S5 모두 충족, RFP checklist 100%.

총 예상: **rough 4–5.5주** (AI-pair 보조 기준, Phase 1 완료 후 재추정).

---

## 7. 수용 기준 (Acceptance Criteria)

각 항목은 실제 측정·테스트 가능한 형태로 작성.

### 7.1 글로벌
- **AC-G1.** `next build` 통과, `next start` 후 4개 라우트 모두 200 응답. **`tsc --noEmit` 시 deprecation 경고 0건.** `next.config.ts`에 `cacheComponents: true` 미설정 확인 (Phase 4.10 follow-up).
- **AC-G2.** Lighthouse Mobile: Perf ≥ 90 / A11y ≥ 95 / Best Practices ≥ 95 / SEO ≥ 95 (Home, Work).
- **AC-G3.** 360px–1920px 사이 어떤 viewport에서도 가로 스크롤 발생하지 않음.
- **AC-G4.** 키보드 Tab만으로 모든 인터랙티브 요소 도달 가능 + visible focus ring.
- **AC-G5.** `prefers-reduced-motion: reduce` 환경에서 모든 transform/translate/scale/rotate 무효화. 잔존 애니메이션은 opacity-only, duration ≤ 100ms.
- **AC-G6.** `<html lang="ko">` 필수.

### 7.2 Home
- **AC-H1.** Hero에 "We Activate Your Brand" 슬로건이 viewport 너비의 70%+ 차지(데스크탑).
- **AC-H2.** 스크롤 시 순서대로 노출: Reel → Work preview → About preview → Contact preview.
- **AC-H3.** 영상릴은 viewport 진입 시 자동 재생, 이탈 시 일시정지.
- **AC-H4.** LCP < 2.5s (Vercel Analytics simulated 4G).
- **AC-H5.** 영상은 mobile data saver(`navigator.connection.saveData`)에서는 poster만 표시.
- **AC-H6.** **LCP element 식별 완료** (Hero 슬로건 또는 Hero 배경). Pretendard Variable display weight이 `next/font/local`로 preload, `display:'swap'` 적용. **초기 렌더에서 CLS ≤ 0.05.**
- **AC-H7.** Hero 영역 높이는 `100dvh` (not `100vh`) — iOS Safari 주소창 변동 시에도 슬로건 잘리지 않음.

### 7.3 Work
- **AC-W1.** PC와 모바일 **모두** 2컬럼 그리드 (자동 변형 없음).
- **AC-W2.** 카테고리 필터 4종(IMC/런칭/Issue-up/Sales-up) + All. 선택 시 URL 쿼리에 반영.
- **AC-W3a.** (Phase 3) Admin이 Server Action으로 작품을 추가/수정/삭제하면, **다음 페이지 이동에서 즉시** 반영 (`revalidateTag('works')` 호출로 `unstable_cache` 무효화 동작 확인).
- **AC-W3b.** (Phase 3) Admin이 변경한 뒤 **anon(로그아웃) 세션이 /work를 방문하면** 새 카드가 노출 (캐시 무효화 검증).
- **AC-W4.** (Phase 3) 드래그로 순서 변경 후 새로고침해도 순서가 유지됨. 단일 트랜잭션 실패 시 전체 rollback.
- **AC-W5.** 카드 클릭 동작: **Phase 2에서는 라이트박스**(영상/이미지 모달), **Phase 4에서는 `/work/[slug]` 라우트**로 이동. 두 Phase 모두 키보드 접근성 보장.
- **AC-W6.** WebPageTest 4G에서 Work 카드 1장당 이미지 weight < 80KB (`sizes="(min-width: 1200px) 600px, 50vw"` 적용 + Supabase Storage public URL).
- **AC-W7.** 모든 `<WorkCard>`의 thumbnail alt 텍스트 = `work.title` (빈 title 작품은 폼 검증에서 차단).

### 7.4 About us
- **AC-A1.** 5개 섹션이 명시된 순서로 렌더 (Philosophy → IEC → Services → History & Leadership → Clients).
- **AC-A2.** Services 카드 4개(Strategy/Content/Campaign/Data) 정확히 표시.
- **AC-A3.** Leadership에 김재광(CEO), 유하재(캠페인본부장) 포함.
- **AC-A4.** History에 "2016" 창립 연도 포함.
- **AC-A5.** 클라이언트 로고는 grayscale, hover 시 컬러 (PC).

### 7.5 Contact
- **AC-C1.** `oddin@dmate.kr` 텍스트 클릭 시 OS 기본 메일 클라이언트 열림 (`mailto:` + subject prefilled).
- **AC-C2.** Naver Maps embed 로드 (실패 시 Google Maps fallback). Preview URL(`*.vercel.app`)에서도 로드 확인.
- **AC-C3.** 모바일에서 지도가 viewport 너비의 100% 차지, 최소 높이 320px.

### 7.6 관리자 패널 (Phase 3)
- **AC-AD1.** 비로그인 상태로 `/admin/*` 접근 시 `/admin/login`으로 302 리다이렉트 (`src/proxy.ts`에서).
- **AC-AD2.** 잘못된 비밀번호 입력 시 에러 메시지 표시, URL 변경 없음.
- **AC-AD3.** 신규 작품 폼: title/client/category/thumbnail/year 필수, 누락 시 zod 에러.
- **AC-AD4.** 이미지 업로드: Server Action 경유, MIME `image/*`만, ≤ 5MB. 저장 후 **public URL**(signed URL 아님)이 DB에 기록 (F6 대응).
- **AC-AD5.** 드래그 reorder 후 DB의 `sort_order`가 정렬 결과와 일치. 단일 트랜잭션 실패 시 전체 rollback (F7 대응).
- **AC-AD6.** `published=false`인 작품은 `/work`(공개)에 노출되지 않음(RLS로 강제). `supabase/scripts/test-rls.ts` PASS.
- **AC-AD7.** 비개발자 1명에게 가이드 없이 1분 시연 후 캠페인 1개 추가 성공 (사용성 검증).
- **AC-AD8.** **모든 Server Action의 첫 번째 statement는 `await requireAdmin()`이며, 실패 시 throw/redirect**. 코드 리뷰에서 grep 검증 (`rg "^export async function" src/app/admin -A 2`).

### 7.7 보안 / 운영
- **AC-S1.** `.env.local`이 `.gitignore`에 있고 커밋되지 않음. Vercel env에만 secrets.
- **AC-S2.** Supabase RLS가 enable, `published=false` 작품은 anon 키로 조회 불가 (자동 테스트 `test-rls.ts`).
- **AC-S3.** Service role key는 절대 클라이언트 번들에 포함 안 됨 (Server Actions에서만 사용, `next build` 산출물 grep 검증).
- **AC-S4.** Vercel 프리뷰 배포가 PR마다 자동 생성, main merge 시 production 갱신. **Supabase 환경변수가 Preview scope에도 설정되어 admin이 preview에서 동작 확인 가능** (F5 대응).
- **AC-S5.** Supabase Auth Settings → "Enable email signups" = **OFF** 확인. 회원가입 페이지/플로우 없음. 신규 admin은 Supabase 대시보드에서 수동 생성 + `public.admins` 테이블 row 삽입으로만 가능.
- **AC-S6.** `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`: 현재 Next.js 16 버전이 지원하는 경우 Vercel 환경변수에 설정하고 분기별 로테이션. 미지원 시 빌드의 해시 기반 키가 보호 메커니즘임을 문서화.
- **AC-S7.** `next.config.ts`의 `experimental.serverActions.allowedOrigins`에 `dmate.kr`, `www.dmate.kr`, `*.vercel.app`만 포함. Production에서 다른 origin의 Server Action 호출은 거부.

---

## 8. 확장 테스트 계획 (Deliberate mode)

### 8.1 Unit
- `lib/utils.ts` — `cn()`, formatters.
- `zod` 스키마 — Work 생성/수정 유효성.
- `lib/data/works.ts` — `getWorks()` 정적/Supabase 모드 모두 같은 인터페이스 반환.
- `lib/auth/require-admin.ts` — 미인증/non-admin/admin 3가지 경로 분기.

### 8.2 Integration
- Server Actions — supabase test client로 createWork → list에 포함 확인.
- `proxy.ts` — 미인증 요청 → 302 to `/admin/login`.
- RLS — anon 키로 published=false 작품 조회 실패, public read만 성공 (`test-rls.ts`).
- Storage RLS — non-admin 인증 사용자가 work-thumbnails에 업로드 시도 → 거부.

### 8.3 E2E (Playwright, Phase 4)
- Visitor flow: `/` 스크롤 → `/work` 필터 → 카드 클릭(Phase 2 라이트박스 / Phase 4 [slug]) → `/contact` 이메일 클릭.
- Admin flow: 로그인 → work 추가 → public `/work`에 (anon 새 세션으로) 5초 내 노출 → 드래그 reorder → 새로고침 후 순서 유지.
- Reduced-motion: `prefers-reduced-motion: reduce` 설정 후 transform 모션 0건 확인.

### 8.4 Observability
- Vercel Analytics: Core Web Vitals 추적 (LCP/CLS/INP).
- Sentry (Phase 4 stretch) — Server Action 에러.
- Supabase 로그 모니터링 — slow query / RLS denial.
- Naver Maps 로딩 실패 카운터 (자체 클라이언트 측 카운트 → Vercel Analytics custom event).

---

## 9. 리스크 & 미해결 이슈

| Risk | Impact | Mitigation |
|---|---|---|
| 영상릴 자산 미확보 | Phase 2 지연 | Phase 1은 placeholder, Phase 2 시작 전 자산 확보 데드라인 설정 |
| Naver Maps API 정책/도메인 변경 | Contact 페이지 깨짐 | Google Maps fallback 동시 구현, 도메인 화이트리스트 등록 |
| 비밀번호 단일 관리자 분실 | 관리자 패널 잠김 | Supabase 대시보드에서 수동 reset, password reset 자동화 Phase 4 |
| 큰 영상 파일로 LCP 악화 | AC-H4 실패 | Mux/Cloudflare Stream 검토, 또는 webm + mp4 + poster |
| 다국어 요구가 후행으로 들어옴 | 구조 변경 | i18n 기반 라우팅 가능성 염두 — 본 PRD scope out |
| Phase 3 어드민 구현 난항 | 일정 슬립 | ADR-001 Consequences — Sanity Studio fallback (1일 내 전환) |
| Server Action encryption key 분실/노출 | 모든 admin 액션 차단 | 12개월 로테이션, Vercel env 백업, 로테이션 절차 문서화 |

---

## 10. ADR (Architecture Decision Record)

### ADR-001 — Static-first 전략 채택

- **Decision:** Phase 1~2는 정적 데이터, Phase 3부터 Supabase 도입.
- **Drivers:** D1(운영 자율성)·D2(시각적 임팩트)·D3(유지보수 비용) 모두 만족 + 빠른 1차 공개 가능.
- **Alternatives considered:**
  - Option B (Supabase-first): 초기 일정 2배, 빈 DB 상태에서 디자인 검증 어려움.
  - Option C (Headless CMS): 추가 SaaS 의존, 비용, RFP 스택 정합성 떨어짐.
- **Why chosen:** Phase 1만으로도 공개 가능 → 클라이언트 피드백 빠르게 수렴. Phase 3에서 실 데이터 모양 보고 스키마 확정 → over-design 방지. `src/lib/data/works.ts` seam 덕에 Phase 1 → 3 전환이 1파일 교체로 끝남.
- **Consequences:**
  - (+) 빠른 검증, (+) 스키마 후행 확정으로 정확도 ↑.
  - (−) Phase 3에서 1회성 마이그레이션 스크립트 필요. (−) Phase 1-2 동안 비개발자가 직접 캠페인 못 올림 → 개발자 의존.
  - **Escape hatch:** Phase 3 자체 어드민 구현이 난항을 겪을 경우(예: Server Action 보안/UX 시간 초과), **Sanity Studio로 1일 내 전환 가능**. `getWorks()` 인터페이스는 유지하고 본체만 Sanity client fetch로 교체. 추가 월 구독료(Sanity free tier 가능) 발생하지만 운영 자율성(D1)은 즉시 확보.
- **Follow-ups:**
  - Phase 4 종료 후 retrospective.
  - i18n 필요해지면 별도 ADR (현재 scope out).
  - Resend Contact Form은 Phase 4 stretch — 별도 결정 필요.

### ADR-002 — App Router + Server Actions

- **Decision:** Next.js 16 App Router + Server Actions로 admin CRUD 구성. 별도 REST/tRPC API 없음. `src/proxy.ts` (Next.js 16 file convention) 사용.
- **Drivers:** 단일 개발자, 최소 보일러플레이트, 타입 안전.
- **Alternatives considered:**
  - Route Handlers (`/api/...`) — 더 명시적이나 보일러플레이트 증가.
  - `middleware.ts` (Next.js 15 이하) — Next.js 16에서 deprecated.
- **Why chosen:** Server Actions는 폼·CRUD에 자연스럽고 RSC와 통합됨. `unstable_cache` + `revalidateTag('works')`로 캐시 무효화 한 줄로 처리 (`cacheComponents` 활성화 없이). `src/proxy.ts`는 Next.js 16 권장 file convention.
- **Consequences:**
  - (+) 코드량 적음, (+) Next.js 16 정합성 확보.
  - (−) Server Action은 외부 클라이언트에서 호출 불가 → 추후 모바일 앱/외부 통합 생기면 REST 레이어 신설 필요.
  - (−) `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` 운영 책임(로테이션·백업) 추가.
- **Follow-ups:** 외부 통합 요구 시 ADR-XXX로 별도 검토. Encryption key 로테이션 SOP 작성.

### ADR-003 — RLS via `admins` 테이블 (not blanket `authenticated`)

- **Decision:** `for all to authenticated` 정책 대신 `exists (select 1 from public.admins where user_id = auth.uid())` 기반 정책 사용.
- **Drivers:** D1 운영 자율성과 보안의 균형. Supabase Auth signup이 OFF여도 향후 다른 인증 흐름이 추가될 때 안전.
- **Alternatives considered:**
  - `for all to authenticated using (true)` — Supabase에 로그인한 누구나 쓰기 가능 → 위험.
  - Custom JWT claim — 운영 복잡도 ↑.
- **Why chosen:** 가장 단순하면서 명시적. `admins` 테이블 row 추가/삭제만으로 권한 부여/회수.
- **Consequences:**
  - (+) 보안, (+) 다중 어드민 확장 자연스러움.
  - (−) 매 RLS 정책에 `exists` 서브쿼리 → 인덱스로 충분(테이블 크기 작음).
- **Follow-ups:** 다중 어드민 + 역할 분리 필요 시 `admins.role` 컬럼 추가.

---

## 11. RFP Compliance Checklist

| RFP 요구사항 | 본 PRD 반영 위치 |
|---|---|
| 브랜드 톤 Simple / Easy / Impact | §1.1 Principles, §3.5 디자인 토큰 |
| RGA / BBH 레퍼런스 톤 | §4.1 Home (절제된 모션), §4.2 Work (큰 썸네일) |
| 메뉴: Work / About us / Contact | §4.5 Header |
| Home: "We Activate Your Brand" 슬로건 큰 노출 | §4.1, AC-H1 |
| Home 스크롤: 영상릴 → Work → About → Contact | §4.1, AC-H2 |
| Work: PC/모바일 2컬럼 큰 썸네일 | §4.2, AC-W1 |
| Work 필터: IMC/런칭/Issue-up/Sales-up | §4.2, AC-W2 |
| Work 관리자: CRUD + 순서 + 카테고리 | §5, AC-AD1~8 |
| Work 기존 자료 마이그레이션 | §5.7, Phase 3.13 |
| About 5섹션 (철학/IEC/Full-service/History/Clients) | §4.3, AC-A1 |
| Strategy/Content/Campaign/Data | §4.3 Section 3, AC-A2 |
| 2016 창립, 김재광 CEO, 유하재 캠페인본부장 | §4.3 Section 4, AC-A3/A4 |
| Contact: 네이버/구글 지도 | §4.4, AC-C2 |
| Contact: oddin@dmate.kr 클릭 메일 | §4.4, AC-C1 |
| Stack: Next.js 16 + TS + Tailwind | §3.1, §3.6 |
| Supabase | §5 |
| Vercel | §3.1, §3.7, §6 Phase 1.10 |

---

## 12. 다음 단계

1. **Architect 재리뷰** — Rev 2 반영 결과 검증 (Next.js 16 API, RLS, 캐시).
2. **Critic 재리뷰** — 누락 보안 항목 / 운영 운영성 재챌린지.
3. **사용자 확정 게이트** — 통과 후 사용자에게 "proceed / adjust / restart" 확인.
4. **확정 시:** `/oh-my-claudecode:start-work dmate-homepage-prd` 핸드오프.

---

*문서 위치: `C:\Users\DMATE-PC27\Desktop\CLAUDE_PAGE\.omc\plans\dmate-homepage-prd.md`*
*Revision history: Rev 1 (initial) → Rev 2 (Architect+Critic ITERATE applied, 2026-05-22)*
