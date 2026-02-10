import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function StatCard({ value, label, prefix = '', suffix = '', icon: Icon, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const numericValue = typeof value === 'number' ? value : parseInt(value.replace(/[^0-9]/g, ''))
    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(numericValue)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return num.toLocaleString()
    }
    return num.toString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-accent-green)] transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        {Icon && (
          <div className="p-2 bg-[var(--color-accent-green)]/10 rounded-lg">
            <Icon className="w-5 h-5 text-[var(--color-accent-green)]" />
          </div>
        )}
      </div>
      <div className="font-mono text-3xl font-bold text-[var(--color-accent-green)] mb-2">
        {prefix}{formatNumber(displayValue)}{suffix}
      </div>
      <div className="text-sm text-[var(--color-text-secondary)]">
        {label}
      </div>
    </motion.div>
  )
}
