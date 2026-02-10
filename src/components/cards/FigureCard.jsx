import { motion } from 'framer-motion'
import { MapPin, Quote } from 'lucide-react'

export default function FigureCard({ figure, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-accent-green)] transition-all group"
    >
      {/* Image */}
      <div className="relative h-48 bg-[var(--color-bg-tertiary)] overflow-hidden">
        <img
          src={figure.image}
          alt={figure.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-secondary)] to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block px-2 py-1 bg-[var(--color-accent-green)]/20 text-[var(--color-accent-green)] text-xs font-medium rounded-full">
            {figure.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-1">
          {figure.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] mb-3">
          <MapPin className="w-3 h-3" />
          <span>{figure.origin}</span>
          <span className="mx-1">•</span>
          <span>{figure.birth} - {figure.death || 'Present'}</span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-4">
          {figure.description}
        </p>
        
        {/* Quote */}
        {figure.quote && (
          <div className="border-l-2 border-[var(--color-accent-gold)] pl-3 py-1">
            <Quote className="w-3 h-3 text-[var(--color-accent-gold)] mb-1" />
            <p className="text-xs text-[var(--color-text-muted)] italic line-clamp-2">
              "{figure.quote}"
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
