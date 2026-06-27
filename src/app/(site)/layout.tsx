import Header from '@/components/nav/Header';
import Footer from '@/components/nav/Footer';
import ScrollToTop from '@/components/nav/ScrollToTop';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
