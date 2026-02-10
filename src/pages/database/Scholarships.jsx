import { useState, useMemo } from 'react'
import { ExternalLink, GraduationCap, Award, Users } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'
import FilterBar from '../../components/database/FilterBar'
import DataTableNew from '../../components/database/DataTableNew'
import TerminalStats from '../../components/ui/TerminalStats'

import scholarshipsData from '../../data/scholarships.json'

const formatCurrency = (value) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`
    return `$${value.toLocaleString()}`
}

export default function Scholarships() {
    const [activeTab, setActiveTab] = useState('hbcus')
    const [activeFilters, setActiveFilters] = useState({})
    const [searchQuery, setSearchQuery] = useState('')

    const { hbcus, scholarshipPrograms, overview, statistics } = scholarshipsData.scholarships

    // HBCU filters
    const hbcuTypes = [...new Set(hbcus.map(h => h.type))]

    const filters = activeTab === 'hbcus' ? [
        {
            id: 'type',
            label: 'Type',
            options: hbcuTypes.map(t => ({ value: t, label: t }))
        }
    ] : []

    // Filter HBCUs
    const filteredHBCUs = useMemo(() => {
        return hbcus.filter(hbcu => {
            if (activeFilters.type && activeFilters.type !== 'all') {
                if (hbcu.type !== activeFilters.type) return false
            }
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                return (
                    hbcu.name.toLowerCase().includes(q) ||
                    hbcu.location.toLowerCase().includes(q)
                )
            }
            return true
        })
    }, [hbcus, activeFilters, searchQuery])

    // Filter Scholarships
    const filteredScholarships = useMemo(() => {
        if (!searchQuery) return scholarshipPrograms
        const q = searchQuery.toLowerCase()
        return scholarshipPrograms.filter(s =>
            s.name.toLowerCase().includes(q) ||
            s.sponsor.toLowerCase().includes(q)
        )
    }, [scholarshipPrograms, searchQuery])

    const hbcuColumns = [
        { id: 'ranking', label: '#', align: 'right', mono: true },
        { id: 'name', label: 'Institution' },
        { id: 'location', label: 'Location', color: 'muted' },
        {
            id: 'type', label: 'Type', render: (val) => (
                <span className="px-2 py-0.5 text-xs bg-[var(--color-bg-tertiary)] rounded">{val}</span>
            )
        },
        { id: 'founded', label: 'Founded', align: 'right', mono: true },
        { id: 'enrollment', label: 'Enrollment', format: 'number', align: 'right', mono: true },
        { id: 'endowment', label: 'Endowment', format: 'currency', align: 'right', mono: true, color: 'green' },
        { id: 'website', label: 'Website', link: 'website', sortable: false }
    ]

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Scholarships & HBCUs"
                    description={overview.description}
                    stats={[
                        { label: 'Total HBCUs', value: overview.totalHBCUs.toString(), color: 'green' },
                        { label: 'Total Enrollment', value: `${(overview.totalEnrollment / 1000).toFixed(0)}K`, color: 'gold' },
                        { label: 'Annual Scholarships', value: formatCurrency(overview.annualScholarships) },
                    ]}
                />

                {/* Tab Switcher */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => { setActiveTab('hbcus'); setActiveFilters({}) }}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === 'hbcus'
                                ? 'bg-[var(--color-accent-green)] text-white'
                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                            }`}
                    >
                        <GraduationCap className="w-4 h-4" />
                        HBCUs
                    </button>
                    <button
                        onClick={() => { setActiveTab('scholarships'); setActiveFilters({}) }}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === 'scholarships'
                                ? 'bg-[var(--color-accent-green)] text-white'
                                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                            }`}
                    >
                        <Award className="w-4 h-4" />
                        Scholarship Programs
                    </button>
                </div>

                {/* Search */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder={activeTab === 'hbcus' ? "Search universities..." : "Search scholarships..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)]"
                    />
                </div>

                {activeTab === 'hbcus' && (
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
                        title="HBCU_IMPACT"
                        stats={[
                            { label: 'total_graduates', value: `${(statistics.totalHBCUGraduates / 1000000).toFixed(0)}M+`, color: 'green' },
                            { label: 'black_doctors', value: `${statistics.percentOfBlackDoctors}%`, color: 'gold' },
                            { label: 'black_lawyers', value: `${statistics.percentOfBlackLawyers}%` },
                            { label: 'black_engineers', value: `${statistics.percentOfBlackEngineers}%` },
                        ]}
                    />
                    <TerminalStats
                        title="ANNUAL_STATS"
                        stats={[
                            { label: 'annual_graduates', value: `${(statistics.annualGraduates / 1000).toFixed(0)}K`, color: 'green' },
                            { label: 'hbcu_count', value: overview.totalHBCUs.toString() },
                            { label: 'total_enrollment', value: `${(overview.totalEnrollment / 1000).toFixed(0)}K` },
                        ]}
                    />
                </div>

                {/* HBCUs Table */}
                {activeTab === 'hbcus' && (
                    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                            HBCUs ({filteredHBCUs.length})
                        </h3>
                        <DataTableNew
                            columns={hbcuColumns}
                            data={filteredHBCUs}
                            emptyMessage="No HBCUs match your filters"
                        />
                    </div>
                )}

                {/* Scholarships Grid */}
                {activeTab === 'scholarships' && (
                    <>
                        <div className="mb-4 text-sm text-[var(--color-text-muted)]">
                            Showing {filteredScholarships.length} scholarship programs
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredScholarships.map((scholarship, index) => (
                                <motion.a
                                    key={scholarship.id}
                                    href={scholarship.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="block bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 hover:border-[var(--color-accent-green)] transition-colors rounded-lg"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div>
                                            <h3 className="font-medium text-[var(--color-text-primary)]">
                                                {scholarship.name}
                                            </h3>
                                            <p className="text-xs text-[var(--color-text-muted)]">
                                                {scholarship.sponsor}
                                            </p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0" />
                                    </div>

                                    <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                                        {scholarship.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-sm text-[var(--color-accent-green)]">
                                            {scholarship.amount}
                                        </span>
                                        <span className="text-xs text-[var(--color-text-muted)]">
                                            Deadline: {scholarship.deadline}
                                        </span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </>
                )}

                {/* Source Attribution */}
                <div className="mt-8 text-xs text-[var(--color-text-muted)]">
                    Data sources: UNCF, Thurgood Marshall College Fund, individual institution websites.
                    <a href="https://uncf.org" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        UNCF <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
