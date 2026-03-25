import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap,
  Cpu,
  TrendingUp,
  Globe,
  CheckCircle,
  Circle,
  Clock,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RoadmapSectionProps {
  className?: string;
}

const RoadmapSection = ({ className = '' }: RoadmapSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const energyFlowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        timelineRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.5,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        energyFlowRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: energyFlowRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const phases = [
    {
      phase: 'NOW',
      status: 'live',
      year: '2026 Q1',
      title: 'Foundation Live',
      icon: CheckCircle,
      specs: [
        '2× Jenbacher J620 = 7.3 MW',
        '4× H200 SXM5 141 GB — deploying',
        '2 MW IT capacity',
        '25 km gas pipeline',
        '20 MVA substation',
      ],
    },
    {
      phase: 'PHASE 1',
      status: 'planned',
      year: '2026 Q2–Q4',
      title: 'Scale to 8 MW IT',
      icon: Clock,
      specs: [
        'H200 cluster expansion',
        '8 MW IT capacity',
        'IRU dark fiber + DWDM',
        '<2 ms to Querétaro',
        'Anchor tenant LOI',
      ],
    },
    {
      phase: 'PHASE 2',
      status: 'planned',
      year: '2028',
      title: 'Regional Hub',
      icon: Circle,
      specs: [
        '+2× Jenbacher (total 4)',
        '15 MW IT capacity',
        'LATAM nodes expansion',
        'Heptágono framework',
        'Multi-tenant colocation',
      ],
    },
    {
      phase: 'PHASE 3',
      status: 'planned',
      year: '2030',
      title: 'National Backbone',
      icon: Circle,
      specs: [
        '+4× Jenbacher (total 8)',
        '30 MW IT capacity',
        'Mexico City node',
        'Guadalajara node',
        'Cross-border fiber',
      ],
    },
    {
      phase: 'VISION',
      status: 'longterm',
      year: '2035',
      title: '100 MW Sovereign',
      icon: Globe,
      specs: [
        'Full 100 MW authorized',
        'Multi-GW AI training',
        'Pan-American backbone',
        'TommyAI orchestration',
        'Sovereign cloud leader',
      ],
    },
  ];

  const energyFlow = [
    { stage: 'Gas Pipeline', value: '25 km', detail: 'Private ownership', icon: Zap },
    { stage: 'Jenbacher J620', value: '2× 3.65 MW', detail: 'Cogeneration', icon: Zap },
    { stage: 'Substation', value: '20 MVA', detail: 'Transform & distribute', icon: TrendingUp },
    { stage: 'Cooling', value: 'Trigeneración', detail: 'Heat + cold recovery', icon: Cpu },
    { stage: 'AI Load', value: '2× H200', detail: '141 GB HBM3e each', icon: Cpu },
  ];

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className={`relative bg-ignum-charcoal py-24 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-gray mb-4 block">
            Execution Roadmap
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-6">
            Roadmap.
          </h2>
          <p className="font-body text-lg md:text-xl text-ignum-gray max-w-2xl leading-relaxed">
            From 7.3 MW today to 100 MW sovereign. Every phase documented, 
            every milestone verifiable.
          </p>
        </div>

        {/* Energy Flow Diagram */}
        <div ref={energyFlowRef} className="mb-16">
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-6 flex items-center gap-2">
            <Zap size={18} className="text-ignum-copper" />
            Energy Flow: Gas → AI
          </h3>
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 lg:gap-0">
            {energyFlow.map((stage, idx) => (
              <div key={idx} className="flex items-center">
                <div className="card-dark p-4 min-w-[140px] text-center">
                  <stage.icon size={20} className="text-ignum-copper mx-auto mb-2" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ignum-gray block">
                    {stage.stage}
                  </span>
                  <span className="font-display text-lg font-bold text-ignum-offwhite block">
                    {stage.value}
                  </span>
                  <span className="font-mono text-[10px] text-ignum-gray">
                    {stage.detail}
                  </span>
                </div>
                {idx < energyFlow.length - 1 && (
                  <div className="hidden lg:flex items-center mx-2">
                    <div className="w-8 h-px bg-ignum-copper/40" />
                    <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-ignum-copper/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-ignum-copper/30 hidden md:block" />

          <div className="space-y-8">
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 items-center justify-center ${
                  phase.status === 'live'
                    ? 'bg-ignum-success border-ignum-success'
                    : phase.status === 'planned'
                    ? 'bg-ignum-copper border-ignum-copper'
                    : 'bg-ignum-charcoal border-ignum-gray'
                }">
                  <div className={`w-2 h-2 rounded-full ${
                    phase.status === 'live' ? 'bg-ignum-success' : 
                    phase.status === 'planned' ? 'bg-ignum-copper' : 'bg-ignum-gray'
                  }`} />
                </div>

                {/* Content */}
                <div className={`md:w-5/12 ${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 mb-3 ${
                    phase.status === 'live'
                      ? 'bg-ignum-success/20 border border-ignum-success/40'
                      : phase.status === 'planned'
                      ? 'bg-ignum-copper/20 border border-ignum-copper/40'
                      : 'bg-ignum-gray/20 border border-ignum-gray/40'
                  }`}>
                    <phase.icon size={14} className={
                      phase.status === 'live' ? 'text-ignum-success' :
                      phase.status === 'planned' ? 'text-ignum-copper' : 'text-ignum-gray'
                    } />
                    <span className={`font-mono text-xs uppercase tracking-wider ${
                      phase.status === 'live' ? 'text-ignum-success' :
                      phase.status === 'planned' ? 'text-ignum-copper' : 'text-ignum-gray'
                    }`}>
                      {phase.phase}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-ignum-gray block mb-2">
                    {phase.year}
                  </span>
                  <h4 className="font-display text-xl font-bold text-ignum-offwhite mb-3">
                    {phase.title}
                  </h4>
                  <ul className={`space-y-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    {phase.specs.map((spec, sidx) => (
                      <li key={sidx} className="font-mono text-sm text-ignum-gray">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Expansion Path */}
        <div className="mt-16 card-dark p-6">
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-4">
            Expansion Path: 7.3 MW → 100 MW
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { mw: '7.3', label: 'Now', year: '2026' },
              { mw: '15', label: 'Phase 1', year: '2026–27' },
              { mw: '30', label: 'Phase 2', year: '2028' },
              { mw: '50', label: 'Phase 3', year: '2030' },
              { mw: '100', label: 'Vision', year: '2035' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-4 bg-ignum-black/50">
                <span className="font-display text-2xl font-bold text-ignum-copper block">
                  {item.mw} MW
                </span>
                <span className="font-mono text-xs text-ignum-gray uppercase tracking-wider block">
                  {item.label}
                </span>
                <span className="font-mono text-[10px] text-ignum-gray/60">
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
