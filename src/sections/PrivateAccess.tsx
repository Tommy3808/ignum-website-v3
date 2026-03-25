import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ctaItems = [
  { label: 'Request Private Access', href: '/acceso', primary: true },
  { label: 'Request Site Visit', href: 'mailto:tommy@ignumprotocol.com?subject=Site Visit Request', primary: false },
  { label: 'Receive Technical Brief', href: 'mailto:tommy@ignumprotocol.com?subject=Technical Brief Request', primary: false },
];

interface PrivateAccessProps { className?: string; }

const PrivateAccess = ({ className = '' }: PrivateAccessProps) => {
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
    <section ref={sectionRef} id="private-access" className={`bg-ignum-charcoal/30 py-24 px-8 md:px-16 lg:px-24 ${className}`}>
      <div className="max-w-4xl mx-auto text-center" ref={contentRef}>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Lock size={14} className="text-ignum-copper" />
          <span className="font-mono text-xs uppercase tracking-widest text-ignum-copper">Private Access</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-4">
          Bring your AI workload<br />to a sovereign base in Mexico.
        </h2>
        <p className="font-body text-ignum-gray leading-relaxed mb-10 max-w-xl mx-auto">
          Technical briefs, commercial structures, diligence materials, and site visits are shared through a controlled access process.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          {ctaItems.map((cta, i) => (
            <a
              key={i}
              href={cta.href}
              className={`flex items-center gap-2 px-6 py-3 font-mono text-sm group transition-colors ${
                cta.primary
                  ? 'bg-ignum-copper text-ignum-black hover:bg-ignum-copper-light'
                  : 'border border-ignum-offwhite/20 text-ignum-offwhite hover:border-ignum-copper/40'
              }`}
            >
              {cta.label}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          ))}
        </div>

        <p className="font-mono text-[10px] text-ignum-gray/40 uppercase tracking-wider">
          Investor and strategic materials are shared privately.
        </p>
      </div>
    </section>
  );
};

export default PrivateAccess;
