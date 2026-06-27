'use client';

import { useState } from 'react';

const EMAIL = 'oddin@dmate.kr';

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border border-white/20 px-4 py-2 text-white/50 hover:border-white/50 hover:text-white transition-colors"
      title="이메일 주소 복사"
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          복사됨!
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          주소 복사
        </>
      )}
    </button>
  );
}

export function EmailSendButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    // mailto: 먼저 시도
    const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent('[D-MATE] 프로젝트 문의')}`;
    window.location.href = mailtoLink;

    // 300ms 후에도 포커스가 남아있으면 (이메일 앱 없음) → 클립보드 복사 + 안내
    setTimeout(() => {
      if (document.hasFocus()) {
        navigator.clipboard.writeText(EMAIL).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-3 bg-[#0B63AD] text-white text-[11px] tracking-[0.25em] uppercase font-semibold px-8 py-4 hover:bg-[#0a5699] transition-colors self-start md:self-auto shrink-0 relative"
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="9" width="13" height="13" rx="2" stroke="white" strokeWidth="1.5"/>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="white" strokeWidth="1.5"/>
          </svg>
          주소가 복사되었습니다
        </>
      ) : (
        <>
          이메일 보내기
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
            <path d="M0 5h18M13 1l5 4-5 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </>
      )}
    </button>
  );
}
