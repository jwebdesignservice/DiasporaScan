import { motion } from 'framer-motion'

export default function TerminalStats({ title, stats }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono text-sm overflow-hidden"
    >
      {title && (
        <div className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs mb-2 truncate">
          {title}
        </div>
      )}
      <div className="space-y-0.5">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-2 min-w-0">
            <span className="text-[var(--color-text-muted)] flex-shrink-0">
              {index === stats.length - 1 ? '└─' : '├─'}
            </span>
            <span className="text-[var(--color-text-secondary)] truncate flex-1 min-w-0">{stat.label}</span>
            <span className={`flex-shrink-0 ${
              stat.color === 'green' ? 'text-[var(--color-accent-green)]' :
              stat.color === 'gold' ? 'text-[var(--color-accent-gold)]' :
              stat.color === 'red' ? 'text-red-500' :
              'text-[var(--color-text-primary)]'
            }`}>
              {stat.value}
            </span>
            {stat.suffix && (
              <span className="text-[var(--color-text-muted)] flex-shrink-0">({stat.suffix})</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
