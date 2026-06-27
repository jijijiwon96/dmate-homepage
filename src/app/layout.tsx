import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'D-MATE | We Activate Your Brand',
    template: '%s | D-MATE',
  },
  description: 'D-MATE는 브랜드를 활성화시키는 광고대행사입니다. IMC, 런칭, 이슈업, 세일즈업 캠페인을 통해 브랜드 경험을 연결합니다.',
  keywords: ['광고대행사', 'D-MATE', '브랜드', '캠페인', 'IMC'],
  openGraph: {
    title: 'D-MATE | We Activate Your Brand',
    description: 'D-MATE는 브랜드를 활성화시키는 광고대행사입니다.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={noto.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
