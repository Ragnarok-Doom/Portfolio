import { useRef, useEffect } from 'react';
import { ExternalLink, Globe, Calendar } from 'lucide-react';
import gsap from 'gsap';

export default function ProjectCard({ project }) {
  const { name, tagline, stack, period, description, github, live, image } = project;
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onEnter = () => gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
    const onLeave = () => gsap.to(card, { y: 0, duration: 0.3 });

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-3 rounded-xl overflow-hidden"
      style={{ backgroundColor: '#12121A', border: '1px solid #1C1C2E' }}
    >
      {/* Project image */}
      {image && (
        <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
          <img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(18,18,26,0.95) 100%)',
          }} />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col gap-3 p-6" style={{ paddingTop: image ? '0.75rem' : '1.5rem' }}>
      {/* Header */}
      <div>
        <h3
          className="text-lg font-bold"
          style={{ fontFamily: 'Syne, sans-serif', color: '#7C3AED' }}
        >
          {name}
        </h3>
        <p className="text-sm" style={{ color: '#94A3B8' }}>{tagline}</p>
      </div>

      {/* Period */}
      <div className="flex items-center gap-1.5 text-xs" style={{ color: '#475569' }}>
        <Calendar size={12} />
        {period}
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md px-2 py-1 text-xs"
            style={{ backgroundColor: '#1C1C2E', color: '#06B6D4' }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
        {description}
      </p>

      {/* Footer links */}
      {(github !== null || live !== null) && (
        <div className="flex gap-3 pt-1">
          {github !== null && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              className="transition-opacity hover:opacity-70"
              style={{ color: '#94A3B8' }}
            >
              <ExternalLink size={16} />
            </a>
          )}
          {live !== null && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live demo"
              className="transition-opacity hover:opacity-70"
              style={{ color: '#94A3B8' }}
            >
              <Globe size={16} />
            </a>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
