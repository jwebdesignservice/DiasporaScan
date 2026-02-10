import { ExternalLink, Map, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'
import TerminalStats from '../../components/ui/TerminalStats'

const migrationRoutes = [
    {
        id: 'transatlantic',
        name: 'Transatlantic Slave Trade',
        period: '1526-1867',
        origin: 'West & Central Africa',
        destination: 'Americas',
        estimated: 12500000,
        description: 'Forced migration of enslaved Africans across the Atlantic Ocean to the Americas. The largest forced migration in human history.',
        source: 'https://en.wikipedia.org/wiki/Atlantic_slave_trade'
    },
    {
        id: 'great-migration',
        name: 'Great Migration',
        period: '1910-1970',
        origin: 'Southern United States',
        destination: 'Northern & Western US',
        estimated: 6000000,
        description: 'Mass movement of African Americans from the rural South to urban areas in the North, Midwest, and West seeking economic opportunities and escaping Jim Crow laws.',
        source: 'https://en.wikipedia.org/wiki/Great_Migration_(African_American)'
    },
    {
        id: 'windrush',
        name: 'Windrush Generation',
        period: '1948-1971',
        origin: 'Caribbean',
        destination: 'United Kingdom',
        estimated: 500000,
        description: 'Migration of Caribbean people to the United Kingdom, beginning with the HMT Empire Windrush in 1948.',
        source: 'https://en.wikipedia.org/wiki/Windrush_generation'
    },
    {
        id: 'african-diaspora-modern',
        name: 'Modern African Migration',
        period: '1980-Present',
        origin: 'Various African Countries',
        destination: 'Europe, Americas, Asia',
        estimated: 40000000,
        description: 'Contemporary migration from African countries to destinations worldwide, driven by economic opportunity, education, and family reunification.',
        source: 'https://en.wikipedia.org/wiki/African_diaspora'
    },
    {
        id: 'reverse-migration',
        name: 'Reverse Migration to Africa',
        period: '2000-Present',
        origin: 'Americas, Europe',
        destination: 'Africa',
        estimated: 200000,
        description: 'Growing trend of diaspora members returning to Africa for business, retirement, or reconnection with heritage.',
        source: 'https://en.wikipedia.org/wiki/African-American_diaspora_in_Africa'
    }
]

const formatNumber = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value.toLocaleString()
}

export default function MigrationRoutes() {
    const totalMigrants = migrationRoutes.reduce((sum, r) => sum + r.estimated, 0)

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Historical Migration Routes"
                    description="Major migration movements that shaped the African diaspora across centuries, from the forced migrations of the slave trade to modern voluntary migrations."
                    stats={[
                        { label: 'Major Routes', value: migrationRoutes.length.toString(), color: 'green' },
                        { label: 'Total Migrants', value: formatNumber(totalMigrants), color: 'gold' },
                        { label: 'Centuries Covered', value: '5+' },
                    ]}
                />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <TerminalStats
                        title="MIGRATION_SCALE"
                        stats={migrationRoutes.slice(0, 4).map(r => ({
                            label: r.name.toLowerCase().replace(/\s+/g, '_').substring(0, 20),
                            value: formatNumber(r.estimated),
                            color: r.id === 'transatlantic' ? 'red' : r.id === 'great-migration' ? 'green' : undefined
                        }))}
                    />
                </div>

                {/* Migration Routes */}
                <div className="space-y-6">
                    {migrationRoutes.map((route, index) => (
                        <motion.a
                            key={route.id}
                            href={route.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="block bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 hover:border-[var(--color-accent-green)] transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Map className="w-5 h-5 text-[var(--color-accent-green)]" />
                                        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                                            {route.name}
                                        </h3>
                                        <span className="font-mono text-sm text-[var(--color-accent-gold)]">
                                            {route.period}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-3">
                                        <span>{route.origin}</span>
                                        <ArrowRight className="w-4 h-4 text-[var(--color-accent-green)]" />
                                        <span>{route.destination}</span>
                                    </div>
                                    
                                    <p className="text-sm text-[var(--color-text-secondary)]">
                                        {route.description}
                                    </p>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="font-mono text-2xl text-[var(--color-accent-green)]">
                                            {formatNumber(route.estimated)}
                                        </div>
                                        <div className="text-xs text-[var(--color-text-muted)]">estimated migrants</div>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-[var(--color-text-muted)]" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Source */}
                <div className="mt-8 text-xs text-[var(--color-text-muted)]">
                    Data sources: Wikipedia, Trans-Atlantic Slave Trade Database, U.S. Census Bureau
                    <a href="https://www.slavevoyages.org/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        SlaveVoyages.org <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
