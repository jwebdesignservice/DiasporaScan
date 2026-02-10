import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

import PageHeader from '../../components/database/PageHeader'
import FilterBar from '../../components/database/FilterBar'
import TimelineView from '../../components/database/TimelineView'
import TerminalStats from '../../components/ui/TerminalStats'

import timelineData from '../../data/timeline.json'

export default function Timeline() {
    const [activeFilters, setActiveFilters] = useState({})

    const { events, eras, overview } = timelineData.timeline

    // Get unique categories
    const categories = [...new Set(events.map(e => e.category))]

    const filters = [
        {
            id: 'category',
            label: 'Category',
            options: categories.map(c => ({
                value: c,
                label: c,
                count: events.filter(e => e.category === c).length
            }))
        }
    ]

    // Filter events
    const filteredEvents = activeFilters.category && activeFilters.category !== 'all'
        ? events.filter(e => e.category === activeFilters.category)
        : events

    // Count events by category
    const categoryStats = categories.map(cat => ({
        label: cat.toLowerCase().replace(/\s+/g, '_').replace('&', 'and'),
        value: events.filter(e => e.category === cat).length.toString(),
        color: cat === 'Civil Rights' ? 'green' : cat === 'Politics' ? 'blue' : undefined
    }))

    // Count events by era
    const eraStats = eras.map(era => ({
        label: era.name.toLowerCase().replace(/\s+/g, '_'),
        value: events.filter(e => e.year >= era.start && e.year <= era.end).length.toString(),
        color: era.name === 'Modern Era' ? 'green' : undefined
    }))

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-7xl mx-auto">
                <PageHeader
                    title="Historical Timeline"
                    description={overview.description}
                    stats={[
                        { label: 'Total Events', value: overview.totalEvents.toString(), color: 'green' },
                        { label: 'Years Covered', value: `${overview.endYear - overview.startYear}+`, color: 'gold' },
                        { label: 'Categories', value: overview.categories.length.toString() },
                    ]}
                />

                <FilterBar
                    filters={filters}
                    activeFilters={activeFilters}
                    onFilterChange={(id, value) => setActiveFilters({ ...activeFilters, [id]: value })}
                    onClear={() => setActiveFilters({})}
                />

                {/* Statistics Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <TerminalStats
                        title="BY_CATEGORY"
                        stats={categoryStats.slice(0, 6)}
                    />
                    <TerminalStats
                        title="BY_ERA"
                        stats={eraStats}
                    />
                </div>

                {/* Timeline */}
                <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-6">
                    <h3 className="text-sm text-[var(--color-text-muted)] mb-6">
                        Timeline ({filteredEvents.length} events)
                    </h3>
                    <TimelineView
                        events={filteredEvents}
                        eras={eras}
                    />
                </div>

                {/* Source Attribution */}
                <div className="mt-8 text-xs text-[var(--color-text-muted)]">
                    Data sources: Smithsonian NMAAHC, History.com, Wikipedia.
                    <a href="https://nmaahc.si.edu" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-green)] ml-1">
                        NMAAHC <ExternalLink className="w-3 h-3 inline" />
                    </a>
                </div>
            </div>
        </div>
    )
}
