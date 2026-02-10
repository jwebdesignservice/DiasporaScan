import { useState, useMemo } from 'react'
import { ExternalLink, TrendingUp, Building2, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'
import FilterBar from '../../components/database/FilterBar'
import DataTableNew from '../../components/database/DataTableNew'
import TerminalStats from '../../components/ui/TerminalStats'

import businessesData from '../../data/businesses.json'

const formatCurrency = (value) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value.toLocaleString()}`
}

const formatNumber = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value.toLocaleString()
}

export default function Businesses() {
    const [activeTab, setActiveTab] = useState('industry')
    const [activeFilters, setActiveFilters] = useState({})

    const { byIndustry, byState, notableCompanies, overview, trends } = businessesData.businesses

    const industryColumns = [
        { id: 'industry', label: 'Industry' },
        { id: 'businesses', label: 'Businesses', format: 'number', align: 'right', mono: true },
        { id: 'revenue', label: 'Revenue', format: 'currency', align: 'right', mono: true, color: 'green' },
        { id: 'percentOfTotal', label: '% of Total', align: 'right', mono: true, render: (val) => `${val}%` },
        { 
            id: 'growth', 
            label: 'Growth', 
            align: 'right',
            render: (val) => (
                <span className="flex items-center justify-end gap-1 text-[var(--color-accent-green)]">
                    <TrendingUp className="w-3 h-3" />
                    +{val}%
                </span>
            )
        },
    ]

    const stateColumns = [
        { 
            id: 'state', 
            label: 'State',
            render: (val, row) => (
                <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[var(--color-text-muted)]">{row.code}</span>
                    <span>{val}</span>
                </div>
            )
        },
        { id: 'businesses', label: 'Businesses', format: 'number', align: 'right', mono: true },
        { id: 'revenue', label: 'Revenue', format: 'currency', align: 'right', mono: true, color: 'green' },
    ]

    const industryData = byIndustry.map((ind, i) => ({ ...ind, id: i }))
    const stateData = byState.map((st, i) => ({ ...st, id: i }))

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Black-Owned Businesses"
                    description={overview.description}
                    stats={[
                        { label: 'Total Businesses', value: formatNumber(overview.totalBlackOwned), color: 'green' },
                        { label: 'Total Revenue', value: formatCurrency(overview.totalRevenue), color: 'gold' },
                        { label: 'Jobs Created', value: formatNumber(overview.employmentGenerated) },
                        { label: 'YoY Growth', value: `+${overview.growthRate}%`, color: 'green' },
                    ]}
                />

                {/* Tab Switcher */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('industry')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                            activeTab === 'industry'
                                ? 'bg-[var(--color-accent-green)] text-white'
                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                        }`}
                    >
                        <Briefcase className="w-4 h-4" />
                        By Industry
                    </button>
                    <button
                        onClick={() => setActiveTab('state')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                            activeTab === 'state'
                                ? 'bg-[var(--color-accent-green)] text-white'
                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                        }`}
                    >
                        <Building2 className="w-4 h-4" />
                        By State
                    </button>
                    <button
                        onClick={() => setActiveTab('notable')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                            activeTab === 'notable'
                                ? 'bg-[var(--color-accent-green)] text-white'
                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                        }`}
                    >
                        Notable Companies
                    </button>
                </div>

                {/* Statistics Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <TerminalStats
                        title="FASTEST_GROWING"
                        stats={trends.fastestGrowing.map((ind, i) => ({
                            label: ind.toLowerCase().replace(/\s+/g, '_'),
                            value: `#${i + 1}`,
                            color: i === 0 ? 'green' : undefined
                        }))}
                    />
                    <TerminalStats
                        title="KEY_METRICS"
                        stats={[
                            { label: 'vc_funding_2023', value: formatCurrency(trends.venture_funding_2023), color: 'gold' },
                            { label: 'with_employees', value: `${trends.percentWithEmployees}%` },
                            { label: 'avg_revenue', value: formatCurrency(trends.averageRevenue) },
                        ]}
                    />
                </div>

                {/* Industry Table */}
                {activeTab === 'industry' && (
                    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                            By Industry ({byIndustry.length})
                        </h3>
                        <DataTableNew
                            columns={industryColumns}
                            data={industryData}
                            emptyMessage="No data available"
                        />
                    </div>
                )}

                {/* State Table */}
                {activeTab === 'state' && (
                    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                            By State ({byState.length})
                        </h3>
                        <DataTableNew
                            columns={stateColumns}
                            data={stateData}
                            emptyMessage="No data available"
                        />
                    </div>
                )}

                {/* Notable Companies */}
                {activeTab === 'notable' && (
                    <>
                        <div className="mb-4 text-sm text-[var(--color-text-muted)]">
                            Showing {notableCompanies.length} notable companies
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {notableCompanies.map((company, index) => (
                                <motion.div
                                    key={company.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 rounded-lg"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div>
                                            <h3 className="font-medium text-[var(--color-text-primary)]">
                                                {company.name}
                                            </h3>
                                            <p className="text-xs text-[var(--color-text-muted)]">
                                                Founded by {company.founder} ({company.founded})
                                            </p>
                                        </div>
                                        {company.website && (
                                            <a
                                                href={company.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-green)]"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>

                                    <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                                        {company.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="px-2 py-0.5 text-xs bg-[var(--color-bg-tertiary)] rounded text-[var(--color-text-muted)]">
                                            {company.industry}
                                        </span>
                                        <div className="flex items-center gap-4 text-xs">
                                            <span className="font-mono text-[var(--color-accent-green)]">
                                                {formatCurrency(company.revenue)}
                                            </span>
                                            <span className="text-[var(--color-text-muted)]">
                                                {formatNumber(company.employees)} employees
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}

                {/* Source Attribution */}
                <div className="mt-8 text-xs text-[var(--color-text-muted)]">
                    Data sources: U.S. Census Annual Business Survey, SBA, Black Enterprise.
                    <a href="https://www.census.gov/programs-surveys/abs.html" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        U.S. Census <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
