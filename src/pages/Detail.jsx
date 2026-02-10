import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Loader2, MapPin, Users, Calendar, Globe, Music, Book, Flag } from 'lucide-react'

import TerminalStats from '../components/ui/TerminalStats'
import Badge from '../components/ui/Badge'
import ActionButton from '../components/ui/ActionButton'

// Static data for fallback
import countriesDataStatic from '../data/countries.json'
import figuresDataStatic from '../data/figures.json'
import clansDataStatic from '../data/clans.json'
import cultureDataStatic from '../data/culture.json'

// Wikipedia API for fetching detailed info
async function fetchWikipediaData(title) {
    try {
        const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
        )
        if (!response.ok) return null
        return await response.json()
    } catch (error) {
        console.error('Wikipedia fetch error:', error)
        return null
    }
}

// Fetch related Wikipedia articles
async function fetchRelatedArticles(query) {
    try {
        const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=5`
        )
        if (!response.ok) return []
        const data = await response.json()
        return data.query?.search || []
    } catch (error) {
        console.error('Related articles fetch error:', error)
        return []
    }
}

export default function Detail() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    
    const name = searchParams.get('name') || ''
    const type = searchParams.get('type') || 'country'
    
    const [loading, setLoading] = useState(true)
    const [wikiData, setWikiData] = useState(null)
    const [relatedArticles, setRelatedArticles] = useState([])
    const [localData, setLocalData] = useState(null)

    // Find local data based on type
    useEffect(() => {
        let found = null
        
        if (type === 'country' || type === 'countries') {
            found = countriesDataStatic.countries.find(
                c => c.name.toLowerCase() === name.toLowerCase()
            )
        } else if (type === 'figure' || type === 'figures') {
            found = figuresDataStatic.figures.find(
                f => f.name.toLowerCase() === name.toLowerCase()
            )
        } else if (type === 'clan' || type === 'clans') {
            found = clansDataStatic.clans.find(
                c => c.name.toLowerCase() === name.toLowerCase()
            )
        } else if (type === 'culture') {
            // Search in music, food, languages
            found = cultureDataStatic.culture.music.find(
                m => m.name.toLowerCase() === name.toLowerCase()
            ) || cultureDataStatic.culture.food.find(
                f => f.name.toLowerCase() === name.toLowerCase()
            ) || cultureDataStatic.culture.languages.find(
                l => l.name.toLowerCase() === name.toLowerCase()
            )
        }
        
        setLocalData(found)
    }, [name, type])

    // Fetch Wikipedia data
    useEffect(() => {
        async function loadData() {
            setLoading(true)
            
            // Fetch Wikipedia summary
            const wiki = await fetchWikipediaData(name)
            setWikiData(wiki)
            
            // Fetch related articles
            const related = await fetchRelatedArticles(name)
            setRelatedArticles(related.filter(r => r.title.toLowerCase() !== name.toLowerCase()))
            
            setLoading(false)
        }
        
        if (name) {
            loadData()
        }
    }, [name])

    const getTypeIcon = () => {
        switch (type) {
            case 'country':
            case 'countries':
                return <Flag className="w-6 h-6" />
            case 'figure':
            case 'figures':
                return <Users className="w-6 h-6" />
            case 'clan':
            case 'clans':
                return <Users className="w-6 h-6" />
            case 'culture':
                return <Music className="w-6 h-6" />
            case 'topic':
                return <Book className="w-6 h-6" />
            default:
                return <Globe className="w-6 h-6" />
        }
    }

    const getTypeLabel = () => {
        switch (type) {
            case 'country':
            case 'countries':
                return 'Country'
            case 'figure':
            case 'figures':
                return 'Historical Figure'
            case 'clan':
            case 'clans':
                return 'Ethnic Group'
            case 'culture':
                return 'Culture'
            case 'topic':
                return 'Historical Topic'
            default:
                return 'Entity'
        }
    }

    const getTypeBadgeVariant = () => {
        switch (type) {
            case 'country':
            case 'countries':
                return 'green'
            case 'figure':
            case 'figures':
                return 'gold'
            case 'clan':
            case 'clans':
                return 'blue'
            case 'topic':
                return 'red'
            case 'culture':
                return 'default'
            default:
                return 'default'
        }
    }

    return (
        <div className="min-h-screen">
            <section className="px-4 py-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to results
                    </button>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 animate-spin text-[var(--color-accent-green)] mb-4" />
                            <p className="text-[var(--color-text-muted)]">Loading information...</p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Header */}
                            <div className="flex items-start gap-6 mb-8">
                                {/* Image */}
                                {wikiData?.thumbnail?.source && (
                                    <div className="flex-shrink-0">
                                        <img
                                            src={wikiData.thumbnail.source}
                                            alt={name}
                                            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border border-[var(--color-border)]"
                                        />
                                    </div>
                                )}
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-accent-green)]">
                                            {getTypeIcon()}
                                        </div>
                                        <Badge variant={getTypeBadgeVariant()}>{getTypeLabel()}</Badge>
                                    </div>
                                    
                                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
                                        {wikiData?.title || name}
                                    </h1>
                                    
                                    {wikiData?.description && (
                                        <p className="text-[var(--color-text-muted)] text-lg">
                                            {wikiData.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Quick Stats - based on local data */}
                            {localData && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <TerminalStats
                                        title="QUICK_FACTS"
                                        stats={[
                                            ...(localData.population ? [{ label: 'population', value: (localData.population / 1000000).toFixed(1) + 'M', color: 'green' }] : []),
                                            ...(localData.capital ? [{ label: 'capital', value: localData.capital }] : []),
                                            ...(localData.region ? [{ label: 'region', value: localData.region }] : []),
                                            ...(localData.origin ? [{ label: 'origin', value: localData.origin }] : []),
                                            ...(localData.birth ? [{ label: 'born', value: localData.birth.toString(), color: 'gold' }] : []),
                                            ...(localData.death ? [{ label: 'died', value: localData.death.toString() }] : []),
                                            ...(localData.category ? [{ label: 'category', value: localData.category }] : []),
                                            ...(localData.country ? [{ label: 'country', value: localData.country }] : []),
                                            ...(localData.language ? [{ label: 'language', value: localData.language }] : []),
                                        ].slice(0, 5)}
                                    />
                                    
                                    {(localData.languages || localData.achievements || localData.keyFacts) && (
                                        <TerminalStats
                                            title="DETAILS"
                                            stats={[
                                                ...(localData.languages ? localData.languages.slice(0, 3).map((l, i) => ({ label: `language_${i + 1}`, value: l })) : []),
                                                ...(localData.achievements ? localData.achievements.slice(0, 3).map((a, i) => ({ label: `achievement_${i + 1}`, value: a.slice(0, 30) + '...', color: 'gold' })) : []),
                                                ...(localData.keyFacts ? localData.keyFacts.slice(0, 3).map((f, i) => ({ label: `fact_${i + 1}`, value: f.slice(0, 30) + '...' })) : []),
                                            ].slice(0, 5)}
                                        />
                                    )}
                                </div>
                            )}

                            {/* Main Content - Wikipedia Extract */}
                            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 mb-8">
                                <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                                    <Book className="w-5 h-5 text-[var(--color-accent-green)]" />
                                    Overview
                                </h2>
                                
                                {wikiData?.extract ? (
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                        {wikiData.extract}
                                    </p>
                                ) : localData?.description ? (
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                        {localData.description}
                                    </p>
                                ) : (
                                    <p className="text-[var(--color-text-muted)]">
                                        No detailed information available. Click the link below to learn more on Wikipedia.
                                    </p>
                                )}
                            </div>

                            {/* Local Data Details */}
                            {localData && (
                                <>
                                    {/* Achievements for figures */}
                                    {localData.achievements && localData.achievements.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Key Achievements</h3>
                                            <div className="space-y-3">
                                                {localData.achievements.map((achievement, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex items-start gap-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4"
                                                    >
                                                        <span className="text-[var(--color-accent-gold)] font-mono text-sm">{index + 1}.</span>
                                                        <p className="text-sm text-[var(--color-text-secondary)]">{achievement}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Key Facts */}
                                    {localData.keyFacts && localData.keyFacts.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Interesting Facts</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {localData.keyFacts.map((fact, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4"
                                                    >
                                                        <p className="text-sm text-[var(--color-text-secondary)]">• {fact}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Traditions for clans */}
                                    {localData.traditions && localData.traditions.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Cultural Traditions</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {localData.traditions.map((tradition, index) => (
                                                    <Badge key={index} variant="default">{tradition}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Surnames for clans */}
                                    {localData.commonSurnames && localData.commonSurnames.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Common Surnames</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {localData.commonSurnames.map((surname, index) => (
                                                    <Badge key={index} variant="gold">{surname}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Key Artists for music */}
                                    {localData.keyArtists && localData.keyArtists.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Notable Artists</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {localData.keyArtists.map((artist, index) => (
                                                    <Link
                                                        key={index}
                                                        to={`/detail?name=${encodeURIComponent(artist)}&type=figure`}
                                                        className="px-3 py-1.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] hover:border-[var(--color-accent-green)] transition-colors"
                                                    >
                                                        {artist}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Ingredients for food */}
                                    {localData.ingredients && localData.ingredients.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Key Ingredients</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {localData.ingredients.map((ingredient, index) => (
                                                    <Badge key={index} variant="green">{ingredient}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Related Articles */}
                            {relatedArticles.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Related Topics</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {relatedArticles.slice(0, 4).map((article, index) => (
                                            <motion.a
                                                key={article.pageid}
                                                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-center justify-between bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 hover:border-[var(--color-accent-green)] transition-colors"
                                            >
                                                <span className="text-sm text-[var(--color-text-primary)]">{article.title}</span>
                                                <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)]" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--color-border)]">
                                <ActionButton 
                                    href={wikiData?.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`} 
                                    variant="green"
                                    external
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Read more on Wikipedia
                                </ActionButton>
                                <ActionButton href="/database" variant="outline">
                                    Browse Database
                                </ActionButton>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    )
}
