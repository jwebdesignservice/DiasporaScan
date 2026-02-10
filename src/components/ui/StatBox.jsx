import { motion } from 'framer-motion'

export default function StatBox({ title, value, subtitle, delay = 0, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className={`bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-3 sm:p-4 overflow-hidden ${
        onClick ? 'cursor-pointer hover:border-[var(--color-accent-green)] transition-colors' : ''
      }`}
    >
      <div className="text-xs sm:text-sm text-[var(--color-text-primary)] font-medium mb-1 truncate">
        {title}
      </div>
      <div className="font-mono text-base sm:text-lg text-[var(--color-accent-green)]">
        {value}
      </div>
      {subtitle && (
        <div className="text-[10px] sm:text-xs text-[var(--color-text-muted)] mt-1 truncate">
          {subtitle}
        </div>
      )}
    </motion.div>
  )
}
