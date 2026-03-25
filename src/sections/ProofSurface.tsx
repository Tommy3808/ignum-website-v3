import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    status: 'LIVE NOW',
    title: 'Site',
    lines: [
      'Parque Industrial Cuadritos',
      'Celaya, Guanajuato',
      '15,000 m² Phase 1 footprint',
    ],
  },
  {
    status: 'LIVE NOW',
    title: 'Power',
    lines: [
      '7.3 MW on-site cogeneration',
      '25 km private gas pipeline',
      '20 MVA substation',
    ],
  },
  {
    status: 'LIVE NOW',
    title: 'Utilities',
    lines: [
      '3 industrial wells',
      'PTAR 1,500 m³/day',
      'Cooling basis for high-density AI',
    ],
  },
  {
    status: 'IN DEPLOYMENT',
    title: 'Compute',
    lines: [
      '4× H200 SXM5 141GB HBM3e',
      'Deployment in progress',
      'Phase 1: 2 MW IT load',
    ],
  },
  {
    status: 'MEASURED',
    title: 'Connectivity',
    lines: [
      'Querétaro: 5–12 ms',
      'Mexico City: 18–28 ms',
      'Dallas: 42–55 ms',
    ],
  },
  {
    status: 'PLANNED',
    title: 'Expansion',
    lines: [
      '2 MW IT → 8 MW IT → 15 MW IT',
      '100 MW long-term site potential',
      '45 ha campus available',
    ],
  },
];

const statusColor: Record<string, string> = {
  'LIVE NOW': 'text-ignum-success',
  'IN DEPLOYMENT': 'text-ignum-copper',
  'PLANNED': 'text-ignum-gray',
  'LONG-TERM': 'text-ignum-gray/60',
  'MEASURED': 'text-ignum-copper/70',
};

interface ProofSurfaceProps { className?: string; }

const ProofSurface = ({ className = '' }: ProofSurfaceProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: '4vh', opacity: 0 }, {
        y: 0, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
      gsap.fromTo(cardsRef.current?.children || [], { y: '6vh', opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`bg-ignum-black py-24 px-8 md:px-16 lg:px-24 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-copper mb-3">Proof, Not Positioning</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-4">
            Real Infrastructure.<br />
            <span className="text-gradient-copper">Not a Greenfield Story.</span>
          </h2>
          <p className="font-body text-ignum-gray max-w-2xl leading-relaxed">
            IGNUM is built on physical infrastructure, not on abstraction. The platform combines energy, site control, utility depth, and staged AI deployment inside an existing industrial base.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div key={i} className="p-6 border border-ignum-offwhite/10 bg-ignum-charcoal/30 hover:border-ignum-copper/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-ignum-gray">{card.title}</span>
                <span className={`font-mono text-[9px] uppercase tracking-widest ${statusColor[card.status]}`}>
                  {card.status}
                </span>
              </div>
              <div className="space-y-1">
                {card.lines.map((line, j) => (
                  <p key={j} className="font-mono text-xs text-ignum-offwhite/80 leading-relaxed">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofSurface;
