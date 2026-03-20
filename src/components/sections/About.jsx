import { useRef } from 'react';
import { GraduationCap, Download } from 'lucide-react';
import Button from '../ui/Button';
import useScrollTrigger from '../../hooks/useScrollTrigger';
import gsap from 'gsap';

const education = [
  { degree: 'BCA', school: 'CVM University, Anand', result: 'CGPA: 9.06' },
  { degree: 'Higher Secondary', school: 'Rosary High School, Vadodara', result: '75%' },
  { degree: 'High School', school: 'Rosary High School, Vadodara', result: '85%' },
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useScrollTrigger(sectionRef, () => {
    gsap.fromTo(
      imageRef.current,
      { x: -70, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
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
      textRef.current,
      { x: 70, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.75,
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
    <section id="about" className="py-24 px-6">
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
          About Me
        </h2>
        <div className="w-16 h-1 rounded mb-12" style={{ backgroundColor: '#7C3AED' }} />

        {/* Two-column grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: developer card */}
          <div ref={imageRef} className="flex justify-center">
            <div style={{
              width: '320px',
              borderRadius: '1.5rem',
              border: '1px solid rgba(124,58,237,0.4)',
              backgroundColor: '#12121A',
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(124,58,237,0.15)',
            }}>
              {/* Terminal bar */}
              <div style={{
                backgroundColor: '#1C1C2E',
                padding: '0.6rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F87171', display: 'inline-block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FBBF24', display: 'inline-block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#34D399', display: 'inline-block' }} />
                <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: '#475569', fontFamily: 'monospace' }}>manan.dev</span>
              </div>

              {/* Avatar + name block */}
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{
                  width: '96px', height: '96px', borderRadius: '50%', margin: '0 auto 1rem',
                  background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', fontWeight: 800, color: '#fff',
                  fontFamily: 'Syne, sans-serif',
                  boxShadow: '0 0 30px rgba(124,58,237,0.4)',
                }}>
                  MP
                </div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#F1F5F9' }}>Manan Patel</p>
                <p style={{ fontSize: '0.8rem', color: '#06B6D4', marginTop: '0.25rem', letterSpacing: '0.1em' }}>Full Stack Developer</p>
              </div>

              {/* Code snippet */}
              <div style={{ padding: '0 1.25rem 1.5rem', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.8 }}>
                <p><span style={{ color: '#A78BFA' }}>const</span> <span style={{ color: '#67E8F9' }}>dev</span> <span style={{ color: '#F1F5F9' }}>=</span> {'{'}</p>
                <p style={{ paddingLeft: '1rem' }}><span style={{ color: '#34D399' }}>stack</span><span style={{ color: '#F1F5F9' }}>:</span> <span style={{ color: '#FBBF24' }}>'Laravel · Vue · React'</span><span style={{ color: '#F1F5F9' }}>,</span></p>
                <p style={{ paddingLeft: '1rem' }}><span style={{ color: '#34D399' }}>location</span><span style={{ color: '#F1F5F9' }}>:</span> <span style={{ color: '#FBBF24' }}>'Vadodara, India'</span><span style={{ color: '#F1F5F9' }}>,</span></p>
                <p style={{ paddingLeft: '1rem' }}><span style={{ color: '#34D399' }}>open</span><span style={{ color: '#F1F5F9' }}>:</span> <span style={{ color: '#A78BFA' }}>true</span></p>
                <p>{'}'}<span style={{ color: '#A78BFA', animation: 'blink 1s step-end infinite' }}>_</span></p>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div ref={textRef}>
            <p style={{ color: '#94A3B8' }} className="leading-relaxed">
              I'm a Full Stack Developer based in Vadodara, India, with a passion for building
              scalable, real-world applications. I specialize in Laravel, Vue, React, and MySQL,
              and I actively leverage AI tools to accelerate development and improve code quality.
            </p>

            <h3
              className="text-lg font-semibold mt-6 mb-3"
              style={{ color: '#06B6D4' }}
            >
              Education
            </h3>

            <ul className="flex flex-col gap-3">
              {education.map(({ degree, school, result }) => (
                <li key={degree} className="flex items-start gap-2">
                  <GraduationCap size={16} className="mt-0.5 shrink-0" style={{ color: '#7C3AED' }} />
                  <span className="text-sm" style={{ color: '#94A3B8' }}>
                    <span style={{ color: '#F1F5F9' }}>{degree}</span> — {school} |{' '}
                    <span style={{ color: '#A78BFA' }}>{result}</span>
                  </span>
                </li>
              ))}
            </ul>

            <a href="/MananPatel2026Final.pdf" download className="inline-block mt-6">
              <Button variant="ghost" className="flex items-center gap-2">
                <Download size={16} />
                Download Resume
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
