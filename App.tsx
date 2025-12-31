
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroCurtain from './components/HeroCurtain';
import ScrollBadge from './components/ScrollBadge';
import AIService from './components/AIService';

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

const App: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formValues.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^(?=(?:\D*\d){9,15}\D*$)\+?[\d\s.()-]+$/;
    if (!formValues.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formValues.phone)) {
      newErrors.phone = 'Invalid format. Use 9-15 digits (e.g. +48 123 456 789)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Thank you! Your consultation request has been sent successfully.');
      setFormValues({ fullName: '', email: '', phone: '' });
      setIsSubmitting(false);
    }
  };

  const showBackToTop = scrollY > 400;

  return (
    <div className="min-h-screen font-sans text-brand-text bg-brand-light selection:bg-brand-accent selection:text-white overflow-x-hidden relative">
      <Header />
      
      {/* ScrollBadge is placed here to ensure a clean fixed stacking context above all sections */}
      <ScrollBadge />

      <main id="top" className="relative">
        {/* SEO H1 - Visually Hidden */}
        <h1 className="sr-only">MTG GROUP — Digital Financial Strategy & Capital Management</h1>
        
        <HeroCurtain />

        {/* Services Section */}
        <section id="services" className="py-24 border-t border-black/5 bg-brand-light relative z-[20]">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="h-px w-20 bg-black/10"></div>
                <h2 className="font-display font-bold text-4xl uppercase tracking-tight leading-[1.2] py-1">Services</h2>
                <div className="h-px w-20 bg-black/10"></div>
              </div>
              <p className="text-brand-text/60 leading-relaxed font-medium">
                We operate on hard data. We optimize cashflow, cost structure, and strategic decisions 
                for scalable long-term growth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { label: 'Diagnosis & Audit', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
                { label: 'Cashflow & Liquidity', icon: 'M2 5h20v14H2z M2 10h20' },
                { label: 'Costs & Margins', icon: 'M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
                { label: 'Human Capital', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8' },
                { label: 'Result Control', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' }
              ].map((svc, i) => (
                <div key={i} className="group flex flex-col items-center text-center gap-6 p-6 rounded-2xl hover:bg-white transition-all hover:shadow-xl focus-within:bg-white">
                  <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center text-brand-text/50 group-hover:border-brand-text group-hover:text-brand-text transition-all group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={svc.icon} /></svg>
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] leading-[1.2]">{svc.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="relative py-32 bg-brand-dark text-white overflow-hidden z-[20]">
          <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 font-display font-bold text-[18vw] text-white/[0.03] whitespace-nowrap pointer-events-none uppercase leading-none">
            Process
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="font-display font-bold text-4xl text-center mb-20 uppercase tracking-tight leading-[1.2] py-1">Collaboration Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              {[
                { n: '01', t: 'Contact', d: 'Initial talk to understand the scale of challenges.' },
                { n: '02', t: 'Analysis', d: 'Verification of documents and business model.' },
                { n: '03', t: 'Strategy', d: 'Preparation of a recovery or development plan.' },
                { n: '04', t: 'Deployment', d: 'Implementation of changes in financial processes.' },
                { n: '05', t: 'Results', d: 'Constant monitoring and reporting of effects.' }
              ].map((step, i) => (
                <div key={i} className="border-l border-white/20 pl-6 h-full flex flex-col gap-4 group">
                  <span className="font-mono text-white/40 text-xs leading-[1.2]">{step.n}</span>
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight group-hover:text-brand-accent transition-colors leading-[1.2]">{step.t}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI & Contact Section */}
        <section id="contact" className="bg-white relative z-[20]">
          <div className="grid grid-cols-1 lg:grid-cols-[70px_1fr] min-h-[700px]">
            {/* Social Rail */}
            <aside className="hidden lg:flex flex-col items-center py-10 gap-6 border-r border-black/5">
              {[
                { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4' },
                { label: 'WhatsApp', path: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' }
              ].map((social, i) => (
                <a key={i} href="#" aria-label={social.label} className="w-10 h-10 border border-black/10 rounded-xl flex items-center justify-center hover:bg-black/5 hover:-translate-y-1 transition-all shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={social.path} /></svg>
                </a>
              ))}
            </aside>

            <div className="flex flex-col">
              <div className="h-40 bg-brand-dark" aria-hidden="true"></div>
              
              <div className="container mx-auto px-6 -mt-24 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Left: Standard Contact */}
                  <div className="bg-white p-10 rounded-2xl shadow-2xl border border-black/5 h-full">
                    <h2 className="font-display font-bold text-3xl uppercase tracking-tight mb-8 text-center leading-[1.2] py-1">Consultation Request</h2>
                    <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="text-xs font-mono text-black/40 uppercase tracking-widest pl-1">Full Name</label>
                        <input 
                          type="text" 
                          id="fullName"
                          required
                          aria-required="true"
                          value={formValues.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe" 
                          className={`px-4 py-3 border-b outline-none transition-colors bg-transparent ${errors.fullName ? 'border-red-500' : 'border-black/20 focus:border-brand-accent'}`} 
                        />
                        {errors.fullName && <span className="text-[10px] text-red-500 font-mono pl-1" role="alert">{errors.fullName}</span>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-mono text-black/40 uppercase tracking-widest pl-1">Contact Email</label>
                        <input 
                          type="email" 
                          id="email"
                          required
                          aria-required="true"
                          value={formValues.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com" 
                          className={`px-4 py-3 border-b outline-none transition-colors bg-transparent ${errors.email ? 'border-red-500' : 'border-black/20 focus:border-brand-accent'}`} 
                        />
                        {errors.email && <span className="text-[10px] text-red-500 font-mono pl-1" role="alert">{errors.email}</span>}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 pl-1">
                          <label htmlFor="phone" className="text-xs font-mono text-black/40 uppercase tracking-widest leading-[1.2]">Phone</label>
                        </div>
                        <input 
                          type="tel" 
                          id="phone"
                          required
                          aria-required="true"
                          value={formValues.phone}
                          onChange={handleInputChange}
                          placeholder="+1 000 000 000" 
                          className={`px-4 py-3 border-b outline-none transition-colors bg-transparent ${errors.phone ? 'border-red-500' : 'border-black/20 focus:border-brand-accent'}`} 
                        />
                        {errors.phone && <span className="text-[10px] text-red-500 font-mono pl-1" role="alert">{errors.phone}</span>}
                      </div>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 mt-4 border-2 font-mono font-bold uppercase text-sm tracking-[0.2em] transition-all hover:-translate-y-1 ${isSubmitting ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white'}`}
                      >
                        {isSubmitting ? 'Sending...' : 'Book a Call'}
                      </button>
                    </form>
                  </div>

                  {/* Right: AI Strategist */}
                  <AIService />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-20 border-t border-black/10">
                  {[
                    { l: 'Call Us', v: '+48 000 000 000', i: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' },
                    { l: 'Email Us', v: 'contact@mtggroup.pro', i: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
                    { l: 'WhatsApp', v: 'Click to start chat', i: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' }
                  ].map((card, i) => (
                    <div key={i} className="flex flex-col items-center p-12 border-r last:border-r-0 border-black/10 hover:bg-slate-50 transition-colors text-center gap-4">
                      <svg className="w-8 h-8 text-brand-dark" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true"><path d={card.i} /></svg>
                      <span className="font-display font-bold text-lg uppercase tracking-tight leading-[1.2] py-1">{card.l}</span>
                      <p className="text-black/60 font-mono text-sm leading-[1.2]">{card.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <footer className="border-t border-black/10 p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-black/50">
                <span>© 2025 MTG GROUP. ALL RIGHTS RESERVED.</span>
                <nav className="flex gap-8 font-mono uppercase tracking-widest">
                  <a href="#services" className="hover:text-black focus:underline">Services</a>
                  <a href="#process" className="hover:text-black focus:underline">Process</a>
                  <a href="#contact" className="hover:text-black focus:underline">Contact</a>
                </nav>
              </footer>
            </div>
          </div>
        </section>
      </main>
      
      {/* Back to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
        className={`fixed bottom-10 right-10 w-12 h-12 bg-brand-dark text-white rounded-full flex items-center justify-center shadow-2xl z-[1200] hover:-translate-y-2 focus-visible:ring-4 focus-visible:ring-brand-accent transition-all duration-300 ${showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
      </button>
    </div>
  );
};

export default App;
