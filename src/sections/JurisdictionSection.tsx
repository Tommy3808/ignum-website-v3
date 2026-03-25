import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Scale,
  FileText,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface JurisdictionSectionProps {
  className?: string;
}

const JurisdictionSection = ({ className = '' }: JurisdictionSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const frameworkRef = useRef<HTMLDivElement>(null);
  const mlatRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);

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
        frameworkRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: frameworkRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        mlatRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: mlatRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        comparisonRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: comparisonRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        certificationsRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: certificationsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const legalFramework = [
    {
      law: 'LFPDPPP',
      fullName: 'Ley Federal de Protección de Datos Personales en Posesión de los Particulares',
      description: 'Mexican federal law governing personal data protection. Requires explicit consent for data processing and provides rights of access, rectification, cancellation, and opposition.',
      relevance: 'Primary data protection framework for IGNUM operations.',
    },
    {
      law: 'MLAT Treaty',
      fullName: 'Mutual Legal Assistance Treaty (US-Mexico)',
      description: 'Bilateral agreement requiring formal judicial process for cross-border data access. No direct access by foreign law enforcement.',
      relevance: 'Only legal mechanism for US authorities to access data hosted in Mexico.',
    },
    {
      law: 'CLOUD Act',
      fullName: 'Clarifying Lawful Overseas Use of Data Act (US)',
      description: 'US law allowing federal law enforcement to compel US-based technology companies to provide requested data, regardless of where the data is stored.',
      relevance: 'Does NOT apply to IGNUM. We are a Mexican entity, not US-based.',
    },
  ];

  const mlatProcess = [
    { step: 1, title: 'US Request', description: 'US agency requests data via DOJ' },
    { step: 2, title: 'DOJ Review', description: 'US Department of Justice validates request' },
    { step: 3, title: 'Diplomatic Channel', description: 'Request sent via diplomatic channels to Mexico' },
    { step: 4, title: 'Mexican Court', description: 'Mexican judicial authority reviews and approves' },
    { step: 5, title: 'IGNUM Response', description: 'We receive formal Mexican court order' },
  ];

  const cloudActComparison = [
    { provider: 'AWS US-East', jurisdiction: 'USA', cloudAct: true, mlatOnly: false, risk: 'High' },
    { provider: 'Google Cloud', jurisdiction: 'USA', cloudAct: true, mlatOnly: false, risk: 'High' },
    { provider: 'Azure', jurisdiction: 'USA', cloudAct: true, mlatOnly: false, risk: 'High' },
    { provider: 'Lambda Cloud', jurisdiction: 'USA', cloudAct: true, mlatOnly: false, risk: 'High' },
    { provider: 'CoreWeave', jurisdiction: 'USA', cloudAct: true, mlatOnly: false, risk: 'High' },
    { provider: 'IGNUM Protocol', jurisdiction: 'Mexico', cloudAct: false, mlatOnly: true, risk: 'Sovereign' },
  ];

  const certifications = [
    { name: 'SOC 2 Type II', status: 'In Progress', description: 'Security, availability, and confidentiality controls' },
    { name: 'ISO 27001', status: 'Planned 2026', description: 'Information security management system' },
    { name: 'ISO 27017', status: 'Planned 2027', description: 'Cloud security controls' },
    { name: 'ISO 27018', status: 'Planned 2027', description: 'Cloud privacy protection' },
  ];

  return (
    <section
      ref={sectionRef}
      id="jurisdiction"
      className={`relative bg-ignum-charcoal py-24 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-gray mb-4 block">
            Legal Framework
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-6">
            Jurisdiction.
          </h2>
          <p className="font-body text-lg md:text-xl text-ignum-gray max-w-2xl leading-relaxed">
            Your data is subject to the laws you choose. Mexican jurisdiction. 
            MLAT-only access. Zero CLOUD Act exposure.
          </p>
        </div>

        {/* Legal Framework */}
        <div ref={frameworkRef} className="mb-12">
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-4 flex items-center gap-2">
            <Scale size={18} className="text-ignum-copper" />
            Legal Framework
          </h3>
          <div className="space-y-4">
            {legalFramework.map((item, idx) => (
              <div key={idx} className="card-dark p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-xs text-ignum-copper uppercase tracking-wider">
                      {item.law}
                    </span>
                    <h4 className="font-display text-base font-bold text-ignum-offwhite mt-1">
                      {item.fullName}
                    </h4>
                  </div>
                  {item.law === 'CLOUD Act' ? (
                    <XCircle size={20} className="text-ignum-error" />
                  ) : (
                    <CheckCircle size={20} className="text-ignum-success" />
                  )}
                </div>
                <p className="font-body text-sm text-ignum-gray leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 p-2 bg-ignum-black/50">
                  <FileText size={14} className="text-ignum-copper" />
                  <span className="font-mono text-xs text-ignum-offwhite">
                    {item.relevance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MLAT Process Flow */}
        <div ref={mlatRef} className="mb-12">
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-4 flex items-center gap-2">
            <Globe size={18} className="text-ignum-copper" />
            MLAT Process Flow
          </h3>
          <div className="card-dark p-6">
            <p className="font-body text-sm text-ignum-gray mb-6">
              The only legal mechanism for US authorities to access data hosted in Mexico. 
              Formal judicial process with multiple review points.
            </p>
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
              {mlatProcess.map((step, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="text-center p-3 bg-ignum-black/50 min-w-[100px]">
                    <span className="font-display text-lg font-bold text-ignum-copper block">
                      {step.step}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ignum-gray block">
                      {step.title}
                    </span>
                  </div>
                  {idx < mlatProcess.length - 1 && (
                    <ArrowRight size={16} className="text-ignum-copper/40 mx-1" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-ignum-success/10 border border-ignum-success/30">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-ignum-success" />
                <span className="font-mono text-sm text-ignum-success">
                  Average processing time: 6–12 months. No direct access.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CLOUD Act Comparison */}
        <div ref={comparisonRef} className="mb-12">
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-ignum-copper" />
            CLOUD Act Exposure Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ignum-offwhite/10">
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-ignum-gray">
                    Provider
                  </th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-ignum-gray">
                    Jurisdiction
                  </th>
                  <th className="text-center p-3 font-mono text-xs uppercase tracking-wider text-ignum-gray">
                    CLOUD Act
                  </th>
                  <th className="text-center p-3 font-mono text-xs uppercase tracking-wider text-ignum-gray">
                    MLAT Only
                  </th>
                  <th className="text-left p-3 font-mono text-xs uppercase tracking-wider text-ignum-gray">
                    Risk Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {cloudActComparison.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-ignum-offwhite/5 ${
                      item.provider === 'IGNUM Protocol' ? 'bg-ignum-copper/10' : ''
                    }`}
                  >
                    <td className="p-3 font-display text-sm text-ignum-offwhite">
                      {item.provider}
                    </td>
                    <td className="p-3 font-mono text-xs text-ignum-gray">
                      {item.jurisdiction}
                    </td>
                    <td className="p-3 text-center">
                      {item.cloudAct ? (
                        <XCircle size={16} className="text-ignum-error mx-auto" />
                      ) : (
                        <CheckCircle size={16} className="text-ignum-success mx-auto" />
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {item.mlatOnly ? (
                        <CheckCircle size={16} className="text-ignum-success mx-auto" />
                      ) : (
                        <XCircle size={16} className="text-ignum-error mx-auto" />
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${
                          item.risk === 'Sovereign'
                            ? 'bg-ignum-success/20 text-ignum-success'
                            : item.risk === 'High'
                            ? 'bg-ignum-error/20 text-ignum-error'
                            : 'bg-ignum-gray/20 text-ignum-gray'
                        }`}
                      >
                        {item.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-4 flex items-center gap-2">
            <Lock size={18} className="text-ignum-copper" />
            Compliance Stack
          </h3>
          <div ref={certificationsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="card-dark p-4 text-center">
                <span className="font-display text-base font-bold text-ignum-offwhite block mb-2">
                  {cert.name}
                </span>
                <span
                  className={`px-2 py-1 font-mono text-[10px] uppercase tracking-wider block mb-2 ${
                    cert.status === 'In Progress'
                      ? 'bg-ignum-copper/20 text-ignum-copper'
                      : 'bg-ignum-gray/20 text-ignum-gray'
                  }`}
                >
                  {cert.status}
                </span>
                <span className="font-mono text-[10px] text-ignum-gray">
                  {cert.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JurisdictionSection;
