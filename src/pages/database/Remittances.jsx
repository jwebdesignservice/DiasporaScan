import { useState, useMemo } from 'react'
import { ExternalLink, TrendingUp, TrendingDown } from 'lucide-react'

import PageHeader from '../../components/database/PageHeader'
import FilterBar from '../../components/database/FilterBar'
import DataTableNew from '../../components/database/DataTableNew'
import TerminalStats from '../../components/ui/TerminalStats'

import remittancesData from '../../data/remittances.json'

const formatCurrency = (value) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`
    return `$${value.toLocaleString()}`
}

export default function Remittances() {
    const [activeFilters, setActiveFilters] = useState({})
    const [selectedYear, setSelectedYear] = useState('2023')

    const { byCountry, trends, topSourceCountries, overview } = remittancesData.remittances

    // Get unique regions
    const regions = [...new Set(byCountry.map(c => c.region))]

    const filters = [
        {
            id: 'region',
            label: 'Region',
            options: regions.map(r => ({ value: r, label: r }))
        }
    ]

    // Filter and add calculated fields
    const processedData = useMemo(() => {
        return byCountry
            .filter(country => {
                if (activeFilters.region && activeFilters.region !== 'all') {
                    return country.region === activeFilters.region
                }
                return true
            })
            .map(country => {
                const currentYear = country[selectedYear] || 0
                const prevYear = country[String(Number(selectedYear) - 1)] || 0
                const growth = prevYear > 0 ? ((currentYear - prevYear) / prevYear * 100).toFixed(1) : 0
                return {
                    ...country,
                    currentAmount: currentYear,
                    growth: parseFloat(growth),
                    id: country.code
                }
            })
            .sort((a, b) => b.currentAmount - a.currentAmount)
    }, [byCountry, activeFilters, selectedYear])

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
                    <span>{val}</span>
                </div>
            )
        },
        { id: 'region', label: 'Region', color: 'muted' },
        { id: 'currentAmount', label: `${selectedYear} Remittances`, format: 'currency', align: 'right', mono: true, color: 'green' },
        { id: 'percentOfGDP', label: '% of GDP', align: 'right', mono: true, render: (val) => `${val}%` },
        {
            id: 'growth',
            label: 'YoY Growth',
            align: 'right',
            render: (val) => (
                <span className={`flex items-center justify-end gap-1 ${val >= 0 ? 'text-[var(--color-accent-green)]' : 'text-red-400'}`}>
                    {val >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {val >= 0 ? '+' : ''}{val}%
                </span>
            )
        },
        {
            id: 'mainSources',
            label: 'Main Sources',
            render: (val) => (
                <div className="flex flex-wrap gap-1">
                    {val?.slice(0, 2).map(source => (
                        <span key={source} className="px-1.5 py-0.5 text-xs bg-[var(--color-bg-tertiary)] rounded">
                            {source}
                        </span>
                    ))}
                </div>
            ),
            sortable: false
        },
        { id: 'source', label: 'Source', link: 'source', sortable: false }
    ]

    const totalForYear = processedData.reduce((sum, c) => sum + c.currentAmount, 0)

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Remittances to Africa"
                    description={overview.description}
                    stats={[
                        { label: `Total to Africa (${selectedYear})`, value: formatCurrency(totalForYear), color: 'green' },
                        { label: 'YoY Growth', value: `+${overview.growthRate}%`, color: 'gold' },
                        { label: 'Top Receiver', value: overview.topReceiver },
                    ]}
                />

                {/* Year Selector */}
                <div className="flex gap-2 mb-4">
                    {['2020', '2021', '2022', '2023', '2024'].map(year => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${selectedYear === year
                                    ? 'bg-[var(--color-accent-green)] text-white'
                                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
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
                        title="TRENDS"
                        stats={trends.slice(-4).map(t => ({
                            label: String(t.year),
                            value: formatCurrency(t.totalToAfrica),
                            color: t.year === 2024 ? 'green' : undefined
                        }))}
                    />
                    <TerminalStats
                        title="TOP_SOURCE_COUNTRIES"
                        stats={topSourceCountries.map(c => ({
                            label: c.country.toLowerCase().replace(/\s+/g, '_'),
                            value: formatCurrency(c.amount),
                            color: 'gold'
                        }))}
                    />
                </div>

                {/* Data Table */}
                <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-4">
                    <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                        Remittances by Country ({processedData.length})
                    </h3>
                    <DataTableNew
                        columns={columns}
                        data={processedData}
                        emptyMessage="No data for selected filters"
                    />
                </div>

                {/* Source Attribution */}
                <div className="mt-6 text-xs text-[var(--color-text-muted)]">
                    Data source: World Bank Migration and Development Brief.
                    <a href="https://www.worldbank.org/en/topic/migrationremittancesdiasporaissues" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        World Bank <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
