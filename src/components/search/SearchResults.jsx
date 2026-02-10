import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Music, Quote, ExternalLink } from 'lucide-react'

export default function SearchResults({ results, type }) {
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-text-muted)]">No results found. Try a different search term.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <motion.div
          key={result.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-accent-green)] transition-all"
        >
          {/* Country Result */}
          {result.type === 'country' && (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {result.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[var(--color-text-muted)]">
                    <MapPin className="w-4 h-4" />
                    <span>{result.region}</span>
                    <span>•</span>
                    <span>Capital: {result.capital}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)] text-sm font-medium rounded-full">
                  Country
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4">
                  <div className="text-sm text-[var(--color-text-muted)] mb-1">Population</div>
                  <div className="font-mono text-xl text-[var(--color-accent-green)]">
                    {result.population?.toLocaleString()}
                  </div>
                </div>
                <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4">
                  <div className="text-sm text-[var(--color-text-muted)] mb-1">Diaspora Population</div>
                  <div className="font-mono text-xl text-[var(--color-accent-gold)]">
                    {result.diasporaPopulation?.toLocaleString()}
                  </div>
                </div>
              </div>

              {result.facts && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2">Key Facts</h4>
                  <ul className="space-y-1">
                    {result.facts.map((fact, i) => (
                      <li key={i} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                        <span className="text-[var(--color-accent-green)]">•</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.languages && (
                <div className="flex flex-wrap gap-2">
                  {result.languages.map((lang) => (
                    <span key={lang} className="px-2 py-1 bg-[var(--color-bg-tertiary)] text-xs text-[var(--color-text-muted)] rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Figure Result */}
          {result.type === 'figure' && (
            <div className="flex gap-6">
              {result.image && (
                <div className="w-32 h-40 rounded-lg overflow-hidden bg-[var(--color-bg-tertiary)] flex-shrink-0">
                  <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                      {result.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-[var(--color-text-muted)]">
                      <MapPin className="w-4 h-4" />
                      <span>{result.origin}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{result.birth} - {result.death || 'Present'}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)] text-sm font-medium rounded-full">
                    {result.category}
                  </span>
                </div>

                <p className="text-[var(--color-text-secondary)] mb-4">{result.description}</p>

                {result.quote && (
                  <div className="border-l-2 border-[var(--color-accent-gold)] pl-4 py-2 bg-[var(--color-bg-tertiary)] rounded-r-lg">
                    <Quote className="w-4 h-4 text-[var(--color-accent-gold)] mb-1" />
                    <p className="text-sm text-[var(--color-text-muted)] italic">"{result.quote}"</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Clan Result */}
          {result.type === 'clan' && (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {result.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[var(--color-text-muted)]">
                    <MapPin className="w-4 h-4" />
                    <span>{result.country}</span>
                    <span>•</span>
                    <Users className="w-4 h-4" />
                    <span>{result.population?.toLocaleString()} people</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)] text-sm font-medium rounded-full">
                  Clan/Tribe
                </span>
              </div>

              <p className="text-[var(--color-text-secondary)] mb-4">{result.description}</p>

              {result.traditions && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2">Traditions</h4>
                  <ul className="space-y-1">
                    {result.traditions.map((tradition, i) => (
                      <li key={i} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                        <span className="text-[var(--color-accent-gold)]">•</span>
                        {tradition}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.commonSurnames && (
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2">Common Surnames</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.commonSurnames.map((surname) => (
                      <span key={surname} className="px-2 py-1 bg-[var(--color-bg-tertiary)] text-xs text-[var(--color-text-muted)] rounded-full">
                        {surname}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
