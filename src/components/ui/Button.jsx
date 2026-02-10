import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-[var(--color-accent-green)] hover:bg-[var(--color-accent-green-light)] text-white glow-green',
  secondary: 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent-green)]',
  ghost: 'bg-transparent hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
  gold: 'bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-light)] text-white glow-gold',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  icon: Icon,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 
        font-semibold rounded-lg transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button
