import { useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import Badge from '../ui/Badge';
import skills from '../../data/skills';
import useScrollTrigger from '../../hooks/useScrollTrigger';
import gsap from 'gsap';

export default function Skills() {
  const sectionRef = useRef(null);

  useScrollTrigger(sectionRef, () => {
    gsap.fromTo(
      '.badge',
      { y: 24, scale: 0.8, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.05,
        duration: 0.45,
        ease: 'back.out(1.7)',
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
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
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
          Skills &amp; Technologies
        </h2>
        <div className="w-16 h-1 rounded mb-12" style={{ backgroundColor: '#7C3AED' }} />

        {/* Tech banner image */}
        <div style={{ marginBottom: '3rem', borderRadius: '1rem', overflow: 'hidden', position: 'relative', height: '160px' }}>
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
            alt="Code and technology"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.4) 50%, rgba(10,10,15,0.85) 100%)',
          }} />
          <p style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: 700,
            color: '#A78BFA', letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            Tools I Work With
          </p>
        </div>

        {/* Categories */}
        {skills.map(({ category, items }) => (
          <div key={category} className="mb-8">
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-3"
              style={{ color: '#06B6D4' }}
            >
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map(({ name, icon }) => {
                const IconComponent = LucideIcons[icon] || LucideIcons.Code2;
                return (
                  <Badge key={name} icon={IconComponent}>
                    {name}
                  </Badge>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
