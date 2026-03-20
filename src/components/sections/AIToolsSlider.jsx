const AI_TOOLS = [
  {
    name: 'ChatGPT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png',
  },
  {
    name: 'Claude',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/240px-Claude_AI_logo.svg.png',
  },
  {
    name: 'Cursor',
    logo: 'https://www.cursor.com/favicon.ico',
  },
  {
    name: 'Kiro',
    logo: 'https://kiro.dev/favicon.ico',
  },
  {
    name: 'Perplexity',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Perplexity_AI_logo.svg/240px-Perplexity_AI_logo.svg.png',
  },
  {
    name: 'n8n',
    logo: 'https://n8n.io/favicon.ico',
  },
  {
    name: 'GitHub Copilot',
    logo: 'https://github.githubassets.com/favicons/favicon.svg',
  },
  {
    name: 'Gemini',
    logo: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
  },
  {
    name: 'Midjourney',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Midjourney_Emblem.png/240px-Midjourney_Emblem.png',
  },
  {
    name: 'v0',
    logo: 'https://v0.dev/favicon.ico',
  },
];

// Duplicate for seamless infinite loop
const ITEMS = [...AI_TOOLS, ...AI_TOOLS];

export default function AIToolsSlider() {
  return (
    <section style={{ padding: '5rem 0 4rem', overflow: 'hidden', borderTop: '1px solid #1C1C2E', borderBottom: '1px solid #1C1C2E' }}>

      {/* Intro paragraph */}
      <div style={{ maxWidth: '1152px', margin: '0 auto 4rem', padding: '0 1.5rem' }}>
        <p style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#06B6D4',
          marginBottom: '1rem',
        }}>
          AI-Augmented Development
        </p>
        <p style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: '#F1F5F9',
        }}>
          I use Cursor daily for vibe coding, Claude for deep technical reasoning, and Perplexity for researching data structures and project architecture. AI is part of how I work — not a shortcut, but a sharper way to build.
        </p>
      </div>

      {/* Label */}
      <p style={{
        textAlign: 'center',
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#475569',
        marginBottom: '2rem',
      }}>
        AI Tools I Use Daily
      </p>

      {/* Slider track */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(to right, #0A0A0F, transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 2,
          background: 'linear-gradient(to left, #0A0A0F, transparent)',
          pointerEvents: 'none',
        }} />

        {/* Scrolling row */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          animation: 'slide-left 30s linear infinite',
          width: 'max-content',
        }}>
          {ITEMS.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.6rem',
                minWidth: '80px',
                cursor: 'default',
              }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: '#12121A',
                border: '1px solid #1C1C2E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.6)';
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(124,58,237,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1C1C2E';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0.9)' }}
                  onError={(e) => {
                    // fallback: show first 2 letters
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = `<span style="font-family:Syne,sans-serif;font-size:0.85rem;font-weight:700;color:#A78BFA">${tool.name.slice(0, 2)}</span>`;
                  }}
                />
              </div>
              <span style={{
                fontSize: '0.65rem',
                color: '#475569',
                fontFamily: 'Space Grotesk, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
