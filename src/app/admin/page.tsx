import Link from 'next/link';
import Image from 'next/image';
import { getAllWorks } from '@/lib/data/works';
import { togglePublished } from './actions';
import DeleteButton from './DeleteButton';

const CATEGORIES = ['ALL', 'IMC', '런칭', 'Issue-up', 'Sales-up'] as const;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const { cat, q } = await searchParams;
  const all = await getAllWorks();

  const filtered = all.filter((w) => {
    if (cat && cat !== 'ALL' && w.category !== cat) return false;
    if (q) {
      const lower = q.toLowerCase();
      return (
        w.title.toLowerCase().includes(lower) ||
        w.client.toLowerCase().includes(lower)
      );
    }
    return true;
  });

  const published = all.filter((w) => w.published).length;

  return (
    <div className="px-6 py-8 max-w-[1400px] mx-auto">
      {/* Stats */}
      <div className="flex items-center gap-8 mb-8">
        <div>
          <p className="text-3xl font-black text-white">{all.length}</p>
          <p className="text-xs text-white/30 mt-0.5">전체 캠페인</p>
        </div>
        <div>
          <p className="text-3xl font-black text-[#0B63AD]">{published}</p>
          <p className="text-xs text-white/30 mt-0.5">공개</p>
        </div>
        <div>
          <p className="text-3xl font-black text-white/30">{all.length - published}</p>
          <p className="text-xs text-white/30 mt-0.5">비공개</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/admin${c !== 'ALL' ? `?cat=${c}` : ''}`}
            className={`px-3 py-1.5 text-xs border transition-colors ${
              (cat === c) || (!cat && c === 'ALL')
                ? 'bg-[#0B63AD] border-[#0B63AD] text-white'
                : 'border-white/20 text-white/40 hover:text-white hover:border-white/40'
            }`}
          >
            {c}
          </Link>
        ))}
        <form method="get" action="/admin" className="ml-auto flex gap-2">
          {cat && <input type="hidden" name="cat" value={cat} />}
          <input
            name="q"
            defaultValue={q}
            placeholder="제목 또는 클라이언트 검색"
            className="bg-white/5 border border-white/10 text-white text-xs px-3 py-1.5 w-56 placeholder:text-white/20 focus:outline-none focus:border-white/30"
          />
          <button
            type="submit"
            className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 transition-colors"
          >
            검색
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="text-left px-4 py-3 text-white/30 text-xs font-medium w-16">썸네일</th>
              <th className="text-left px-4 py-3 text-white/30 text-xs font-medium">제목</th>
              <th className="text-left px-4 py-3 text-white/30 text-xs font-medium w-28">클라이언트</th>
              <th className="text-left px-4 py-3 text-white/30 text-xs font-medium w-24">카테고리</th>
              <th className="text-left px-4 py-3 text-white/30 text-xs font-medium w-16">연도</th>
              <th className="text-left px-4 py-3 text-white/30 text-xs font-medium w-16">순서</th>
              <th className="text-center px-4 py-3 text-white/30 text-xs font-medium w-20">공개</th>
              <th className="text-right px-4 py-3 text-white/30 text-xs font-medium w-28">액션</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((work, i) => (
              <tr
                key={work.id}
                className={`border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors ${
                  !work.published ? 'opacity-40' : ''
                }`}
              >
                <td className="px-4 py-2">
                  <div className="w-12 h-9 relative bg-white/5 overflow-hidden">
                    <Image
                      src={work.thumbnail_url}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-white text-[13px] leading-snug">{work.title}</p>
                  <p className="text-white/30 text-[10px] mt-0.5 font-mono">{work.slug}</p>
                </td>
                <td className="px-4 py-3 text-white/60 text-xs">{work.client}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] border border-white/20 px-2 py-0.5 text-white/40">
                    {work.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/40 text-xs">{work.year}</td>
                <td className="px-4 py-3 text-white/40 text-xs">{work.sort_order}</td>
                <td className="px-4 py-3 text-center">
                  <form
                    action={async () => {
                      'use server';
                      await togglePublished(work.id, work.published);
                    }}
                  >
                    <button
                      type="submit"
                      title={work.published ? '비공개로 전환' : '공개로 전환'}
                      className={`w-8 h-4 rounded-full transition-colors ${
                        work.published ? 'bg-[#0B63AD]' : 'bg-white/20'
                      }`}
                    >
                      <span
                        className={`block w-3 h-3 rounded-full bg-white transition-transform mx-0.5 ${
                          work.published ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/work/${work.slug}`}
                      target="_blank"
                      className="text-white/30 hover:text-white text-xs transition-colors"
                    >
                      보기
                    </Link>
                    <Link
                      href={`/admin/edit/${work.id}`}
                      className="text-[#0B63AD] hover:text-[#0B63AD]/70 text-xs transition-colors"
                    >
                      수정
                    </Link>
                    <DeleteButton id={work.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-white/20 text-sm">
            조건에 맞는 캠페인이 없습니다
          </div>
        )}
      </div>
      <p className="text-white/20 text-xs mt-4 text-right">{filtered.length}건 표시 중 (전체 {all.length}건)</p>
    </div>
  );
}
