import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Twitter, Send, Mail } from 'lucide-react'

import TerminalStats from '../components/ui/TerminalStats'
import ActionButton from '../components/ui/ActionButton'
import InvestigationCard from '../components/ui/InvestigationCard'
import Badge from '../components/ui/Badge'

import countriesData from '../data/countries.json'
import figuresData from '../data/figures.json'
import clansData from '../data/clans.json'
import cultureData from '../data/culture.json'

export default function About() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const totalEntities =
        countriesData.countries.length +
        figuresData.figures.length +
        clansData.clans.length +
        cultureData.culture.music.length +
        cultureData.culture.food.length +
        cultureData.culture.languages.length

    const handleSubscribe = (e) => {
        e.preventDefault()
        alert('Thanks for subscribing!')
        setEmail('')
    }

    return (
        <div className="min-h-screen">
            <section className="px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Top Stats */}
                    <div className="flex flex-wrap gap-8 lg:gap-16 mb-6">
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                                DiasporaScan
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Explore African diaspora history
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-green)]">
                                {totalEntities}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Entities tracked
                            </div>
                        </div>
                    </div>

                    {/* Mission Statement */}
                    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 mb-6">
                        <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">Our Mission</h2>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                            DiasporaScan was created to make exploring African history and the global diaspora
                            engaging, accessible, and shareable. We believe that understanding our past is key
                            to building a stronger future, and that everyone deserves easy access to their
                            cultural heritage.
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                            Whether you're tracing your family's origins, learning about historical figures,
                            or discovering the music and food that connects cultures across continents —
                            DiasporaScan is your gateway to the rich tapestry of Black history.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-[var(--color-border)]">
                        <ActionButton href="/" variant="green">
                            Explore Map
                        </ActionButton>
                        <ActionButton href="/search" variant="red">
                            Search Data
                        </ActionButton>
                        <span
                            onClick={() => navigate('/token')}
                            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                        >
                            Token info <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>

                    {/* Terminal Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <TerminalStats
                            title="PLATFORM_INFO"
                            stats={[
                                { label: 'version', value: '1.0.0', color: 'green' },
                                { label: 'entities', value: totalEntities.toString() },
                                { label: 'countries', value: countriesData.countries.length.toString() },
                                { label: 'figures', value: figuresData.figures.length.toString() },
                                { label: 'data_sources', value: '12' },
                            ]}
                        />
                        <TerminalStats
                            title="COVERAGE"
                            stats={[
                                { label: 'african_nations', value: '7', color: 'green', suffix: 'tracked' },
                                { label: 'diaspora_nations', value: '5', color: 'gold', suffix: 'tracked' },
                                { label: 'ethnic_groups', value: clansData.clans.length.toString() },
                                { label: 'languages', value: cultureData.culture.languages.length.toString() },
                                { label: 'music_genres', value: cultureData.culture.music.length.toString() },
                            ]}
                        />
                    </div>

                    {/* What We Track */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">What We Track</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InvestigationCard
                                title="Countries & Regions"
                                description="African nations and major diaspora destinations with population data, capitals, languages, and key historical facts."
                                stat={countriesData.countries.length.toString()}
                                statLabel="countries"
                                href="/search?type=countries"
                            />
                            <InvestigationCard
                                title="Historical Figures"
                                description="Leaders in civil rights, politics, arts, music, and literature who shaped history and inspired generations."
                                stat={figuresData.figures.length.toString()}
                                statLabel="figures"
                                href="/search?type=figure"
                            />
                            <InvestigationCard
                                title="Clans & Ethnic Groups"
                                description="Major ethnic groups across Africa with traditions, languages, common surnames, and cultural practices."
                                stat={clansData.clans.length.toString()}
                                statLabel="clans"
                                href="/search?type=clan"
                            />
                            <InvestigationCard
                                title="Culture & Heritage"
                                description="Music genres, traditional foods, and languages that connect the diaspora to African roots."
                                stat={(cultureData.culture.music.length + cultureData.culture.food.length + cultureData.culture.languages.length).toString()}
                                statLabel="items"
                                href="/search?type=culture"
                            />
                        </div>
                    </div>

                    {/* Black History Month */}
                    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 mb-8">
                        <div className="flex items-start justify-between mb-3">
                            <h2 className="text-lg font-medium text-[var(--color-text-primary)]">Black History Month</h2>
                            <div className="flex gap-2">
                                <Badge variant="green">February</Badge>
                                <Badge variant="gold">October</Badge>
                            </div>
                        </div>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                            Black History Month is an annual celebration honoring the achievements and
                            contributions of African Americans and the African diaspora. First recognized
                            in the United States in 1976, it has since spread to countries around the world.
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                            But Black history shouldn't be limited to a single month. DiasporaScan is
                            designed to be a year-round resource for learning, discovery, and celebration
                            of the African diaspora's incredible story.
                        </p>
                    </div>

                    {/* Data Sources Table */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Data Sources</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--color-border)]">
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Category</th>
                                        <th className="py-2 px-3 text-right text-xs font-medium text-[var(--color-accent-green)]">Count</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <motion.tr className="border-b border-[var(--color-border)]/50">
                                        <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">Countries</td>
                                        <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">{countriesData.countries.length}</td>
                                        <td className="py-3 px-3 text-sm"><Badge variant="green">Active</Badge></td>
                                    </motion.tr>
                                    <motion.tr className="border-b border-[var(--color-border)]/50">
                                        <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">Historical Figures</td>
                                        <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">{figuresData.figures.length}</td>
                                        <td className="py-3 px-3 text-sm"><Badge variant="green">Active</Badge></td>
                                    </motion.tr>
                                    <motion.tr className="border-b border-[var(--color-border)]/50">
                                        <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">Clans & Tribes</td>
                                        <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">{clansData.clans.length}</td>
                                        <td className="py-3 px-3 text-sm"><Badge variant="green">Active</Badge></td>
                                    </motion.tr>
                                    <motion.tr className="border-b border-[var(--color-border)]/50">
                                        <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">Music Genres</td>
                                        <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">{cultureData.culture.music.length}</td>
                                        <td className="py-3 px-3 text-sm"><Badge variant="green">Active</Badge></td>
                                    </motion.tr>
                                    <motion.tr className="border-b border-[var(--color-border)]/50">
                                        <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">Traditional Foods</td>
                                        <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">{cultureData.culture.food.length}</td>
                                        <td className="py-3 px-3 text-sm"><Badge variant="green">Active</Badge></td>
                                    </motion.tr>
                                    <motion.tr className="border-b border-[var(--color-border)]/50">
                                        <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">Languages</td>
                                        <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">{cultureData.culture.languages.length}</td>
                                        <td className="py-3 px-3 text-sm"><Badge variant="green">Active</Badge></td>
                                    </motion.tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Contact / Social */}
                    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 mb-8">
                        <h2 className="text-lg font-medium text-[var(--color-text-primary)] mb-4">Get In Touch</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                                    Have feedback, corrections, or want to contribute? We'd love to hear from you.
                                </p>
                                <div className="flex gap-3">
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-primary)] transition-colors"
                                    >
                                        <Twitter className="w-5 h-5 text-[var(--color-text-muted)]" />
                                    </a>
                                    <a
                                        href="https://t.me"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-primary)] transition-colors"
                                    >
                                        <Send className="w-5 h-5 text-[var(--color-text-muted)]" />
                                    </a>
                                    <a
                                        href="mailto:hello@diasporascan.com"
                                        className="p-3 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-primary)] transition-colors"
                                    >
                                        <Mail className="w-5 h-5 text-[var(--color-text-muted)]" />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--color-text-muted)] mb-3">Subscribe for updates</p>
                                <form onSubmit={handleSubscribe} className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@example.com"
                                        className="flex-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)]"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[var(--color-accent-green)] hover:bg-[var(--color-accent-green-light)] text-white text-sm font-medium transition-colors"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                        <strong>Disclaimer:</strong> This site is for educational and entertainment purposes only.
                        Information should be independently verified before making any decisions based on the content.
                        Data sourced from public historical records and may contain errors or omissions.
                    </div>
                </div>
            </section>
        </div>
    )
}
