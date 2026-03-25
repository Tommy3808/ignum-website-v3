import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, ShieldCheck, ClipboardCheck, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ComplianceSectionProps {
  className?: string;
}

const ComplianceSection = ({ className = '' }: ComplianceSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        mediaCardRef.current,
        { x: '-70vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        textBlockRef.current,
        { x: '45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        badgesRef.current?.children || [],
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.12
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.15
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        mediaCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        textBlockRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const badges = [
    { label: 'SOC 2 Type II', icon: ShieldCheck },
    { label: 'ISO 27001', icon: ClipboardCheck },
    { label: 'End-to-end encrypted', icon: Lock },
  ];

  return (
    <section
      ref={sectionRef}
      id="compliance"
      className={`section-pinned bg-ignum-black ${className}`}
    >
      {/* Media Card (Left) */}
      <div
        ref={mediaCardRef}
        className="absolute left-[7vw] top-[16vh] w-[44vw] h-[68vh] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative w-full h-full border border-ignum-offwhite/10 overflow-hidden shadow-card">
          <img
            src="/images/server-rack.jpg"
            alt="Server Infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ignum-black/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Text Block (Right) */}
      <div
        ref={textBlockRef}
        className="absolute left-[56vw] top-[26vh] w-[36vw] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-8">
          <span className="text-gradient-copper">Compliance.</span>
        </h2>

        <p className="font-body text-base md:text-lg text-ignum-gray leading-relaxed mb-8 max-w-md">
          Policy-as-code, audit logs, and identity integrations that satisfy regulators without slowing teams.
        </p>

        {/* Badges */}
        <div ref={badgesRef} className="flex flex-wrap gap-3 mb-10">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 bg-ignum-charcoal/60 border border-ignum-offwhite/10"
              style={{ willChange: 'transform, opacity' }}
            >
              <badge.icon size={14} className="text-ignum-copper" />
              <span className="font-mono text-xs text-ignum-offwhite uppercase tracking-wider">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        <button
          ref={ctaRef}
          className="btn-copper-outline flex items-center gap-2 group"
          style={{ willChange: 'transform, opacity' }}
        >
          <Download size={16} />
          Download compliance summary
        </button>
      </div>
    </section>
  );
};

export default ComplianceSection;
