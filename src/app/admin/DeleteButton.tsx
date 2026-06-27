'use client';

import { deleteWork } from './actions';

export default function DeleteButton({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await deleteWork(id);
        window.location.reload();
      }}
      className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
    >
      삭제
    </button>
  );
}
