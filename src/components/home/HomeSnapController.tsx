'use client';

import { useEffect } from 'react';

/**
 * 마우스 휠 4번 내리면 Work 섹션으로 슉 스냅.
 * 위로 돌아오면 카운터 리셋 → 반복 동작.
 */
export default function HomeSnapController() {
  useEffect(() => {
    let wheelPulses = 0;
    let hasSnapped = false;
    let isAnimating = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const snapToWork = () => {
      const workEl = document.getElementById('work');
      if (!workEl) return;
      isAnimating = true;
      hasSnapped = true;
      workEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { isAnimating = false; }, 800);
    };

    const handleWheel = (e: WheelEvent) => {
      // 히어로 영역(뷰포트 높이 이내)에서만 카운트
      if (window.scrollY > window.innerHeight) return;
      if (isAnimating) return;

      if (e.deltaY > 0) {
        // 마우스 휠 한 노치 ≈ deltaY 100. 트랙패드 미세 스크롤은 무시
        if (e.deltaY >= 50) wheelPulses++;
        // 또는 픽셀 누적으로도 트리거 (트랙패드 대응)
        if (!hasSnapped && wheelPulses >= 4) {
          snapToWork();
          wheelPulses = 0;
        }
      } else if (e.deltaY < 0) {
        wheelPulses = 0;
      }

      // 잠시 휠 멈추면 카운터 리셋 (연속 스크롤 오작동 방지)
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { wheelPulses = 0; }, 600);
    };

    // 위로 올라오면 스냅 리셋
    const handleScroll = () => {
      if (hasSnapped && window.scrollY < 40) {
        hasSnapped = false;
        wheelPulses = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return null;
}
