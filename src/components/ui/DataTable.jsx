import { motion } from 'framer-motion'

export default function DataTable({ title, columns, data, className = '' }) {
  return (
    <div className={`${className}`}>
      {title && (
        <h3 className="text-sm text-[var(--color-text-muted)] mb-4">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)] ${
                    col.align === 'right' ? 'text-right' : ''
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: rowIndex * 0.02 }}
                className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-3 px-3 text-sm ${
                      col.align === 'right' ? 'text-right' : ''
                    } ${col.mono ? 'font-mono' : ''} ${
                      col.color === 'green' ? 'text-[var(--color-accent-green)]' : 
                      col.color === 'gold' ? 'text-[var(--color-accent-gold)]' :
                      col.color === 'red' ? 'text-red-500' :
                      'text-[var(--color-text-primary)]'
                    }`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
