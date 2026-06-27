'use client';

import { motion } from 'framer-motion';

const ease = [0.76, 0, 0.24, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid lines (subtle) */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main headline */}
      <div className="relative z-10 text-center px-6 w-full max-w-[1440px] mx-auto">
        <motion.h1
          className="font-black text-white uppercase leading-[0.88] tracking-[-0.02em]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(4rem, 13vw, 14rem)',
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          <span className="block">We Activate</span>
          <span className="block">Your Brand</span>
        </motion.h1>

        <motion.p
          className="mt-8 text-white/40 text-[11px] md:text-xs tracking-[0.35em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          Integrated Experience Connecting Agency
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-white/20 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
