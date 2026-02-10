import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function InvestigationCard({ 
  title, 
  description, 
  stat, 
  statLabel, 
  isNew = false, 
  href = '#',
  delay = 0 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link
        to={href}
        className="block bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 hover:border-[var(--color-accent-green)] transition-colors"
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
              {title}
            </h3>
            {isNew && (
              <span className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase rounded">
                NEW
              </span>
            )}
          </div>
          {stat && (
            <div className="text-right flex-shrink-0">
              <span className="font-mono text-xs text-[var(--color-accent-green)]">{stat}</span>
              {statLabel && (
                <span className="text-xs text-[var(--color-text-muted)] ml-1">{statLabel}</span>
              )}
            </div>
          )}
        </div>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
          {description}
        </p>
      </Link>
    </motion.div>
  )
}
