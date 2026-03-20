export default function Badge({ children, className = '', icon: Icon }) {
  return (
    <span
      className={`badge inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${className}`}
      style={{
        backgroundColor: '#1C1C2E',
        border: '1px solid rgba(124, 58, 237, 0.4)',
        color: '#F1F5F9',
      }}
    >
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
}
