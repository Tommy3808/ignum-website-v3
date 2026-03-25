import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    label: 'Family Holding / Park Assets',
    desc: 'Owns the industrial base and physical asset platform.',
    badge: 'Assets',
  },
  {
    label: 'EnergyCore',
    desc: 'Supplies power and Cooling-as-a-Service under long-term contractual structure.',
    badge: 'PPA + CaaS',
  },
  {
    label: 'Operating SPV / SAPI',
    desc: 'Monetizes AI / HPC colocation, compute load, and customer contracts.',
    badge: 'Revenue',
  },
  {
    label: 'HoldCo Delaware (optional)',
    desc: 'Provides a cleaner access point for institutional capital where appropriate.',
    badge: 'Capital',
  },
];

interface InstitutionalStructureProps { className?: string; }

const InstitutionalStructure = ({ className = '' }: InstitutionalStructureProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' };
      gsap.fromTo(headingRef.current, { y: '4vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: st });
      gsap.fromTo(layersRef.current?.children || [], { y: '4vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out', scrollTrigger: st });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="structure" className={`bg-ignum-charcoal/20 py-24 px-8 md:px-16 lg:px-24 ${className}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        <div ref={headingRef}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-copper mb-3">Institutional Structure</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-6">
            Built for<br /><span className="text-gradient-copper">Bankability</span>
          </h2>
          <p className="font-body text-ignum-gray leading-relaxed mb-6">
            IGNUM is structured so physical assets, power delivery, and operating revenues can be separated with discipline. The objective is not to collapse the project into one entity. The objective is to make expansion financeable.
          </p>
          <p className="font-mono text-xs text-ignum-gray/60 leading-relaxed border-l-2 border-ignum-copper/30 pl-4">
            Capital is positioned to underwrite cash flow and expansion, not to absorb unnecessary asset-layer complexity.
          </p>
        </div>

        <div ref={layersRef} className="space-y-2">
          {layers.map((l, i) => (
            <div key={i} className="flex items-start gap-4 p-4 border border-ignum-offwhite/10 bg-ignum-black hover:border-ignum-copper/30 transition-colors">
              {i < layers.length - 1 && (
                <div className="flex flex-col items-center pt-1">
                  <div className="w-px h-full bg-ignum-copper/20 absolute" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-display text-sm font-bold text-ignum-offwhite">{l.label}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ignum-copper border border-ignum-copper/20 px-2 py-0.5">{l.badge}</span>
                </div>
                <p className="font-body text-xs text-ignum-gray leading-relaxed">{l.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 p-3 border border-ignum-offwhite/5 mt-2">
            <ArrowRight size={12} className="text-ignum-gray/40" />
            <span className="font-mono text-[9px] text-ignum-gray/40 uppercase tracking-wider">Investor materials available through private access</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InstitutionalStructure;
