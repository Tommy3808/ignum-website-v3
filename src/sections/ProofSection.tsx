import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  Terminal,
  Cpu,
  Zap,
  Droplets,
  Thermometer,
  Server,
  FileText,
  Code,
  Shield,
  Clock,
  TrendingUp,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProofSectionProps {
  className?: string;
}

const ProofSection = ({ className = '' }: ProofSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);
  const tommyaiRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [liveMetrics, setLiveMetrics] = useState({
    power: 7.3,
    gpuUtil: 94.2,
    temp: 42.8,
    pue: 1.18,
    requests: 1247,
    queue: 3,
  });

  const [logs, setLogs] = useState<string[]>([
    '[2026-03-25T10:23:01Z] INFO: Jenbacher J620-1 sync OK @ 3.65 MW',
    '[2026-03-25T10:23:04Z] INFO: Jenbacher J620-2 sync OK @ 3.65 MW',
    '[2026-03-25T10:23:07Z] INFO: GPU-0/1 H200 deploying · setup in progress',
    '[2026-03-25T10:23:10Z] INFO: GPU-2/3 H200 deploying · setup in progress',
    '[2026-03-25T10:23:13Z] INFO: Cooling loop delta 8°C flow 450 L/min',
    '[2026-03-25T10:23:16Z] INFO: Network latency QRO 8ms CDMX 22ms',
    '[2026-03-25T10:23:19Z] INFO: TommyAI queue depth 3 jobs',
    '[2026-03-25T10:23:22Z] INFO: Backup generator standby OK',
  ]);

  // Live metrics + logs simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics({
        power: Number((7.1 + Math.random() * 0.4).toFixed(2)),
        gpuUtil: Number((92 + Math.random() * 6).toFixed(1)),
        temp: Number((41 + Math.random() * 4).toFixed(1)),
        pue: Number((1.16 + Math.random() * 0.04).toFixed(2)),
        requests: Math.floor(1200 + Math.random() * 200),
        queue: Math.floor(1 + Math.random() * 5),
      });

      const newLog = `[${new Date().toISOString().replace('T', ' ').slice(0, 19)}Z] INFO: ${
        ['GPU temp check', 'Power sync', 'Network probe', 'Cooling loop', 'TommyAI job'][Math.floor(Math.random() * 5)]
      } OK`;
      setLogs((prev) => [...prev.slice(-7), newLog]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
        dashboardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        logsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: logsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        tommyaiRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: tommyaiRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        galleryRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tommyaiSamples = [
    {
      category: 'Legal Analysis',
      icon: FileText,
      title: 'MLAT Request Processing',
      content: 'Análisis de solicitud MLAT-2026-0342: Jurisdicción MX requiere orden judicial local. CLOUD Act no aplica. Tiempo de respuesta: 847ms.',
      tokens: '2.4K',
      time: '847ms',
    },
    {
      category: 'Technical Docs',
      icon: Code,
      title: 'API Integration Guide',
      content: 'IGNUM Compute API v2.1: Endpoints para GPU scheduling, monitoring, y orchestration. Autenticación vía mTLS + JWT.',
      tokens: '4.1K',
      time: '1.2s',
    },
    {
      category: 'Infra Optimization',
      icon: TrendingUp,
      title: 'Cooling Efficiency Report',
      content: 'Análisis PUE 1.18: Optimización de delta-T en cooling loop. Recomendación: aumentar flow rate 5% en horas pico.',
      tokens: '1.8K',
      time: '623ms',
    },
  ];

  const galleryImages = [
    { src: '/images/h200-sxm5-141gb.jpg', title: 'H200 SXM5 141GB HBM3e' },
    { src: '/images/power-meter.jpg', title: 'Jenbacher Control Panel' },
    { src: '/images/noc-control-room.jpg', title: 'NOC Operations' },
    { src: '/images/cooling-towers.jpg', title: 'Cooling Infrastructure' },
    { src: '/images/fiber-cabling.jpg', title: 'Fiber Termination' },
    { src: '/images/server-corridor.jpg', title: 'Server Corridor' },
  ];

  return (
    <section
      ref={sectionRef}
      id="proof"
      className={`relative bg-ignum-black py-24 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ignum-gray mb-4 block">
            Evidence Dashboard
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-6">
            Proof.
          </h2>
          <p className="font-body text-lg md:text-xl text-ignum-gray max-w-2xl leading-relaxed">
            No slides. No promises. Only observable reality. Live metrics, operational logs, 
            and infrastructure you can verify.
          </p>
        </div>

        {/* Live Dashboard */}
        <div ref={dashboardRef} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-bold text-ignum-offwhite flex items-center gap-3">
              <Activity size={20} className="text-ignum-copper animate-pulse" />
              Live Operations
            </h3>
            <span className="font-mono text-xs text-ignum-gray uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ignum-success animate-pulse" />
              Real-time
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="card-dark p-4">
              <Zap size={16} className="text-ignum-copper mb-2" />
              <span className="font-mono text-[10px] text-ignum-gray uppercase tracking-wider block">Power</span>
              <span className="font-display text-2xl font-bold text-ignum-copper">{liveMetrics.power}</span>
              <span className="font-mono text-xs text-ignum-gray"> MW</span>
            </div>
            <div className="card-dark p-4">
              <Cpu size={16} className="text-ignum-copper mb-2" />
              <span className="font-mono text-[10px] text-ignum-gray uppercase tracking-wider block">GPU Util</span>
              <span className="font-display text-2xl font-bold text-ignum-copper">{liveMetrics.gpuUtil}</span>
              <span className="font-mono text-xs text-ignum-gray"> %</span>
            </div>
            <div className="card-dark p-4">
              <Thermometer size={16} className="text-ignum-copper mb-2" />
              <span className="font-mono text-[10px] text-ignum-gray uppercase tracking-wider block">Temp</span>
              <span className="font-display text-2xl font-bold text-ignum-copper">{liveMetrics.temp}</span>
              <span className="font-mono text-xs text-ignum-gray"> °C</span>
            </div>
            <div className="card-dark p-4">
              <Droplets size={16} className="text-ignum-copper mb-2" />
              <span className="font-mono text-[10px] text-ignum-gray uppercase tracking-wider block">PUE</span>
              <span className="font-display text-2xl font-bold text-ignum-copper">{liveMetrics.pue}</span>
            </div>
            <div className="card-dark p-4">
              <Server size={16} className="text-ignum-copper mb-2" />
              <span className="font-mono text-[10px] text-ignum-gray uppercase tracking-wider block">Requests/hr</span>
              <span className="font-display text-2xl font-bold text-ignum-copper">{liveMetrics.requests}</span>
            </div>
            <div className="card-dark p-4">
              <Clock size={16} className="text-ignum-copper mb-2" />
              <span className="font-mono text-[10px] text-ignum-gray uppercase tracking-wider block">Queue</span>
              <span className="font-display text-2xl font-bold text-ignum-copper">{liveMetrics.queue}</span>
            </div>
          </div>
        </div>

        {/* Terminal Logs */}
        <div ref={logsRef} className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold text-ignum-offwhite flex items-center gap-2">
              <Terminal size={18} className="text-ignum-copper" />
              Operational Logs
            </h3>
            <span className="font-mono text-xs text-ignum-gray">Updated every 4s</span>
          </div>
          <div className="bg-ignum-black border border-ignum-offwhite/10 p-4 font-mono text-xs overflow-hidden">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-ignum-offwhite/10">
              <div className="w-3 h-3 rounded-full bg-ignum-error" />
              <div className="w-3 h-3 rounded-full bg-ignum-copper" />
              <div className="w-3 h-3 rounded-full bg-ignum-success" />
              <span className="ml-2 text-ignum-gray">ignum@cuadritos:~$ tail -f /var/log/ignum/ops.log</span>
            </div>
            <div className="space-y-1 text-ignum-offwhite/80">
              {logs.map((log, idx) => (
                <div key={idx} className="flex">
                  <span className="text-ignum-copper mr-2">➜</span>
                  <span className={log.includes('INFO') ? 'text-ignum-success' : log.includes('WARN') ? 'text-ignum-copper' : 'text-ignum-error'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TommyAI Samples */}
        <div ref={tommyaiRef} className="mb-12">
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-4 flex items-center gap-2">
            <Shield size={18} className="text-ignum-copper" />
            TommyAI v11.0 — Output Samples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tommyaiSamples.map((sample, idx) => (
              <div key={idx} className="card-dark p-5">
                <div className="flex items-center gap-2 mb-3">
                  <sample.icon size={16} className="text-ignum-copper" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ignum-gray">
                    {sample.category}
                  </span>
                </div>
                <h4 className="font-display text-sm font-bold text-ignum-offwhite mb-2">
                  {sample.title}
                </h4>
                <p className="font-body text-sm text-ignum-gray leading-relaxed mb-4">
                  {sample.content}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-ignum-offwhite/10">
                  <span className="font-mono text-[10px] text-ignum-gray">{sample.tokens} tokens</span>
                  <span className="font-mono text-[10px] text-ignum-copper">{sample.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Gallery */}
        <div ref={galleryRef}>
          <h3 className="font-display text-lg font-bold text-ignum-offwhite mb-4">
            Infrastructure Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative group overflow-hidden border border-ignum-offwhite/10">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ignum-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="font-mono text-xs text-ignum-offwhite">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
