import { ExternalLink, Building, Users } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'
import DataTableNew from '../../components/database/DataTableNew'

import officialsData from '../../data/officials.json'

const formatNumber = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value.toLocaleString()
}

export default function Mayors() {
    const { mayors } = officialsData.officials

    const totalPopulation = mayors.reduce((sum, m) => sum + m.population, 0)

    const columns = [
        { id: 'name', label: 'Mayor' },
        { id: 'city', label: 'City', color: 'green' },
        { id: 'state', label: 'State' },
        { id: 'population', label: 'Population', format: 'number', align: 'right', mono: true },
        { 
            id: 'party', 
            label: 'Party',
            render: (val) => (
                <span className={`px-2 py-0.5 text-xs rounded ${
                    val === 'Democrat' ? 'bg-blue-500/20 text-blue-400' :
                    val === 'Republican' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                }`}>
                    {val}
                </span>
            )
        },
        { id: 'since', label: 'Since', align: 'right', mono: true },
        { id: 'website', label: 'Website', link: 'website', sortable: false },
    ]

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Black Mayors of Major Cities"
                    description="African American mayors leading some of America's largest and most influential cities. These leaders shape urban policy, economic development, and community initiatives."
                    stats={[
                        { label: 'Major City Mayors', value: mayors.length.toString(), color: 'green' },
                        { label: 'Total Population Served', value: formatNumber(totalPopulation), color: 'gold' },
                        { label: 'Largest City', value: 'New York City' },
                    ]}
                />

                {/* Mayor Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {mayors.map((mayor, index) => (
                        <motion.a
                            key={mayor.id}
                            href={mayor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 hover:border-[var(--color-accent-green)] transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-medium text-[var(--color-text-primary)]">{mayor.name}</h3>
                                    <p className="text-lg font-bold text-[var(--color-accent-green)]">{mayor.city}</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">{mayor.state}</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)]" />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 text-xs rounded ${
                                        mayor.party === 'Democrat' ? 'bg-blue-500/20 text-blue-400' :
                                        mayor.party === 'Republican' ? 'bg-red-500/20 text-red-400' :
                                        'bg-gray-500/20 text-gray-400'
                                    }`}>
                                        {mayor.party}
                                    </span>
                                    <span className="text-xs text-[var(--color-text-muted)]">Since {mayor.since}</span>
                                </div>
                                <span className="font-mono text-sm text-[var(--color-text-muted)]">
                                    {formatNumber(mayor.population)}
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Table View */}
                <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                    <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                        All Mayors ({mayors.length})
                    </h3>
                    <DataTableNew
                        columns={columns}
                        data={mayors}
                        emptyMessage="No mayors found"
                    />
                </div>

                {/* Source */}
                <div className="mt-6 text-xs text-[var(--color-text-muted)]">
                    Data source: Official city government websites, Ballotpedia
                    <a href="https://ballotpedia.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        Ballotpedia <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
