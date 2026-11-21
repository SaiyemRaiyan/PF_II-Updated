import { useCallback, useEffect, useState } from 'react';
import { sections } from './data/profile.js';
import { useReveal } from './hooks/useReveal.js';
import Background from './components/Background.jsx';
import Loader from './components/Loader.jsx';
import Nav from './components/Nav.jsx';
import SideIndex from './components/SideIndex.jsx';
import Cursor from './components/Cursor.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Research from './components/Research.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Education from './components/Education.jsx';
import Leadership from './components/Leadership.jsx';
import Certificates from './components/Certificates.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [active, setActive] = useState('home');
  const [ready, setReady] = useState(false);
  const [palette, setPalette] = useState(false);
  const onDone = useCallback(() => setReady(true), []);
  useReveal('app');

  // Track which section sits in the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Loader onDone={onDone} />
      <Background active={active} />
      <Cursor />
      <a className="skip" href="#about">Skip to content</a>
      <Nav active={active} onPalette={() => setPalette(true)} />
      <SideIndex active={active} />
      <CommandPalette open={palette} setOpen={setPalette} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Experience />
        <Research />
        <Projects />
        <Skills />
        <Education />
        <Leadership />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
