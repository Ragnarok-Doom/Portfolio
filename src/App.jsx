import { useEffect, useState } from 'react';
import useReducedMotion from './hooks/useReducedMotion';
import ScrollProgress from './components/layout/ScrollProgress';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import AIToolsSlider from './components/sections/AIToolsSlider';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import BackToTop from './components/ui/BackToTop';
import CustomCursor from './components/ui/CustomCursor';

export default function App() {
  const reducedMotion = useReducedMotion();
  const [hideNavbar, setHideNavbar] = useState(!reducedMotion);

  useEffect(() => {
    setHideNavbar(!reducedMotion);
  }, [reducedMotion]);

  return (
    <div style={{ backgroundColor: '#0A0A0F', minHeight: '100vh' }}>
      <CustomCursor />
      <ScrollProgress />
      <Navbar hidden={hideNavbar} />
      <main>
        <Hero reducedMotion={reducedMotion} onIntroVisibilityChange={setHideNavbar} />
        <About />
        <Skills />
        <AIToolsSlider />
        <Experience />
        <Projects />
        <Contact />
        <footer
          className="text-center py-8 text-sm"
          style={{ color: '#475569' }}
        >
          © 2025 Manan Patel. Built with React, GSAP &amp; Three.js
        </footer>
      </main>
      <BackToTop />
    </div>
  );
}
