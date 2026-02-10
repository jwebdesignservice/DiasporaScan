import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search as SearchIcon, ArrowRight } from 'lucide-react'

import SearchBar from '../components/search/SearchBar'
import TerminalStats from '../components/ui/TerminalStats'
import ActionButton from '../components/ui/ActionButton'
import Badge from '../components/ui/Badge'

import countriesData from '../data/countries.json'
import figuresData from '../data/figures.json'
import clansData from '../data/clans.json'
import cultureData from '../data/culture.json'

const filterTabs = [
    { id: 'all', label: 'All Results' },
    { id: 'country', label: 'Countries' },
    { id: 'figure', label: 'Figures' },
    { id: 'clan', label: 'Clans' },
    { id: 'culture', label: 'Culture' },
]

export default function Search() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get('q') || ''
    const typeFilter = searchParams.get('type') || 'all'

    const [activeFilter, setActiveFilter] = useState(typeFilter)

    useEffect(() => {
        setActiveFilter(typeFilter)
    }, [typeFilter])

    // Search all data sources
    const searchResults = useMemo(() => {
        const results = []
        const lowerQuery = query.toLowerCase()

        // Search countries
        if (activeFilter === 'all' || activeFilter === 'country' || activeFilter === 'countries') {
            countriesData.countries.forEach(country => {
                if (!query || country.name.toLowerCase().includes(lowerQuery) ||
                    country.region.toLowerCase().includes(lowerQuery)) {
                    results.push({ ...country, type: 'country' })
                }
            })
        }

        // Search figures
        if (activeFilter === 'all' || activeFilter === 'figure' || activeFilter === 'figures') {
            figuresData.figures.forEach(figure => {
                if (!query || figure.name.toLowerCase().includes(lowerQuery) ||
                    figure.category.toLowerCase().includes(lowerQuery)) {
                    results.push({ ...figure, type: 'figure' })
                }
            })
        }

        // Search clans
        if (activeFilter === 'all' || activeFilter === 'clan' || activeFilter === 'clans') {
            clansData.clans.forEach(clan => {
                if (!query || clan.name.toLowerCase().includes(lowerQuery) ||
                    clan.country.toLowerCase().includes(lowerQuery)) {
                    results.push({ ...clan, type: 'clan' })
                }
            })
        }

        // Search culture
        if (activeFilter === 'all' || activeFilter === 'culture') {
            cultureData.culture.music.forEach(item => {
                if (!query || item.name.toLowerCase().includes(lowerQuery)) {
                    results.push({ ...item, type: 'music' })
                }
            })
            cultureData.culture.food.forEach(item => {
                if (!query || item.name.toLowerCase().includes(lowerQuery)) {
                    results.push({ ...item, type: 'food' })
                }
            })
            cultureData.culture.languages.forEach(item => {
                if (!query || item.name.toLowerCase().includes(lowerQuery)) {
                    results.push({ ...item, type: 'language' })
                }
            })
        }

        return results
    }, [query, activeFilter])

    const handleFilterChange = (filter) => {
        setActiveFilter(filter)
        const params = new URLSearchParams(searchParams)
        if (filter === 'all') {
            params.delete('type')
        } else {
            params.set('type', filter)
        }
        navigate(`/search?${params.toString()}`)
    }

    // Count by type
    const countByType = {
        country: searchResults.filter(r => r.type === 'country').length,
        figure: searchResults.filter(r => r.type === 'figure').length,
        clan: searchResults.filter(r => r.type === 'clan').length,
        culture: searchResults.filter(r => ['music', 'food', 'language'].includes(r.type)).length,
    }

    return (
        <div className="min-h-screen">
            <section className="px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Top Stats */}
                    <div className="flex flex-wrap gap-8 lg:gap-16 mb-6">
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                                {searchResults.length}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Results found
                            </div>
                        </div>
                        {query && (
                            <div>
                                <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-green)]">
                                    "{query}"
                                </div>
                                <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                    Search query
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <SearchBar large />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleFilterChange(tab.id)}
                                className={`text-sm transition-colors ${activeFilter === tab.id
                                        ? 'text-[var(--color-accent-green)]'
                                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                                    }`}
                            >
                                {tab.label}
                                {countByType[tab.id] !== undefined && (
                                    <span className="ml-1 text-xs text-[var(--color-text-muted)]">
                                        ({countByType[tab.id]})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Terminal Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-[var(--color-border)]">
                        <TerminalStats
                            title="SEARCH_RESULTS"
                            stats={[
                                { label: 'total_results', value: searchResults.length.toString(), color: 'green' },
                                { label: 'countries', value: countByType.country.toString() },
                                { label: 'figures', value: countByType.figure.toString() },
                                { label: 'clans', value: countByType.clan.toString() },
                                { label: 'culture', value: countByType.culture.toString() },
                            ]}
                        />
                        <TerminalStats
                            title="QUERY_INFO"
                            stats={[
                                { label: 'query', value: query || 'all', color: query ? 'gold' : 'default' },
                                { label: 'filter', value: activeFilter },
                                { label: 'data_sources', value: '4' },
                            ]}
                        />
                    </div>

                    {/* Results Table */}
                    {searchResults.length === 0 ? (
                        <div className="text-center py-16">
                            <SearchIcon className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                                {query ? 'No results found' : 'Start your search'}
                            </h2>
                            <p className="text-[var(--color-text-muted)]">
                                {query
                                    ? 'Try a different search term or filter'
                                    : 'Search for countries, clans, historical figures, or cultural elements'}
                            </p>
                        </div>
                    ) : (
                        <div className="mb-8">
                            <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Results</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[var(--color-border)]">
                                            <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Name</th>
                                            <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Type</th>
                                            <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Details</th>
                                            <th className="py-2 px-3 text-right text-xs font-medium text-[var(--color-accent-green)]">Value</th>
                                            <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Tags</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchResults.map((result, index) => (
                                            <motion.tr
                                                key={`${result.type}-${result.id || index}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.02 }}
                                                className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
                                                onClick={() => {
                                                    if (result.type === 'country') {
                                                        navigate(`/search?q=${encodeURIComponent(result.name)}&type=country`)
                                                    } else if (result.type === 'figure') {
                                                        navigate(`/search?q=${encodeURIComponent(result.name)}&type=figure`)
                                                    } else if (result.type === 'clan') {
                                                        navigate(`/search?q=${encodeURIComponent(result.name)}&type=clan`)
                                                    }
                                                }}
                                            >
                                                <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                                                    {result.name}
                                                </td>
                                                <td className="py-3 px-3 text-sm">
                                                    <Badge variant={
                                                        result.type === 'country' ? 'green' :
                                                            result.type === 'figure' ? 'gold' :
                                                                result.type === 'clan' ? 'blue' : 'default'
                                                    }>
                                                        {result.type}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                                                    {result.type === 'country' && result.region}
                                                    {result.type === 'figure' && `${result.origin} • ${result.category}`}
                                                    {result.type === 'clan' && result.country}
                                                    {result.type === 'music' && result.origin}
                                                    {result.type === 'food' && result.origin}
                                                    {result.type === 'language' && result.regions?.join(', ')}
                                                </td>
                                                <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">
                                                    {result.type === 'country' && `${(result.population / 1000000).toFixed(0)}M`}
                                                    {result.type === 'figure' && `${result.birth}-${result.death || 'present'}`}
                                                    {result.type === 'clan' && `${(result.population / 1000000).toFixed(0)}M`}
                                                    {result.type === 'language' && `${(result.speakers / 1000000).toFixed(0)}M speakers`}
                                                    {(result.type === 'music' || result.type === 'food') && '-'}
                                                </td>
                                                <td className="py-3 px-3 text-sm">
                                                    <div className="flex flex-wrap gap-1">
                                                        {result.type === 'country' && result.languages?.slice(0, 2).map((lang) => (
                                                            <Badge key={lang} variant="default">{lang}</Badge>
                                                        ))}
                                                        {result.type === 'figure' && (
                                                            <Badge variant="default">{result.category}</Badge>
                                                        )}
                                                        {result.type === 'clan' && (
                                                            <Badge variant="default">{result.language}</Badge>
                                                        )}
                                                        {result.type === 'music' && result.keyArtists?.slice(0, 1).map((artist) => (
                                                            <Badge key={artist} variant="default">{artist}</Badge>
                                                        ))}
                                                        {result.type === 'food' && result.countries?.slice(0, 1).map((c) => (
                                                            <Badge key={c} variant="default">{c}</Badge>
                                                        ))}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--color-border)]">
                        <ActionButton href="/" variant="green">
                            Back to Map
                        </ActionButton>
                        <ActionButton href="/explore" variant="red">
                            Explore Diaspora
                        </ActionButton>
                        <span
                            onClick={() => navigate('/africa')}
                            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                        >
                            Africa map <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>
                </div>
            </section>
        </div>
    )
}
