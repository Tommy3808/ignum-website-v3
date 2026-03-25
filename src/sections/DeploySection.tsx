import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DeploySectionProps {
  className?: string;
}

const DeploySection = ({ className = '' }: DeploySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

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
        textBlockRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        mediaCardRef.current,
        { x: '65vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        noteRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        textBlockRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        mediaCardRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        noteRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="deploy"
      className={`section-pinned bg-ignum-black ${className}`}
    >
      {/* Text Block (Left) */}
      <div
        ref={textBlockRef}
        className="absolute left-[7vw] top-[26vh] w-[38vw] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-8">
          Deploy
          <br />
          <span className="text-gradient-copper">anywhere.</span>
        </h2>

        <p className="font-body text-base md:text-lg text-ignum-gray leading-relaxed max-w-md">
          Edge nodes where you need them. Core clusters where you want control. One API, consistent performance.
        </p>
      </div>

      {/* Media Card (Right - Large) */}
      <div
        ref={mediaCardRef}
        className="absolute left-[50vw] top-[16vh] w-[43vw] h-[68vh] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative w-full h-full border border-ignum-offwhite/10 overflow-hidden shadow-card">
          <img
            src="/images/global-network.jpg"
            alt="Global Network"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-ignum-black/60 via-transparent to-ignum-black/40" />
          
          {/* Location Markers */}
          <div className="absolute top-1/3 left-1/4 flex items-center gap-2 bg-ignum-black/80 backdrop-blur-sm px-3 py-2 border border-ignum-copper/30">
            <MapPin size={14} className="text-ignum-copper" />
            <span className="font-mono text-xs text-ignum-offwhite">Cuadritos</span>
          </div>
          
          <div className="absolute bottom-1/3 right-1/3 flex items-center gap-2 bg-ignum-black/80 backdrop-blur-sm px-3 py-2 border border-ignum-offwhite/20">
            <MapPin size={14} className="text-ignum-gray" />
            <span className="font-mono text-xs text-ignum-offwhite">LATAM Nodes</span>
          </div>
        </div>
      </div>

      {/* Note */}
      <div
        ref={noteRef}
        className="absolute left-[7vw] top-[74vh] z-10"
        style={{ willChange: 'transform, opacity' }}
      >
        <p className="font-mono text-xs text-ignum-gray/70 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ignum-success animate-pulse" />
          Latency-tested from major cities
        </p>
      </div>
    </section>
  );
};

export default DeploySection;
