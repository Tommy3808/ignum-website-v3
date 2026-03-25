import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, Lock, Building2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const offers = [
  {
    icon: Server,
    title: 'HPC / AI Colocation',
    body: 'High-density AI colocation sold on a $/kW-month basis, bundling power, Cooling-as-a-Service, and disciplined service levels.',
    tag: '$145–195 /kW-mes',
  },
  {
    icon: Lock,
    title: 'Sovereign Compute',
    body: 'Dedicated regional AI capacity for private inference and training workloads requiring infrastructure control and regional deployment.',
    tag: 'By request',
  },
  {
    icon: Building2,
    title: 'Structured Deployment',
    body: 'Infrastructure advisory and staged implementation for enterprise, industrial, and sovereign-scale clients.',
    tag: 'Enterprise',
  },
];

interface CommercialModelProps { className?: string; }

const CommercialModel = ({ className = '' }: CommercialModelProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' };
      gsap.fromTo(headingRef.current, { y: '4vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: st });
      gsap.fromTo(cardsRef.current?.children || [], { y: '5vh', opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out', scrollTrigger: st });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="commercial" className={`bg-ignum-charcoal/20 py-24 px-8 md:px-16 lg:px-24 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-copper mb-3">Commercial Model</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight">
            What the Platform Sells
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {offers.map((o, i) => (
            <div key={i} className="p-8 border border-ignum-offwhite/10 bg-ignum-black hover:border-ignum-copper/30 transition-colors flex flex-col gap-4">
              <o.icon size={20} className="text-ignum-copper" />
              <div>
                <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-2">{o.title}</h3>
                <p className="font-body text-sm text-ignum-gray leading-relaxed">{o.body}</p>
              </div>
              <span className="font-mono text-xs text-ignum-copper border border-ignum-copper/30 px-3 py-1 w-fit">{o.tag}</span>
            </div>
          ))}
        </div>

        <a href="#contact" className="inline-flex items-center gap-2 font-mono text-sm text-ignum-copper hover:text-ignum-copper-light transition-colors group">
          Solicitar briefing técnico
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default CommercialModel;
