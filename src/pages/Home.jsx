import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import AfricaMap from '../components/maps/AfricaMap'
import StatBox from '../components/ui/StatBox'
import ActionButton from '../components/ui/ActionButton'
import TerminalStats from '../components/ui/TerminalStats'
import InvestigationCard from '../components/ui/InvestigationCard'
import Badge from '../components/ui/Badge'

import countriesData from '../data/countries.json'
import figuresData from '../data/figures.json'
import cultureData from '../data/culture.json'
import clansData from '../data/clans.json'
import diasporaData from '../data/diaspora.json'

const filterTabs = [
    { id: 'all', label: 'All Entities' },
    { id: 'countries', label: 'Countries' },
    { id: 'figures', label: 'Historical Figures' },
    { id: 'clans', label: 'Clans & Tribes' },
    { id: 'culture', label: 'Culture' },
]

// Featured regions data
const regionStats = [
    { name: 'Nigeria', value: '17M', subtitle: '223,000,000 population', id: 'nigeria' },
    { name: 'Ghana', value: '3M', subtitle: '33,000,000 population', id: 'ghana' },
    { name: 'Ethiopia', value: '3M', subtitle: '120,000,000 population', id: 'ethiopia' },
    { name: 'Kenya', value: '3M', subtitle: '54,000,000 population', id: 'kenya' },
    { name: 'South Africa', value: '1M', subtitle: '60,000,000 population', id: 'south-africa' },
]

const regionStats2 = [
    { name: 'Senegal', value: '700K', subtitle: '17,000,000 population', id: 'senegal' },
    { name: 'Egypt', value: '10M', subtitle: '104,000,000 population', id: 'egypt' },
]

// Featured investigations/analyses
const featuredAnalyses = [
    {
        title: 'Transatlantic Slave Trade Routes',
        description: 'Mapping 12.5 million forced migrations from West & Central Africa to the Americas over four centuries. Major ports, ship records, and destination analysis.',
        stat: '12.5M',
        statLabel: 'people',
        isNew: true,
        href: '/explore',
    },
    {
        title: 'Great Migration (1910-1970)',
        description: '6 million African Americans moved from the rural South to Northern and Western cities. Chicago, Detroit, New York, Los Angeles were major destinations.',
        stat: '6M',
        statLabel: 'migrants',
        isNew: true,
        href: '/explore',
    },
    {
        title: 'Windrush Generation Analysis',
        description: 'Caribbean migrants who came to the UK between 1948-1971 to help rebuild post-war Britain. Named after the ship HMT Empire Windrush.',
        stat: '500K',
        statLabel: 'people',
        href: '/explore',
    },
    {
        title: 'Modern African Migration',
        description: 'Contemporary migration patterns from 1980s to present. Education, employment, and refuge-seeking across Europe, North America, and Gulf States.',
        stat: '17M',
        statLabel: 'migrants',
        href: '/explore',
    },
]

const moreAnalyses = [
    { title: 'Yoruba Diaspora Network', description: 'Tracing Yoruba influence from Nigeria to Brazil, Cuba, and the Americas through Orisha traditions.', stat: '45M', statLabel: 'speakers', href: '/search?q=Yoruba' },
    { title: 'Ashanti Kingdom Legacy', description: 'The Golden Stool, Kente cloth origins, and the spread of Akan culture across West Africa and diaspora.', stat: '11M', statLabel: 'people', href: '/search?q=Ashanti' },
    { title: 'Reggae & Rastafari Spread', description: 'How Jamaican music and spirituality influenced global culture from Bob Marley to modern Afrobeats.', stat: 'Global', statLabel: 'influence', href: '/search?q=Reggae' },
    { title: 'Afro-Brazilian Culture Map', description: 'Salvador, Bahia has the largest Black population outside Africa. Samba, Capoeira, and Candomblé origins.', stat: '97M', statLabel: 'Afro-Brazilians', href: '/search?q=Brazil' },
    { title: 'Black British History', description: 'From Mary Seacole to Stormzy. Notting Hill Carnival, Grime music, and cultural contributions.', stat: '2M+', statLabel: 'population', href: '/search?q=United Kingdom' },
    { title: 'Haitian Revolution', description: 'The only successful slave revolt in history (1791-1804). First free Black republic in the world.', stat: '1804', statLabel: 'independence', href: '/search?q=Haiti' },
]

export default function Home() {
    const [activeFilter, setActiveFilter] = useState('all')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    // Calculate totals
    const totalEntities =
        countriesData.countries.length +
        figuresData.figures.length +
        clansData.clans.length +
        cultureData.culture.music.length +
        cultureData.culture.food.length +
        cultureData.culture.languages.length

    const totalDiaspora = countriesData.countries.reduce(
        (sum, c) => sum + (c.diasporaPopulation || 0), 0
    )

    const handleCountryClick = (country) => {
        navigate(`/search?q=${encodeURIComponent(country.name)}&type=country`)
    }

    const handleSubscribe = (e) => {
        e.preventDefault()
        alert('Thanks for subscribing!')
        setEmail('')
    }

    const handleFilterClick = (filterId) => {
        setActiveFilter(filterId)
        if (filterId !== 'all') {
            navigate(`/search?type=${filterId}`)
        }
    }

    const handleRegionClick = (regionId) => {
        const country = countriesData.countries.find(c => c.id === regionId)
        if (country) {
            navigate(`/search?q=${encodeURIComponent(country.name)}&type=country`)
        }
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Top Stats Row */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                        {/* Left Stats */}
                        <div className="flex flex-wrap gap-8 lg:gap-16">
                            <div>
                                <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                                    {totalEntities.toLocaleString()}
                                </div>
                                <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                    Entities tracked
                                </div>
                            </div>
                            <div>
                                <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-green)]">
                                    {(totalDiaspora / 1000000).toFixed(0)}M+
                                </div>
                                <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                    Diaspora population documented
                                </div>
                            </div>
                        </div>

                        {/* Right - Updates Panel */}
                        <div className="lg:text-right">
                            <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                                UPDATES
                            </div>
                            <div className="font-mono text-sm text-[var(--color-text-secondary)] space-y-1">
                                <div className="flex items-center gap-2 lg:justify-end">
                                    <span className="text-[var(--color-text-muted)]">├─</span>
                                    <span>Get updates on diaspora data</span>
                                </div>
                                <form onSubmit={handleSubscribe} className="flex items-center gap-2 lg:justify-end">
                                    <span className="text-[var(--color-text-muted)]">└─</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email"
                                        className="bg-transparent border-b border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)] w-32 md:w-40 text-sm py-1"
                                    />
                                    <button
                                        type="submit"
                                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent-green)] transition-colors text-sm"
                                    >
                                        [subscribe]
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleFilterClick(tab.id)}
                                className={`text-sm transition-colors ${activeFilter === tab.id
                                        ? 'text-[var(--color-accent-green)]'
                                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Map Container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative bg-[var(--color-bg-primary)] rounded-lg overflow-hidden mb-8"
                    >
                        <AfricaMap onCountryClick={handleCountryClick} />
                    </motion.div>

                    {/* Region Stats Boxes - Like SomaliScan States */}
                    <div className="mb-6">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Regions by Diaspora Volume</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                            {regionStats.map((region, index) => (
                                <StatBox
                                    key={region.id}
                                    title={region.name}
                                    value={region.value}
                                    subtitle={region.subtitle}
                                    delay={index * 0.05}
                                    onClick={() => handleRegionClick(region.id)}
                                />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {regionStats2.map((region, index) => (
                                <StatBox
                                    key={region.id}
                                    title={region.name}
                                    value={region.value}
                                    subtitle={region.subtitle}
                                    delay={(regionStats.length + index) * 0.05}
                                    onClick={() => handleRegionClick(region.id)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-[var(--color-border)]">
                        <ActionButton href="/search" variant="green">
                            Search All Data
                        </ActionButton>
                        <ActionButton href="/explore" variant="red">
                            Migration Analysis
                        </ActionButton>
                        <Link
                            to="/token"
                            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                        >
                            Token info <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Terminal Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <TerminalStats
                            title="DIASPORA_DATABASE"
                            stats={[
                                { label: 'total_tracked', value: totalEntities.toLocaleString(), color: 'green' },
                                { label: 'countries', value: countriesData.countries.length.toString() },
                                { label: 'historical_figures', value: figuresData.figures.length.toString() },
                                { label: 'clans_tribes', value: clansData.clans.length.toString() },
                                { label: 'data_sources', value: '12' },
                            ]}
                        />
                        <TerminalStats
                            title="BY_CATEGORY"
                            stats={[
                                { label: 'african_nations', value: '7', color: 'green', suffix: 'tracked' },
                                { label: 'diaspora_nations', value: '5', color: 'gold', suffix: 'tracked' },
                                { label: 'music_genres', value: cultureData.culture.music.length.toString(), suffix: 'genres' },
                                { label: 'languages', value: cultureData.culture.languages.length.toString(), suffix: 'documented' },
                                { label: 'traditional_foods', value: cultureData.culture.food.length.toString(), suffix: 'recipes' },
                            ]}
                        />
                    </div>

                    {/* Featured Investigations */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Featured Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {featuredAnalyses.map((analysis, index) => (
                                <InvestigationCard
                                    key={index}
                                    title={analysis.title}
                                    description={analysis.description}
                                    stat={analysis.stat}
                                    statLabel={analysis.statLabel}
                                    isNew={analysis.isNew}
                                    href={analysis.href}
                                    delay={index * 0.05}
                                />
                            ))}
                        </div>
                    </div>

                    {/* More Analyses */}
                    <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {moreAnalyses.map((analysis, index) => (
                                <InvestigationCard
                                    key={index}
                                    title={analysis.title}
                                    description={analysis.description}
                                    stat={analysis.stat}
                                    statLabel={analysis.statLabel}
                                    href={analysis.href}
                                    delay={index * 0.03}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Data Table - Top Entities */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Top Entities</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--color-border)]">
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Name</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Region</th>
                                        <th className="py-2 px-3 text-right text-xs font-medium text-[var(--color-accent-green)]">Population</th>
                                        <th className="py-2 px-3 text-right text-xs font-medium text-[var(--color-accent-green)]">Diaspora</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {countriesData.countries.slice(0, 10).map((country, index) => (
                                        <motion.tr
                                            key={country.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.03 }}
                                            onClick={() => handleCountryClick(country)}
                                            className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
                                        >
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                                                {country.name}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                                                {country.region}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">
                                                {(country.population / 1000000).toFixed(0)}M
                                            </td>
                                            <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-gold)]">
                                                {(country.diasporaPopulation / 1000000).toFixed(0)}M
                                            </td>
                                            <td className="py-3 px-3 text-sm">
                                                <Badge variant={country.region.includes('Diaspora') ? 'gold' : 'green'}>
                                                    {country.region.includes('Diaspora') ? 'Diaspora' : 'African'}
                                                </Badge>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Historical Figures Table */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Historical Figures</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--color-border)]">
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Name</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Origin</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Era</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {figuresData.figures.slice(0, 8).map((figure, index) => (
                                        <motion.tr
                                            key={figure.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.03 }}
                                            onClick={() => navigate(`/search?q=${encodeURIComponent(figure.name)}&type=figure`)}
                                            className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
                                        >
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                                                {figure.name}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                                                {figure.origin}
                                            </td>
                                            <td className="py-3 px-3 text-sm font-mono text-[var(--color-text-secondary)]">
                                                {figure.birth}-{figure.death || 'present'}
                                            </td>
                                            <td className="py-3 px-3 text-sm">
                                                <Badge variant="blue">{figure.category}</Badge>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Data Sources Footer */}
                    <div className="pt-6 border-t border-[var(--color-border)]">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-3">Data Sources</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                            {countriesData.countries.filter(c => !c.region.includes('Diaspora')).map((country) => (
                                <Link
                                    key={country.id}
                                    to={`/search?q=${encodeURIComponent(country.name)}`}
                                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] transition-colors"
                                >
                                    {country.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
