'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Props {
  id: string;
  name: string;
  category?: string;
  logo_url?: string;
}

export default function ClientCard({ name, category, logo_url }: Props) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <Link
      href={`/work?brand=${encodeURIComponent(name)}`}
      className="group border border-white/10 -mt-px -ml-px flex flex-col items-center justify-center p-5 min-h-[88px] hover:bg-white transition-colors duration-200"
    >
      {logo_url && !logoFailed ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={logo_url}
          alt={name}
          onError={() => setLogoFailed(true)}
          className="w-9 h-9 object-contain mb-2.5 opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
        />
      ) : null}
      <span className="text-[11px] font-semibold text-white/60 group-hover:text-black transition-colors text-center leading-tight">
        {name}
      </span>
      {category && (
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/45 group-hover:text-black/40 transition-colors mt-1.5">
          {category}
        </span>
      )}
    </Link>
  );
}
