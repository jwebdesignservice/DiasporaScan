import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ExternalLink } from 'lucide-react'

const CONTRACT_ADDRESS = '0xDiAsPoRa7oKeN2024bLaCkHiStOrYmOnTh'

const links = [
  { name: 'Pump.fun', url: '#', color: 'from-green-500 to-emerald-600' },
  { name: 'DexScreener', url: '#', color: 'from-blue-500 to-cyan-600' },
  { name: 'Birdeye', url: '#', color: 'from-purple-500 to-pink-600' },
]

export default function TokenInfo() {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Contract Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
          Contract Address
        </h3>
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-sm text-[var(--color-accent-green)] bg-[var(--color-bg-tertiary)] px-4 py-3 rounded-lg overflow-x-auto">
            {CONTRACT_ADDRESS}
          </code>
          <button
            onClick={copyAddress}
            className="p-3 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-accent-green)]/20 border border-[var(--color-border)] rounded-lg transition-all"
          >
            {copied ? (
              <Check className="w-5 h-5 text-[var(--color-accent-green)]" />
            ) : (
              <Copy className="w-5 h-5 text-[var(--color-text-secondary)]" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-gradient-to-br ${link.color} p-[1px] rounded-xl group`}
          >
            <div className="bg-[var(--color-bg-secondary)] rounded-xl p-4 h-full flex items-center justify-between hover:bg-[var(--color-bg-tertiary)] transition-colors">
              <span className="font-semibold text-[var(--color-text-primary)]">
                {link.name}
              </span>
              <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors" />
            </div>
          </a>
        ))}
      </motion.div>

      {/* Tokenomics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
          Tokenomics
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)]">
            <span className="text-[var(--color-text-secondary)]">Total Supply</span>
            <span className="font-mono text-[var(--color-accent-green)]">1,000,000,000</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)]">
            <span className="text-[var(--color-text-secondary)]">Burn per Scan</span>
            <span className="font-mono text-[var(--color-accent-gold)]">100 tokens</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)]">
            <span className="text-[var(--color-text-secondary)]">Tax</span>
            <span className="font-mono text-[var(--color-text-primary)]">0%</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[var(--color-text-secondary)]">Liquidity</span>
            <span className="font-mono text-[var(--color-accent-green)]">Burned</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
