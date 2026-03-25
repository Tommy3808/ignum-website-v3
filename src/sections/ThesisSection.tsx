import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, Zap, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ThesisSectionProps {
  className?: string;
}

const ThesisSection = ({ className = '' }: ThesisSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

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
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      scrollTl.fromTo(
        chipsRef.current?.children || [],
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.15
      );

      // Wipe panel entrance
      scrollTl.fromTo(
        wipeRef.current,
        { x: '100vw' },
        { x: 0, ease: 'power2.out' },
        0.2
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        mediaCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        textBlockRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        wipeRef.current,
        { x: 0 },
        { x: '-100vw', ease: 'power2.in' },
        0.78
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const chips = [
    { label: 'Bare metal', icon: Server },
    { label: 'Low latency', icon: Zap },
    { label: 'Sovereign', icon: Shield },
  ];

  return (
    <section
      ref={sectionRef}
      id="thesis"
      className={`section-pinned bg-ignum-black ${className}`}
    >
      {/* Wipe Transition Panel */}
      <div
        ref={wipeRef}
        className="absolute inset-0 bg-ignum-charcoal z-0"
        style={{ transform: 'translateX(100vw)' }}
      />

      {/* Media Card (Left) */}
      <div
        ref={mediaCardRef}
        className="absolute left-[7vw] top-[18vh] w-[46vw] h-[64vh] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative w-full h-full border border-ignum-offwhite/10 overflow-hidden shadow-card">
          <img
            src="/images/gateway-hardware.jpg"
            alt="Field Gateway"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ignum-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="font-mono text-xs uppercase tracking-wider text-ignum-gray/80">
              Field gateway — Cuadritos
            </span>
          </div>
        </div>
      </div>

      {/* Text Block (Right) */}
      <div
        ref={textBlockRef}
        className="absolute left-[58vw] top-[28vh] w-[34vw] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2
          ref={headlineRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-8"
          style={{ willChange: 'transform, opacity' }}
        >
          Why sovereign infrastructure now
          <br />
          <span className="text-gradient-copper">the moat.</span>
        </h2>

        <p
          ref={bodyRef}
          className="font-body text-base md:text-lg text-ignum-gray leading-relaxed mb-10 max-w-md"
          style={{ willChange: 'transform, opacity' }}
        >
          The moat is control over energy, silicon, and jurisdiction. We built IGNUM as a vertically integrated stack—so your inference stays yours.
        </p>

        {/* Chips */}
        <div ref={chipsRef} className="flex flex-wrap gap-3">
          {chips.map((chip, index) => (
            <div
              key={index}
              className="pill flex items-center gap-2 cursor-default"
              style={{ willChange: 'transform, opacity' }}
            >
              <chip.icon size={14} />
              <span>{chip.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThesisSection;
