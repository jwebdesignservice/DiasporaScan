import { motion } from 'framer-motion'

export default function StatBox({ title, value, subtitle, delay = 0, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className={`bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 ${
        onClick ? 'cursor-pointer hover:border-[var(--color-accent-green)] transition-colors' : ''
      }`}
    >
      <div className="text-sm text-[var(--color-text-primary)] font-medium mb-1">
        {title}
      </div>
      <div className="font-mono text-lg text-[var(--color-accent-green)]">
        {value}
      </div>
      {subtitle && (
        <div className="text-xs text-[var(--color-text-muted)] mt-1">
          {subtitle}
        </div>
      )}
    </motion.div>
  )
}
