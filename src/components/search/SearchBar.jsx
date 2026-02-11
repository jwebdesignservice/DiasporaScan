import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, X, ArrowRight, Globe, Users, Music, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import countriesData from '../../data/countries.json'
import figuresData from '../../data/figures.json'
import clansData from '../../data/clans.json'
import cultureData from '../../data/culture.json'

const categoryIcons = {
    country: Globe,
    figure: Users,
    clan: Users,
    music: Music,
    food: MapPin,
}

export default function SearchBar({ large = false, autoFocus = false }) {
    const [searchParams] = useSearchParams()
    const initialQuery = searchParams.get('q') || ''
    const [query, setQuery] = useState(initialQuery)

    // Update query when URL changes
    useEffect(() => {
        const urlQuery = searchParams.get('q') || ''
        setQuery(urlQuery)
    }, [searchParams])
    const [results, setResults] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    // Search across all data
    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            return
        }

        const searchResults = []
        const lowerQuery = query.toLowerCase()

        // Search countries
        countriesData.countries.forEach(country => {
            if (country.name.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    type: 'country',
                    id: country.id,
                    name: country.name,
                    subtitle: country.region,
                })
            }
        })

        // Search figures
        figuresData.figures.forEach(figure => {
            if (figure.name.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    type: 'figure',
                    id: figure.id,
                    name: figure.name,
                    subtitle: figure.category,
                })
            }
        })

        // Search clans
        clansData.clans.forEach(clan => {
            if (clan.name.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    type: 'clan',
                    id: clan.id,
                    name: clan.name,
                    subtitle: clan.country,
                })
            }
        })

        // Search surnames
        clansData.surnames.forEach(surname => {
            if (surname.surname.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    type: 'surname',
                    id: surname.surname.toLowerCase(),
                    name: surname.surname,
                    subtitle: surname.origin,
                })
            }
        })

        // Search music genres
        cultureData.culture.music.forEach(genre => {
            if (genre.name.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    type: 'music',
                    id: genre.id,
                    name: genre.name,
                    subtitle: `Music • ${genre.origin}`,
                })
            }
        })

        setResults(searchResults.slice(0, 8))
        setSelectedIndex(0)
    }, [query])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                inputRef.current?.focus()
                setIsOpen(true)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
                inputRef.current?.blur()
            }
            if (e.key === 'ArrowDown' && isOpen) {
                e.preventDefault()
                setSelectedIndex(i => Math.min(i + 1, results.length - 1))
            }
            if (e.key === 'ArrowUp' && isOpen) {
                e.preventDefault()
                setSelectedIndex(i => Math.max(i - 1, 0))
            }
            if (e.key === 'Enter' && isOpen && results[selectedIndex]) {
                e.preventDefault()
                handleSelect(results[selectedIndex])
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, results, selectedIndex])

    const handleSelect = (result) => {
        const searchName = result.name
        const typeParam = result.type === 'country' ? 'countries' : result.type === 'figure' ? 'figures' : result.type === 'clan' ? 'clans' : 'culture'
        setIsOpen(false)
        // Navigate with the selected name - don't clear query until after navigation
        navigate(`/database?q=${encodeURIComponent(searchName)}&type=${typeParam}`)
        // Clear query after a short delay to allow navigation to complete
        setTimeout(() => setQuery(''), 100)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            navigate(`/database?q=${encodeURIComponent(query)}`)
            setQuery('')
            setIsOpen(false)
        }
    }

    const Icon = categoryIcons[results[selectedIndex]?.type] || Search

    return (
        <div className={`relative ${large ? 'w-full max-w-2xl' : 'w-full'}`}>
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <Search className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] ${large ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                        autoFocus={autoFocus}
                        placeholder="Search countries, clans, figures..."
                        className={`w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)] transition-all ${large ? 'pl-12 sm:pl-14 pr-16 sm:pr-20 py-4 sm:py-5 text-base sm:text-lg' : 'pl-10 sm:pl-12 pr-14 sm:pr-16 py-3 text-sm sm:text-base'
                            }`}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery('')
                                // Clear the q param from URL if on database page
                                const params = new URLSearchParams(window.location.search)
                                if (params.has('q')) {
                                    params.delete('q')
                                    navigate(`/database${params.toString() ? '?' + params.toString() : ''}`)
                                }
                            }}
                            className={`absolute right-16 top-1/2 -translate-y-1/2 p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]`}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)] font-mono bg-[var(--color-bg-tertiary)] px-2 py-1 rounded`}>
                        ⌘K
                    </span>
                </div>
            </form>

            {/* Results dropdown */}
            <AnimatePresence>
                {isOpen && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                        {results.map((result, index) => {
                            const ResultIcon = categoryIcons[result.type] || Search
                            return (
                                <button
                                    key={`${result.type}-${result.id}`}
                                    onClick={() => handleSelect(result)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-colors ${index === selectedIndex
                                        ? 'bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)]'
                                        : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                                        }`}
                                >
                                    <ResultIcon className="w-5 h-5 text-[var(--color-text-muted)]" />
                                    <div className="flex-1">
                                        <div className="font-medium">{result.name}</div>
                                        <div className="text-sm text-[var(--color-text-muted)]">{result.subtitle}</div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)]" />
                                </button>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
