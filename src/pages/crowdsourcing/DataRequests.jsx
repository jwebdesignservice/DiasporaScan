import { useState } from 'react'
import { ExternalLink, MessageSquare, ThumbsUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'

const dataRequests = [
    {
        id: 1,
        title: 'Add Caribbean island migration data',
        description: 'Looking for detailed migration statistics from individual Caribbean islands (Barbados, Trinidad, etc.) to the US and UK.',
        status: 'open',
        votes: 47,
        comments: 12,
        submittedBy: 'DiasporaResearcher',
        date: '2024-01-15',
        category: 'Migration'
    },
    {
        id: 2,
        title: 'Historical Black-owned banks data',
        description: 'Need comprehensive list of Black-owned banks in the US from 1900-present with founding dates, assets, and current status.',
        status: 'in_progress',
        votes: 89,
        comments: 23,
        submittedBy: 'FinanceHistorian',
        date: '2024-01-10',
        category: 'Business'
    },
    {
        id: 3,
        title: 'African tech startup funding data',
        description: 'Requesting data on venture capital funding for African tech startups by country and year.',
        status: 'completed',
        votes: 156,
        comments: 34,
        submittedBy: 'TechAfrica',
        date: '2023-12-20',
        category: 'Business'
    },
    {
        id: 4,
        title: 'HBCU alumni achievement data',
        description: 'List of notable HBCU alumni with their achievements, industry, and graduation year.',
        status: 'open',
        votes: 72,
        comments: 18,
        submittedBy: 'HBCUProud',
        date: '2024-01-08',
        category: 'Education'
    },
    {
        id: 5,
        title: 'African language preservation efforts',
        description: 'Data on initiatives to preserve African languages in diaspora communities.',
        status: 'open',
        votes: 34,
        comments: 8,
        submittedBy: 'LanguageKeeper',
        date: '2024-01-20',
        category: 'Culture'
    },
    {
        id: 6,
        title: 'Black churches historical data',
        description: 'Information on historic Black churches in America - founding dates, locations, significance.',
        status: 'in_progress',
        votes: 61,
        comments: 15,
        submittedBy: 'ChurchHistorian',
        date: '2024-01-05',
        category: 'Culture'
    }
]

const statusConfig = {
    open: { label: 'Open', color: 'text-blue-400 bg-blue-500/20', icon: AlertCircle },
    in_progress: { label: 'In Progress', color: 'text-yellow-400 bg-yellow-500/20', icon: Clock },
    completed: { label: 'Completed', color: 'text-green-400 bg-green-500/20', icon: CheckCircle }
}

export default function DataRequests() {
    const [filter, setFilter] = useState('all')

    const filteredRequests = filter === 'all' 
        ? dataRequests 
        : dataRequests.filter(r => r.status === filter)

    const openCount = dataRequests.filter(r => r.status === 'open').length
    const inProgressCount = dataRequests.filter(r => r.status === 'in_progress').length
    const completedCount = dataRequests.filter(r => r.status === 'completed').length

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Data Requests"
                    description="Community-driven requests for new data to be added to DiasporaScan. Vote for requests you want to see fulfilled or submit your own."
                    stats={[
                        { label: 'Open Requests', value: openCount.toString(), color: 'blue' },
                        { label: 'In Progress', value: inProgressCount.toString(), color: 'gold' },
                        { label: 'Completed', value: completedCount.toString(), color: 'green' },
                    ]}
                />

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6">
                    {['all', 'open', 'in_progress', 'completed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                                filter === status
                                    ? 'bg-[var(--color-accent-green)] text-white'
                                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            {status === 'all' ? 'All' : status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Requests List */}
                <div className="space-y-4">
                    {filteredRequests.map((request, index) => {
                        const StatusIcon = statusConfig[request.status].icon
                        return (
                            <motion.div
                                key={request.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 hover:border-[var(--color-accent-green)] transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Vote Button */}
                                    <div className="flex flex-col items-center gap-1">
                                        <button className="p-2 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-accent-green)]/20 transition-colors">
                                            <ThumbsUp className="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-accent-green)]" />
                                        </button>
                                        <span className="font-mono text-sm text-[var(--color-accent-green)]">{request.votes}</span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-medium text-[var(--color-text-primary)] mb-1">
                                                    {request.title}
                                                </h3>
                                                <p className="text-sm text-[var(--color-text-muted)]">
                                                    {request.description}
                                                </p>
                                            </div>
                                            <span className={`flex items-center gap-1 px-2 py-1 text-xs rounded ${statusConfig[request.status].color}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {statusConfig[request.status].label}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 mt-3 text-xs text-[var(--color-text-muted)]">
                                            <span className="px-2 py-0.5 bg-[var(--color-bg-tertiary)] rounded">{request.category}</span>
                                            <span>by {request.submittedBy}</span>
                                            <span>{request.date}</span>
                                            <span className="flex items-center gap-1">
                                                <MessageSquare className="w-3 h-3" />
                                                {request.comments}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Submit CTA */}
                <div className="mt-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 text-center">
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                        Don't see what you're looking for?
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                        Submit a new data request and the community will vote on it.
                    </p>
                    <button className="px-6 py-2 bg-[var(--color-accent-green)] text-white font-medium hover:bg-[var(--color-accent-green-light)] transition-colors">
                        Submit Request
                    </button>
                </div>
            </div>
        </div>
    )
}
