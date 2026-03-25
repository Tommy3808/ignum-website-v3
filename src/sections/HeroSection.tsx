import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, Cpu, Timer, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial states
      gsap.set([labelRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current, metricsRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(imageRef.current, { opacity: 0, scale: 1.1 });

      // Entrance animation
      tl.to(imageRef.current, { opacity: 1, scale: 1, duration: 1.5 })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.4)
        .to(subheadlineRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.8)
        .to(metricsRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set([labelRef.current, headlineRef.current, subheadlineRef.current, ctaRef.current, metricsRef.current], {
              opacity: 1, x: 0, y: 0
            });
          }
        },
      });

      // ENTRANCE (0-30%): Hold - micro parallax only
      scrollTl.fromTo(
        contentRef.current,
        { y: 0 },
        { y: -10, ease: 'none' },
        0
      );

      // SETTLE (30-70%): Hold position

      // EXIT (70-100%): Elements exit
      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        metricsRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Background parallax
      scrollTl.fromTo(
        imageRef.current,
        { y: 0, scale: 1 },
        { y: '15%', scale: 1.05, ease: 'none' },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { label: 'On-Site Generation', value: '7.3', unit: 'MW', icon: Zap },
    { label: 'IT Phase 1', value: '2', unit: 'MW IT', icon: Cpu },
    { label: 'H200 SXM5 141GB', value: 'DEPLOYING', unit: '', icon: Timer },
    { label: 'Latency → QRO', value: '5–12', unit: 'ms', icon: Activity },
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned bg-ignum-black ${className}`}
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/hero-datacenter.jpg"
          alt="Data Center"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ignum-black via-ignum-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ignum-black via-transparent to-ignum-black/50" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[7vw]"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Micro Label */}
        <div ref={labelRef} className="mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-gray">
            IGNUM Protocol
          </span>
          <div className="hairline w-[18vw] mt-3" />
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(44px,5.2vw,84px)] font-bold text-ignum-offwhite leading-[0.95] tracking-tight max-w-[42vw] mb-6"
        >
          Sovereign Intelligence
          <br />
          <span className="text-gradient-copper">Infrastructure.</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="font-body text-lg md:text-xl text-ignum-gray max-w-md mb-10 leading-relaxed"
        >
          La próxima ventaja en IA no es el modelo — es el control sobre dónde corre. Construye sobre infraestructura soberana en México.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-16">
          <button onClick={scrollToContact} className="btn-copper flex items-center gap-2 group">
            Request Access
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById('infrastructure')?.scrollIntoView({behavior: 'smooth'})}
            className="font-mono text-sm text-ignum-gray hover:text-ignum-copper transition-colors underline underline-offset-4"
          >
            Read the thesis
          </button>
        </div>

        {/* Live Metrics */}
        <div
          ref={metricsRef}
          className="absolute bottom-8 left-6 lg:left-[7vw] right-6 lg:right-[7vw]"
        >
          <div className="hairline mb-6" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-start gap-3">
                <metric.icon size={18} className="text-ignum-copper mt-1 flex-shrink-0" />
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-2xl lg:text-3xl font-bold text-ignum-offwhite">
                      {metric.value}
                    </span>
                    <span className="font-mono text-xs text-ignum-gray">{metric.unit}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ignum-gray/70">
                    {metric.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
