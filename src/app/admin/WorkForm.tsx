'use client';

import type { Work, Category } from '@/lib/types';

const CATEGORIES: Category[] = ['IMC', '런칭', 'Issue-up', 'Sales-up'];

interface Props {
  work?: Partial<Work>;
  action: (data: FormData) => Promise<void>;
  isNew?: boolean;
}

export default function WorkForm({ work, action, isNew }: Props) {
  return (
    <form action={action} className="space-y-8 max-w-3xl">
      {work?.id && <input type="hidden" name="id" value={work.id} />}
      {work?.created_at && <input type="hidden" name="created_at" value={work.created_at} />}

      {/* Basic Info */}
      <section className="border border-white/10 p-6 space-y-5">
        <h2 className="text-xs tracking-[0.3em] uppercase text-white/30">기본 정보</h2>

        <div className="grid grid-cols-2 gap-4">
          <Field label="제목 *" name="title" defaultValue={work?.title} required />
          <Field label="클라이언트 *" name="client" defaultValue={work?.client} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="슬러그 (URL) *" name="slug" defaultValue={work?.slug} required
            placeholder="hyundai-avante-2024" />
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">
              카테고리 *
            </label>
            <select
              name="category"
              defaultValue={work?.category ?? 'IMC'}
              required
              className="w-full bg-[#0d0d0d] border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-white/30"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="연도 *" name="year" type="number" defaultValue={work?.year ?? new Date().getFullYear()} required />
          <Field label="정렬 순서" name="sort_order" type="number" defaultValue={work?.sort_order ?? 0} />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">공개 여부</label>
          <select
            name="published"
            defaultValue={work?.published === false ? 'false' : 'true'}
            className="w-full bg-[#0d0d0d] border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-white/30"
          >
            <option value="true">공개</option>
            <option value="false">비공개</option>
          </select>
        </div>
      </section>

      {/* Media */}
      <section className="border border-white/10 p-6 space-y-5">
        <h2 className="text-xs tracking-[0.3em] uppercase text-white/30">미디어</h2>
        <Field label="썸네일 URL *" name="thumbnail_url" defaultValue={work?.thumbnail_url} required
          placeholder="https://..." />
        <Field label="비디오 URL" name="video_url" defaultValue={work?.video_url} placeholder="https://..." />
        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">
            상세 이미지 URL (줄바꿈으로 구분)
          </label>
          <textarea
            name="detail_images"
            defaultValue={work?.detail_images?.join('\n')}
            rows={4}
            placeholder={'https://...\nhttps://...'}
            className="w-full bg-[#0d0d0d] border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-white/30 resize-y font-mono"
          />
        </div>
      </section>

      {/* Content */}
      <section className="border border-white/10 p-6 space-y-5">
        <h2 className="text-xs tracking-[0.3em] uppercase text-white/30">캠페인 내용</h2>
        <TextArea label="한 줄 설명" name="description" defaultValue={work?.description} rows={2} />
        <TextArea label="배경 (Background)" name="background" defaultValue={work?.background} rows={4} />
        <TextArea label="차별점 (What's New)" name="whats_new" defaultValue={work?.whats_new} rows={4} />
        <TextArea label="결과 (Result)" name="result" defaultValue={work?.result} rows={4} />
      </section>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="bg-[#0B63AD] hover:bg-[#0B63AD]/80 text-white text-sm px-8 py-3 transition-colors font-medium"
        >
          {isNew ? '캠페인 생성' : '변경사항 저장'}
        </button>
        <a href="/admin" className="text-white/30 hover:text-white text-sm transition-colors">
          취소
        </a>
      </div>
    </form>
  );
}

function Field({
  label, name, type = 'text', defaultValue, required, placeholder,
}: {
  label: string; name: string; type?: string;
  defaultValue?: string | number; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue as string}
        required={required}
        placeholder={placeholder}
        className="w-full bg-[#0d0d0d] border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-white/30 placeholder:text-white/15"
      />
    </div>
  );
}

function TextArea({
  label, name, defaultValue, rows = 3,
}: {
  label: string; name: string; defaultValue?: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="w-full bg-[#0d0d0d] border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-white/30 resize-y"
      />
    </div>
  );
}
