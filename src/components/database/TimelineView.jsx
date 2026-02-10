import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Calendar, ChevronDown, ChevronUp } from 'lucide-react'

export default function TimelineView({ events = [], eras = [] }) {
    const [expandedEvent, setExpandedEvent] = useState(null)
    const [selectedEra, setSelectedEra] = useState(null)

    const filteredEvents = selectedEra
        ? events.filter(e => {
            const era = eras.find(era => e.year >= era.start && e.year <= era.end)
            return era?.name === selectedEra
        })
        : events

    const sortedEvents = [...filteredEvents].sort((a, b) => a.year - b.year)

    const categoryColors = {
        'Slavery & Abolition': 'border-red-500 bg-red-500/10',
        'Civil Rights': 'border-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10',
        'Politics': 'border-blue-500 bg-blue-500/10',
        'Culture': 'border-purple-500 bg-purple-500/10',
        'Sports': 'border-orange-500 bg-orange-500/10',
        'Science': 'border-cyan-500 bg-cyan-500/10',
    }

    const categoryDotColors = {
        'Slavery & Abolition': 'bg-red-500',
        'Civil Rights': 'bg-[var(--color-accent-green)]',
        'Politics': 'bg-blue-500',
        'Culture': 'bg-purple-500',
        'Sports': 'bg-orange-500',
        'Science': 'bg-cyan-500',
    }

    return (
        <div>
            {/* Era Filter */}
            {eras.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => setSelectedEra(null)}
                        className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                            !selectedEra
                                ? 'bg-[var(--color-accent-green)] text-white'
                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                        }`}
                    >
                        All Eras
                    </button>
                    {eras.map((era) => (
                        <button
                            key={era.name}
                            onClick={() => setSelectedEra(era.name)}
                            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                                selectedEra === era.name
                                    ? 'bg-[var(--color-accent-green)] text-white'
                                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            {era.name} ({era.start}-{era.end})
                        </button>
                    ))}
                </div>
            )}

            {/* Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />

                {/* Events */}
                <div className="space-y-4">
                    {sortedEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="relative pl-10"
                        >
                            {/* Dot */}
                            <div className={`absolute left-2.5 top-3 w-3 h-3 rounded-full ${categoryDotColors[event.category] || 'bg-gray-500'}`} />

                            {/* Card */}
                            <div
                                className={`border-l-4 ${categoryColors[event.category] || 'border-gray-500 bg-gray-500/10'} p-4 rounded-r-lg cursor-pointer transition-colors hover:bg-[var(--color-bg-secondary)]`}
                                onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-sm text-[var(--color-accent-gold)]">
                                                {event.year}
                                            </span>
                                            <span className="text-xs px-2 py-0.5 bg-[var(--color-bg-tertiary)] rounded text-[var(--color-text-muted)]">
                                                {event.category}
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
                                            {event.title}
                                        </h3>
                                    </div>
                                    <button className="text-[var(--color-text-muted)]">
                                        {expandedEvent === event.id ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                {/* Expanded Content */}
                                {expandedEvent === event.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-3 pt-3 border-t border-[var(--color-border)]"
                                    >
                                        <p className="text-sm text-[var(--color-text-muted)] mb-3">
                                            {event.description}
                                        </p>
                                        {event.source && (
                                            <a
                                                href={event.source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-1 text-xs text-[var(--color-accent-green)] hover:text-[var(--color-accent-green-light)]"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                Learn more on Wikipedia
                                            </a>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {sortedEvents.length === 0 && (
                <div className="text-center py-12 text-[var(--color-text-muted)]">
                    No events found for the selected era.
                </div>
            )}
        </div>
    )
}
