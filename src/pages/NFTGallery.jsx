import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Flame, Trophy, Sparkles, Filter, Grid, LayoutGrid, Lock, Rocket } from 'lucide-react'

import NFTCard from '../components/nft/NFTCard'
import HeritageCardGenerator from '../components/nft/HeritageCardGenerator'
import TerminalStats from '../components/ui/TerminalStats'
import Badge from '../components/ui/Badge'

import { fetchHistoricalFigures } from '../services/api'
import countriesData from '../data/countries.json'
import figuresData from '../data/figures.json'

// Coming Soon Overlay - set to true to show the overlay
const SHOW_COMING_SOON = true

const filterTabs = [
    { id: 'all', label: 'All NFTs' },
    { id: 'figures', label: 'Historical Figures' },
    { id: 'countries', label: 'Countries' },
    { id: 'legendary', label: 'Legendary' },
]

// Assign rarity based on some criteria
const assignRarity = (item, index) => {
    if (index < 2) return 'legendary'
    if (index < 6) return 'epic'
    if (index < 15) return 'rare'
    return 'common'
}

export default function NFTGallery() {
    const [activeFilter, setActiveFilter] = useState('all')
    const [figures, setFigures] = useState([])
    const [loading, setLoading] = useState(true)
    const [walletConnected, setWalletConnected] = useState(false)
    const [mintedNFTs, setMintedNFTs] = useState([])
    const [showGenerator, setShowGenerator] = useState(false)

    // Load figures - use static data with all celebrity types
    useEffect(() => {
        setLoading(true)
        // Use all figures from static data (athletes, musicians, actors, etc.)
        setFigures(figuresData.figures)
        setLoading(false)

        // Load minted NFTs from localStorage
        const saved = localStorage.getItem('mintedNFTs')
        if (saved) setMintedNFTs(JSON.parse(saved))
    }, [])

    // Create NFT items from data - all celebrity types
    const figureNFTs = figures.map((figure, index) => ({
        id: `figure-${figure.id || index}`,
        name: figure.name,
        image: figure.image || figure.thumbnail,
        type: 'figure',
        category: figure.category,
        rarity: assignRarity(figure, index),
        edition: index + 1,
        totalEditions: 1000,
        burnAmount: ['Athlete', 'Music', 'Actor'].includes(figure.category) ? 750 : 
                    figure.category === 'Civil Rights' ? 500 : 250,
    }))

    // Filter to African countries only (exclude Diaspora regions)
    const africanCountries = countriesData.countries.filter(
        country => !country.region.includes('Diaspora') && !country.region.includes('Caribbean') && 
                   !country.region.includes('America') && !country.region.includes('Europe')
    )

    const countryNFTs = africanCountries.map((country, index) => ({
        id: `country-${country.id}`,
        name: country.name,
        image: `https://flagcdn.com/w320/${country.code.toLowerCase()}.png`,
        type: 'country',
        category: country.region,
        rarity: index < 2 ? 'legendary' : index < 4 ? 'epic' : index < 6 ? 'rare' : 'common',
        edition: index + 1,
        totalEditions: 500,
        burnAmount: 300,
    }))

    const allNFTs = [...figureNFTs, ...countryNFTs]

    // Filter NFTs
    const filteredNFTs = allNFTs.filter(nft => {
        if (activeFilter === 'all') return true
        if (activeFilter === 'figures') return nft.type === 'figure'
        if (activeFilter === 'countries') return nft.type === 'country'
        if (activeFilter === 'legendary') return nft.rarity === 'legendary'
        return true
    })

    const handleMint = (nftId) => {
        const updated = [...mintedNFTs, nftId]
        setMintedNFTs(updated)
        localStorage.setItem('mintedNFTs', JSON.stringify(updated))
    }

    const handleConnectWallet = () => {
        // Simulate wallet connection
        setWalletConnected(true)
        setTimeout(() => {
            alert('🎉 Wallet connected! (This is a demo - real wallet integration coming in Phase 2)')
        }, 500)
    }

    const totalBurned = mintedNFTs.length * 250 // Simulated burn amount

    // Coming Soon Overlay Component
    if (SHOW_COMING_SOON) {
        return (
            <div className="min-h-screen relative">
                {/* Background with blur effect */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#0a0a0f]" />
                    
                    {/* Animated grid background */}
                    <div 
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                        }}
                    />

                    {/* Glowing orbs */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent-gold)]/10 rounded-full blur-[128px]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-accent-green)]/10 rounded-full blur-[128px]"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 2,
                        }}
                    />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                    {/* Lock Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                            type: 'spring',
                            stiffness: 200,
                            damping: 20,
                            delay: 0.2 
                        }}
                        className="mb-8"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-accent-gold)] to-orange-600 flex items-center justify-center">
                                <Lock className="w-12 h-12 text-black" />
                            </div>
                            {/* Pulse ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-[var(--color-accent-gold)]"
                                animate={{
                                    scale: [1, 1.5, 1.5],
                                    opacity: [0.5, 0, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeOut',
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Coming Soon Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[var(--color-accent-gold)] via-orange-400 to-[var(--color-accent-gold)] bg-clip-text text-transparent">
                                Coming Soon
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-xl mx-auto">
                            DiasporaScan NFT Collection is being prepared for launch.
                            Collect, trade, and celebrate African heritage.
                        </p>
                    </motion.div>

                    {/* Feature Preview Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10"
                    >
                        {[
                            { icon: Flame, title: 'Burn to Mint', desc: 'Burn $DIAS to mint exclusive NFTs' },
                            { icon: Trophy, title: 'Rarity Tiers', desc: 'Legendary, Epic, Rare & Common' },
                            { icon: Sparkles, title: 'Heritage Cards', desc: 'Generate your own heritage card' },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="bg-[var(--color-bg-secondary)]/50 backdrop-blur-sm border border-[var(--color-border)] p-4 text-center"
                            >
                                <feature.icon className="w-8 h-8 text-[var(--color-accent-gold)] mx-auto mb-3" />
                                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{feature.title}</h3>
                                <p className="text-sm text-[var(--color-text-muted)]">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Stats Preview */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="flex flex-wrap justify-center gap-8 mb-10"
                    >
                        {[
                            { value: `${allNFTs.length}+`, label: 'Unique NFTs' },
                            { value: '4', label: 'Rarity Tiers' },
                            { value: '$DIAS', label: 'Burn Currency' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="font-mono text-3xl md:text-4xl font-bold text-[var(--color-accent-gold)]">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-[var(--color-text-muted)]">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3 }}
                    >
                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-accent-gold)] to-orange-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--color-accent-gold)]/25 transition-all"
                        >
                            <Rocket className="w-5 h-5" />
                            Follow for Updates
                        </a>
                    </motion.div>

                    {/* Countdown or Phase indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-10 text-center"
                    >
                        <Badge variant="gold">PHASE 2</Badge>
                        <p className="text-xs text-[var(--color-text-muted)] mt-2">
                            NFT minting will be available after token launch
                        </p>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <section className="px-4 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Stats */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                        <div className="flex flex-wrap gap-8 lg:gap-16">
                            <div>
                                <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                                    {allNFTs.length}
                                </div>
                                <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                    Collectible NFTs
                                </div>
                            </div>
                            <div>
                                <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-gold)]">
                                    {mintedNFTs.length}
                                </div>
                                <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                    Your Collection
                                </div>
                            </div>
                            <div>
                                <div className="font-mono text-4xl md:text-5xl font-bold text-orange-500 flex items-center gap-2">
                                    <Flame className="w-8 h-8" />
                                    {totalBurned.toLocaleString()}
                                </div>
                                <div className="text-sm text-[var(--color-text-muted)] mt-1">
                                    $DIAS Burned
                                </div>
                            </div>
                        </div>

                        {/* Wallet Connect */}
                        <div>
                            <button
                                onClick={handleConnectWallet}
                                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                                    walletConnected
                                        ? 'bg-[var(--color-accent-green)]/20 text-[var(--color-accent-green)] border border-[var(--color-accent-green)]'
                                        : 'bg-[var(--color-accent-gold)] text-black hover:bg-[var(--color-accent-gold-light)]'
                                }`}
                            >
                                <Wallet className="w-4 h-4" />
                                {walletConnected ? '0x7a3...4f2' : 'Connect Wallet'}
                            </button>
                        </div>
                    </div>

                    {/* Action Tabs */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <button
                            onClick={() => setShowGenerator(false)}
                            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                                !showGenerator
                                    ? 'bg-[var(--color-accent-green)] text-white'
                                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            <Grid className="w-4 h-4" /> NFT Gallery
                        </button>
                        <button
                            onClick={() => setShowGenerator(true)}
                            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                                showGenerator
                                    ? 'bg-[var(--color-accent-gold)] text-black'
                                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                            }`}
                        >
                            <Sparkles className="w-4 h-4" /> Heritage Card Generator
                        </button>
                    </div>

                    {showGenerator ? (
                        /* Heritage Card Generator */
                        <div className="mb-8">
                            <HeritageCardGenerator />
                        </div>
                    ) : (
                        <>
                            {/* Filter Tabs */}
                            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-[var(--color-border)]">
                                {filterTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveFilter(tab.id)}
                                        className={`text-sm transition-colors ${
                                            activeFilter === tab.id
                                                ? 'text-[var(--color-accent-green)]'
                                                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Terminal Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <TerminalStats
                                    title="NFT_STATS"
                                    stats={[
                                        { label: 'total_supply', value: allNFTs.length.toString(), color: 'green' },
                                        { label: 'legendary', value: allNFTs.filter(n => n.rarity === 'legendary').length.toString(), color: 'gold' },
                                        { label: 'epic', value: allNFTs.filter(n => n.rarity === 'epic').length.toString() },
                                        { label: 'rare', value: allNFTs.filter(n => n.rarity === 'rare').length.toString() },
                                        { label: 'common', value: allNFTs.filter(n => n.rarity === 'common').length.toString() },
                                    ]}
                                />
                                <TerminalStats
                                    title="BURN_MECHANICS"
                                    stats={[
                                        { label: 'total_burned', value: `${totalBurned.toLocaleString()} $DIAS`, color: 'red' },
                                        { label: 'your_mints', value: mintedNFTs.length.toString() },
                                        { label: 'avg_burn', value: '250 $DIAS' },
                                        { label: 'burn_rate', value: '0.1%/mint', color: 'gold' },
                                    ]}
                                />
                            </div>

                            {/* NFT Grid */}
                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    >
                                        <Flame className="w-8 h-8 text-[var(--color-accent-gold)]" />
                                    </motion.div>
                                    <span className="ml-3 text-[var(--color-text-muted)]">Loading NFTs...</span>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {filteredNFTs.map((nft, index) => (
                                        <NFTCard
                                            key={nft.id}
                                            name={nft.name}
                                            image={nft.image}
                                            type={nft.type}
                                            category={nft.category}
                                            rarity={nft.rarity}
                                            edition={nft.edition}
                                            totalEditions={nft.totalEditions}
                                            burnAmount={nft.burnAmount}
                                            minted={mintedNFTs.includes(nft.id)}
                                            onMint={() => handleMint(nft.id)}
                                            delay={index * 0.05}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Coming Soon Section */}
                            <div className="mt-12 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 rounded-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <Trophy className="w-6 h-6 text-[var(--color-accent-gold)]" />
                                    <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
                                        Coming in Phase 2
                                    </h3>
                                    <Badge variant="gold">SOON</Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[var(--color-text-muted)]">
                                    <div className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-green)]">✓</span>
                                        <span>Real blockchain minting on Base/Solana</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-green)]">✓</span>
                                        <span>$DIAS token burn integration</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-green)]">✓</span>
                                        <span>Secondary marketplace trading</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-green)]">✓</span>
                                        <span>Staking for exclusive content</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-green)]">✓</span>
                                        <span>Airdrops for early collectors</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-[var(--color-accent-green)]">✓</span>
                                        <span>Animated legendary cards</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}
