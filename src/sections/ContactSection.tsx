import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Mail, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contactBlockRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contactBlockRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: contactBlockRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        formCardRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          scrollTrigger: {
            trigger: formCardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out. We will respond within two business days.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const footerLinks = [
    { label: 'Privacy', href: 'mailto:tommy@ignumprotocol.com' },
    { label: 'Terms', href: 'mailto:tommy@ignumprotocol.com' },
    { label: 'Contact', href: 'mailto:tommy@ignumprotocol.com' },
    { label: 'Support', href: '#' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative bg-ignum-charcoal ${className}`}
    >
      <div className="px-6 lg:px-[7vw] py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Block (Left) */}
          <div ref={contactBlockRef}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ignum-offwhite leading-[0.95] tracking-tight mb-6">
              <span className="text-gradient-copper">Contact.</span>
            </h2>

            <p className="font-body text-base md:text-lg text-ignum-gray leading-relaxed mb-10 max-w-md">
              Tell us what you are building. We will respond within two business days.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-ignum-gray">
                <MapPin size={16} className="text-ignum-copper" />
                <span className="font-mono text-sm">Cuadritos, Mexico</span>
              </div>
              <div className="flex items-center gap-3 text-ignum-gray">
                <Mail size={16} className="text-ignum-copper" />
                <span className="font-mono text-sm">field@ignum.io</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 p-4 bg-ignum-black/50 border border-ignum-offwhite/10">
              <div className="w-2 h-2 rounded-full bg-ignum-success animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-ignum-gray">
                Infrastructure in deployment
              </span>
            </div>
          </div>

          {/* Form Card (Right) */}
          <div ref={formCardRef}>
            <form onSubmit={handleSubmit} className="card-dark p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-ignum-gray mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-ignum-black border border-ignum-offwhite/20 text-ignum-offwhite font-mono text-sm placeholder:text-ignum-gray/50 focus:border-ignum-copper focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-ignum-gray mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-ignum-black border border-ignum-offwhite/20 text-ignum-offwhite font-mono text-sm placeholder:text-ignum-gray/50 focus:border-ignum-copper focus:outline-none transition-colors"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-ignum-gray mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-ignum-black border border-ignum-offwhite/20 text-ignum-offwhite font-mono text-sm placeholder:text-ignum-gray/50 focus:border-ignum-copper focus:outline-none transition-colors"
                  placeholder="work@company.com"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-ignum-gray mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-ignum-black border border-ignum-offwhite/20 text-ignum-offwhite font-mono text-sm placeholder:text-ignum-gray/50 focus:border-ignum-copper focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full btn-copper flex items-center justify-center gap-2 group"
              >
                <Send size={16} />
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="border-t border-ignum-offwhite/10 px-6 lg:px-[7vw] py-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-ignum-copper" />
            <span className="font-display text-sm font-bold text-ignum-offwhite">
              IGNUM
            </span>
          </div>

          <div className="flex items-center gap-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="font-mono text-xs text-ignum-gray hover:text-ignum-offwhite transition-colors flex items-center gap-1"
              >
                {link.label}
                <ExternalLink size={10} className="opacity-50" />
              </a>
            ))}
          </div>

          <span className="font-mono text-xs text-ignum-gray/50">
            © 2026 IGNUM Protocol
          </span>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
