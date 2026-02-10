import { ExternalLink, Award, Star } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'

import officialsData from '../../data/officials.json'

export default function HistoricalFirsts() {
    const { historicalFirsts } = officialsData.officials

    // Group by decade
    const groupedByDecade = historicalFirsts.reduce((acc, first) => {
        const decade = Math.floor(first.year / 10) * 10
        if (!acc[decade]) acc[decade] = []
        acc[decade].push(first)
        return acc
    }, {})

    const decades = Object.keys(groupedByDecade).sort((a, b) => b - a)

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Historical Firsts"
                    description="Groundbreaking African Americans who broke barriers and made history as the first to hold major political positions in the United States."
                    stats={[
                        { label: 'Historical Firsts', value: historicalFirsts.length.toString(), color: 'gold' },
                        { label: 'First President', value: '2009', color: 'green' },
                        { label: 'First VP', value: '2021' },
                    ]}
                />

                {/* Featured Firsts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.a
                        href="https://en.wikipedia.org/wiki/Barack_Obama"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-accent-gold)] p-4 hover:border-[var(--color-accent-gold)] transition-colors"
                    >
                        <div className="flex items-start gap-4">
                                <div className="p-2 bg-[var(--color-accent-gold)]/20">
                                <Star className="w-8 h-8 text-[var(--color-accent-gold)]" />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--color-accent-gold)] font-medium">First Black President</p>
                                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">Barack Obama</h3>
                                <p className="text-sm text-[var(--color-text-muted)] mt-2">
                                    44th President of the United States (2009-2017). Made history as the first African American to hold the nation's highest office.
                                </p>
                                <div className="flex items-center gap-2 mt-3">
                                    <span className="font-mono text-lg text-[var(--color-accent-gold)]">2009</span>
                                    <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)]" />
                                </div>
                            </div>
                        </div>
                    </motion.a>

                    <motion.a
                        href="https://en.wikipedia.org/wiki/Kamala_Harris"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[var(--color-bg-secondary)] border-2 border-[var(--color-accent-green)] p-4 hover:border-[var(--color-accent-green)] transition-colors"
                    >
                        <div className="flex items-start gap-4">
                                <div className="p-2 bg-[var(--color-accent-green)]/20">
                                <Star className="w-8 h-8 text-[var(--color-accent-green)]" />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--color-accent-green)] font-medium">First Black Vice President</p>
                                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">Kamala Harris</h3>
                                <p className="text-sm text-[var(--color-text-muted)] mt-2">
                                    49th Vice President of the United States (2021-present). First woman and first Black and South Asian American to hold the office.
                                </p>
                                <div className="flex items-center gap-2 mt-3">
                                    <span className="font-mono text-lg text-[var(--color-accent-green)]">2021</span>
                                    <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)]" />
                                </div>
                            </div>
                        </div>
                    </motion.a>
                </div>

                {/* All Firsts by Decade */}
                <div className="space-y-8">
                    {decades.map(decade => (
                        <div key={decade}>
                            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                                <span className="font-mono text-[var(--color-accent-gold)]">{decade}s</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {groupedByDecade[decade].map((first, index) => (
                                    <motion.a
                                        key={first.achievement}
                                        href={first.source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-[var(--color-bg-secondary)] border-l-4 border-[var(--color-accent-gold)] p-4 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-medium text-[var(--color-text-primary)]">
                                                    {first.achievement}
                                                </h4>
                                                <p className="text-[var(--color-accent-green)] mt-1">
                                                    {first.name}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-sm text-[var(--color-accent-gold)]">{first.year}</span>
                                                <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)]" />
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Source */}
                <div className="mt-8 text-xs text-[var(--color-text-muted)]">
                    Data source: Wikipedia, Congress.gov, official government records
                    <a href="https://en.wikipedia.org/wiki/List_of_African-American_firsts" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        Wikipedia <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
