import { ExternalLink, Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'
import DataTableNew from '../../components/database/DataTableNew'

const contributors = [
    { id: 1, rank: 1, username: 'DiasporaHistorian', contributions: 347, approved: 312, points: 15600, badge: 'legendary', joined: '2023-01' },
    { id: 2, rank: 2, username: 'AfricaDataPro', contributions: 289, approved: 267, points: 13350, badge: 'legendary', joined: '2023-03' },
    { id: 3, rank: 3, username: 'HeritageFinder', contributions: 234, approved: 198, points: 9900, badge: 'epic', joined: '2023-02' },
    { id: 4, rank: 4, username: 'CultureKeeper', contributions: 198, approved: 176, points: 8800, badge: 'epic', joined: '2023-05' },
    { id: 5, rank: 5, username: 'MigrationMapper', contributions: 167, approved: 145, points: 7250, badge: 'rare', joined: '2023-04' },
    { id: 6, rank: 6, username: 'HistoryHunter', contributions: 145, approved: 132, points: 6600, badge: 'rare', joined: '2023-06' },
    { id: 7, rank: 7, username: 'DataDiaspora', contributions: 134, approved: 119, points: 5950, badge: 'rare', joined: '2023-07' },
    { id: 8, rank: 8, username: 'RootsFinder', contributions: 112, approved: 98, points: 4900, badge: 'common', joined: '2023-08' },
    { id: 9, rank: 9, username: 'AfroScholar', contributions: 98, approved: 87, points: 4350, badge: 'common', joined: '2023-09' },
    { id: 10, rank: 10, username: 'HeritageHub', contributions: 89, approved: 76, points: 3800, badge: 'common', joined: '2023-10' },
]

const badgeConfig = {
    legendary: { color: 'text-yellow-400 bg-yellow-500/20', icon: Trophy },
    epic: { color: 'text-purple-400 bg-purple-500/20', icon: Medal },
    rare: { color: 'text-blue-400 bg-blue-500/20', icon: Award },
    common: { color: 'text-gray-400 bg-gray-500/20', icon: Award },
}

export default function Leaderboard() {
    const totalContributions = contributors.reduce((sum, c) => sum + c.contributions, 0)
    const totalApproved = contributors.reduce((sum, c) => sum + c.approved, 0)

    const columns = [
        { 
            id: 'rank', 
            label: '#', 
            align: 'center',
            render: (val) => (
                <span className={`font-mono font-bold ${
                    val === 1 ? 'text-yellow-400' :
                    val === 2 ? 'text-gray-300' :
                    val === 3 ? 'text-amber-600' :
                    'text-[var(--color-text-muted)]'
                }`}>
                    {val}
                </span>
            )
        },
        { 
            id: 'username', 
            label: 'Contributor',
            render: (val, row) => {
                const BadgeIcon = badgeConfig[row.badge].icon
                return (
                    <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${badgeConfig[row.badge].color}`}>
                            <BadgeIcon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{val}</span>
                    </div>
                )
            }
        },
        { id: 'contributions', label: 'Submissions', align: 'right', mono: true },
        { id: 'approved', label: 'Approved', align: 'right', mono: true, color: 'green' },
        { id: 'points', label: 'Points', align: 'right', mono: true, color: 'gold' },
        { 
            id: 'badge', 
            label: 'Tier',
            render: (val) => (
                <span className={`px-2 py-0.5 text-xs rounded capitalize ${badgeConfig[val].color}`}>
                    {val}
                </span>
            )
        },
    ]

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Contributor Leaderboard"
                    description="Recognizing the top contributors who help build and maintain the DiasporaScan database. Earn points by submitting accurate, verified data."
                    stats={[
                        { label: 'Total Contributors', value: '2,847', color: 'green' },
                        { label: 'Total Submissions', value: totalContributions.toLocaleString(), color: 'gold' },
                        { label: 'Approval Rate', value: `${Math.round(totalApproved / totalContributions * 100)}%` },
                    ]}
                />

                {/* Top 3 Podium */}
                <div className="flex items-end justify-center gap-2 sm:gap-4 mb-8">
                    {/* 2nd Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-24 sm:w-32 md:w-40 flex-shrink-0"
                    >
                        <div className="bg-[var(--color-bg-secondary)] border border-gray-400 p-4 text-center">
                            <Medal className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="font-bold text-[var(--color-text-primary)] text-sm truncate">{contributors[1].username}</p>
                            <p className="font-mono text-[var(--color-accent-gold)]">{contributors[1].points.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-400 h-16 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">2</span>
                        </div>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="w-28 sm:w-36 md:w-48 flex-shrink-0"
                    >
                        <div className="bg-[var(--color-bg-secondary)] border-2 border-yellow-400 p-4 text-center shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                            <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                            <p className="font-bold text-[var(--color-text-primary)] truncate">{contributors[0].username}</p>
                            <p className="font-mono text-lg text-[var(--color-accent-gold)]">{contributors[0].points.toLocaleString()}</p>
                        </div>
                        <div className="bg-yellow-500 h-24 flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">1</span>
                        </div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-24 sm:w-32 md:w-40 flex-shrink-0"
                    >
                        <div className="bg-[var(--color-bg-secondary)] border border-amber-600 p-4 text-center">
                            <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                            <p className="font-bold text-[var(--color-text-primary)] text-sm truncate">{contributors[2].username}</p>
                            <p className="font-mono text-[var(--color-accent-gold)]">{contributors[2].points.toLocaleString()}</p>
                        </div>
                        <div className="bg-amber-600 h-12 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">3</span>
                        </div>
                    </motion.div>
                </div>

                {/* Full Leaderboard */}
                <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                    <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                        Top Contributors
                    </h3>
                    <DataTableNew
                        columns={columns}
                        data={contributors}
                        emptyMessage="No contributors found"
                    />
                </div>

                {/* How to Earn Points */}
                <div className="mt-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4">
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">
                        How to Earn Points
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-[var(--color-bg-tertiary)]">
                            <div className="font-mono text-2xl text-[var(--color-accent-green)] mb-2">+50</div>
                            <div className="text-sm text-[var(--color-text-primary)]">Per approved submission</div>
                        </div>
                        <div className="p-4 bg-[var(--color-bg-tertiary)]">
                            <div className="font-mono text-2xl text-[var(--color-accent-gold)] mb-2">+100</div>
                            <div className="text-sm text-[var(--color-text-primary)]">For high-quality data</div>
                        </div>
                        <div className="p-4 bg-[var(--color-bg-tertiary)]">
                            <div className="font-mono text-2xl text-purple-400 mb-2">+500</div>
                            <div className="text-sm text-[var(--color-text-primary)]">For completing bounties</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
