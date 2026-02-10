import { useState, useMemo } from 'react'
import { ExternalLink, Users, Landmark, Building, Award } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'
import FilterBar from '../../components/database/FilterBar'
import DataTableNew from '../../components/database/DataTableNew'
import TerminalStats from '../../components/ui/TerminalStats'

import officialsData from '../../data/officials.json'

export default function Officials() {
    const [activeTab, setActiveTab] = useState('congress')
    const [activeFilters, setActiveFilters] = useState({})
    const [searchQuery, setSearchQuery] = useState('')

    const { senators, representatives, mayors, historicalFirsts, overview } = officialsData.officials

    // Party filter
    const filters = [
        {
            id: 'party',
            label: 'Party',
            options: [
                { value: 'Democrat', label: 'Democrat' },
                { value: 'Republican', label: 'Republican' },
                { value: 'Independent', label: 'Independent' },
            ]
        }
    ]

    // Filter congress members
    const filteredSenators = useMemo(() => {
        return senators.filter(s => {
            if (activeFilters.party && activeFilters.party !== 'all') {
                if (s.party !== activeFilters.party) return false
            }
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                return s.name.toLowerCase().includes(q) || s.state.toLowerCase().includes(q)
            }
            return true
        })
    }, [senators, activeFilters, searchQuery])

    const filteredReps = useMemo(() => {
        return representatives.filter(r => {
            if (activeFilters.party && activeFilters.party !== 'all') {
                if (r.party !== activeFilters.party) return false
            }
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                return r.name.toLowerCase().includes(q) || r.state.toLowerCase().includes(q)
            }
            return true
        })
    }, [representatives, activeFilters, searchQuery])

    const filteredMayors = useMemo(() => {
        if (!searchQuery) return mayors
        const q = searchQuery.toLowerCase()
        return mayors.filter(m =>
            m.name.toLowerCase().includes(q) ||
            m.city.toLowerCase().includes(q)
        )
    }, [mayors, searchQuery])

    const senatorColumns = [
        {
            id: 'name',
            label: 'Name',
            render: (val, row) => (
                <div className="flex items-center gap-2">
                    {row.image ? (
                        <img src={row.image} alt={val} className="w-8 h-8 rounded-full object-cover grayscale" />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                            <Users className="w-4 h-4 text-[var(--color-text-muted)]" />
                        </div>
                    )}
                    <span>{val}</span>
                </div>
            )
        },
        { id: 'state', label: 'State' },
        {
            id: 'party',
            label: 'Party',
            render: (val) => (
                <span className={`px-2 py-0.5 text-xs rounded ${val === 'Democrat' ? 'bg-blue-500/20 text-blue-400' :
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

    const repColumns = [
        {
            id: 'name',
            label: 'Name',
            render: (val, row) => (
                <div className="flex items-center gap-2">
                    {row.image ? (
                        <img src={row.image} alt={val} className="w-8 h-8 rounded-full object-cover grayscale" />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                            <Users className="w-4 h-4 text-[var(--color-text-muted)]" />
                        </div>
                    )}
                    <div>
                        <span>{val}</span>
                        {row.leadership && (
                            <span className="block text-xs text-[var(--color-accent-green)]">{row.leadership}</span>
                        )}
                    </div>
                </div>
            )
        },
        { id: 'state', label: 'State' },
        { id: 'district', label: 'District', align: 'right', mono: true },
        {
            id: 'party',
            label: 'Party',
            render: (val) => (
                <span className={`px-2 py-0.5 text-xs rounded ${val === 'Democrat' ? 'bg-blue-500/20 text-blue-400' :
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

    const mayorColumns = [
        { id: 'name', label: 'Name' },
        { id: 'city', label: 'City' },
        { id: 'state', label: 'State' },
        { id: 'population', label: 'Population', format: 'number', align: 'right', mono: true },
        {
            id: 'party',
            label: 'Party',
            render: (val) => (
                <span className={`px-2 py-0.5 text-xs rounded ${val === 'Democrat' ? 'bg-blue-500/20 text-blue-400' :
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
                    title="Elected Officials"
                    description={overview.description}
                    stats={[
                        { label: 'In Congress', value: overview.totalCongress.toString(), color: 'green' },
                        { label: 'Senators', value: overview.senators.toString(), color: 'gold' },
                        { label: 'Representatives', value: overview.representatives.toString() },
                        { label: 'Major City Mayors', value: overview.mayors.toString() },
                    ]}
                />

                {/* Tab Switcher */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => { setActiveTab('congress'); setActiveFilters({}) }}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === 'congress'
                                ? 'bg-[var(--color-accent-green)] text-white'
                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                            }`}
                    >
                        <Landmark className="w-4 h-4" />
                        Congress
                    </button>
                    <button
                        onClick={() => { setActiveTab('mayors'); setActiveFilters({}) }}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === 'mayors'
                                ? 'bg-[var(--color-accent-green)] text-white'
                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                            }`}
                    >
                        <Building className="w-4 h-4" />
                        Mayors
                    </button>
                    <button
                        onClick={() => { setActiveTab('firsts'); setActiveFilters({}) }}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === 'firsts'
                                ? 'bg-[var(--color-accent-green)] text-white'
                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                            }`}
                    >
                        <Award className="w-4 h-4" />
                        Historical Firsts
                    </button>
                </div>

                {/* Search */}
                {activeTab !== 'firsts' && (
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search officials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full max-w-md px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)]"
                        />
                    </div>
                )}

                {activeTab === 'congress' && (
                    <FilterBar
                        filters={filters}
                        activeFilters={activeFilters}
                        onFilterChange={(id, value) => setActiveFilters({ ...activeFilters, [id]: value })}
                        onClear={() => setActiveFilters({})}
                    />
                )}

                {/* Statistics Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <TerminalStats
                        title="CONGRESS_BREAKDOWN"
                        stats={[
                            { label: 'senators', value: overview.senators.toString(), color: 'gold' },
                            { label: 'representatives', value: overview.representatives.toString(), color: 'green' },
                            { label: 'democrats', value: (senators.filter(s => s.party === 'Democrat').length + representatives.filter(r => r.party === 'Democrat').length).toString() },
                            { label: 'republicans', value: (senators.filter(s => s.party === 'Republican').length + representatives.filter(r => r.party === 'Republican').length).toString() },
                        ]}
                    />
                </div>

                {/* Congress Tables */}
                {activeTab === 'congress' && (
                    <>
                        {/* Senators */}
                        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4 mb-6">
                            <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                                Senators ({filteredSenators.length})
                            </h3>
                            <DataTableNew
                                columns={senatorColumns}
                                data={filteredSenators}
                                emptyMessage="No senators match your filters"
                            />
                        </div>

                        {/* Representatives */}
                        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4">
                            <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                                Representatives ({filteredReps.length})
                            </h3>
                            <DataTableNew
                                columns={repColumns}
                                data={filteredReps}
                                emptyMessage="No representatives match your filters"
                            />
                        </div>
                    </>
                )}

                {/* Mayors Table */}
                {activeTab === 'mayors' && (
                    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                            Mayors of Major Cities ({filteredMayors.length})
                        </h3>
                        <DataTableNew
                            columns={mayorColumns}
                            data={filteredMayors}
                            emptyMessage="No mayors match your search"
                        />
                    </div>
                )}

                {/* Historical Firsts */}
                {activeTab === 'firsts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {historicalFirsts.map((first, index) => (
                            <motion.a
                                key={first.achievement}
                                href={first.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="block bg-[var(--color-bg-secondary)] border-l-4 border-[var(--color-accent-gold)] p-4 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-medium text-[var(--color-text-primary)]">
                                            {first.achievement}
                                        </h3>
                                        <p className="text-sm text-[var(--color-accent-green)] mt-1">
                                            {first.name}
                                        </p>
                                    </div>
                                    <span className="font-mono text-sm text-[var(--color-accent-gold)]">
                                        {first.year}
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}

                {/* Source Attribution */}
                <div className="mt-8 text-xs text-[var(--color-text-muted)]">
                    Data sources: Congress.gov, Ballotpedia, official government websites.
                    <a href="https://www.congress.gov" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        Congress.gov <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
