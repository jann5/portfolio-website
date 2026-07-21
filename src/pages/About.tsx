import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
  // Safe window height check for SSR
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
    updateVh(); // Set on mount
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  const { scrollY } = useScroll();

  // Scroll mapping: 
  // As the user scrolls from 0 to 100vh (the Hero height), 
  // the text precisely fades in and slides up. We stagger the start/end points.

  // Section 1: Context Label
  const y1 = useTransform(scrollY, [0, vh * 0.4], [80, 0]);
  const opacity1 = useTransform(scrollY, [0, vh * 0.3], [0, 1]);

  // Section 2: Education
  const y2 = useTransform(scrollY, [vh * 0.1, vh * 0.5], [80, 0]);
  const opacity2 = useTransform(scrollY, [vh * 0.1, vh * 0.4], [0, 1]);

  // Section 3: Experience
  const y3 = useTransform(scrollY, [vh * 0.2, vh * 0.6], [80, 0]);
  const opacity3 = useTransform(scrollY, [vh * 0.2, vh * 0.5], [0, 1]);

  // Section 4: Focus
  const y4 = useTransform(scrollY, [vh * 0.3, vh * 0.7], [80, 0]);
  const opacity4 = useTransform(scrollY, [vh * 0.3, vh * 0.6], [0, 1]);

  return (
    <section className="min-h-screen w-full bg-white text-black font-sans px-6 pt-28 pb-16 md:h-screen md:px-12 md:py-0 lg:px-16 overflow-visible md:overflow-hidden flex items-start md:items-center justify-center relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 w-full max-w-[1600px] mx-auto">

        {/* Left Column: Context Label */}
        <motion.div
          className="md:col-span-3 lg:col-span-3 pt-2"
          style={{ y: y1, opacity: opacity1 }}
        >
          <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest">
            Podejście
          </h2>
        </motion.div>

        {/* Right Column: The Data List */}
        <div className="md:col-span-9 lg:col-span-9 flex flex-col gap-10 md:gap-12">

          {/* 01. APPROACH */}
          <motion.div style={{ y: y2, opacity: opacity2 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              01. Jak pracuję
            </h3>
            <div className="flex flex-col">
              <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Od idei do dopracowanego doświadczenia
              </p>
              <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                Zaczynam od celu i struktury, a później łączę interfejs, technologię i detale w spójną całość.
              </p>
            </div>
          </motion.div>

          {/* 02. EXPERIENCE */}
          <motion.div style={{ y: y3, opacity: opacity3 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              02. Co buduję
            </h3>

            <div className="flex flex-col gap-6">
              {/* Project 1 */}
              <div>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Strony i doświadczenia webowe
                </p>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Czytelne interfejsy, mocna typografia i ruch, który wspiera treść.
                </p>
              </div>

              {/* Project 2 */}
              <div>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Aplikacje webowe
                </p>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Systemy z logiką, danymi, kontami użytkowników i panelem klienta.
                </p>
              </div>

              {/* Project 3 */}
              <div>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                  Interakcje w przeglądarce
                </p>
                <p className="font-sans text-xl md:text-2xl lg:text-3xl font-normal text-black/70 leading-tight tracking-tight">
                  Canvas, obsługa kamery, animacje i eksperymenty z nowymi sposobami interakcji.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 03. FOCUS */}
          <motion.div style={{ y: y4, opacity: opacity4 }} className="flex flex-col gap-2">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1">
              03. Kierunek
            </h3>
            <ul className="flex flex-col">
              <li className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Frontend, backend i architektura aplikacji webowych
              </li>
              <li className="font-sans text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
                Interakcje w przeglądarce, AI i wizja komputerowa
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
