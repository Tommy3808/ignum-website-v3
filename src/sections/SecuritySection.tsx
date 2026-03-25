import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SecuritySectionProps {
  className?: string;
}

const SecuritySection = ({ className = '' }: SecuritySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLButtonElement>(null);

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
        headlineRef.current,
        { x: '45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: '45vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      scrollTl.fromTo(
        linkRef.current,
        { y: '8vh', opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="security"
      className={`section-pinned bg-ignum-black ${className}`}
    >
      {/* Media Card (Left - Vertical) */}
      <div
        ref={mediaCardRef}
        className="absolute left-[7vw] top-[14vh] w-[40vw] h-[72vh] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative w-full h-full border border-ignum-offwhite/10 overflow-hidden shadow-card">
          <img
            src="/images/security-facility.jpg"
            alt="Security Facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ignum-black/40 via-transparent to-ignum-black/40" />
        </div>
      </div>

      {/* Text Block (Right) */}
      <div
        ref={textBlockRef}
        className="absolute left-[54vw] top-[26vh] w-[38vw] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2
          ref={headlineRef}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-8"
          style={{ willChange: 'transform, opacity' }}
        >
          Security &
          <br />
          <span className="text-gradient-copper">jurisdiction.</span>
        </h2>

        <p
          ref={bodyRef}
          className="font-body text-base md:text-lg text-ignum-gray leading-relaxed mb-10 max-w-md"
          style={{ willChange: 'transform, opacity' }}
        >
          Your data is subject to the laws you choose. Our facilities operate under local jurisdiction with strict access controls, encryption, and audit logging.
        </p>

        <button
          ref={linkRef}
          className="flex items-center gap-2 font-mono text-sm text-ignum-copper hover:text-ignum-copper-light transition-colors group"
          style={{ willChange: 'transform, opacity' }}
        >
          <FileText size={16} />
          Read the security whitepaper
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default SecuritySection;
