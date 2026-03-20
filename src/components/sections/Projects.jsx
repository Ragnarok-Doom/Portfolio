import { useRef } from 'react';
import ProjectCard from '../ui/ProjectCard';
import projects from '../../data/projects';
import useScrollTrigger from '../../hooks/useScrollTrigger';
import gsap from 'gsap';

export default function Projects() {
  const sectionRef = useRef(null);

  useScrollTrigger(sectionRef, () => {
    gsap.fromTo(
      '.project-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
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
    <section id="projects" className="py-24 px-6">
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
          Key Projects
        </h2>
        <div className="w-16 h-1 rounded mb-12" style={{ backgroundColor: '#7C3AED' }} />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.name} className="project-card">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
