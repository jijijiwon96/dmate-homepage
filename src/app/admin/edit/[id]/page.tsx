import { notFound } from 'next/navigation';
import { getAllWorks } from '@/lib/data/works';
import { saveWork } from '../../actions';
import WorkForm from '../../WorkForm';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const works = await getAllWorks();
  const work = works.find((w) => w.id === id);
  if (!work) notFound();

  return (
    <div className="px-6 py-8 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2">캠페인 수정</p>
        <h1 className="text-2xl font-black text-white">{work.title}</h1>
        <p className="text-white/30 text-sm mt-1">{work.client} · {work.year}</p>
      </div>
      <WorkForm work={work} action={saveWork} />
    </div>
  );
}
