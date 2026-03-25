import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cpu,
  Database,
  Shield,
  BarChart3,
  GitBranch,
  Cloud,
  Terminal,
  Workflow,
  Layers,
  Code2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EcosystemSectionProps {
  className?: string;
}

const EcosystemSection = ({ className = '' }: EcosystemSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const integrationsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Flowing section - elements fade/slide up as they enter viewport
      gsap.fromTo(
        headlineRef.current,
        { y: 24, opacity: 0 },
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
        bodyRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        gridRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        integrationsRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.4,
          scrollTrigger: {
            trigger: integrationsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const partners = [
    { category: 'AI / ML', items: ['Hugging Face', 'Ray', 'Triton', 'PyTorch'] },
    { category: 'Data', items: ['MinIO', 'Iceberg', 'PostgreSQL', 'ClickHouse'] },
    { category: 'Security', items: ['Vault', 'Keycloak', 'Sigstore', 'Cert-manager'] },
    { category: 'Observability', items: ['Grafana', 'Prometheus', 'OpenTelemetry', 'Jaeger'] },
  ];

  const integrations = [
    { icon: Terminal, label: 'Terraform' },
    { icon: Code2, label: 'Pulumi' },
    { icon: GitBranch, label: 'GitHub Actions' },
    { icon: Workflow, label: 'GitLab CI' },
    { icon: Layers, label: 'ArgoCD' },
    { icon: Cloud, label: 'Crossplane' },
  ];

  const categoryIcons: Record<string, React.ElementType> = {
    'AI / ML': Cpu,
    'Data': Database,
    'Security': Shield,
    'Observability': BarChart3,
  };

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className={`relative bg-ignum-black py-24 lg:py-32 ${className}`}
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 px-6 lg:px-[7vw]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-16">
          <div ref={headlineRef}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight">
              <span className="text-gradient-copper">Ecosystem.</span>
            </h2>
          </div>
          <p
            ref={bodyRef}
            className="font-body text-base md:text-lg text-ignum-gray leading-relaxed max-w-md lg:text-right"
          >
            Built for teams that run real workloads. Integrates with the tools you already use.
          </p>
        </div>

        {/* Partner Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {partners.map((partner, index) => {
            const Icon = categoryIcons[partner.category];
            return (
              <div
                key={index}
                className="card-dark p-6 group hover:border-ignum-copper/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={18} className="text-ignum-copper" />
                  <span className="font-mono text-xs uppercase tracking-wider text-ignum-gray">
                    {partner.category}
                  </span>
                </div>
                <ul className="space-y-2">
                  {partner.items.map((item, i) => (
                    <li
                      key={i}
                      className="font-body text-sm text-ignum-offwhite/80 group-hover:text-ignum-offwhite transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Integrations */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-ignum-gray mb-6">
            Integrations
          </h3>
          <div ref={integrationsRef} className="flex flex-wrap gap-4">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-3 bg-ignum-charcoal/40 border border-ignum-offwhite/10 hover:border-ignum-copper/30 transition-all duration-300 group"
              >
                <integration.icon
                  size={16}
                  className="text-ignum-gray group-hover:text-ignum-copper transition-colors"
                />
                <span className="font-mono text-sm text-ignum-offwhite">
                  {integration.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
