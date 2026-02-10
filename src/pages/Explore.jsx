import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import WorldMap from '../components/maps/WorldMap'
import StatBox from '../components/ui/StatBox'
import ActionButton from '../components/ui/ActionButton'
import TerminalStats from '../components/ui/TerminalStats'
import InvestigationCard from '../components/ui/InvestigationCard'
import Badge from '../components/ui/Badge'

import countriesData from '../data/countries.json'
import diasporaData from '../data/diaspora.json'

const filterTabs = [
    { id: 'all', label: 'All Migrations' },
    { id: 'transatlantic', label: 'Transatlantic' },
    { id: 'modern', label: 'Modern' },
    { id: 'internal', label: 'Internal' },
]

export default function Explore() {
    const [activeFilter, setActiveFilter] = useState('all')
    const navigate = useNavigate()

    const handleCountryClick = (country) => {
        navigate(`/search?q=${encodeURIComponent(country.name)}&type=country`)
    }

    // Calculate stats
    const totalMigrants = diasporaData.diaspora.migrations.reduce(
        (sum, m) => sum + (m.estimatedPeople || 0), 0
    )

    return (
        <div className="min-h-screen">
            <section className="px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Top Stats */}
                    <div className="flex flex-wrap gap-8 lg:gap-16 mb-6">
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                                {diasporaData.diaspora.overview.totalPopulation.toLocaleString()}
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
                                    onClick={() => navigate(`/search?q=${encodeURIComponent(community.location)}`)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-[var(--color-border)]">
                        <ActionButton href="/search" variant="green">
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
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Migration Routes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {diasporaData.diaspora.migrations.map((migration, index) => (
                                <InvestigationCard
                                    key={migration.id}
                                    title={migration.name}
                                    description={migration.description}
                                    stat={migration.estimatedPeople?.toLocaleString()}
                                    statLabel="people"
                                    isNew={migration.id === 'transatlantic'}
                                    href={`/search?q=${encodeURIComponent(migration.name)}`}
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
                                            onClick={() => navigate(`/search?q=${encodeURIComponent(community.location)}`)}
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
                            {diasporaData.diaspora.communities.map((community, index) => (
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
                </div>
            </section>
        </div>
    )
}
