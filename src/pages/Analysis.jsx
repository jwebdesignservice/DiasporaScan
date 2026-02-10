import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2, ExternalLink } from 'lucide-react'

import WorldMap from '../components/maps/WorldMap'
import StatBox from '../components/ui/StatBox'
import ActionButton from '../components/ui/ActionButton'
import TerminalStats from '../components/ui/TerminalStats'
import InvestigationCard from '../components/ui/InvestigationCard'
import Badge from '../components/ui/Badge'

import {
    useAllCountries,
    useEthnicGroups,
    useCultureData,
} from '../hooks/useApi'
import { fetchHistoricalFigures } from '../services/api'

// Static data as fallback
import countriesDataStatic from '../data/countries.json'
import figuresDataStatic from '../data/figures.json'
import clansDataStatic from '../data/clans.json'
import cultureDataStatic from '../data/culture.json'
import diasporaData from '../data/diaspora.json'

const filterTabs = [
    { id: 'all', label: 'All Migrations' },
    { id: 'transatlantic', label: 'Transatlantic' },
    { id: 'modern', label: 'Modern' },
    { id: 'internal', label: 'Internal' },
]

export default function Analysis() {
    const [activeFilter, setActiveFilter] = useState('all')
    const navigate = useNavigate()

    // API data
    const { data: countriesData, loading: countriesLoading } = useAllCountries()
    const { data: ethnicData, loading: ethnicLoading } = useEthnicGroups(100)
    const { data: cultureData, loading: cultureLoading } = useCultureData()

    // Figures loaded separately
    const [figures, setFigures] = useState([])
    const [figuresLoading, setFiguresLoading] = useState(true)

    // Combined data (API + static fallback)
    const [allData, setAllData] = useState({
        countries: countriesDataStatic.countries,
        figures: figuresDataStatic.figures,
        clans: clansDataStatic.clans,
        music: cultureDataStatic.culture.music,
        food: cultureDataStatic.culture.food,
        languages: cultureDataStatic.culture.languages,
    })

    // Load figures
    useEffect(() => {
        async function loadFigures() {
            setFiguresLoading(true)
            try {
                const data = await fetchHistoricalFigures('civil_rights', 30)
                setFigures(data)
            } catch (error) {
                console.error('Failed to load figures:', error)
            }
            setFiguresLoading(false)
        }
        loadFigures()
    }, [])

    // Merge API data with static data
    useEffect(() => {
        const mergedCountries = [
            ...(countriesData?.all || []),
            ...countriesDataStatic.countries.filter(
                static_c => !countriesData?.all?.find(api_c => api_c.code === static_c.code)
            )
        ]

        const mergedClans = [
            ...(ethnicData || []),
            ...clansDataStatic.clans.filter(
                static_c => !ethnicData?.find(api_c => api_c.name.toLowerCase() === static_c.name.toLowerCase())
            )
        ]

        const mergedFigures = [
            ...figures,
            ...figuresDataStatic.figures.filter(
                static_f => !figures.find(api_f => api_f.name.toLowerCase() === static_f.name.toLowerCase())
            )
        ]

        setAllData({
            countries: mergedCountries,
            figures: mergedFigures,
            clans: mergedClans,
            music: [...(cultureData?.music || []), ...cultureDataStatic.culture.music.filter(
                m => !cultureData?.music?.find(api_m => api_m.name === m.name)
            )],
            food: [...(cultureData?.food || []), ...cultureDataStatic.culture.food.filter(
                f => !cultureData?.food?.find(api_f => api_f.name === f.name)
            )],
            languages: [...(cultureData?.languages || []), ...cultureDataStatic.culture.languages.filter(
                l => !cultureData?.languages?.find(api_l => api_l.name === l.name)
            )],
        })
    }, [countriesData, ethnicData, cultureData, figures])

    const isLoading = countriesLoading || ethnicLoading || cultureLoading || figuresLoading

    const handleCountryClick = (country) => {
        navigate(`/database?q=${encodeURIComponent(country.name)}&type=countries`)
    }

    // Calculate stats
    const totalMigrants = diasporaData.diaspora.migrations.reduce(
        (sum, m) => sum + (m.estimatedPeople || 0), 0
    )

    // Filter migrations based on active filter
    const filteredMigrations = activeFilter === 'all' 
        ? diasporaData.diaspora.migrations 
        : diasporaData.diaspora.migrations.filter(m => m.type === activeFilter)

    return (
        <div className="min-h-screen">
            <section className="px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Top Stats */}
                    <div className="flex flex-wrap gap-8 lg:gap-16 mb-6">
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                                {isLoading ? <Loader2 className="w-10 h-10 animate-spin" /> : diasporaData.diaspora.overview.totalPopulation.toLocaleString()}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Total diaspora population
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-green)]">
                                {diasporaData.diaspora.migrations.length}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Major migration routes
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-gold)]">
                                {diasporaData.diaspora.communities.length}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Diaspora communities
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-blue-400">
                                {countriesLoading ? <Loader2 className="w-10 h-10 animate-spin" /> : allData.countries.length}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Countries tracked
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-secondary)]">
                                {figuresLoading ? <Loader2 className="w-10 h-10 animate-spin" /> : allData.figures.length}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Historical figures
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`text-sm transition-colors ${activeFilter === tab.id
                                        ? 'text-[var(--color-accent-green)]'
                                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative bg-[var(--color-bg-primary)] rounded-lg overflow-hidden mb-8"
                    >
                        <WorldMap onCountryClick={handleCountryClick} />
                    </motion.div>

                    {/* Diaspora Communities Stats */}
                    <div className="mb-6">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Major Diaspora Communities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {diasporaData.diaspora.communities.map((community, index) => (
                                <StatBox
                                    key={community.id}
                                    title={community.name}
                                    value={`${(community.population / 1000000).toFixed(0)}M`}
                                    subtitle={community.location}
                                    delay={index * 0.05}
                                    onClick={() => navigate(`/database?q=${encodeURIComponent(community.location)}`)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-[var(--color-border)]">
                        <ActionButton href="/database" variant="green">
                            Search All Data
                        </ActionButton>
                        <ActionButton href="/africa" variant="red">
                            Africa Map
                        </ActionButton>
                        <span
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                        >
                            Back to home <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>

                    {/* Terminal Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <TerminalStats
                            title="MIGRATION_DATABASE"
                            stats={[
                                { label: 'total_migrants', value: totalMigrants.toLocaleString(), color: 'green' },
                                { label: 'routes_tracked', value: diasporaData.diaspora.migrations.length.toString() },
                                { label: 'communities', value: diasporaData.diaspora.communities.length.toString() },
                                { label: 'countries', value: countriesLoading ? '...' : allData.countries.length.toString() },
                                { label: 'time_span', value: '1500s-present' },
                            ]}
                        />
                        <TerminalStats
                            title="BY_DESTINATION"
                            stats={[
                                { label: 'americas', value: '~120M', color: 'green' },
                                { label: 'europe', value: '~10M', color: 'gold' },
                                { label: 'caribbean', value: '~40M' },
                                { label: 'middle_east', value: '~5M' },
                            ]}
                        />
                    </div>

                    {/* Migration Routes - Investigation Cards */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Migration Routes ({filteredMigrations.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredMigrations.map((migration, index) => (
                                <InvestigationCard
                                    key={migration.id}
                                    title={migration.name}
                                    description={migration.description}
                                    stat={migration.estimatedPeople?.toLocaleString()}
                                    statLabel="people"
                                    isNew={migration.id === 'transatlantic'}
                                    href={`/database?q=${encodeURIComponent(migration.name)}`}
                                    delay={index * 0.05}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Communities Table */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Diaspora Communities</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--color-border)]">
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Community</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Location</th>
                                        <th className="py-2 px-3 text-right text-xs font-medium text-[var(--color-accent-green)]">Population</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Origins</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diasporaData.diaspora.communities.map((community, index) => (
                                        <motion.tr
                                            key={community.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.03 }}
                                            className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
                                            onClick={() => navigate(`/database?q=${encodeURIComponent(community.location)}`)}
                                        >
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                                                {community.name}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                                                {community.location}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">
                                                {community.population?.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-3 text-sm">
                                                <div className="flex flex-wrap gap-1">
                                                    {community.origins?.slice(0, 2).map((origin) => (
                                                        <Badge key={origin} variant="default">{origin}</Badge>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-3 px-3">
                                                <a
                                                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(community.name.replace(/\s/g, '_'))}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-[var(--color-accent-green)] hover:text-[var(--color-accent-green-light)]"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Key Facts */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Key Facts</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {diasporaData.diaspora.communities.map((community) => (
                                <div
                                    key={community.id}
                                    className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="text-sm font-medium text-[var(--color-text-primary)]">{community.name}</h4>
                                        <span className="font-mono text-xs text-[var(--color-accent-gold)]">
                                            {(community.population / 1000000).toFixed(0)}M
                                        </span>
                                    </div>
                                    <ul className="space-y-1">
                                        {community.keyFacts?.slice(0, 2).map((fact, i) => (
                                            <li key={i} className="text-xs text-[var(--color-text-muted)]">
                                                • {fact}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Database Stats Summary */}
                    <div className="mb-8 p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Full Database Summary</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <div className="font-mono text-2xl font-bold text-[var(--color-accent-green)]">
                                    {countriesLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : allData.countries.length}
                                </div>
                                <div className="text-xs text-[var(--color-text-muted)]">Countries</div>
                            </div>
                            <div>
                                <div className="font-mono text-2xl font-bold text-[var(--color-accent-gold)]">
                                    {figuresLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : allData.figures.length}
                                </div>
                                <div className="text-xs text-[var(--color-text-muted)]">Historical Figures</div>
                            </div>
                            <div>
                                <div className="font-mono text-2xl font-bold text-blue-400">
                                    {ethnicLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : allData.clans.length}
                                </div>
                                <div className="text-xs text-[var(--color-text-muted)]">Ethnic Groups</div>
                            </div>
                            <div>
                                <div className="font-mono text-2xl font-bold text-[var(--color-text-secondary)]">
                                    {cultureLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (allData.music.length + allData.food.length + allData.languages.length)}
                                </div>
                                <div className="text-xs text-[var(--color-text-muted)]">Culture Items</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
