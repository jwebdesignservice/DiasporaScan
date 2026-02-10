import { motion } from 'framer-motion'
import { Music, UtensilsCrossed, Languages, MapPin } from 'lucide-react'

const iconMap = {
  music: Music,
  food: UtensilsCrossed,
  language: Languages,
}

export default function CultureCard({ item, type, delay = 0 }) {
  const Icon = iconMap[type] || Music

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-accent-green)] transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-[var(--color-accent-gold)]/10 rounded-lg">
          <Icon className="w-5 h-5 text-[var(--color-accent-gold)]" />
        </div>
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          <MapPin className="w-3 h-3" />
          <span>{item.origin}</span>
        </div>
      </div>

      {/* Content */}
      <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-green)] transition-colors">
        {item.name}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">
        {item.description}
      </p>

      {/* Tags */}
      {type === 'music' && item.keyArtists && (
        <div className="flex flex-wrap gap-1">
          {item.keyArtists.slice(0, 3).map((artist) => (
            <span
              key={artist}
              className="px-2 py-1 bg-[var(--color-bg-tertiary)] text-xs text-[var(--color-text-muted)] rounded-full"
            >
              {artist}
            </span>
          ))}
        </div>
      )}

      {type === 'food' && item.countries && (
        <div className="flex flex-wrap gap-1">
          {item.countries.slice(0, 3).map((country) => (
            <span
              key={country}
              className="px-2 py-1 bg-[var(--color-bg-tertiary)] text-xs text-[var(--color-text-muted)] rounded-full"
            >
              {country}
            </span>
          ))}
        </div>
      )}

      {type === 'language' && (
        <div className="font-mono text-sm text-[var(--color-accent-green)]">
          {item.speakers?.toLocaleString()} speakers
        </div>
      )}
    </motion.div>
  )
}
