import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import useActiveSection from '../../hooks/useActiveSection';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const SECTION_IDS = ['hero', ...NAV_LINKS.map((l) => l.id)];

export default function Navbar({ hidden = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navStyle = isScrolled
    ? { backdropFilter: 'blur(12px)', backgroundColor: 'rgba(10,10,15,0.85)', borderBottom: '1px solid rgba(124,58,237,0.15)' }
    : { backgroundColor: 'transparent' };

  return (
    <nav
      style={{
        ...navStyle,
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: '64px' }}>

        {/* Left: Logo */}
        <span
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          MP
        </span>

        {/* Center: Nav links */}
        <ul className="hidden md:flex items-center gap-8" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  fontFamily: 'Space Grotesk, sans-serif',
                  color: activeSection === id ? '#A78BFA' : '#94A3B8',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  position: 'relative',
                  paddingBottom: '2px',
                  borderBottom: activeSection === id ? '2px solid #7C3AED' : '2px solid transparent',
                }}
                onMouseEnter={(e) => { if (activeSection !== id) e.currentTarget.style.color = '#F1F5F9'; }}
                onMouseLeave={(e) => { if (activeSection !== id) e.currentTarget.style.color = '#94A3B8'; }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Download Resume + hamburger */}
        <div className="flex items-center justify-end gap-3">
          <a
            href="/MananPatel2026Final.pdf"
            download
            className="hidden md:flex items-center gap-1.5"
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'Space Grotesk, sans-serif',
              color: '#A78BFA',
              border: '1px solid rgba(124,58,237,0.5)',
              borderRadius: '6px',
              padding: '0.4rem 0.9rem',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.15)';
              e.currentTarget.style.borderColor = '#A78BFA';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)';
            }}
          >
            <Download size={13} />
            Resume
          </a>

          <button
            className="md:hidden p-2 rounded"
            style={{ color: '#94A3B8' }}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden absolute left-0 right-0 flex flex-col px-6 py-4 gap-4"
          style={{ backgroundColor: '#12121A', borderBottom: '1px solid #1C1C2E' }}
        >
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: activeSection === id ? '#A78BFA' : '#94A3B8',
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="/MananPatel2026Final.pdf"
            download
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#A78BFA',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Download size={14} /> Download Resume
          </a>
        </div>
      )}
    </nav>
  );
}
