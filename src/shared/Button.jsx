
function cn(...parts) {
  const out = [];
  for (const p of parts) {
    if (!p) continue;
    if (typeof p === 'string') out.push(p);
    else if (typeof p === 'object') for (const k in p) if (p[k]) out.push(k);
  }
  return out.join(' ');
}

/** @param {{ variant?: 'primary'|'surface'|'ghost', size?: 'sm'|'md'|'lg', className?: string, children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>} props */
export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 ease-apple focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 disabled:opacity-50 disabled:pointer-events-none select-none';
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-5 text-[0.95rem]',
    lg: 'h-12 px-6 text-base',
  };
  const variants = {
    primary:
      'text-white shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 active:translate-y-0 border border-white/10 bg-gradient-to-r from-primary to-secondary',
    surface:
      'text-[var(--text)] bg-[var(--surface)] border border-white/10 backdrop-blur shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'text-[var(--text)] bg-transparent hover:bg-white/10 active:bg-white/15 border border-transparent',
  };

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
