import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Infrastructure', id: 'infrastructure', href: '/infrastructure' },
    { label: 'Solutions', id: 'commercial', href: '/solutions' },
    { label: 'About', id: 'about', href: '/about' },
    { label: 'Access', id: 'field-access', href: '/access' },
    { label: 'Contact', id: 'contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-ignum-black/90 backdrop-blur-md border-b border-ignum-offwhite/5'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-[7vw] py-4 lg:py-6">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-ignum-copper animate-pulse-copper" />
            </div>
            <span className="font-display text-lg lg:text-xl font-bold text-ignum-offwhite tracking-tight group-hover:text-ignum-copper transition-colors">
              IGNUM
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-mono text-xs uppercase tracking-widest text-ignum-gray hover:text-ignum-offwhite transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-ignum-copper transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <a
              href="/tommyai"
              className="font-mono text-xs uppercase tracking-widest text-ignum-copper hover:text-ignum-copper-light transition-colors relative group flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-ignum-copper animate-pulse" />
              TommyAI
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-ignum-copper transition-all duration-300 group-hover:w-full" />
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-copper-outline text-xs py-2 px-4"
            >
              Request Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-ignum-offwhite"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-ignum-black/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-display text-2xl text-ignum-offwhite hover:text-ignum-copper transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-copper mt-4"
          >
            Request Access
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
