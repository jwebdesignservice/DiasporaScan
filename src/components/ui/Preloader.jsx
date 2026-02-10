import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MIN_DISPLAY_TIME = 2500 // Minimum 2.5 seconds display time

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading, complete, exit
  const startTime = useRef(Date.now())

  useEffect(() => {
    // Slower, more realistic progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          
          // Ensure minimum display time has passed
          const elapsed = Date.now() - startTime.current
          const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsed)
          
          setTimeout(() => {
            setPhase('complete')
            setTimeout(() => {
              setPhase('exit')
              setTimeout(() => {
                onComplete?.()
              }, 600)
            }, 500)
          }, remainingTime)
          
          return 100
        }
        
        // Slower, variable progress - feels more natural
        let increment
        if (prev < 20) {
          increment = Math.random() * 3 + 1 // Slow start
        } else if (prev < 50) {
          increment = Math.random() * 4 + 2 // Medium speed
        } else if (prev < 80) {
          increment = Math.random() * 5 + 2 // Faster
        } else {
          increment = Math.random() * 2 + 1 // Slow finish
        }
        
        return Math.min(prev + increment, 100)
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  const loadingMessages = [
    'Initializing database...',
    'Loading diaspora data...',
    'Mapping migration routes...',
    'Fetching historical records...',
    'Connecting to archives...',
    'Rendering interface...',
  ]

  const currentMessage = loadingMessages[Math.min(
    Math.floor(progress / (100 / loadingMessages.length)),
    loadingMessages.length - 1
  )]

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[var(--color-bg-primary)] flex items-center justify-center overflow-hidden"
        >
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[600px] h-[600px] rounded-full border border-[var(--color-accent-green)]/20"
            />
            <motion.div
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute w-[400px] h-[400px] rounded-full border border-[var(--color-accent-gold)]/20"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute w-[800px] h-[800px] rounded-full border border-[var(--color-text-muted)]/10"
            />
          </div>


          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative">
                {/* Glow effect */}
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 blur-xl bg-[var(--color-accent-green)]/20 rounded-full"
                />
                <span className="relative font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                  Diaspora<span className="text-[var(--color-accent-green)]">Scan</span>
                </span>
              </div>
            </motion.div>

            {/* Terminal-style loading box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 min-w-[320px] md:min-w-[400px]"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--color-border)]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-[var(--color-text-muted)] font-mono">
                  diasporascan_init.sh
                </span>
              </div>

              {/* Loading lines */}
              <div className="space-y-2 font-mono text-sm mb-4">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[var(--color-accent-green)]">$</span>
                  <span className="text-[var(--color-text-secondary)]">initializing system</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-[var(--color-accent-green)]"
                  >
                    _
                  </motion.span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[var(--color-text-muted)] text-xs"
                >
                  {currentMessage}
                </motion.div>

                {/* Progress stats */}
                <div className="pt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--color-text-muted)]">├─ countries</span>
                    <span className="text-[var(--color-accent-green)]">
                      {progress > 20 ? '✓' : '...'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--color-text-muted)]">├─ figures</span>
                    <span className="text-[var(--color-accent-green)]">
                      {progress > 40 ? '✓' : '...'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--color-text-muted)]">├─ clans</span>
                    <span className="text-[var(--color-accent-green)]">
                      {progress > 60 ? '✓' : '...'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[var(--color-text-muted)]">└─ culture</span>
                    <span className="text-[var(--color-accent-green)]">
                      {progress > 80 ? '✓' : '...'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative">
                <div className="h-1 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--color-accent-green)] to-[var(--color-accent-gold)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">
                    {phase === 'complete' ? 'READY' : 'LOADING'}
                  </span>
                  <span className="text-xs text-[var(--color-accent-green)] font-mono">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Powered by text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-xs text-[var(--color-text-muted)] font-mono"
            >
              Exploring the African Diaspora
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[var(--color-accent-green)]/30" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[var(--color-accent-green)]/30" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[var(--color-accent-green)]/30" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[var(--color-accent-green)]/30" />

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-accent-green)]/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
