import { ExternalLink, Globe, Users, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'
import DataTableNew from '../../components/database/DataTableNew'
import TerminalStats from '../../components/ui/TerminalStats'

const communities = [
    {
        id: 'usa',
        country: 'United States',
        code: 'US',
        population: 47000000,
        percentOfTotal: 13.6,
        majorCities: ['New York', 'Atlanta', 'Chicago', 'Houston', 'Los Angeles'],
        source: 'https://en.wikipedia.org/wiki/African_Americans'
    },
    {
        id: 'brazil',
        country: 'Brazil',
        code: 'BR',
        population: 97000000,
        percentOfTotal: 50.7,
        majorCities: ['Salvador', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte'],
        source: 'https://en.wikipedia.org/wiki/Afro-Brazilians'
    },
    {
        id: 'uk',
        country: 'United Kingdom',
        code: 'GB',
        population: 2400000,
        percentOfTotal: 3.5,
        majorCities: ['London', 'Birmingham', 'Manchester', 'Bristol'],
        source: 'https://en.wikipedia.org/wiki/Black_British_people'
    },
    {
        id: 'france',
        country: 'France',
        code: 'FR',
        population: 5000000,
        percentOfTotal: 7.5,
        majorCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse'],
        source: 'https://en.wikipedia.org/wiki/Black_people_in_France'
    },
    {
        id: 'canada',
        country: 'Canada',
        code: 'CA',
        population: 1500000,
        percentOfTotal: 4.3,
        majorCities: ['Toronto', 'Montreal', 'Ottawa', 'Calgary'],
        source: 'https://en.wikipedia.org/wiki/Black_Canadians'
    },
    {
        id: 'colombia',
        country: 'Colombia',
        code: 'CO',
        population: 4900000,
        percentOfTotal: 9.3,
        majorCities: ['Cali', 'Cartagena', 'Barranquilla', 'Medellín'],
        source: 'https://en.wikipedia.org/wiki/Afro-Colombians'
    },
    {
        id: 'jamaica',
        country: 'Jamaica',
        code: 'JM',
        population: 2700000,
        percentOfTotal: 92.1,
        majorCities: ['Kingston', 'Montego Bay', 'Spanish Town'],
        source: 'https://en.wikipedia.org/wiki/Afro-Jamaicans'
    },
    {
        id: 'haiti',
        country: 'Haiti',
        code: 'HT',
        population: 11000000,
        percentOfTotal: 95.0,
        majorCities: ['Port-au-Prince', 'Cap-Haïtien', 'Gonaïves'],
        source: 'https://en.wikipedia.org/wiki/Haiti'
    },
    {
        id: 'germany',
        country: 'Germany',
        code: 'DE',
        population: 1000000,
        percentOfTotal: 1.2,
        majorCities: ['Berlin', 'Hamburg', 'Frankfurt', 'Munich'],
        source: 'https://en.wikipedia.org/wiki/Afro-Germans'
    },
    {
        id: 'netherlands',
        country: 'Netherlands',
        code: 'NL',
        population: 700000,
        percentOfTotal: 4.0,
        majorCities: ['Amsterdam', 'Rotterdam', 'The Hague'],
        source: 'https://en.wikipedia.org/wiki/Afro-Dutch'
    }
]

const formatNumber = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value.toLocaleString()
}

export default function DiasporaCommunities() {
    const totalDiaspora = communities.reduce((sum, c) => sum + c.population, 0)

    const columns = [
        { 
            id: 'country', 
            label: 'Country',
            render: (val, row) => (
                <div className="flex items-center gap-2">
                    <img 
                        src={`https://flagcdn.com/w40/${row.code.toLowerCase()}.png`}
                        alt={val}
                        className="w-6 h-4 object-cover rounded"
                    />
                    <span className="font-medium">{val}</span>
                </div>
            )
        },
        { id: 'population', label: 'Diaspora Population', format: 'number', align: 'right', mono: true, color: 'green' },
        { id: 'percentOfTotal', label: '% of Country', align: 'right', mono: true, render: (val) => `${val}%` },
        { 
            id: 'majorCities', 
            label: 'Major Cities',
            render: (val) => (
                <div className="flex flex-wrap gap-1">
                    {val?.slice(0, 3).map(city => (
                        <span key={city} className="px-1.5 py-0.5 text-xs bg-[var(--color-bg-tertiary)] rounded">
                            {city}
                        </span>
                    ))}
                </div>
            ),
            sortable: false
        },
        { id: 'source', label: 'Source', link: 'source', sortable: false },
    ]

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Global Diaspora Communities"
                    description="African diaspora populations around the world. These communities maintain cultural ties to Africa while contributing to their host countries."
                    stats={[
                        { label: 'Countries Tracked', value: communities.length.toString(), color: 'green' },
                        { label: 'Total Diaspora', value: formatNumber(totalDiaspora), color: 'gold' },
                        { label: 'Largest Community', value: 'Brazil' },
                    ]}
                />

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <TerminalStats
                        title="TOP_POPULATIONS"
                        stats={communities.slice(0, 5).map(c => ({
                            label: c.country.toLowerCase().replace(/\s+/g, '_'),
                            value: formatNumber(c.population),
                            color: c.id === 'brazil' ? 'green' : c.id === 'usa' ? 'gold' : undefined
                        }))}
                    />
                    <TerminalStats
                        title="BY_REGION"
                        stats={[
                            { label: 'americas', value: '160M+', color: 'green' },
                            { label: 'europe', value: '10M+' },
                            { label: 'caribbean', value: '40M+', color: 'gold' },
                            { label: 'other', value: '5M+' },
                        ]}
                    />
                </div>

                {/* Community Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {communities.slice(0, 6).map((community, index) => (
                        <motion.a
                            key={community.id}
                            href={community.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 hover:border-[var(--color-accent-green)] transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <img 
                                    src={`https://flagcdn.com/w80/${community.code.toLowerCase()}.png`}
                                    alt={community.country}
                                    className="w-10 h-7 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-medium text-[var(--color-text-primary)]">{community.country}</h3>
                                    <p className="text-xs text-[var(--color-text-muted)]">{community.percentOfTotal}% of population</p>
                                </div>
                            </div>
                            <div className="font-mono text-2xl text-[var(--color-accent-green)] mb-2">
                                {formatNumber(community.population)}
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {community.majorCities.slice(0, 3).map(city => (
                                    <span key={city} className="px-2 py-0.5 text-xs bg-[var(--color-bg-tertiary)] rounded text-[var(--color-text-muted)]">
                                        <MapPin className="w-3 h-3 inline mr-1" />
                                        {city}
                                    </span>
                                ))}
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Full Table */}
                <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                    <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                        All Communities ({communities.length})
                    </h3>
                    <DataTableNew
                        columns={columns}
                        data={communities}
                        emptyMessage="No data available"
                    />
                </div>

                {/* Source */}
                <div className="mt-8 text-xs text-[var(--color-text-muted)]">
                    Data sources: Wikipedia, national census data, academic research
                    <a href="https://en.wikipedia.org/wiki/African_diaspora" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        Wikipedia <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
