import { useRef } from 'react';
import TimelineEntry from '../ui/TimelineEntry';
import experience from '../../data/experience';
import useScrollTrigger from '../../hooks/useScrollTrigger';
import gsap from 'gsap';

export default function Experience() {
  const sectionRef = useRef(null);

  useScrollTrigger(sectionRef, () => {
    gsap.fromTo(
      '[data-side="left"]',
      { x: -70, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );
    gsap.fromTo(
      '[data-side="right"]',
      { x: 70, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );
  });

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto" ref={sectionRef}>
        {/* Heading */}
        <h2
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: 'Syne, sans-serif',
            background: 'linear-gradient(to right, #F1F5F9, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Experience
        </h2>
        <div className="w-16 h-1 rounded mb-12" style={{ backgroundColor: '#7C3AED' }} />

        {/* Office/work banner */}
        <div style={{ marginBottom: '3rem', borderRadius: '1rem', overflow: 'hidden', position: 'relative', height: '180px' }}>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
            alt="Professional workspace"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.5) 50%, rgba(10,10,15,0.9) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', color: '#06B6D4', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Career Journey</p>
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 700, color: '#F1F5F9' }}>Building Real-World Products</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop only) */}
          <div
            className="absolute top-0 bottom-0 hidden md:block"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              width: '1px',
              backgroundColor: '#1C1C2E',
            }}
          />

          <div className="flex flex-col gap-10">
            {experience.map((entry, index) => (
              <TimelineEntry key={index} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
