import HeroSlideshow from '@/components/home/HeroSlideshow';
import WorkPreview from '@/components/home/WorkPreview';
import AboutPreview from '@/components/home/AboutPreview';
import ContactPreview from '@/components/home/ContactPreview';
import HomeSnapController from '@/components/home/HomeSnapController';

export default function HomePage() {
  return (
    <>
      {/* 홈 페이지 전용 스크롤 스냅 활성화 (proximity — 살짝 내리면 Work로 슉) */}
      <HomeSnapController />

      <HeroSlideshow />
      <WorkPreview />
      <AboutPreview />
      <ContactPreview />
    </>
  );
}
