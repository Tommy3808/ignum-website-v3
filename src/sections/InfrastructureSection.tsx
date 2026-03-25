import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Database, Globe, Shield, Cpu, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface InfrastructureSectionProps {
  className?: string;
}

const pillars = [
  {
    icon: Zap,
    label: 'Energía On-Site',
    value: '7.3 MW',
    sub: '7.3 MW · 2× Jenbacher J620 · Trigeneración',
  },
  {
    icon: Database,
    label: 'IT Phase 1',
    value: '2 MW',
    sub: 'HPC/AI Colocation · NVIDIA DGX-Ready',
  },
  {
    icon: Globe,
    label: 'Footprint',
    value: '15,000 m²',
    sub: 'Phase 1 · 45 ha campus · Autorizado 100 MW',
  },
  {
    icon: Zap,
    label: 'Gasoducto Privado',
    value: '25 km',
    sub: 'Suministro directo · Contratos 10–15 años',
  },
  {
    icon: Shield,
    label: 'Subestación',
    value: '20 MVA',
    sub: 'Island Mode · Ininterrumpible',
  },
  {
    icon: Droplets,
    label: 'Agua Industrial',
    value: '3 Pozos',
    sub: 'PTAR 1,500 m³/día · Cooling-as-a-Service',
  },
];

const latencies = [
  { city: 'Querétaro', ms: '5–12 ms' },
  { city: 'CDMX', ms: '18–28 ms' },
  { city: 'Dallas', ms: '42–55 ms' },
];

const roadmap = [
  { phase: 'Hoy', it: '2 MW IT', energy: '7.3 MW gen.', label: 'Phase 1 activo' },
  { phase: '2026', it: '8 MW IT', energy: '15 MW gen.', label: 'Expansión' },
  { phase: '2027', it: '15 MW IT', energy: '30 MW gen.', label: 'Scale' },
  { phase: '2030+', it: 'Full campus', energy: '100 MW', label: 'Visión' },
];

const InfrastructureSection = ({ className = '' }: InfrastructureSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const latencyRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      scrollTl.fromTo(headingRef.current, { y: '5vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0);
      scrollTl.fromTo(pillarsRef.current?.children || [], { y: '6vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, ease: 'power2.out' }, 0.1);
      scrollTl.fromTo(latencyRef.current, { y: '4vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.35);
      scrollTl.fromTo(roadmapRef.current?.children || [], { y: '4vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, ease: 'power2.out' }, 0.45);

      scrollTl.fromTo(headingRef.current, { y: 0, opacity: 1 }, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.78);
      scrollTl.fromTo(pillarsRef.current, { y: 0, opacity: 1 }, { y: '-5vh', opacity: 0, ease: 'power2.in' }, 0.80);
      scrollTl.fromTo([latencyRef.current, roadmapRef.current], { y: 0, opacity: 1 }, { y: '-5vh', opacity: 0, ease: 'power2.in' }, 0.82);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="infrastructure"
      className={`section-pinned bg-ignum-black ${className}`}
    >
      <div className="section-inner flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 max-w-7xl mx-auto w-full">

        {/* Heading */}
        <div ref={headingRef} className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-copper mb-3">
            Cuadritos, Celaya · Parque Industrial · Bajío, México
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight">
            <span className="text-gradient-copper">Infraestructura.</span><br />
            Física. Verificable.<br />
            Soberana.
          </h2>
        </div>

        {/* 6 pilares */}
        <div ref={pillarsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {pillars.map((p, i) => (
            <div key={i} className="p-4 border border-ignum-offwhite/10 bg-ignum-charcoal/30 hover:border-ignum-copper/40 transition-colors">
              <p.icon size={14} className="text-ignum-copper mb-2" />
              <p className="font-mono text-[10px] uppercase tracking-wider text-ignum-gray mb-1">{p.label}</p>
              <p className="font-display text-xl font-bold text-ignum-offwhite">{p.value}</p>
              <p className="font-mono text-[9px] text-ignum-gray/60 mt-1 leading-tight">{p.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Latencias */}
          <div ref={latencyRef}>
            <p className="font-mono text-xs uppercase tracking-wider text-ignum-gray mb-3">Conectividad medida</p>
            <div className="space-y-2">
              {latencies.map((l, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-ignum-offwhite/10 bg-ignum-charcoal/20">
                  <div className="flex items-center gap-2">
                    <Cpu size={12} className="text-ignum-copper" />
                    <span className="font-mono text-xs text-ignum-gray">Celaya → {l.city}</span>
                  </div>
                  <span className="font-display text-sm font-bold text-ignum-copper">{l.ms}</span>
                </div>
              ))}
              <p className="font-mono text-[10px] text-ignum-gray/50 mt-2">Dark fiber / IRU path under evaluation</p>
            </div>
          </div>

          {/* Roadmap IT */}
          <div ref={roadmapRef} className="grid grid-cols-2 gap-2">
            {roadmap.map((r, i) => (
              <div key={i} className={`p-3 border ${i === 0 ? 'border-ignum-copper/50 bg-ignum-copper/5' : 'border-ignum-offwhite/10 bg-ignum-charcoal/20'}`}>
                <p className="font-mono text-[10px] uppercase tracking-wider text-ignum-gray mb-1">{r.phase}</p>
                <p className="font-display text-base font-bold text-ignum-offwhite">{r.it}</p>
                <p className="font-mono text-[9px] text-ignum-copper">{r.energy}</p>
                <p className="font-mono text-[9px] text-ignum-gray/50 mt-1">{r.label}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default InfrastructureSection;
