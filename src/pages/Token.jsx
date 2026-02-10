import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Copy, Check, ArrowRight, ExternalLink } from 'lucide-react'

import TerminalStats from '../components/ui/TerminalStats'
import ActionButton from '../components/ui/ActionButton'
import InvestigationCard from '../components/ui/InvestigationCard'
import StatBox from '../components/ui/StatBox'
import Badge from '../components/ui/Badge'
import BurnCounter from '../components/token/BurnCounter'

const CONTRACT_ADDRESS = '0xDiAsPoRa7oKeN2024bLaCkHiStOrYmOnTh'

const tokenLinks = [
    { name: 'Pump.fun', url: '#' },
    { name: 'DexScreener', url: '#' },
    { name: 'Birdeye', url: '#' },
    { name: 'Jupiter', url: '#' },
]

const roadmapItems = [
    { phase: 'Phase 1', title: 'Launch', status: 'completed', items: ['Token launch', 'Website', 'Community'] },
    { phase: 'Phase 2', title: 'Growth', status: 'in_progress', items: ['CEX listings', 'Partnerships', 'NFTs'] },
    { phase: 'Phase 3', title: 'Expansion', status: 'pending', items: ['Mobile app', 'Education', 'Charity'] },
    { phase: 'Phase 4', title: 'Legacy', status: 'pending', items: ['DAO', 'Scholarships', 'Grants'] },
]

export default function Token() {
    const [copied, setCopied] = useState(false)
    const navigate = useNavigate()

    const copyAddress = () => {
        navigator.clipboard.writeText(CONTRACT_ADDRESS)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen">
            <section className="px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Top Stats */}
                    <div className="flex flex-wrap gap-8 lg:gap-16 mb-6">
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-gold)]">
                                $DIASPORA
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Token symbol
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-green)]">
                                1B
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Total supply
                            </div>
                        </div>
                        <div>
                            <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                                0%
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                Tax
                            </div>
                        </div>
                    </div>

                    {/* Contract Address */}
                    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 mb-6">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-xs text-[var(--color-text-muted)] mb-1">Contract Address</div>
                                <code className="font-mono text-sm text-[var(--color-accent-green)]">
                                    {CONTRACT_ADDRESS}
                                </code>
                            </div>
                            <button
                                onClick={copyAddress}
                                className="p-2 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                            >
                                {copied ? (
                                    <Check className="w-5 h-5 text-[var(--color-accent-green)]" />
                                ) : (
                                    <Copy className="w-5 h-5 text-[var(--color-text-muted)]" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {tokenLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 hover:border-[var(--color-accent-green)] transition-colors flex items-center justify-between"
                            >
                                <span className="text-sm text-[var(--color-text-primary)]">{link.name}</span>
                                <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)]" />
                            </a>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-[var(--color-border)]">
                        <ActionButton href="#" variant="green" external>
                            Buy on Pump.fun
                        </ActionButton>
                        <ActionButton href="#" variant="red" external>
                            View Chart
                        </ActionButton>
                        <span
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                        >
                            Back to map <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>

                    {/* Terminal Stats + Burn Counter */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-6">
                            <TerminalStats
                                title="TOKEN_INFO"
                                stats={[
                                    { label: 'symbol', value: '$DIASPORA', color: 'gold' },
                                    { label: 'total_supply', value: '1,000,000,000', color: 'green' },
                                    { label: 'burn_per_scan', value: '100 tokens' },
                                    { label: 'tax', value: '0%' },
                                    { label: 'liquidity', value: 'Burned', color: 'green' },
                                ]}
                            />
                            <TerminalStats
                                title="TOKENOMICS"
                                stats={[
                                    { label: 'community', value: '90%', color: 'green' },
                                    { label: 'liquidity', value: '10%' },
                                    { label: 'team', value: '0%' },
                                    { label: 'vesting', value: 'None' },
                                ]}
                            />
                        </div>
                        <BurnCounter initialValue={2847563} />
                    </div>

                    {/* How It Works */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">How Burn Mechanics Work</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-[var(--color-accent-green)]/10 flex items-center justify-center font-mono text-[var(--color-accent-green)]">
                                        1
                                    </div>
                                    <h4 className="text-sm font-medium text-[var(--color-text-primary)]">User Scans</h4>
                                </div>
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    Every time someone explores a country, clan, or historical figure
                                </p>
                            </div>
                            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-[var(--color-accent-gold)]/10 flex items-center justify-center font-mono text-[var(--color-accent-gold)]">
                                        2
                                    </div>
                                    <h4 className="text-sm font-medium text-[var(--color-text-primary)]">Tokens Burn</h4>
                                </div>
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    A small amount of $DIASPORA is automatically burned forever
                                </p>
                            </div>
                            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-red-500/10 flex items-center justify-center font-mono text-red-500">
                                        3
                                    </div>
                                    <h4 className="text-sm font-medium text-[var(--color-text-primary)]">Supply Decreases</h4>
                                </div>
                                <p className="text-xs text-[var(--color-text-muted)]">
                                    Total supply shrinks, increasing scarcity for holders
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Roadmap Table */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Roadmap</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-[var(--color-border)]">
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Phase</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Title</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Status</th>
                                        <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Milestones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roadmapItems.map((item, index) => (
                                        <motion.tr
                                            key={item.phase}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-[var(--color-border)]/50"
                                        >
                                            <td className="py-3 px-3 text-sm font-mono text-[var(--color-accent-green)]">
                                                {item.phase}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                                                {item.title}
                                            </td>
                                            <td className="py-3 px-3 text-sm">
                                                <Badge variant={
                                                    item.status === 'completed' ? 'green' :
                                                        item.status === 'in_progress' ? 'gold' : 'default'
                                                }>
                                                    {item.status === 'in_progress' ? 'In Progress' :
                                                        item.status === 'completed' ? 'Completed' : 'Upcoming'}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-3 text-sm">
                                                <div className="flex flex-wrap gap-1">
                                                    {item.items.map((milestone) => (
                                                        <Badge key={milestone} variant="default">{milestone}</Badge>
                                                    ))}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">Why $DIASPORA?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InvestigationCard
                                title="Deflationary"
                                description="Every scan burns tokens, reducing supply over time. The more the platform is used, the scarcer the token becomes."
                                stat="100"
                                statLabel="burned/scan"
                            />
                            <InvestigationCard
                                title="Community Driven"
                                description="Built by and for the diaspora community. No team tokens, no vesting, 100% fair launch."
                                stat="90%"
                                statLabel="community"
                            />
                            <InvestigationCard
                                title="Cultural Mission"
                                description="Celebrating Black history and heritage. Educational platform with real historical data and cultural information."
                                stat="54"
                                statLabel="countries"
                            />
                            <InvestigationCard
                                title="Safe & Secure"
                                description="Liquidity burned, contract verified, community owned. Transparent tokenomics with 0% tax."
                                stat="0%"
                                statLabel="tax"
                            />
                        </div>
                    </div>

                    {/* Related Links */}
                    <div className="pt-6 border-t border-[var(--color-border)]">
                        <h3 className="text-sm text-[var(--color-text-muted)] mb-3">Related</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                            <span
                                onClick={() => navigate('/')}
                                className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] transition-colors cursor-pointer"
                            >
                                Map
                            </span>
                            <span
                                onClick={() => navigate('/explore')}
                                className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] transition-colors cursor-pointer"
                            >
                                Diaspora
                            </span>
                            <span
                                onClick={() => navigate('/search?type=figure')}
                                className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] transition-colors cursor-pointer"
                            >
                                Historical Figures
                            </span>
                            <span
                                onClick={() => navigate('/about')}
                                className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-green)] transition-colors cursor-pointer"
                            >
                                About
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
