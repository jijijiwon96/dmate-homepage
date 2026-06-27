import { Suspense } from 'react';
import { getWorks } from '@/lib/data/works';
import WorkPageClient from '@/components/work/WorkPageClient';

export const metadata = {
  title: 'Work',
  description: 'D-MATE의 캠페인 포트폴리오입니다.',
};

export default async function WorkPage() {
  const works = await getWorks();
  return (
    <Suspense>
      <WorkPageClient works={works} />
    </Suspense>
  );
}
