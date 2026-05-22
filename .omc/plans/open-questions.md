# Open Questions

## dmate-homepage-prd — 2026-05-22

### Content & Assets
- [ ] **영상릴 자산 확정** — 디메이트 작업물 종합 영상의 길이/포맷/사이즈 — Phase 2 시작 전 필요. 부재 시 placeholder로 Phase 1 진행 가능하나, 최종 데드라인 명시 필요.
- [ ] **CEO/캠페인본부장 프로필 사진 및 바이오** — About §4 섹션 — Phase 1 시점 필요.
- [ ] **클라이언트 로고 자산** — About §5 섹션 — 사용 가능 권한 확인 필수. 일부 클라이언트는 로고 노출에 대한 별도 협의 필요할 수 있음.
- [ ] **D-MATE 공식 로고 SVG/벡터 파일** — Header/Footer/OG 이미지에 필요.
- [ ] **기존 캠페인 자료 위치/포맷** — `src/content/works.ts` 시드를 위해 기존 캠페인 메타데이터(타이틀/클라이언트/카테고리/연도/썸네일) 확보 방식 결정 필요.

### Design
- [ ] **컬러 팔레트 + 폰트 최종 결정** — §3.5에 초안만 있음. 디자이너 또는 디자인 콘솔테이션(`/design-consultation`) 필요한지 확인.
- [ ] **Work 디테일 페이지(`/work/[slug]`) 범위** — Phase 4 stretch로 분류. 필요 여부와 디테일 페이지의 콘텐츠 구조(영상+이미지+설명+다음 작품 추천 등) 확정 필요.
- [ ] **Hero 슬로건 stagger 애니메이션 / 영상 자동재생 톤** — RGA처럼 절제할지, BBH처럼 약간 더 활발하게 갈지 — 디자인 리뷰 단계 결정.

### Technical
- [ ] **Naver Maps API key 발급 주체 / 결제 계정** — Vercel env에 들어갈 키 소유자 확정 필요.
- [ ] **Resend Contact Form 도입 여부** — Phase 4 stretch — mailto만으로 충분한지, 폼이 필요한지 의사결정.
- [ ] **`/admin` 관리자 비밀번호 정책 및 복구 절차** — Phase 3 단일 슈퍼어드민 모델 OK인지, 복구는 Supabase 대시보드 수동으로 충분한지.
- [ ] **영상릴 호스팅 방식** — Vercel 정적 mp4 vs Mux/Cloudflare Stream — 영상 사이즈/품질 결정된 후 재논의.
- [ ] **도메인** — 사용할 최종 도메인(예: dmate.kr) 및 DNS 관리 주체 확인 — Phase 4 런칭 전 필요.

### Process
- [ ] **i18n(한/영 분리) 필요 여부** — 현재 PRD scope out. 추후 요구 발생 시 별도 ADR.
- [ ] **분석 도구** — Vercel Analytics만으로 충분한지, GA4 추가 필요한지.
- [ ] **SEO 콘텐츠** — 메타 디스크립션·OG 카피 작성 주체(개발 vs 마케팅).

## dmate-homepage-prd Rev 2 — 2026-05-22 (Architect/Critic ITERATE 반영 후 신규)

### Security & Ops
- [ ] **`NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` 로테이션 SOP** — 12개월 주기 명시는 했으나, 실제 로테이션 시 Vercel 배포 동기화 절차(blue-green / 동시 재배포) 누가 담당하는지 미정. Phase 4 인수인계 문서에 포함 필요.
- [ ] **추가 어드민 추가 절차** — `public.admins` 테이블 row 삽입을 누가, 어떤 채널로 요청·승인하는지 — 운영 정책 필요.
- [ ] **Sanity Studio fallback 트리거 기준** — ADR-001 escape hatch가 발동되는 정확한 조건(Phase 3 며칠 초과? 어떤 blocker?) — Phase 3 시작 시점에 명확히 결정.

### Performance & Asset Strategy
- [ ] **Pretendard Variable 정확한 weight 범위** — display weight + body weight 분리할지, 단일 variable axis로 충분한지 — 디자이너 확정 필요.
- [ ] **외부 영상 호스팅 선택** — Vimeo / YouTube / Cloudflare Stream 중 어느 것을 표준으로 할지 — 클라이언트 브랜드 가이드(YouTube embed 허용 여부 등) 확인 필요.
- [ ] **Storage 비용 임계치** — Supabase free 1GB 초과 시 Pro tier로 전환할지, 외부 CDN으로 마이그레이션할지 — 운영 의사결정 항목.

### Routing
- [ ] **Phase 2 라이트박스 vs Phase 4 [slug] 라우트 전환 시 SEO 영향** — Phase 2 라이트박스는 색인 불가. Phase 4 [slug]으로 승격 시 sitemap.xml 자동 갱신 + 기존 외부 링크 대응 — 마이그레이션 시점에 점검 필요.
- [ ] **`/work/[slug]` URL 슬러그 정책** — 한글 슬러그 허용 / 영문 강제 / 한영 동시 redirect 중 무엇? — Phase 4 디테일 페이지 설계 시 결정.

### Testing
- [ ] **`supabase/scripts/test-rls.ts` 실행 환경** — CI에서 자동 실행할지(Supabase dev project 별도 필요), 수동 검증으로 충분할지 — Phase 3 결정.
- [ ] **Naver Maps preview 도메인 화이트리스트 갱신 주기** — Vercel preview URL은 PR마다 새로 생성됨. `*.vercel.app` 와일드카드가 Naver Cloud Platform에서 실제로 허용되는지 1차 검증 필요(콘솔에서 와일드카드 미지원 시 대안 필요).
