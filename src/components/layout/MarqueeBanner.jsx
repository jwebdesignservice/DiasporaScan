import { Flame, ExternalLink } from 'lucide-react'

export default function MarqueeBanner() {
  const content = (
    <>
      <span className="flex items-center gap-2 mx-8">
        <Flame className="w-4 h-4 text-[var(--color-accent-gold)]" />
        <span className="text-[var(--color-accent-gold)] font-semibold">DIASPORA TOKEN</span>
        <span className="text-[var(--color-text-secondary)]">— CELEBRATE BLACK HISTORY</span>
        <a href="#" className="text-[var(--color-accent-green)] hover:text-[var(--color-accent-green-light)] flex items-center gap-1">
          BUY NOW <ExternalLink className="w-3 h-3" />
        </a>
      </span>
      <span className="flex items-center gap-2 mx-8">
        <Flame className="w-4 h-4 text-[var(--color-accent-gold)]" />
        <span className="text-[var(--color-accent-gold)] font-semibold">DIASPORA TOKEN</span>
        <span className="text-[var(--color-text-secondary)]">— EXPLORE YOUR ROOTS</span>
        <a href="#" className="text-[var(--color-accent-green)] hover:text-[var(--color-accent-green-light)] flex items-center gap-1">
          BUY NOW <ExternalLink className="w-3 h-3" />
        </a>
      </span>
      <span className="flex items-center gap-2 mx-8">
        <Flame className="w-4 h-4 text-[var(--color-accent-gold)]" />
        <span className="text-[var(--color-accent-gold)] font-semibold">DIASPORA TOKEN</span>
        <span className="text-[var(--color-text-secondary)]">— EACH SCAN BURNS TOKENS</span>
        <a href="#" className="text-[var(--color-accent-green)] hover:text-[var(--color-accent-green-light)] flex items-center gap-1">
          BUY NOW <ExternalLink className="w-3 h-3" />
        </a>
      </span>
    </>
  )

  return (
    <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] overflow-hidden">
      <div className="flex items-center whitespace-nowrap py-2 text-sm font-mono animate-marquee">
        {content}
        {content}
      </div>
    </div>
  )
}
