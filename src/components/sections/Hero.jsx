import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, ChevronDown, Bot } from 'lucide-react';
import Button from '../ui/Button';

const HeroScene = React.lazy(() => import('../three/HeroScene'));
gsap.registerPlugin(ScrollTrigger);

export default function Hero({ reducedMotion, onIntroVisibilityChange }) {
  const heroRef = useRef(null);
  const heroCoreRef = useRef(null);
  const revealOverlayRef = useRef(null);
  const introTextRef = useRef(null);
  const introLogoRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const summaryRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);
  const introVisibleRef = useRef(true);

  useEffect(() => {
    if (reducedMotion) {
      onIntroVisibilityChange?.(false);
      return;
    }

    const els = [nameRef, titleRef, summaryRef, ctaRef].map((r) => r.current).filter(Boolean);
    // hide before animating
    gsap.set(els, { opacity: 0 });
    if (socialsRef.current) gsap.set(socialsRef.current.children, { opacity: 0 });
    introVisibleRef.current = true;
    onIntroVisibilityChange?.(true);

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(nameRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.3)
      .fromTo(summaryRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.5)
      .fromTo(ctaRef.current, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 }, 0.7)
      .fromTo(
        socialsRef.current?.children ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 },
        0.9
      );

    const introTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=900',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const isIntroVisible = self.progress < 0.99;
          if (isIntroVisible !== introVisibleRef.current) {
            introVisibleRef.current = isIntroVisible;
            onIntroVisibilityChange?.(isIntroVisible);
          }
        },
        onLeave: () => onIntroVisibilityChange?.(false),
        onLeaveBack: () => onIntroVisibilityChange?.(true),
      },
    });

    introTimeline
      .fromTo(
        revealOverlayRef.current,
        { '--reveal-size': '0px', scale: 1 },
        { '--reveal-size': '140vmax', scale: 1.12, ease: 'none', duration: 1 },
        0
      )
      .fromTo(
        introTextRef.current,
        { scale: 0.88, y: 24, opacity: 0.65 },
        { scale: 1.24, y: -20, opacity: 1, ease: 'none', duration: 1 },
        0
      )
      .fromTo(
        introLogoRef.current,
        { scale: 0.9, y: 12, opacity: 0.6 },
        { scale: 1.2, y: -10, opacity: 1, ease: 'none', duration: 1 },
        0
      )
      .fromTo(
        heroCoreRef.current,
        { opacity: 1, scale: 1, y: 0 },
        { opacity: 0, scale: 0.94, y: -24, ease: 'none', duration: 0.45 },
        0.55
      );

    return () => {
      tl.kill();
      introTimeline.kill();
      onIntroVisibilityChange?.(false);
    };
  }, [reducedMotion, onIntroVisibilityChange]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', isolation: 'isolate' }}
    >
      {!reducedMotion && (
        <div
          ref={revealOverlayRef}
          aria-hidden="true"
          style={{
            '--reveal-size': '0px',
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            pointerEvents: 'none',
            backgroundImage:
              'radial-gradient(circle at 50% 45%, rgba(6,182,212,0.2), rgba(10,10,15,0.72) 70%), linear-gradient(140deg, rgba(124,58,237,0.3), rgba(6,182,212,0.18)), url("/hero-reveal-nebula.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(1.18) contrast(1.08) brightness(0.9)',
            WebkitMaskImage:
              'radial-gradient(circle at center, transparent var(--reveal-size), black calc(var(--reveal-size) + 1px))',
            maskImage:
              'radial-gradient(circle at center, transparent var(--reveal-size), black calc(var(--reveal-size) + 1px))',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 1.25rem',
            }}
          >
            <p
              ref={introTextRef}
              style={{
                fontFamily: 'Orbitron, Syne, sans-serif',
                fontSize: 'clamp(4.2rem, 12.8vw, 11.2rem)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '0.01em',
                color: '#FFFFFF',
                textShadow: '0 10px 40px rgba(8,12,28,0.85)',
                maxWidth: '1400px',
                width: '96vw',
              }}
            >
              VIBE CODING WITH AI AGENTS
            </p>
          </div>

          <div
            ref={introLogoRef}
            style={{
              position: 'absolute',
              right: 'clamp(1rem, 2.5vw, 2rem)',
              top: 'clamp(1rem, 2.5vw, 2rem)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid rgba(167,139,250,0.45)',
              backgroundColor: 'rgba(9,12,28,0.45)',
              backdropFilter: 'blur(4px)',
              borderRadius: '999px',
              padding: '0.65rem',
              color: '#C4B5FD',
              boxShadow: '0 8px 28px rgba(124,58,237,0.28)',
            }}
          >
            <Bot size={22} />
          </div>
        </div>
      )}

      <div ref={heroCoreRef} style={{ position: 'absolute', inset: 0 }}>
        {/* Three.js background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <React.Suspense
            fallback={
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at center, #1C1C2E 0%, #0A0A0F 70%)',
                }}
              />
            }
          >
            <HeroScene reducedMotion={reducedMotion} />
          </React.Suspense>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px', padding: '0 1.5rem', pointerEvents: 'auto', margin: '0 auto', top: '50%', transform: 'translateY(-50%)' }}>
          <h1
            ref={nameRef}
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 0%, #A78BFA 40%, #06B6D4 70%, #10B981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(167,139,250,0.5))',
              marginBottom: '0.25rem',
              display: 'block',
            }}
          >
            Manan Patel
          </h1>

          <p
            ref={titleRef}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#06B6D4',
              marginTop: '1rem',
            }}
          >
            Full Stack Developer
          </p>

          <p
            ref={summaryRef}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              color: '#94A3B8',
              marginTop: '1.25rem',
              maxWidth: '560px',
              margin: '1.25rem auto 0',
              lineHeight: 1.7,
            }}
          >
            Building scalable web applications with modern technologies and a passion for clean, performant code.
          </p>

          <div ref={ctaRef} style={{ marginTop: '2.5rem' }}>
            <Button variant="primary" onClick={scrollToAbout}>
              View My Work
            </Button>
          </div>

          <div ref={socialsRef} style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <a
              href="https://github.com/Ragnarok-Doom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="transition-colors duration-200"
              style={{ color: '#94A3B8' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F1F5F9')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/manan-patel-4b31b8300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="transition-colors duration-200"
              style={{ color: '#94A3B8' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F1F5F9')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ color: '#94A3B8' }}
        >
          <ChevronDown size={28} />
        </div>
      </div>
    </section>
  );
}
