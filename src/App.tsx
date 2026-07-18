import { MapNetwork } from './components/MapNetwork';
import { GlassPanel } from './components/GlassPanel';
import { StatCard, InfoTile, AnimatedCounter } from './components/Widgets';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Globe2, TrendingUp, Building2, Server, Award, Quote, Search, Blocks, MapPin, CheckCircle2, Linkedin } from 'lucide-react';

const testimonials = [
  {
    quote: "Among the most dedicated professionals I have worked with \u2014 trusted by stakeholders, respected across teams, and relentless in driving complex initiatives to successful outcomes.",
    name: "Vishwa Pratap S. Chauhan",
    role: "Sr. Transformation Leader \u00b7 University of Pittsburgh",
    initial: "V",
    linkedin: "https://www.linkedin.com/in/vpschauhan"
  },
  {
    quote: "A trusted professional who combines execution excellence with strong team collaboration, consistently delivering high \u2014 quality outcomes while driving positive change across programs.",
    name: "Sathyanarayana Rao",
    role: "Supply Chain Leader \u00b7 ISB",
    initial: "S",
    linkedin: "https://www.linkedin.com/in/sathyanarayana-rao-27747670"
  },
  {
    quote: "Recognized for combining domain expertise, execution excellence, and a collaborative approach that enables teams to deliver with confidence.",
    name: "Vikas Nimbewal",
    role: "Lead Product Manager \u00b7 IIM",
    initial: "V",
    linkedin: "https://www.linkedin.com/in/vikas-nimbewal"
  },
   {
    quote: "Known for taking ownership of critical challenges, delivering impactful outcomes, and building confidence across stakeholders through a composed and results \u2014 oriented approach.",
    name: "Pankaj Karajagi",
    role: "Global Supply Chain Manager \u00b7 University at Buffalo",
    initial: "P",
    linkedin: "https://www.linkedin.com/in/inpankaj"
  }
];

const impacts = [
  {
    icon: Building2,
    title: "Fortune 500 - FMCG Enterprise",
    desc: "Architected a strategic planning transformation across 500+ distribution nodes, enabling granular supply planning visibility while improving planning performance by 15%."
  },
  {
    icon: Globe2,
    title: "Fortune Global 500 - FMCG Enterprise",
    desc: "Led demand planning transformation across 20+ APAC markets, enabling scalable planning capabilities and consistent decision-making at scale."
  },
  {
    icon: Server,
    title: "Fortune Global 500 - Pharmaceutical Enterprise",
    desc: "Enabled enterprise-scale deployment across 30+ countries, ensuring operational readiness through disciplined governance, risk mitigation, and successful market adoption."
  },
  {
    icon: Globe2,
    title: "Global Pharmaceutical Enterprise",
    desc: "Served as the global point of accountability for supply chain planning operations, ensuring operational continuity and stakeholder confidence across worldwide markets."
  }
];

export default function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentImpact, setCurrentImpact] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImpact(prev => (prev + 1) % impacts.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] font-sans relative overflow-x-hidden">
      {/* Background Visualization */}
      <MapNetwork />
      
      {/* Immersive subtle ambient glows */}
      <div className="fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#0A84FF]/10 to-transparent pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/20 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#0A84FF] animate-pulse shadow-[0_0_12px_rgba(10,132,255,0.8)]" />
                <span className="font-display font-semibold tracking-widest text-[#0A84FF] uppercase text-xs">System Online</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
                Mohammed Waqas N S
              </h1>
              <p className="text-white/60 mb-12 max-w-md text-sm md:text-base leading-relaxed">
                Architecting robust global supply chain planning & S&OP transformations for Fortune enterprises.
              </p>
              
              <button 
                onClick={() => setHasEntered(true)}
                className="group relative px-8 py-4 bg-white/5 overflow-hidden rounded-full border border-white/10 hover:border-[#0A84FF]/40 transition-all duration-500 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A84FF]/0 via-[#0A84FF]/10 to-[#0A84FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                <span className="relative font-bold uppercase tracking-widest text-xs flex items-center gap-3 text-white/90 group-hover:text-white transition-colors">
                  Access Portfolio
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="portfolio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 container mx-auto px-4 md:px-6 py-8 md:py-24 max-w-6xl"
          >
            
            {/* Navigation / Header */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-center mb-8 md:mb-16 flex-wrap gap-4"
        >
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#0A84FF] animate-pulse shadow-[0_0_8px_rgba(10,132,255,0.8)] shrink-0" />
            <span className="font-display font-semibold tracking-wide text-sm text-white/90">Supply Chain Consultant</span>
          </div>
          <a href="https://in.linkedin.com/in/nsmdwaqas" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-[#F5F5F7] text-[#050505] text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 flex items-center gap-2">
            <Linkedin className="w-3.5 h-3.5" />
            Contact Me
          </a>
        </motion.nav>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:gap-5 auto-rows-min">
          
          {/* HERO SECTION - Span 8 columns */}
          <GlassPanel className="lg:col-span-8 flex flex-col justify-center min-h-[auto] md:min-h-[380px] p-5 md:p-6 lg:p-10 !overflow-visible md:!overflow-hidden" delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-6">
              <Globe2 className="w-4 h-4 text-[#0A84FF]" />
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#0A84FF]">C-Suite Consultant</span>
            </div>
            
            <div className="flex justify-between items-center mb-4 md:mb-6 gap-2">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.08] md:leading-[1.05] relative z-20">
                Mohammed<br className="md:hidden" /> Waqas <span className="text-[#0A84FF]"> N S</span>
              </h1>
              <div className="md:hidden shrink-0 relative mt-[-10px] mr-[-10px] sm:mr-[-15px]">
                <div className="absolute inset-0 bg-[#0A84FF]/30 rounded-full blur-2xl animate-pulse" />
                <div className="relative z-10 p-[2px] bg-gradient-to-tr from-[#0A84FF]/80 via-white/20 to-[#0A84FF]/40 rounded-full shadow-[0_12px_40px_rgba(10,132,255,0.4)]">
                  <img 
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghT1Hpa0McaRpYNpkhQaifumnN0QOyXPLn6sM4AUdq_joLXKVcnHNLq48c_7XuqRMIGFizFHjDXz7dHQdbrJieP3kq3PxpeET3C12o74nQCNza9l9PjMrCYcfcpkcQFnkfBhO0hcpyKX7OJge8gZBspP0c_6aL-xbqgDDVubn3HU4cPPJ902KeFY_CIEDU/s1600/nsmdwaqas.jpeg"
                    alt="Profile"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-[3px] border-[#0a0a0a]"
                  />
                </div>
              </div>
            </div>

            {/* MOBILE COMPACT KPI GRID */}
            <div className="md:hidden grid grid-cols-2 gap-3 mb-5 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div>
                <div className="text-2xl font-semibold text-[#F5F5F7] tracking-tight">
                  <AnimatedCounter value="6+" />
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-0.5">Years Exp</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-[#F5F5F7] tracking-tight">
                  <AnimatedCounter value="4" />
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-0.5">Clients</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-[#F5F5F7] tracking-tight">
                  <AnimatedCounter value="2" />
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-0.5">Industries</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-[#F5F5F7] tracking-tight">
                  <AnimatedCounter value="50+" />
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-0.5">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-[#F5F5F7] tracking-tight">
                  <AnimatedCounter value="$150B+" />
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-0.5">Revenue</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-[#F5F5F7] tracking-tight">
                  <AnimatedCounter value="15%+" />
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-0.5">Perf Gain</div>
              </div>
            </div>
            
            <p className="text-sm sm:text-lg md:text-xl text-white/60 mb-6 md:mb-10 max-w-xl leading-relaxed">
              Management Consultant at Accenture Strategy & Consulting. Architecting robust global supply chain planning and S&OP transformations.
            </p>

            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3 mt-auto">
              {['\ud83c\udfc6 Fortune Experience', '\ud83d\udc8a Pharmaceutical', '\ud83d\uded2 Consumer Goods', '\ud83c\udfc5 6+ Certifications'].map((tag) => (
                <div key={tag} className="px-2 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-sm font-medium text-white/80 md:shrink-0 flex items-center justify-center text-center">
                  {tag}
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* PROFILE IMAGE - Span 4 columns */}
          <GlassPanel className="hidden md:flex lg:col-span-4 p-0 lg:p-0 md:p-0 items-center justify-center min-h-[220px] md:min-h-[380px] group overflow-hidden" delay={0.2}>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 z-10 transition-opacity duration-500 group-hover:opacity-0" />
            <img 
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7hadg5NCE6x5wVi0D44tjB2lzV2rHikagJdAC2sccORP4oZ9cmRB_P0EBtuXtU2ZEUVWOJc2Q7-UUmjwCOhroWWhpYYW8fCo_adyg6NTBdKSyZnR8iE9_jZDCxGMv3-S2khGUcbNwvIXgUu_9UPqu8J8l726ghq_3El-kDgUWKyDz5_QxkcNxoO-z7oNj/s320/nsmdwaqas-waqas-chennai-india.jpeg" 
              alt="Mohammed Waqas NS"
              className="w-full h-full object-cover scale-[1.02] filter saturate-[0.8] contrast-125 transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:saturate-100"
            />
          </GlassPanel>

          {/* STATS STRIP - Span 12 */}
          <GlassPanel className="hidden md:block lg:col-span-12" delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
              <div className="hidden md:block"><StatCard label="Years Strategy" value="6+" subLabel="Experience" /></div>
              <StatCard label="Client Scale" value="$150B+" subLabel="Combined Revenue" />
              <div className="hidden md:block"><StatCard label="Global Reach" value="50+" subLabel="Operational Footprint" /></div>
              <div className="hidden md:block"><StatCard label="Industries" value="2" subLabel="Pharma & FMCG" /></div>
              <div className="hidden md:block"><StatCard label="Clients" value="4" subLabel="Enterprise Leaders" /></div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <StatCard label="Performance" value="15%+" subLabel="Processing Time Saved" />
              </div>
            </div>
          </GlassPanel>

          {/* IMPACT & SCALE - Span 6 */}
          <GlassPanel className="lg:col-span-6 flex flex-col" delay={0.4}>
            <h2 className="text-xl sm:text-2xl font-display font-semibold mb-6 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[#0A84FF]" /> Executive Impact
            </h2>
            <div className="relative flex-1 min-h-[200px] sm:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImpact}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-x-0 top-0"
                >
                  <InfoTile 
                    icon={impacts[currentImpact].icon}
                    title={<span className="text-[17px] sm:text-[19px]">{impacts[currentImpact].title}</span>}
                    desc={impacts[currentImpact].desc}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </GlassPanel>

          {/* TESTIMONIALS - Span 6 */}
          <GlassPanel className="lg:col-span-6 relative overflow-hidden" delay={0.6}>
            <Quote className="absolute top-6 right-6 w-24 h-24 text-white/[0.02] rotate-12 pointer-events-none" />
            <h2 className="text-xl sm:text-2xl font-display font-semibold mb-8">Leadership Trust</h2>
            
            <div className="relative min-h-[180px] sm:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-x-0 top-0"
                >
                  <p className="text-sm sm:text-base text-white/70 italic leading-relaxed mb-6 line-clamp-5 sm:line-clamp-4">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <a href={testimonials[currentTestimonial].linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0A84FF]/20 border border-[#0A84FF]/30 flex items-center justify-center font-display font-bold text-[#0A84FF] hover:bg-[#0A84FF]/30 transition-colors shrink-0">
                      {testimonials[currentTestimonial].initial}
                    </a>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <a href={testimonials[currentTestimonial].linkedin} target="_blank" rel="noopener noreferrer" className="text-[13px] sm:text-sm font-bold text-[#F5F5F7]/90 hover:text-white transition-colors truncate">
                          {testimonials[currentTestimonial].name}
                        </a>
                        <a href={testimonials[currentTestimonial].linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0A84FF] hover:opacity-80 transition-opacity shrink-0">
                          <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </a>
                      </div>
                      <div className="text-[11px] sm:text-xs text-[#F5F5F7]/50 truncate">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </GlassPanel>

          {/* GOOGLE PRESENCE - Span 12 */}
          <GlassPanel className="lg:col-span-12 flex flex-col md:flex-row justify-between items-center gap-8" delay={0.7}>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                  <span className="font-display font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] leading-none">G</span>
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-white/40 mb-1">AI Overview</div>
                  <h3 className="text-base sm:text-lg font-bold text-white/90">Mohammed Waqas</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-2xl">
                Discover my digital footprint across professional, search, and AI platforms - reflecting my journey in supply chain transformation, product leadership, and enterprise consulting.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[180px]">
               <a href="http://tinyurl.com/nsmdwaqas" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 flex-1 bg-[#0A84FF]/10 text-[#0A84FF] hover:bg-[#0A84FF]/20 transition-colors py-3 px-6 rounded-xl border border-[#0A84FF]/20 text-[13px] sm:text-sm font-medium whitespace-nowrap">
                  <Search className="w-4 h-4" /> Explore
               </a>
            </div>
          </GlassPanel>

        </div>

        {/* Footer */}
        <footer className="mt-16 md:mt-24 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <div className="text-center md:text-left">© {new Date().getFullYear()} Mohammed Waqas NS. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            Chennai, India
          </div>
        </footer>
      </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

