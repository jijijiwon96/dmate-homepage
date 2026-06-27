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

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Title section */}
      <div className="px-6 md:px-12 lg:px-24 pt-12 md:pt-16 pb-10 md:pb-14 max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="text-[15px] text-white/55 tracking-wider">{work.year}</span>
          <span className="text-white/35">·</span>
          <span className="text-[15px] text-white/55">{work.client}</span>
          <span className="text-white/35">·</span>
          <span className="text-[11px] tracking-wider uppercase px-2.5 py-1 font-medium bg-[#0B63AD] text-white">
            {work.category}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
          {work.title}
        </h1>
        {work.description && (
          <p className="mt-5 text-base md:text-lg text-white/65 max-w-2xl leading-relaxed">
            {work.description}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mx-6 md:mx-12 lg:mx-24" />

      {/* Content sections */}
      {(work.background || work.whats_new || work.result) && (
        <div className="px-6 md:px-12 lg:px-24 py-12 md:py-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {work.background && (
              <section>
                <h2 className="text-[12px] tracking-[0.15em] uppercase text-white/55 mb-4 font-medium">
                  Background
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-white/80">
                  {work.background}
                </p>
              </section>
            )}
            {work.whats_new && (
              <section>
                <h2 className="text-[12px] tracking-[0.15em] uppercase text-white/55 mb-4 font-medium">
                  What&apos;s New
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-white/80">
                  {work.whats_new}
                </p>
              </section>
            )}
            {work.result && (
              <section>
                <h2 className="text-[12px] tracking-[0.15em] uppercase text-white/55 mb-4 font-medium">
                  Result
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-white/80">
                  {work.result}
                </p>
              </section>
            )}
          </div>
        </div>
      )}

      {/* YouTube video */}
      {work.video_url && (() => {
        const url = new URL(work.video_url);
        const videoId = url.searchParams.get('v');
        if (!videoId) return null;
        const rawStart = url.searchParams.get('start') ?? url.searchParams.get('t');
        const start = rawStart ? parseInt(rawStart, 10) : 0;
        const embedSrc = `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ''}`;
        return (
          <>
            <div className="border-t border-white/10 mx-6 md:mx-12 lg:mx-24" />
            <div className="px-6 md:px-12 lg:px-24 py-12 md:py-16 max-w-[1440px] mx-auto">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={embedSrc}
                  title={work.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </>
        );
      })()}

      {/* Detail images gallery */}
      {work.detail_images && work.detail_images.length > 0 && (
        <>
          <div className="border-t border-white/10 mx-6 md:mx-12 lg:mx-24" />
          <div className="px-6 md:px-12 lg:px-24 py-12 md:py-16 max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {work.detail_images.map((src, index) => (
                <div key={index} className="relative w-full overflow-hidden bg-[#111]">
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
      <div className="border-t border-white/10">
        <div className="px-6 md:px-12 lg:px-24 py-10 max-w-[1440px] mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[15px] tracking-wider uppercase text-white/55 hover:text-white transition-colors duration-200"
          >
            <span className="text-base">&#8592;</span>
            Back to Work
          </Link>
        </div>
      </div>
    </main>
  );
}
