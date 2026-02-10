import { useState } from 'react'
import { ExternalLink, Users, Search } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'
import DataTableNew from '../../components/database/DataTableNew'
import FilterBar from '../../components/database/FilterBar'

import officialsData from '../../data/officials.json'

export default function Representatives() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilters, setActiveFilters] = useState({})
    
    const { representatives } = officialsData.officials

    const filters = [
        {
            id: 'party',
            label: 'Party',
            options: [
                { value: 'Democrat', label: 'Democrat' },
                { value: 'Republican', label: 'Republican' },
            ]
        }
    ]

    const filteredReps = representatives.filter(rep => {
        if (activeFilters.party && activeFilters.party !== 'all') {
            if (rep.party !== activeFilters.party) return false
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase()
            return rep.name.toLowerCase().includes(q) || rep.state.toLowerCase().includes(q)
        }
        return true
    })

    const columns = [
        { 
            id: 'name', 
            label: 'Representative',
            render: (val, row) => (
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center ${
                        row.party === 'Democrat' ? 'bg-blue-500/20' : 'bg-red-500/20'
                    }`}>
                        <Users className={`w-5 h-5 ${
                            row.party === 'Democrat' ? 'text-blue-400' : 'text-red-400'
                        }`} />
                    </div>
                    <div>
                        <span className="font-medium">{val}</span>
                        {row.leadership && (
                            <div className="text-xs text-[var(--color-accent-green)]">{row.leadership}</div>
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

    const democrats = representatives.filter(r => r.party === 'Democrat').length
    const republicans = representatives.filter(r => r.party === 'Republican').length

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Black U.S. Representatives"
                    description="African American members of the U.S. House of Representatives. These representatives serve districts across the nation and hold key leadership positions."
                    stats={[
                        { label: 'Total Representatives', value: representatives.length.toString(), color: 'green' },
                        { label: 'Democrats', value: democrats.toString(), color: 'blue' },
                        { label: 'Republicans', value: republicans.toString(), color: 'red' },
                    ]}
                />

                {/* Search */}
                <div className="mb-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                        <input
                            type="text"
                            placeholder="Search by name or state..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)]"
                        />
                    </div>
                </div>

                <FilterBar
                    filters={filters}
                    activeFilters={activeFilters}
                    onFilterChange={(id, value) => setActiveFilters({ ...activeFilters, [id]: value })}
                    onClear={() => setActiveFilters({})}
                />

                {/* Table */}
                <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                    <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                        Representatives ({filteredReps.length})
                    </h3>
                    <DataTableNew
                        columns={columns}
                        data={filteredReps}
                        emptyMessage="No representatives match your search"
                    />
                </div>

                {/* Source */}
                <div className="mt-6 text-xs text-[var(--color-text-muted)]">
                    Data source: U.S. House of Representatives, Congress.gov
                    <a href="https://www.house.gov" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        house.gov <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
