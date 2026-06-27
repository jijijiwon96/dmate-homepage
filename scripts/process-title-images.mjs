/**
 * process-title-images.mjs  (v4)
 *
 * 전 슬라이드 가로(horizontal) 배치 통일
 *   - 브랜드 로고: 왼쪽 (fit inside 160×130)
 *   - 캠페인 로고/텍스트: 오른쪽 (fit inside 480×260)
 *   - 캔버스 높이: 260px 고정 (세로 중앙 정렬)
 *   - 동서티백: 별도 캠페인 로고 없음 → 동서 로고 캔버스 중앙 배치
 *
 * 실제 출력 치수 (CANVAS_H=260):
 *   호지차    618×260
 *   KB RISE  472×260  (KB자산운용 신규 로고 200×200, RISE ETF 220×90)
 *   동서티백  530×260
 *   오레오오즈 472×260
 *   Tsingtao  472×260
 *
 * 실행: node scripts/process-title-images.mjs
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '..', 'public', 'home logo');
const OUT = path.join(__dirname, '..', 'public');

// ─── 배경 제거 ──────────────────────────────────────────────────────────────

/** [컬러 로고] Edge flood-fill: 로고 내부 흰색 보존
 *  input: 파일 경로(string) 또는 Buffer 모두 지원 */
async function floodFillBg(input, threshold = 230) {
  const { data, info } = await sharp(input)
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const buf = Buffer.from(data);
  const { width, height } = info;
  const n = width * height;
  const isW = (p) => { const i=p<<2; return buf[i]>=threshold&&buf[i+1]>=threshold&&buf[i+2]>=threshold; };
  const vis = new Uint8Array(n), q = new Int32Array(n);
  let qH=0, qT=0;
  const enq = (p) => { if(p>=0&&p<n&&!vis[p]&&isW(p)){vis[p]=1;q[qT++]=p;} };
  for(let x=0;x<width;x++){enq(x);enq((height-1)*width+x);}
  for(let y=1;y<height-1;y++){enq(y*width);enq(y*width+(width-1));}
  while(qH<qT){const p=q[qH++],x=p%width,y=(p/width)|0;
    if(y>0)enq(p-width); if(y<height-1)enq(p+width); if(x>0)enq(p-1); if(x<width-1)enq(p+1);}
  for(let p=0;p<n;p++) if(vis[p]) buf[(p<<2)+3]=0;
  // .trim(): 투명 테두리 제거 → 실제 로고 콘텐츠만 타이트하게 크롭
  return sharp(buf,{raw:{width,height,channels:4}}).trim().png();
}

/** [검정 텍스트] Global threshold → 반전
 *  input: 파일 경로(string) 또는 Buffer 모두 지원 */
async function globalThresholdInvert(input, threshold = 230) {
  const { data, info } = await sharp(input)
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const buf = Buffer.from(data);
  const { width, height } = info;
  for(let i=0;i<buf.length;i+=4){
    const r=buf[i],g=buf[i+1],b=buf[i+2];
    if(r>=threshold&&g>=threshold&&b>=threshold){buf[i+3]=0;}
    else{buf[i]=255-r;buf[i+1]=255-g;buf[i+2]=255-b;}
  }
  // .trim(): 투명 테두리 제거 → 실제 텍스트 콘텐츠만 타이트하게 크롭
  return sharp(buf,{raw:{width,height,channels:4}}).trim().png();
}

// ─── 합성 헬퍼 ──────────────────────────────────────────────────────────────

/**
 * 가로 배치 + 캔버스 높이 고정
 * items: [{img, w?, h?}]  w or h for fit-inside resize
 * canvasH: 최소 캔버스 높이 (부족한 요소는 세로 중앙 정렬)
 */
async function horizontal(items, canvasH = 260, gap = 52) {
  const bufs = [];
  for (const { img, w, h } of items) {
    const resized = await img
      .resize(w || null, h || null, { fit: 'inside', kernel: 'lanczos3' })
      .toBuffer();
    const meta = await sharp(resized).metadata();
    bufs.push({ buf: resized, w: meta.width, h: meta.height });
  }

  const finalH = Math.max(canvasH, ...bufs.map(b => b.h));
  const totalW = bufs.reduce((s, b, i) => s + b.w + (i > 0 ? gap : 0), 0);

  const composites = [];
  let x = 0;
  for (const b of bufs) {
    composites.push({ input: b.buf, left: x, top: Math.floor((finalH - b.h) / 2) });
    x += b.w + gap;
  }

  return sharp({
    create: { width: totalW, height: finalH, channels: 4, background: { r:0,g:0,b:0,alpha:0 } },
  }).composite(composites).png();
}

/**
 * 이미지를 투명 캔버스 중앙 배치 (동서티백 전용)
 */
async function centerOn(img, canvasW, canvasH) {
  const fitted = await img
    .resize(canvasW, canvasH, { fit: 'inside', kernel: 'lanczos3' })
    .toBuffer();
  const meta = await sharp(fitted).metadata();
  const pL = Math.floor((canvasW - meta.width) / 2);
  const pT = Math.floor((canvasH - meta.height) / 2);
  return sharp(fitted)
    .extend({ left: pL, right: canvasW - meta.width - pL,
              top: pT, bottom: canvasH - meta.height - pT,
              background: { r:0, g:0, b:0, alpha:0 } })
    .png();
}

// 치수 확인
async function dim(fp) {
  const m = await sharp(fp).metadata();
  return `${m.width}×${m.height}`;
}

// ─── 메인 ───────────────────────────────────────────────────────────────────

const CANVAS_H = 260;   // 캔버스 고정 높이
const BRAND_W  = 160;   // 브랜드 배지 최대 너비
const BRAND_H  = 130;   // 브랜드 배지 최대 높이
const CAMP_W   = 480;   // 캠페인 요소 최대 너비
const CAMP_H   = 260;   // 캠페인 요소 최대 높이

async function run() {
  console.log('🎨 v4 — 전 슬라이드 가로 배치\n');

  // ── 1. 동서티백 호지차 런칭 ────────────────────────────────────────────
  // 왼쪽: 동서 브랜드 배지 (유지)
  // 오른쪽: 캠페인 로고에서 상단 동서 마크(~145px) 크롭 제거 → 마음우린 호지차만
  {
    const out = path.join(OUT, 'reel-title-dongsuh-hojicha.png');
    // 640×400 원본에서 상단 145px 제거 → 640×255 (마음우린 호지차 텍스트만)
    const hojichaCropped = await sharp(path.join(SRC, '캠페인로고_마음우린 호지차 로고.png'))
      .extract({ left: 0, top: 145, width: 640, height: 255 })
      .toBuffer();
    await (await horizontal([
      { img: await floodFillBg(path.join(SRC, '브랜드_동서로고.jpg')),
        w: BRAND_W, h: BRAND_H },                           // 동서 브랜드 배지 (왼쪽 유지)
      { img: await floodFillBg(hojichaCropped),             // 동서 마크 없는 마음우린 호지차
        w: CAMP_W, h: CAMP_H },
    ], CANVAS_H)).toFile(out);
    console.log('1/5 ✅ 호지차          ', await dim(out));
  }

  // ── 2. KB자산운용 RISE ETF ────────────────────────────────────────────
  // 왼쪽: KB 자산운용 신규 로고 (세로형, public/KB자산운용.png)
  // 오른쪽: Rise ETF 워드마크 — 320→220px으로 추가 축소
  {
    const out = path.join(OUT, 'reel-title-kb-rise-etf.png');
    await (await horizontal([
      { img: await floodFillBg(path.join(OUT, 'KB자산운용.png')),
        w: 200, h: 200 },                                   // 신규 세로형 KB 로고 (659×483 → fit 200×200)
      { img: await globalThresholdInvert(path.join(SRC, '캠페인_rise etf.jpg')),
        w: 220, h: 90 },                                    // 480→320→220, 소형화
    ], CANVAS_H)).toFile(out);
    console.log('2/5 ✅ KB RISE ETF    ', await dim(out));
  }

  // ── 3. 동서티백 브랜딩 캠페인 ────────────────────────────────────────
  // 별도 캠페인 로고 없음 → 동서 로고 단독, 530×260 캔버스 중앙 배치
  {
    const out = path.join(OUT, 'reel-title-dongsuh-teabag.png');
    await (await centerOn(
      await floodFillBg(path.join(SRC, '브랜드_동서로고.jpg')),
      530, CANVAS_H
    )).toFile(out);
    console.log('3/5 ✅ 동서티백        ', await dim(out));
  }

  // ── 4. POST 오레오오즈 ────────────────────────────────────────────────
  // 왼쪽: Post 브랜드 로고  /  오른쪽: 오레오오즈 캠페인 로고
  {
    const out = path.join(OUT, 'reel-title-post-oreo-oz.png');
    await (await horizontal([
      { img: await floodFillBg(path.join(SRC, '브랜드_포스트 로고.png')),
        w: BRAND_W, h: BRAND_H },
      { img: await floodFillBg(path.join(SRC, '캠페인_오레오오즈 로고.png')),
        w: CAMP_H, h: CAMP_H },   // 오레오오즈는 정사각 → 높이 기준으로 260×260
    ], CANVAS_H)).toFile(out);
    console.log('4/5 ✅ POST 오레오오즈 ', await dim(out));
  }

  // ── 5. Tsingtao 회식의 즐거움을 살려라 ───────────────────────────────
  // 왼쪽: Tsingtao 브랜드 로고  /  오른쪽: 캘리그래피 텍스트 (흰색 반전)
  {
    const out = path.join(OUT, 'reel-title-tsingtao.png');
    await (await horizontal([
      { img: await floodFillBg(path.join(SRC, '브랜드_칭따오 로고.png')),
        w: BRAND_W, h: CAMP_H },  // 칭따오 로고는 세로형 → 높이 기준 260px
      { img: await globalThresholdInvert(path.join(SRC, '칭따오 캠페인.png')),
        w: CAMP_H, h: CAMP_H },   // 캘리그래피 정사각 → 260×260
    ], CANVAS_H)).toFile(out);
    console.log('5/5 ✅ Tsingtao        ', await dim(out));
  }

  console.log('\n📐 화면 표시 크기 확인 (1440×900 기준):');
  const files = [
    'reel-title-dongsuh-hojicha.png',
    'reel-title-kb-rise-etf.png',
    'reel-title-dongsuh-teabag.png',
    'reel-title-post-oreo-oz.png',
    'reel-title-tsingtao.png',
  ];
  for (const f of files) {
    const fp = path.join(OUT, f);
    const m = await sharp(fp).metadata();
    const scale = Math.min(864/m.width, 270/m.height, 1);
    console.log(`  ${f.replace('reel-title-','').replace('.png','').padEnd(22)} ${m.width}×${m.height} → ${Math.round(m.width*scale)}×${Math.round(m.height*scale)}`);
  }
  console.log('\n🎉 완료!\n');
}

run().catch(err => { console.error('❌', err.message); process.exit(1); });
