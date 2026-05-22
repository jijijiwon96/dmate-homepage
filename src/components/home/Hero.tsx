export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Main slogan */}
      <div className="text-center px-6 z-10">
        <h1
          className="font-bold leading-[1.0] tracking-tight text-[#0a0a0a]"
          style={{ fontSize: 'clamp(2.8rem, 10vw, 9rem)' }}
        >
          <span className="block">We Activate</span>
          <span className="block">Your Brand</span>
        </h1>
        <p className="mt-8 text-[#6b6b6b] text-sm md:text-base tracking-[0.3em] uppercase">
          Integrated Experience Connecting Agency
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[#6b6b6b] text-xs tracking-widest uppercase">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0v20M1 13l7 7 7-7" stroke="#6b6b6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
