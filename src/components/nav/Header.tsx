'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-stretch h-16 bg-black border-b border-white/10">
        {/* Logo box */}
        <Link
          href="/"
          className="flex items-center justify-center shrink-0 px-5 h-16"
        >
          <Image
            src="/%EB%94%94%EB%A9%94%EC%9D%B4%ED%8A%B8%20%EB%A1%9C%EA%B3%A0_%EC%B5%9C%EC%A2%85(CMYK)-02.jpg"
            alt="D-MATE"
            width={120}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/60 text-[0.875rem] font-medium tracking-[-0.01em] hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto flex items-center justify-center h-16 px-5 shrink-0"
          onClick={() => setMenuOpen(true)}
          aria-label="메뉴 열기"
        >
          <span className="flex flex-col gap-[5px]">
            <span className="block w-5 h-[1.5px] bg-white" />
            <span className="block w-5 h-[1.5px] bg-white" />
            <span className="block w-5 h-[1.5px] bg-white" />
          </span>
        </button>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-center px-10">
          <button
            className="absolute top-5 right-6 text-white text-3xl leading-none hover:opacity-50 transition-opacity"
            onClick={() => setMenuOpen(false)}
            aria-label="메뉴 닫기"
          >
            ✕
          </button>
          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-5xl uppercase tracking-tight hover:opacity-40 transition-opacity"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="absolute bottom-8 left-10 text-white/30 text-xs tracking-widest uppercase">
            D-MATE Communications
          </p>
        </div>
      )}
    </>
  );
}
