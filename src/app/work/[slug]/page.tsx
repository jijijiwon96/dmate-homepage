import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getWorkBySlug, getWorks } from '@/lib/data/works';

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) return {};
  return {
    title: `${work.title} — D-MATE`,
    description: work.description,
  };
}

const categoryColors: Record<string, string> = {
  IMC: 'bg-black text-white',
  런칭: 'bg-black text-white',
  'Issue-up': 'bg-black text-white',
  'Sales-up': 'bg-black text-white',
};

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) notFound();

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero image */}
      <div className="relative w-full" style={{ aspectRatio: '21/9' }}>
        <Image
          src={work.thumbnail_url}
          alt={work.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Title section */}
      <div className="px-6 md:px-12 lg:px-24 pt-12 md:pt-16 pb-10 md:pb-14 max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="text-sm text-[#6b6b6b] tracking-wider">{work.year}</span>
          <span className="text-[#e5e5e5]">·</span>
          <span className="text-sm text-[#6b6b6b]">{work.client}</span>
          <span className="text-[#e5e5e5]">·</span>
          <span
            className={`text-[11px] tracking-wider uppercase px-2.5 py-1 font-medium ${categoryColors[work.category] ?? 'bg-black text-white'}`}
          >
            {work.category}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          {work.title}
        </h1>
        {work.description && (
          <p className="mt-5 text-base md:text-lg text-[#6b6b6b] max-w-2xl leading-relaxed">
            {work.description}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[#e5e5e5] mx-6 md:mx-12 lg:mx-24" />

      {/* Content sections */}
      {(work.background || work.whats_new || work.result) && (
        <div className="px-6 md:px-12 lg:px-24 py-12 md:py-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {work.background && (
              <section>
                <h2 className="text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-4 font-medium">
                  Background
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[#1a1a1a]">
                  {work.background}
                </p>
              </section>
            )}
            {work.whats_new && (
              <section>
                <h2 className="text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-4 font-medium">
                  What&apos;s New
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[#1a1a1a]">
                  {work.whats_new}
                </p>
              </section>
            )}
            {work.result && (
              <section>
                <h2 className="text-[11px] tracking-[0.15em] uppercase text-[#6b6b6b] mb-4 font-medium">
                  Result
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[#1a1a1a]">
                  {work.result}
                </p>
              </section>
            )}
          </div>
        </div>
      )}

      {/* Detail images gallery */}
      {work.detail_images && work.detail_images.length > 0 && (
        <>
          <div className="border-t border-[#e5e5e5] mx-6 md:mx-12 lg:mx-24" />
          <div className="px-6 md:px-12 lg:px-24 py-12 md:py-16 max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {work.detail_images.map((src, index) => (
                <div key={index} className="relative w-full overflow-hidden bg-[#f5f5f5]">
                  <Image
                    src={src}
                    alt={`${work.title} — ${index + 1}`}
                    width={1440}
                    height={810}
                    className="w-full h-auto object-cover"
                    sizes="(min-width: 1440px) 1440px, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Back link */}
      <div className="border-t border-[#e5e5e5]">
        <div className="px-6 md:px-12 lg:px-24 py-10 max-w-[1440px] mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-[#6b6b6b] hover:text-black transition-colors duration-200"
          >
            <span className="text-base">&#8592;</span>
            Back to Work
          </Link>
        </div>
      </div>
    </main>
  );
}
