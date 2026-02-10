import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

export default function FilterBar({ 
    filters = [], 
    activeFilters = {}, 
    onFilterChange,
    onClear 
}) {
    const [openDropdown, setOpenDropdown] = useState(null)

    const handleFilterSelect = (filterId, value) => {
        onFilterChange(filterId, value)
        setOpenDropdown(null)
    }

    const hasActiveFilters = Object.values(activeFilters).some(v => v && v !== 'all')

    return (
        <div className="flex flex-wrap items-center gap-3 mb-6">
            {filters.map((filter) => (
                <div key={filter.id} className="relative">
                    <button
                        onClick={() => setOpenDropdown(openDropdown === filter.id ? null : filter.id)}
                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
                            activeFilters[filter.id] && activeFilters[filter.id] !== 'all'
                                ? 'bg-[var(--color-accent-green)]/10 border-[var(--color-accent-green)] text-[var(--color-accent-green)]'
                                : 'bg-[var(--color-bg-secondary)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                        }`}
                    >
                        <span>{filter.label}</span>
                        {activeFilters[filter.id] && activeFilters[filter.id] !== 'all' && (
                            <span className="px-1.5 py-0.5 text-xs bg-[var(--color-accent-green)] text-white rounded">
                                {activeFilters[filter.id]}
                            </span>
                        )}
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === filter.id ? 'rotate-180' : ''}`} />
                    </button>

                    {openDropdown === filter.id && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-xl py-1 z-50 max-h-64 overflow-y-auto">
                            <button
                                onClick={() => handleFilterSelect(filter.id, 'all')}
                                className="w-full text-left px-3 py-2 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
                            >
                                All {filter.label}
                            </button>
                            {filter.options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleFilterSelect(filter.id, option.value)}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-bg-tertiary)] ${
                                        activeFilters[filter.id] === option.value
                                            ? 'text-[var(--color-accent-green)]'
                                            : 'text-[var(--color-text-secondary)]'
                                    }`}
                                >
                                    {option.label}
                                    {option.count !== undefined && (
                                        <span className="text-xs text-[var(--color-text-muted)] ml-2">({option.count})</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {hasActiveFilters && (
                <button
                    onClick={onClear}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-red-400 transition-colors"
                >
                    <X className="w-4 h-4" />
                    Clear filters
                </button>
            )}
        </div>
    )
}
