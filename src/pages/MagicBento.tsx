import React, { useEffect, useRef, useState } from "react";

const MagicBento = () => {
  return (
    <section className="w-full bg-black text-white py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className="mb-24">
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em]">
            Kilka Liczb O Mnie
          </h2>
        </div>

        {/* Strict Swiss Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-40">

          <SwissItem
            value={20}
            suffix="+"
            label="WDROŻENIA WEB"
            description="Od prostych landing page'y po zaawansowane aplikacje – kompleksowa realizacja od makiety po finalny deploy."
          />

          <SwissItem
            value={2}
            suffix="+"
            label="lata Doświadczenia"
            description="Tworzenie interfejsów, które nie tylko dobrze wyglądają, ale są intuicyjne i zaprojektowane pod kątem doświadczeń użytkownika (UX)."
          />

          <SwissItem
            value={95}
            suffix="%"
            label="WYDAJNOŚĆ (SEO)"
            description="Optymalizacja pod kątem Core Web Vitals – gwarancja błyskawicznego ładowania i lepszych pozycji w wyszukiwarce Google."
          />

          <SwissItem
            value={12}
            suffix="+"
            label="NARZĘDZIA (STACK)"
            description="Biegłość w React, Next.js, Tailwind, TypeScript i innych nowoczesnych standardach webowych."
          />

        </div>
      </div>
    </section>
  );
};

const SwissItem = ({ value, suffix, label, description }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.4 } // Swiss: intentional visibility
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animate = () => {
    const duration = 1200;
    const startTime = performance.now();

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div ref={ref} className="flex flex-col items-start">

      {/* Label */}
      <span className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white">
        {label}
      </span>

      {/* Number */}
      <h3 className="mb-6 font-sans text-8xl md:text-9xl font-bold tracking-tight leading-none">
        {count.toLocaleString()}
        {suffix}
      </h3>

      {/* Description */}
      <p className="max-w-sm font-sans text-base leading-6 text-white/65">
        {description}
      </p>
    </div>
  );
};

export default MagicBento;
