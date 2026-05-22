import Hero from '@/components/home/Hero';
import Reel from '@/components/home/Reel';
import WorkPreview from '@/components/home/WorkPreview';
import AboutPreview from '@/components/home/AboutPreview';
import ContactPreview from '@/components/home/ContactPreview';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reel />
      <WorkPreview />
      <AboutPreview />
      <ContactPreview />
    </>
  );
}
