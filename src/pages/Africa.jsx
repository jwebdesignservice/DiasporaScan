import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import AfricaMap from '../components/maps/AfricaMap'
import StatBox from '../components/ui/StatBox'
import ActionButton from '../components/ui/ActionButton'
import TerminalStats from '../components/ui/TerminalStats'
import InvestigationCard from '../components/ui/InvestigationCard'
import Badge from '../components/ui/Badge'

import countriesData from '../data/countries.json'
import clansData from '../data/clans.json'

const filterTabs = [
    { id: 'all', label: 'All Regions' },
    { id: 'west', label: 'West Africa' },
    { id: 'east', label: 'East Africa' },
    { id: 'south', label: 'Southern Africa' },
    { id: 'north', label: 'North Africa' },
]

export default function Africa() {
    const [activeFilter, setActiveFilter] = useState('all')
    const navigate = useNavigate()

    const africanCountries = countriesData.countries.filter(c => !c.region.includes('Diaspora'))

    const totalPopulation = africanCountries.reduce((sum, c) => sum + (c.population || 0), 0)

    const handleCountryClick = (country) => {
        navigate(`/search?q=${encodeURIComponent(country.name)}&type=country`)
    }

    return (
        <div className="min-h-screen">
            <section className="px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Top Stats */}
                    <div className="flex flex-wrap gap-8 lg:gap-16 mb-6">
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                                54
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                African nations
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-green)]">
                                1.4B+
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Total population
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-gold)]">
                                2000+
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Languages spoken
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-secondary)]">
                                {clansData.clans.length}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Major ethnic groups tracked
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
                        <AfricaMap onCountryClick={handleCountryClick} />
                    </motion.div>

                    {/* Countries Stats */}
                    <div className="mb-6">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Countries by Population</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {africanCountries.slice(0, 5).map((country, index) => (
                                <StatBox
                                    key={country.id}
                                    title={country.name}
                                    value={`${(country.population / 1000000).toFixed(0)}M`}
                                    subtitle={`Diaspora: ${(country.diasporaPopulation / 1000000).toFixed(0)}M`}
                                    delay={index * 0.05}
                                    onClick={() => handleCountryClick(country)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-[var(--color-border)]">
                        <ActionButton href="/search?type=countries" variant="green">
                            Search Countries
                        </ActionButton>
                        <ActionButton href="/search?type=clan" variant="red">
                            Explore Clans
                        </ActionButton>
                        <span
                            onClick={() => navigate('/explore')}
                            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                        >
                            World map <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>

                    {/* Terminal Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <TerminalStats
                            title="AFRICA_DATABASE"
                            stats={[
                                { label: 'nations', value: '54', color: 'green' },
                                { label: 'population', value: '1.4B+' },
                                { label: 'languages', value: '2000+' },
                                { label: 'ethnic_groups', value: clansData.clans.length.toString() },
                                { label: 'countries_tracked', value: africanCountries.length.toString(), color: 'gold' },
                            ]}
                        />
                        <TerminalStats
                            title="BY_REGION"
                            stats={[
                                { label: 'west_africa', value: '400M+', color: 'green' },
                                { label: 'east_africa', value: '450M+' },
                                { label: 'southern_africa', value: '200M+' },
                                { label: 'north_africa', value: '250M+' },
                                { label: 'central_africa', value: '180M+' },
                            ]}
                        />
                    </div>

                    {/* Clans/Ethnic Groups - Investigation Cards */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Major Ethnic Groups</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {clansData.clans.slice(0, 6).map((clan, index) => (
                                <InvestigationCard
                                    key={clan.id}
                                    title={clan.name}
                                    description={clan.description}
                                    stat={`${(clan.population / 1000000).toFixed(0)}M`}
                                    statLabel="people"
                                    href={`/search?q=${encodeURIComponent(clan.name)}&type=clan`}
                                    delay={index * 0.05}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Countries Table */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">All Countries</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--color-border)]">
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Country</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Region</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Capital</th>
                                        <th className="py-2 px-3 text-right text-xs font-medium text-[var(--color-accent-green)]">Population</th>
                                        <th className="py-2 px-3 text-right text-xs font-medium text-[var(--color-accent-green)]">Diaspora</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Languages</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {africanCountries.map((country, index) => (
                                        <motion.tr
                                            key={country.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.03 }}
                                            className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
                                            onClick={() => handleCountryClick(country)}
                                        >
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                                                {country.name}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                                                {country.region}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                                                {country.capital}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">
                                                {(country.population / 1000000).toFixed(0)}M
                                            </td>
                                            <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-gold)]">
                                                {(country.diasporaPopulation / 1000000).toFixed(0)}M
                                            </td>
                                            <td className="py-3 px-3 text-sm">
                                                <div className="flex flex-wrap gap-1">
                                                    {country.languages?.slice(0, 2).map((lang) => (
                                                        <Badge key={lang} variant="default">{lang}</Badge>
                                                    ))}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Clans Table */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Clans & Tribes</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--color-border)]">
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Name</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Country</th>
                                        <th className="py-2 px-3 text-right text-xs font-medium text-[var(--color-accent-green)]">Population</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Language</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Common Surnames</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clansData.clans.map((clan, index) => (
                                        <motion.tr
                                            key={clan.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.03 }}
                                            className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
                                            onClick={() => navigate(`/search?q=${encodeURIComponent(clan.name)}&type=clan`)}
                                        >
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                                                {clan.name}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                                                {clan.country}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">
                                                {(clan.population / 1000000).toFixed(0)}M
                                            </td>
                                            <td className="py-3 px-3 text-sm">
                                                <Badge variant="blue">{clan.language}</Badge>
                                            </td>
                                            <td className="py-3 px-3 text-sm">
                                                <div className="flex flex-wrap gap-1">
                                                    {clan.commonSurnames?.slice(0, 3).map((surname) => (
                                                        <Badge key={surname} variant="default">{surname}</Badge>
                                                    ))}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
