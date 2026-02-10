import { useState, useMemo } from 'react'
import { ExternalLink } from 'lucide-react'

import PageHeader from '../../components/database/PageHeader'
import FilterBar from '../../components/database/FilterBar'
import DataTableNew from '../../components/database/DataTableNew'
import TerminalStats from '../../components/ui/TerminalStats'

import fundingData from '../../data/funding.json'

const formatCurrency = (value) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`
    return `$${value.toLocaleString()}`
}

export default function Funding() {
    const [activeFilters, setActiveFilters] = useState({})
    const [searchQuery, setSearchQuery] = useState('')

    const { grants, categories, topDonors, overview } = fundingData.funding

    // Build filter options
    const filters = [
        {
            id: 'category',
            label: 'Category',
            options: categories.map(c => ({ value: c.name, label: c.name }))
        },
        {
            id: 'year',
            label: 'Year',
            options: [
                { value: '2024', label: '2024' },
                { value: '2023', label: '2023' },
                { value: '2022', label: '2022' },
            ]
        }
    ]

    // Filter grants
    const filteredGrants = useMemo(() => {
        return grants.filter(grant => {
            // Category filter
            if (activeFilters.category && activeFilters.category !== 'all') {
                if (grant.category !== activeFilters.category) return false
            }
            // Year filter
            if (activeFilters.year && activeFilters.year !== 'all') {
                if (String(grant.year) !== activeFilters.year) return false
            }
            // Search
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                return (
                    grant.donor.toLowerCase().includes(q) ||
                    grant.recipient.toLowerCase().includes(q) ||
                    grant.description.toLowerCase().includes(q)
                )
            }
            return true
        })
    }, [grants, activeFilters, searchQuery])

    const columns = [
        { id: 'donor', label: 'Donor', color: 'primary' },
        { id: 'recipient', label: 'Recipient', color: 'muted' },
        { id: 'amount', label: 'Amount', format: 'currency', align: 'right', mono: true, color: 'green' },
        { id: 'year', label: 'Year', align: 'right', mono: true },
        {
            id: 'category', label: 'Category', render: (val) => (
                <span className="px-2 py-0.5 text-xs bg-[var(--color-bg-tertiary)] rounded">{val}</span>
            )
        },
        { id: 'source', label: 'Source', link: 'source', sortable: false }
    ]

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Diaspora Funding"
                    description={overview.description}
                    stats={[
                        { label: 'Total Granted', value: formatCurrency(overview.totalGranted), color: 'green' },
                        { label: 'Organizations Funded', value: overview.totalOrganizations.toLocaleString(), color: 'gold' },
                        { label: 'Top Donor Country', value: overview.topDonorCountry },
                    ]}
                />

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search donors, recipients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)]"
                    />
                </div>

                <FilterBar
                    filters={filters}
                    activeFilters={activeFilters}
                    onFilterChange={(id, value) => setActiveFilters({ ...activeFilters, [id]: value })}
                    onClear={() => setActiveFilters({})}
                />

                {/* Stats Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <TerminalStats
                        title="BY_CATEGORY"
                        stats={categories.slice(0, 5).map(c => ({
                            label: c.name.toLowerCase().replace(/\s+/g, '_'),
                            value: formatCurrency(c.totalFunding),
                            color: c.name === 'Health' ? 'green' : undefined
                        }))}
                    />
                    <TerminalStats
                        title="TOP_DONORS"
                        stats={topDonors.slice(0, 5).map(d => ({
                            label: d.name.split(' ').slice(0, 2).join('_').toLowerCase(),
                            value: formatCurrency(d.totalGiven),
                            color: 'gold'
                        }))}
                    />
                </div>

                {/* Grants Table */}
                <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4">
                    <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                        Grants ({filteredGrants.length})
                    </h3>
                    <DataTableNew
                        columns={columns}
                        data={filteredGrants}
                        emptyMessage="No grants match your filters"
                    />
                </div>

                {/* Source Attribution */}
                <div className="mt-6 text-xs text-[var(--color-text-muted)]">
                    Data sources: Foundation websites, GuideStar, Charity Navigator.
                    <a href="https://www.gatesfoundation.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        Gates Foundation <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
