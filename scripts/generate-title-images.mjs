import sharp from 'sharp';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public');

// 각 슬라이드 타이틀 정의
const titles = [
  {
    file: 'reel-title-dongsuh-hojicha.png',
    client: '동서티백',
    line1: '마음우린',
    line2: '호지차',
    width: 900,
    height: 320,
  },
  {
    file: 'reel-title-kb-rise-etf.png',
    client: 'KB자산운용',
    line1: 'RISE',
    line2: 'ETF',
    width: 700,
    height: 320,
  },
  {
    file: 'reel-title-dongsuh-teabag.png',
    client: '동서티백',
    line1: '동서티백',
    line2: '브랜딩 캠페인',
    width: 1000,
    height: 320,
  },
  {
    file: 'reel-title-post-oreo-oz.png',
    client: 'POST',
    line1: 'OREO O\'S',
    line2: 'TASTE FUN',
    width: 1000,
    height: 320,
  },
  {
    file: 'reel-title-tsingtao.png',
    client: 'Tsingtao',
    line1: '회식의',
    line2: '즐거움을 살려라',
    width: 1100,
    height: 320,
  },
];

function makeSvg({ client, line1, line2, width, height }) {
  const cx = width / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg"
    width="${width}" height="${height}"
    viewBox="0 0 ${width} ${height}">

    <!-- 투명 배경 -->

    <!-- client 라벨 -->
    <text
      x="${cx}" y="62"
      font-family="'Arial', 'Helvetica Neue', sans-serif"
      font-size="18"
      font-weight="400"
      fill="rgba(255,255,255,0.55)"
      text-anchor="middle"
      letter-spacing="8"
    >${client.toUpperCase()}</text>

    <!-- 구분선 -->
    <line
      x1="${cx - 30}" y1="82"
      x2="${cx + 30}" y2="82"
      stroke="rgba(255,255,255,0.3)"
      stroke-width="1"
    />

    <!-- 캠페인 line1 -->
    <text
      x="${cx}" y="178"
      font-family="'Arial Black', 'Arial', 'Helvetica Neue', sans-serif"
      font-size="108"
      font-weight="900"
      fill="white"
      text-anchor="middle"
      letter-spacing="-3"
    >${line1}</text>

    <!-- 캠페인 line2 -->
    <text
      x="${cx}" y="290"
      font-family="'Arial Black', 'Arial', 'Helvetica Neue', sans-serif"
      font-size="108"
      font-weight="900"
      fill="white"
      text-anchor="middle"
      letter-spacing="-3"
    >${line2}</text>
  </svg>`;
}

async function generate() {
  for (const t of titles) {
    const svg = makeSvg(t);
    const outPath = path.join(OUT_DIR, t.file);

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outPath);

    console.log(`✅  ${t.file}  (${t.width}×${t.height})`);
  }

  console.log('\n모든 타이틀 이미지 생성 완료!');
}

generate().catch(console.error);
