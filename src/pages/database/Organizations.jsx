import { useState, useMemo } from 'react'
import { ExternalLink, Building, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'
import FilterBar from '../../components/database/FilterBar'
import TerminalStats from '../../components/ui/TerminalStats'

import orgsData from '../../data/organizations.json'

const formatCurrency = (value) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`
    return `$${value.toLocaleString()}`
}

const categoryColors = {
    'Civil Rights': 'border-[var(--color-accent-green)]',
    'Education': 'border-blue-500',
    'Health': 'border-red-500',
    'Culture': 'border-purple-500',
    'Economic Development': 'border-[var(--color-accent-gold)]',
    'Humanitarian': 'border-orange-500',
    'Governance': 'border-cyan-500',
}

export default function Organizations() {
    const [activeFilters, setActiveFilters] = useState({})
    const [searchQuery, setSearchQuery] = useState('')

    const { list, overview, byCategory } = orgsData.organizations

    const filters = [
        {
            id: 'category',
            label: 'Category',
            options: overview.categories.map(c => ({ value: c, label: c, count: byCategory[c] }))
        }
    ]

    const filteredOrgs = useMemo(() => {
        return list.filter(org => {
            if (activeFilters.category && activeFilters.category !== 'all') {
                if (org.category !== activeFilters.category) return false
            }
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                return (
                    org.name.toLowerCase().includes(q) ||
                    org.fullName.toLowerCase().includes(q) ||
                    org.mission.toLowerCase().includes(q)
                )
            }
            return true
        })
    }, [list, activeFilters, searchQuery])

    const totalBudget = list.reduce((sum, org) => sum + (org.budget || 0), 0)

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Organizations"
                    description={overview.description}
                    stats={[
                        { label: 'Organizations', value: overview.total.toString(), color: 'green' },
                        { label: 'Combined Budget', value: formatCurrency(totalBudget), color: 'gold' },
                        { label: 'Categories', value: overview.categories.length.toString() },
                    ]}
                />

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search organizations..."
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

                {/* Category Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <TerminalStats
                        title="BY_CATEGORY"
                        stats={Object.entries(byCategory).slice(0, 6).map(([cat, count]) => ({
                            label: cat.toLowerCase().replace(/\s+/g, '_'),
                            value: count.toString(),
                            color: cat === 'Civil Rights' ? 'green' : cat === 'Education' ? 'blue' : undefined
                        }))}
                    />
                </div>

                {/* Organizations Grid */}
                <div className="mb-4 text-sm text-[var(--color-text-muted)]">
                    Showing {filteredOrgs.length} organizations
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredOrgs.map((org, index) => (
                        <motion.a
                            key={org.id}
                            href={org.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className={`block bg-[var(--color-bg-secondary)] border-l-4 ${categoryColors[org.category] || 'border-gray-500'} p-4 hover:bg-[var(--color-bg-tertiary)] transition-colors`}
                        >
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                    <h3 className="font-medium text-[var(--color-text-primary)]">
                                        {org.name}
                                    </h3>
                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        {org.fullName !== org.name ? org.fullName : org.headquarters}
                                    </p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
                            </div>

                            <p className="text-xs text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                                {org.mission}
                            </p>

                            <div className="flex items-center justify-between text-xs">
                                <span className="px-2 py-0.5 bg-[var(--color-bg-tertiary)] rounded text-[var(--color-text-muted)]">
                                    {org.category}
                                </span>
                                <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                                    <span>Est. {org.founded}</span>
                                    {org.budget && (
                                        <span className="font-mono text-[var(--color-accent-green)]">
                                            {formatCurrency(org.budget)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {org.focus && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {org.focus.slice(0, 3).map(f => (
                                        <span key={f} className="px-1.5 py-0.5 text-[10px] bg-[var(--color-bg-primary)] rounded text-[var(--color-text-muted)]">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.a>
                    ))}
                </div>

                {filteredOrgs.length === 0 && (
                    <div className="text-center py-12 text-[var(--color-text-muted)]">
                        No organizations match your search.
                    </div>
                )}

                {/* Source Attribution */}
                <div className="mt-8 text-xs text-[var(--color-text-muted)]">
                    Data sources: Organization websites, GuideStar, Charity Navigator.
                </div>
            </div>
        </div>
    )
}
