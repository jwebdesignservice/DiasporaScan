import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react'

export default function DataTableNew({
    columns = [],
    data = [],
    onRowClick,
    sortable = true,
    emptyMessage = 'No data available'
}) {
    const [sortColumn, setSortColumn] = useState(null)
    const [sortDirection, setSortDirection] = useState('asc')

    const handleSort = (columnId) => {
        if (!sortable) return
        if (sortColumn === columnId) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(columnId)
            setSortDirection('asc')
        }
    }

    const sortedData = [...data].sort((a, b) => {
        if (!sortColumn) return 0
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]

        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
        }

        const aStr = String(aVal || '').toLowerCase()
        const bStr = String(bVal || '').toLowerCase()
        return sortDirection === 'asc'
            ? aStr.localeCompare(bStr)
            : bStr.localeCompare(aStr)
    })

    const formatValue = (value, format) => {
        if (value === null || value === undefined) return 'N/A'

        switch (format) {
            case 'currency':
                if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`
                if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
                if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
                return `$${value.toLocaleString()}`
            case 'number':
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
                return value.toLocaleString()
            case 'percent':
                return `${value}%`
            case 'year':
                return value
            default:
                return value
        }
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-[var(--color-text-muted)]">
                {emptyMessage}
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-[var(--color-border)]">
                        {columns.map((column) => (
                            <th
                                key={column.id}
                                onClick={() => column.sortable !== false && handleSort(column.id)}
                                className={`py-3 px-3 text-left text-xs font-medium text-[var(--color-accent-green)] ${column.sortable !== false && sortable ? 'cursor-pointer hover:text-[var(--color-accent-green-light)]' : ''
                                    } ${column.align === 'right' ? 'text-right' : ''}`}
                            >
                                <div className={`flex items-center gap-1 ${column.align === 'right' ? 'justify-end' : ''}`}>
                                    {column.label}
                                    {sortable && column.sortable !== false && (
                                        sortColumn === column.id ? (
                                            sortDirection === 'asc' ? (
                                                <ArrowUp className="w-3 h-3" />
                                            ) : (
                                                <ArrowDown className="w-3 h-3" />
                                            )
                                        ) : (
                                            <ArrowUpDown className="w-3 h-3 opacity-30" />
                                        )
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, index) => (
                        <motion.tr
                            key={row.id || index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.02 }}
                            onClick={() => onRowClick && onRowClick(row)}
                            className={`border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors ${onRowClick ? 'cursor-pointer' : ''
                                }`}
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.id}
                                    className={`py-3 px-3 text-sm ${column.align === 'right' ? 'text-right' : ''
                                        } ${column.mono ? 'font-mono' : ''} ${column.color === 'green' ? 'text-[var(--color-accent-green)]' :
                                            column.color === 'gold' ? 'text-[var(--color-accent-gold)]' :
                                                column.color === 'muted' ? 'text-[var(--color-text-muted)]' :
                                                    'text-[var(--color-text-primary)]'
                                        }`}
                                >
                                    {column.render ? (
                                        column.render(row[column.id], row)
                                    ) : column.link ? (
                                        <a
                                            href={row[column.link]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-[var(--color-accent-green)] hover:text-[var(--color-accent-green-light)]"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    ) : (
                                        formatValue(row[column.id], column.format)
                                    )}
                                </td>
                            ))}
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
