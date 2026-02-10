import { ExternalLink, Users } from 'lucide-react'
import { motion } from 'framer-motion'

import PageHeader from '../../components/database/PageHeader'
import DataTableNew from '../../components/database/DataTableNew'

import officialsData from '../../data/officials.json'

export default function Senators() {
    const { senators } = officialsData.officials

    const columns = [
        { 
            id: 'name', 
            label: 'Senator',
            render: (val, row) => (
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center ${
                        row.party === 'Democrat' ? 'bg-blue-500/20' : 'bg-red-500/20'
                    }`}>
                        <Users className={`w-5 h-5 ${
                            row.party === 'Democrat' ? 'text-blue-400' : 'text-red-400'
                        }`} />
                    </div>
                    <div>
                        <span className="font-medium">{val}</span>
                        {row.committees && (
                            <div className="text-xs text-[var(--color-text-muted)]">
                                {row.committees.slice(0, 2).join(', ')}
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        { id: 'state', label: 'State' },
        { 
            id: 'party', 
            label: 'Party',
            render: (val) => (
                <span className={`px-2 py-0.5 text-xs rounded ${
                    val === 'Democrat' ? 'bg-blue-500/20 text-blue-400' :
                    val === 'Republican' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                }`}>
                    {val}
                </span>
            )
        },
        { id: 'since', label: 'In Office Since', align: 'right', mono: true },
        { id: 'education', label: 'Education', color: 'muted' },
        { id: 'website', label: 'Official Site', link: 'website', sortable: false },
    ]

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Black U.S. Senators"
                    description="Current African American members of the United States Senate. These senators represent millions of constituents and serve on key committees shaping national policy."
                    stats={[
                        { label: 'Current Senators', value: senators.length.toString(), color: 'green' },
                        { label: 'Democrats', value: senators.filter(s => s.party === 'Democrat').length.toString(), color: 'blue' },
                        { label: 'Republicans', value: senators.filter(s => s.party === 'Republican').length.toString(), color: 'red' },
                    ]}
                />

                {/* Senator Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {senators.map((senator, index) => (
                        <motion.a
                            key={senator.id}
                            href={senator.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 hover:border-[var(--color-accent-green)] transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-16 h-16 flex items-center justify-center ${
                                    senator.party === 'Democrat' ? 'bg-blue-500/20' : 'bg-red-500/20'
                                }`}>
                                    <Users className={`w-8 h-8 ${
                                        senator.party === 'Democrat' ? 'text-blue-400' : 'text-red-400'
                                    }`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{senator.name}</h3>
                                        <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)]" />
                                    </div>
                                    <p className="text-sm text-[var(--color-accent-green)]">{senator.state}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`px-2 py-0.5 text-xs rounded ${
                                            senator.party === 'Democrat' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                                        }`}>
                                            {senator.party}
                                        </span>
                                        <span className="text-xs text-[var(--color-text-muted)]">Since {senator.since}</span>
                                    </div>
                                    {senator.education && (
                                        <p className="text-xs text-[var(--color-text-muted)] mt-2">{senator.education}</p>
                                    )}
                                    {senator.committees && (
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {senator.committees.map(c => (
                                                <span key={c} className="px-2 py-0.5 text-[10px] bg-[var(--color-bg-tertiary)] rounded text-[var(--color-text-muted)]">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Source */}
                <div className="text-xs text-[var(--color-text-muted)]">
                    Data source: U.S. Senate, Congress.gov
                    <a href="https://www.senate.gov" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        senate.gov <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
