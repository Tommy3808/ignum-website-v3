import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileText,
  BookOpen,
  ExternalLink,
  PenTool,
  Lock,
  Download,
  Calendar,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ArchivoSectionProps {
  className?: string;
}

const ArchivoSection = ({ className = '' }: ArchivoSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const whitepapersRef = useRef<HTMLDivElement>(null);
  const reposRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);

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
        whitepapersRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: whitepapersRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        reposRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: reposRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        blogRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: blogRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const whitepapers = [
    {
      title: 'Sovereign AI Infrastructure: The Mexican Model',
      description: 'Framework for jurisdictional control in AI compute. MLAT, CLOUD Act, and data sovereignty.',
      date: 'March 2026',
      pages: 24,
      access: 'public',
    },
    {
      title: 'Trigeneration for Data Centers: Technical Specifications',
      description: 'Jenbacher J620 integration, PUE optimization, and cooling efficiency.',
      date: 'February 2026',
      pages: 18,
      access: 'public',
    },
    {
      title: 'TommyAI v11.0: Orchestration Architecture',
      description: 'Heptágono framework, Kubernetes-native deployment, and policy-as-code.',
      date: 'January 2026',
      pages: 32,
      access: 'gated',
    },
    {
      title: 'Investment Thesis: IGNUM Protocol',
      description: 'TAM/SAM/SOM, competitive landscape, unit economics, and use of funds.',
      date: 'March 2026',
      pages: 45,
      access: 'gated',
    },
  ];

  const repos = [
    {
      name: 'ignum-compute-api',
      description: 'REST API for GPU scheduling and monitoring',
      language: 'Go',
      stars: 127,
      access: 'public',
    },
    {
      name: 'tommyai-orchestrator',
      description: 'Kubernetes operator for AI workload orchestration',
      language: 'Rust',
      stars: 89,
      access: 'public',
    },
    {
      name: 'heptagono-framework',
      description: 'Policy-driven infrastructure framework',
      language: 'TypeScript',
      stars: 234,
      access: 'public',
    },
    {
      name: 'ignum-terraform-modules',
      description: 'Infrastructure as Code for IGNUM deployment',
      language: 'HCL',
      stars: 56,
      access: 'public',
    },
  ];

  const blogPosts = [
    {
      title: 'Cooling Loop Optimization: From 1.25 to 1.18 PUE',
      date: 'March 15, 2026',
      excerpt: 'How we optimized the delta-T in our cooling system to achieve industry-leading efficiency.',
      category: 'Engineering',
    },
    {
      title: 'H200 SXM5 Installation: Lessons Learned',
      date: 'February 28, 2026',
      excerpt: 'Technical challenges and solutions during the deployment of our first H200 nodes.',
      category: 'Hardware',
    },
    {
      title: 'Jenbacher Sync: Parallel Operation at 7.3 MW',
      date: 'February 10, 2026',
      excerpt: 'Configuring two J620 engines for stable parallel operation and load balancing.',
      category: 'Energy',
    },
    {
      title: 'Latency Testing: Celaya to Querétaro in 8ms',
      date: 'January 22, 2026',
      excerpt: 'Methodology and results from our network latency measurement campaign.',
      category: 'Network',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="archivo"
      className={`relative bg-ignum-black py-24 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-gray mb-4 block">
            Technical Documentation
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-6">
            Archivo.
          </h2>
          <p className="font-body text-lg md:text-xl text-ignum-gray max-w-2xl leading-relaxed">
            Whitepapers, research publications, open-source repositories, and field notes. 
            Everything we learn, we document. Everything we build, we share.
          </p>
        </div>

        {/* Whitepapers */}
        <div ref={whitepapersRef} className="mb-12">
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-ignum-copper" />
            Whitepapers & Research
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whitepapers.map((paper, idx) => (
              <div key={idx} className="card-dark p-5 group hover:border-ignum-copper/40 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <FileText size={20} className="text-ignum-copper" />
                  {paper.access === 'gated' && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-ignum-copper/20 text-ignum-copper font-mono text-[10px] uppercase tracking-wider">
                      <Lock size={10} />
                      Private
                    </span>
                  )}
                </div>
                <h4 className="font-display text-base font-bold text-ignum-offwhite mb-2 group-hover:text-ignum-copper transition-colors">
                  {paper.title}
                </h4>
                <p className="font-body text-sm text-ignum-gray leading-relaxed mb-4">
                  {paper.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-ignum-offwhite/10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-ignum-gray">{paper.date}</span>
                    <span className="font-mono text-[10px] text-ignum-gray">{paper.pages} pages</span>
                  </div>
                  <button className="flex items-center gap-1 font-mono text-xs text-ignum-copper hover:text-ignum-offwhite transition-colors">
                    <Download size={12} />
                    PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Repos */}
        <div ref={reposRef} className="mb-12">
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-4 flex items-center gap-2">
            <ExternalLink size={18} className="text-ignum-copper" />
            Open Source
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo, idx) => (
              <div key={idx} className="card-dark p-5 group hover:border-ignum-copper/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ExternalLink size={18} className="text-ignum-gray group-hover:text-ignum-copper transition-colors" />
                    <span className="font-mono text-sm text-ignum-offwhite">{repo.name}</span>
                  </div>
                  <span className="font-mono text-xs text-ignum-gray">★ {repo.stars}</span>
                </div>
                <p className="font-body text-sm text-ignum-gray mb-3">
                  {repo.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-ignum-copper uppercase tracking-wider">
                    {repo.language}
                  </span>
                  <a
                    href="#"
                    className="flex items-center gap-1 font-mono text-xs text-ignum-gray hover:text-ignum-offwhite transition-colors"
                  >
                    <ExternalLink size={10} />
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Field Notes Blog */}
        <div>
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-4 flex items-center gap-2">
            <PenTool size={18} className="text-ignum-copper" />
            Field Notes
          </h3>
          <div ref={blogRef} className="space-y-4">
            {blogPosts.map((post, idx) => (
              <div key={idx} className="card-dark p-5 flex flex-col md:flex-row md:items-center gap-4 group hover:border-ignum-copper/40 transition-all">
                <div className="flex items-center gap-3 md:w-48 flex-shrink-0">
                  <Calendar size={14} className="text-ignum-gray" />
                  <span className="font-mono text-xs text-ignum-gray">{post.date}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-ignum-copper/20 text-ignum-copper font-mono text-[10px] uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <h4 className="font-display text-base font-bold text-ignum-offwhite group-hover:text-ignum-copper transition-colors mb-1">
                    {post.title}
                  </h4>
                  <p className="font-body text-sm text-ignum-gray">
                    {post.excerpt}
                  </p>
                </div>
                <button className="flex items-center gap-1 font-mono text-xs text-ignum-gray hover:text-ignum-offwhite transition-colors flex-shrink-0">
                  Read
                  <ExternalLink size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchivoSection;
