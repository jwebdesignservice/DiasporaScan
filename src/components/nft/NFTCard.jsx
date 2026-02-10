import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Lock, Check, User, Users, Music, Globe, Flag, Utensils } from 'lucide-react'

const rarityConfig = {
    common: {
        label: 'COMMON',
        borderClass: 'border-gray-500',
        bgGradient: 'from-gray-800 to-gray-900',
        badgeClass: 'bg-gray-600 text-gray-200',
        glowClass: '',
    },
    rare: {
        label: 'RARE',
        borderClass: 'border-blue-500',
        bgGradient: 'from-blue-900/50 to-gray-900',
        badgeClass: 'bg-blue-600 text-white',
        glowClass: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    },
    epic: {
        label: 'EPIC',
        borderClass: 'border-purple-500',
        bgGradient: 'from-purple-900/50 to-gray-900',
        badgeClass: 'bg-purple-600 text-white',
        glowClass: 'shadow-[0_0_20px_rgba(147,51,234,0.4)]',
    },
    legendary: {
        label: 'LEGENDARY',
        borderClass: 'border-yellow-500',
        bgGradient: 'from-yellow-900/30 via-orange-900/20 to-gray-900',
        badgeClass: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold',
        glowClass: 'shadow-[0_0_30px_rgba(234,179,8,0.5)] animate-legendary-glow',
    },
}

const typeIcons = {
    figure: User,
    figures: User,
    country: Flag,
    countries: Flag,
    clan: Users,
    clans: Users,
    music: Music,
    food: Utensils,
    language: Globe,
    culture: Music,
}

const typeColors = {
    figure: 'text-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10',
    figures: 'text-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/10',
    country: 'text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10',
    countries: 'text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10',
    clan: 'text-blue-400 bg-blue-500/10',
    clans: 'text-blue-400 bg-blue-500/10',
    music: 'text-purple-400 bg-purple-500/10',
    food: 'text-orange-400 bg-orange-500/10',
    language: 'text-blue-400 bg-blue-500/10',
    culture: 'text-purple-400 bg-purple-500/10',
}

export default function NFTCard({
    name,
    image,
    type = 'figure',
    category,
    rarity = 'common',
    edition = 1,
    totalEditions = 1000,
    burnAmount = 100,
    minted = false,
    onMint,
    delay = 0,
}) {
    const [isHovered, setIsHovered] = useState(false)
    const [isMinting, setIsMinting] = useState(false)
    const [justMinted, setJustMinted] = useState(false)

    const config = rarityConfig[rarity] || rarityConfig.common
    const IconComponent = typeIcons[type] || User
    const iconColorClass = typeColors[type] || typeColors.figure

    const handleMint = async () => {
        if (minted || isMinting) return
        setIsMinting(true)
        
        // Simulate minting delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setIsMinting(false)
        setJustMinted(true)
        
        if (onMint) onMint()
        
        // Reset after animation
        setTimeout(() => setJustMinted(false), 3000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative rounded-xl overflow-hidden border-2 ${config.borderClass} ${config.glowClass} transition-all duration-300 ${isHovered ? 'scale-[1.02]' : ''}`}
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient}`} />
            
            {/* Animated border for legendary */}
            {rarity === 'legendary' && (
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <div className="absolute inset-[-2px] bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 animate-spin-slow opacity-50" style={{ animationDuration: '3s' }} />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 p-1">
                {/* Rarity Badge */}
                <div className="absolute top-3 right-3 z-20">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded ${config.badgeClass}`}>
                        ★ {config.label}
                    </span>
                </div>

                {/* Edition Number */}
                <div className="absolute top-3 left-3 z-20">
                    <span className="px-2 py-1 text-[10px] font-mono bg-black/50 text-white rounded">
                        #{String(edition).padStart(4, '0')}
                    </span>
                </div>

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg bg-[var(--color-bg-tertiary)]">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                            }}
                        />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center ${iconColorClass} ${image ? 'hidden' : ''}`}>
                        <IconComponent className="w-20 h-20" />
                    </div>

                    {/* Holographic overlay on hover */}
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none"
                        />
                    )}
                </div>

                {/* Info Section */}
                <div className="p-4 bg-[var(--color-bg-secondary)]">
                    <h3 className="font-bold text-[var(--color-text-primary)] text-sm truncate mb-1">
                        {name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] truncate mb-3">
                        {category || type}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-xs">
                            <Flame className="w-3 h-3 text-orange-500" />
                            <span className="font-mono text-[var(--color-accent-gold)]">
                                {burnAmount.toLocaleString()} $DIAS
                            </span>
                        </div>
                        <span className="text-[10px] text-[var(--color-text-muted)]">
                            {edition} / {totalEditions.toLocaleString()}
                        </span>
                    </div>

                    {/* Mint Button */}
                    <button
                        onClick={handleMint}
                        disabled={minted || isMinting}
                        className={`w-full py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                            minted || justMinted
                                ? 'bg-[var(--color-accent-green)] text-white cursor-default'
                                : isMinting
                                ? 'bg-[var(--color-accent-gold)]/50 text-black cursor-wait'
                                : 'bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-light)] text-black hover:scale-[1.02]'
                        }`}
                    >
                        {minted || justMinted ? (
                            <span className="flex items-center justify-center gap-2">
                                <Check className="w-4 h-4" /> MINTED
                            </span>
                        ) : isMinting ? (
                            <span className="flex items-center justify-center gap-2">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                >
                                    <Flame className="w-4 h-4" />
                                </motion.div>
                                MINTING...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Flame className="w-4 h-4" /> MINT NFT
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
