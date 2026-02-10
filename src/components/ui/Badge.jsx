export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]',
    green: 'bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)]',
    gold: 'bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]',
    red: 'bg-red-500/10 text-red-500',
    blue: 'bg-blue-500/10 text-blue-400',
  }

  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${variants[variant]}`}>
      {children}
    </span>
  )
}
