
function cn(...parts) {
  const out = [];
  for (const p of parts) {
    if (!p) continue;
    if (typeof p === 'string') out.push(p);
    else if (typeof p === 'object') for (const k in p) if (p[k]) out.push(k);
  }
  return out.join(' ');
}

/** @param {{ className?: string, children: React.ReactNode, as?: keyof JSX.IntrinsicElements }} props */
export default function Card({ className, children, as: Tag = 'div' }) {
  return (
    <Tag
      className={cn(
        'surface rounded-3xl p-5 md:p-6 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 ease-apple',
        className
      )}
    >
      {children}
    </Tag>
  );
}
