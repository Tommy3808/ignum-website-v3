import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const gates = [
  '15-year power and cooling structure executed',
  'Anchor customer LOI for initial load + deposit',
  'Dual-carrier connectivity with measured performance',
  'Staged capital deployment tied to commissioned demand',
];

interface ExecutionDisciplineProps { className?: string; }

const ExecutionDiscipline = ({ className = '' }: ExecutionDisciplineProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { y: '4vh', opacity: 0 }, {
        y: 0, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`bg-ignum-black py-24 px-8 md:px-16 lg:px-24 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-copper mb-3">Execution Discipline</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-6">
              Scale is gated by contracts, not slides.
            </h2>
            <p className="font-body text-ignum-gray leading-relaxed">
              IGNUM expands when the next tranche is commercially justified and technically ready. No CAPEX without the contractual foundation in place.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-ignum-gray/60 mb-4">No capacity expansion without:</p>
            {gates.map((gate, i) => (
              <div key={i} className="flex items-start gap-3 p-4 border border-ignum-offwhite/10 bg-ignum-charcoal/20">
                <CheckSquare size={14} className="text-ignum-copper mt-0.5 flex-shrink-0" />
                <span className="font-mono text-xs text-ignum-offwhite/80 leading-relaxed">
                  <span className="text-ignum-copper mr-2">{i + 1}.</span>{gate}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExecutionDiscipline;
