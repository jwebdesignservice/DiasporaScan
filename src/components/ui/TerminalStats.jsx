import { motion } from 'framer-motion'

export default function TerminalStats({ title, stats }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono text-sm"
    >
      {title && (
        <div className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs mb-2">
          {title}
        </div>
      )}
      <div className="space-y-0.5">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-[var(--color-text-muted)]">
              {index === stats.length - 1 ? '└─' : '├─'}
            </span>
            <span className="text-[var(--color-text-secondary)]">{stat.label}</span>
            <span className={`${
              stat.color === 'green' ? 'text-[var(--color-accent-green)]' :
              stat.color === 'gold' ? 'text-[var(--color-accent-gold)]' :
              stat.color === 'red' ? 'text-red-500' :
              'text-[var(--color-text-primary)]'
            }`}>
              {stat.value}
            </span>
            {stat.suffix && (
              <span className="text-[var(--color-text-muted)]">({stat.suffix})</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
