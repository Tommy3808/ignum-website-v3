import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Lock, TrendingUp, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TokenSectionProps {
  className?: string;
}

const TokenSection = ({ className = '' }: TokenSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      scrollTl.fromTo(
        headingRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        cardsRef.current?.children || [],
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, ease: 'power2.out' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.3
      );

      scrollTl.fromTo(
        headingRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        cardsRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.80
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section-pinned bg-ignum-black ${className}`}
    >
      <div className="section-inner flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 max-w-7xl mx-auto w-full">

        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-copper mb-4">
            Real-World Asset · Base L2
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-6">
            <span className="text-gradient-copper">$IGNUM</span> Token.<br />
            Energía soberana.<br />
            On-chain.
          </h2>
          <p className="font-body text-base md:text-lg text-ignum-gray leading-relaxed max-w-xl">
            El primer RWA que tokeniza capacidad energética y cómputo soberano en Latinoamérica.
            Cada token representa infraestructura real — energía, GPU, territorio — no promesas.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-px bg-ignum-offwhite/10 mb-10 border border-ignum-offwhite/10">
          <div className="bg-ignum-black px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-wider text-ignum-gray mb-1">Fase I — 2026</p>
            <p className="font-display text-2xl font-bold text-ignum-copper">15 MW</p>
          </div>
          <div className="bg-ignum-black px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-wider text-ignum-gray mb-1">Fase II — 2027</p>
            <p className="font-display text-2xl font-bold text-ignum-copper">30 MW</p>
          </div>
          <div className="bg-ignum-black px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-wider text-ignum-gray mb-1">Fase III — 2028</p>
            <p className="font-display text-2xl font-bold text-ignum-copper">50 MW</p>
          </div>
          <div className="bg-ignum-black px-6 py-4">
            <p className="font-mono text-xs uppercase tracking-wider text-ignum-gray mb-1">Visión 10 años</p>
            <p className="font-display text-2xl font-bold text-ignum-copper">100 MW</p>
          </div>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">

          <div className="p-6 border border-ignum-offwhite/10 bg-ignum-charcoal/40 hover:border-ignum-copper/40 transition-colors">
            <Zap size={20} className="text-ignum-copper mb-4" />
            <p className="font-mono text-xs uppercase tracking-wider text-ignum-gray mb-2">
              EnergyCore — Activo Generacional
            </p>
            <p className="font-body text-ignum-offwhite text-sm leading-relaxed">
              Generación propia con contratos de gas a 10–15 años. Concesiones de agua aseguradas.
              Energía soberana que existe independientemente de cualquier ciclo tecnológico.
              El activo que no desaparece.
            </p>
          </div>

          <div className="p-6 border border-ignum-offwhite/10 bg-ignum-charcoal/40 hover:border-ignum-copper/40 transition-colors">
            <Lock size={20} className="text-ignum-copper mb-4" />
            <p className="font-mono text-xs uppercase tracking-wider text-ignum-gray mb-2">
              Transparencia On-Chain
            </p>
            <p className="font-body text-ignum-offwhite text-sm leading-relaxed">
              Auditoría pública en Base L2. Cada MW, cada GPU, cada contrato —
              verificable en tiempo real sin intermediarios ni confianza ciega.
            </p>
          </div>

          <div className="p-6 border border-ignum-offwhite/10 bg-ignum-charcoal/40 hover:border-ignum-copper/40 transition-colors">
            <TrendingUp size={20} className="text-ignum-copper mb-4" />
            <p className="font-mono text-xs uppercase tracking-wider text-ignum-gray mb-2">
              Acceso Institucional
            </p>
            <p className="font-body text-ignum-offwhite text-sm leading-relaxed">
              Disponible para inversores calificados, family offices y fondos con
              visión de 10 años. Objetivo: EBITDA $45–55M, valuación $500M+.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href="/investors"
            className="btn-copper flex items-center gap-2 group"
          >
            <span>Ver Oportunidad de Inversión</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex items-center gap-3 p-4 bg-ignum-black/50 border border-ignum-offwhite/10">
            <div className="w-2 h-2 rounded-full bg-ignum-success animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-ignum-gray">
              8 Fundadores · Acceso por invitación · Cuadritos, Celaya
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TokenSection;
