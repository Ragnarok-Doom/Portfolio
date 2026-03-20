const STYLES = {
  primary: {
    background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
    color: '#F1F5F9',
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: '#7C3AED',
    border: '1px solid #7C3AED',
  },
};

export default function Button({ variant = 'primary', children, className = '', ...rest }) {
  const style = STYLES[variant] ?? STYLES.primary;

  return (
    <button
      style={style}
      className={`
        rounded-lg px-6 py-3 font-medium transition-all duration-200
        hover:scale-105 focus-ring
        ${variant === 'ghost' ? 'hover:bg-[#1C1C2E]' : ''}
        ${className}
      `.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
