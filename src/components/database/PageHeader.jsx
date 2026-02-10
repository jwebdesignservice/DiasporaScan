import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function PageHeader({ 
    title, 
    description, 
    stats = [],
    loading = false 
}) {
    return (
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                {title}
            </h1>
            {description && (
                <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-2xl">
                    {description}
                </p>
            )}

            {stats.length > 0 && (
                <div className="flex flex-wrap gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={`font-mono text-3xl md:text-4xl font-bold ${
                                stat.color === 'green' ? 'text-[var(--color-accent-green)]' :
                                stat.color === 'gold' ? 'text-[var(--color-accent-gold)]' :
                                stat.color === 'blue' ? 'text-blue-400' :
                                stat.color === 'red' ? 'text-red-400' :
                                'text-[var(--color-text-primary)]'
                            }`}>
                                {loading ? (
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                ) : (
                                    stat.value
                                )}
                            </div>
                            <div className="text-xs text-[var(--color-text-muted)] mt-1">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
