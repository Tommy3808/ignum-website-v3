import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, ArrowRight, CheckCircle, Cpu, Zap, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const slots = { total: 12, taken: 4 };

const qualifiers = [
  { icon: Cpu, label: 'GPU / HPC workload', desc: 'Training, inference, or large-scale compute' },
  { icon: Building2, label: 'Enterprise or institutional', desc: 'Regulated, sensitive, or sovereign workloads' },
  { icon: Zap, label: 'Dedicated infrastructure need', desc: 'Not a fit for generic public cloud' },
];

interface FieldAccessSectionProps { className?: string; }

const FieldAccessSection = ({ className = '' }: FieldAccessSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: '', company: '', email: '', workload: '', usecase: '', timeline: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' };
      gsap.fromTo(headingRef.current, { y: '4vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: st });
      gsap.fromTo(formRef.current, { y: '5vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', delay: 0.1, scrollTrigger: st });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.company.trim()) e.company = 'Required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (!form.workload.trim()) e.workload = 'Required';
    if (!form.usecase) e.usecase = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Send to contact API
    try {
      await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: `Field Access Request:\nName: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nWorkload: ${form.workload}\nUse case: ${form.usecase}\nTimeline: ${form.timeline}` }] }),
      });
    } catch {}
    setSubmitted(true);
  };

  const slotsLeft = slots.total - slots.taken;

  return (
    <section ref={sectionRef} id="field-access" className={`bg-ignum-black py-24 px-8 md:px-16 lg:px-24 ${className}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left */}
        <div ref={headingRef}>
          <div className="flex items-center gap-2 mb-4">
            <Lock size={14} className="text-ignum-copper" />
            <span className="font-mono text-xs uppercase tracking-widest text-ignum-copper">Field Access</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-6">
            Bring your workload<br />to sovereign ground.
          </h2>
          <p className="font-body text-ignum-gray leading-relaxed mb-8">
            We evaluate every request. Access is extended to organizations with the right workload profile — not by capital threshold, but by fit.
          </p>

          {/* Qualifiers */}
          <div className="space-y-3 mb-8">
            <p className="font-mono text-xs uppercase tracking-wider text-ignum-gray/60">Who this is for:</p>
            {qualifiers.map((q, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border border-ignum-offwhite/10">
                <q.icon size={14} className="text-ignum-copper mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-mono text-xs text-ignum-offwhite">{q.label}</p>
                  <p className="font-mono text-[10px] text-ignum-gray/60">{q.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Slots */}
          <div className="p-4 border border-ignum-copper/20 bg-ignum-copper/5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-ignum-gray">Phase 1 Design Partners</span>
              <span className="font-mono text-sm font-bold text-ignum-copper">{slotsLeft} / {slots.total} available</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: slots.total }).map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 ${i < slots.taken ? 'bg-ignum-copper' : 'bg-ignum-offwhite/10'}`} />
              ))}
            </div>
            <p className="font-mono text-[9px] text-ignum-gray/40 mt-2 uppercase tracking-wider">Response within 48 hours</p>
          </div>
        </div>

        {/* Right — Form */}
        <div ref={formRef}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <CheckCircle size={32} className="text-ignum-success mb-4" />
              <h3 className="font-display text-2xl font-bold text-ignum-offwhite mb-2">Request received.</h3>
              <p className="font-body text-ignum-gray text-sm">We review every submission personally. You'll hear from us within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text' },
                { key: 'company', label: 'Organization', placeholder: 'Company or institution', type: 'text' },
                { key: 'email', label: 'Work Email', placeholder: 'work@company.com', type: 'email' },
                { key: 'workload', label: 'Workload Description', placeholder: 'What are you deploying? Scale, model, inference or training?', type: 'text' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ignum-gray mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 bg-ignum-charcoal/40 border border-ignum-offwhite/10 text-ignum-offwhite font-mono text-sm placeholder:text-ignum-gray/40 focus:border-ignum-copper focus:outline-none transition-colors"
                  />
                  {errors[f.key] && <p className="font-mono text-[9px] text-red-400 mt-1">{errors[f.key]}</p>}
                </div>
              ))}

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-ignum-gray mb-1">Use Case</label>
                <select
                  value={form.usecase}
                  onChange={e => setForm(prev => ({ ...prev, usecase: e.target.value }))}
                  className="w-full px-4 py-3 bg-ignum-charcoal/40 border border-ignum-offwhite/10 text-ignum-offwhite font-mono text-sm focus:border-ignum-copper focus:outline-none transition-colors"
                >
                  <option value="">Select use case</option>
                  <option value="hpc-colocation">HPC / AI Colocation</option>
                  <option value="private-inference">Private Inference Environment</option>
                  <option value="sovereign-compute">Sovereign Compute Deployment</option>
                  <option value="enterprise-training">Enterprise Training Infrastructure</option>
                  <option value="partnership">Infrastructure Partnership</option>
                </select>
                {errors.usecase && <p className="font-mono text-[9px] text-red-400 mt-1">{errors.usecase}</p>}
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-ignum-gray mb-1">Timeline</label>
                <select
                  value={form.timeline}
                  onChange={e => setForm(prev => ({ ...prev, timeline: e.target.value }))}
                  className="w-full px-4 py-3 bg-ignum-charcoal/40 border border-ignum-offwhite/10 text-ignum-offwhite font-mono text-sm focus:border-ignum-copper focus:outline-none transition-colors"
                >
                  <option value="">When do you need capacity?</option>
                  <option value="immediate">Immediate (Q2 2026)</option>
                  <option value="q3-2026">Q3 2026</option>
                  <option value="q4-2026">Q4 2026</option>
                  <option value="2027">2027</option>
                  <option value="exploring">Exploring / evaluating</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full btn-copper flex items-center justify-center gap-2 group mt-2"
              >
                Request Field Access
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="font-mono text-[9px] text-ignum-gray/40 text-center uppercase tracking-wider">
                No capital threshold. Fit determines access.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default FieldAccessSection;
