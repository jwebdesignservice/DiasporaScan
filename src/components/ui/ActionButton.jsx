import { Link } from 'react-router-dom'

export default function ActionButton({ 
  children, 
  href = '#', 
  variant = 'green', 
  external = false,
  className = '' 
}) {
  const variants = {
    green: 'bg-[#10b981] hover:bg-[#059669] text-white',
    red: 'bg-[#dc2626] hover:bg-[#b91c1c] text-white',
    outline: 'bg-transparent border border-[var(--color-border)] hover:border-[var(--color-accent-green)] text-[var(--color-text-primary)]',
  }

  const baseClasses = `inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${variants[variant]} ${className}`

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={baseClasses}>
      {children}
    </Link>
  )
}
