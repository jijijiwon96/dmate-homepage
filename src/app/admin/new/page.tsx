import { createWork } from '../actions';
import WorkForm from '../WorkForm';

export default function NewWorkPage() {
  return (
    <div className="px-6 py-8 max-w-[1400px] mx-auto">
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2">새 캠페인 추가</p>
        <h1 className="text-2xl font-black text-white">캠페인 생성</h1>
      </div>
      <WorkForm action={createWork} isNew />
    </div>
  );
}
