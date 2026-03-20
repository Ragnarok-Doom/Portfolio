const TYPE_COLORS = {
  'full-time': { backgroundColor: 'rgba(124, 58, 237, 0.2)', color: '#A78BFA', border: '1px solid rgba(124, 58, 237, 0.4)' },
  intern: { backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#6EE7B7', border: '1px solid rgba(16, 185, 129, 0.4)' },
};

export default function TimelineEntry({ entry, index }) {
  const { company, role, period, type, bullets, logo } = entry;
  const side = index % 2 === 0 ? 'left' : 'right';
  const typeStyle = TYPE_COLORS[type] ?? TYPE_COLORS['full-time'];

  return (
    <div
      data-side={side}
      className={`relative flex w-full md:w-1/2 ${side === 'right' ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}
    >
      {/* Timeline dot */}
      <div
        className="absolute top-4 hidden md:block"
        style={{
          [side === 'left' ? 'right' : 'left']: '-6px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#7C3AED',
          border: '2px solid #A78BFA',
          zIndex: 1,
        }}
      />

      {/* Card */}
      <div
        className="w-full rounded-xl p-5 flex flex-col gap-2"
        style={{ backgroundColor: '#12121A', border: '1px solid #1C1C2E' }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className="font-bold text-base"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F1F5F9' }}
          >
            {role}
          </h3>
          <span
            className="rounded-full px-2 py-0.5 text-xs"
            style={typeStyle}
          >
            {type === 'full-time' ? 'Full-time' : 'Intern'}
          </span>
        </div>

        <p className="font-medium text-sm" style={{ color: '#06B6D4' }}>{company}</p>
        <p className="text-xs" style={{ color: '#475569' }}>{period}</p>

        <ul className="mt-1 flex flex-col gap-1.5">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2 text-sm" style={{ color: '#94A3B8' }}>
              <span style={{ color: '#7C3AED', flexShrink: 0 }}>▸</span>
              {bullet}
            </li>
          ))}
        </ul>

        {/* Company logo */}
        {logo && (
          <div style={{
            marginTop: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid #1C1C2E',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <img
              src={logo}
              alt={`${company} logo`}
              style={{ height: '24px', width: 'auto', objectFit: 'contain', opacity: 0.75, filter: 'brightness(1.2)' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
