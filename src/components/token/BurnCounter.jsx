import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame } from 'lucide-react'

export default function BurnCounter({ initialValue = 1234567 }) {
    const [burnCount, setBurnCount] = useState(initialValue)
    const [isFlickering, setIsFlickering] = useState(false)

    useEffect(() => {
        // Simulate burns happening
        const interval = setInterval(() => {
            const randomBurn = Math.floor(Math.random() * 100) + 10
            setBurnCount(prev => prev + randomBurn)
            setIsFlickering(true)
            setTimeout(() => setIsFlickering(false), 500)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const formatNumber = (num) => {
        return num.toLocaleString()
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 relative overflow-hidden"
        >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5" />

            {/* Terminal-style header */}
            <div className="relative z-10 mb-4">
                <div className="text-[var(--color-text-muted)] uppercase tracking-wider text-xs font-mono">
                    BURN_COUNTER
                </div>
            </div>

            {/* Counter display */}
            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={burnCount}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-gold)]"
                    >
                        {formatNumber(burnCount)}
                    </motion.div>
                </AnimatePresence>
                <p className="text-sm text-[var(--color-text-muted)] mt-2 font-mono">
                    $DIASPORA burned forever
                </p>
            </div>

            {/* Stats */}
            <div className="relative z-10 mt-4 pt-4 border-t border-[var(--color-border)] space-y-1 font-mono text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-[var(--color-text-muted)]">├─</span>
                    <span className="text-[var(--color-text-secondary)]">burn_rate</span>
                    <span className="text-[var(--color-accent-green)]">100/scan</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[var(--color-text-muted)]">├─</span>
                    <span className="text-[var(--color-text-secondary)]">status</span>
                    <span className={`${isFlickering ? 'text-orange-500' : 'text-[var(--color-accent-green)]'}`}>
                        {isFlickering ? 'burning...' : 'active'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[var(--color-text-muted)]">└─</span>
                    <span className="text-[var(--color-text-secondary)]">last_burn</span>
                    <span className="text-[var(--color-text-primary)]">just now</span>
                </div>
            </div>

            {/* Fire icon indicator */}
            <motion.div
                animate={isFlickering ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4"
            >
                <Flame
                    className={`w-6 h-6 ${isFlickering ? 'text-orange-500' : 'text-[var(--color-text-muted)]'} transition-colors`}
                />
            </motion.div>
        </motion.div>
    )
}
