import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, Share2, Sparkles, Globe, Users, MapPin } from 'lucide-react'

const backgroundPatterns = [
    { id: 'kente', name: 'Kente', gradient: 'from-yellow-600 via-green-700 to-red-600' },
    { id: 'mudcloth', name: 'Mudcloth', gradient: 'from-amber-900 via-yellow-800 to-amber-950' },
    { id: 'adinkra', name: 'Adinkra', gradient: 'from-gray-900 via-yellow-900 to-gray-900' },
    { id: 'panAfrican', name: 'Pan-African', gradient: 'from-red-600 via-black to-green-600' },
    { id: 'ocean', name: 'Atlantic', gradient: 'from-blue-900 via-cyan-800 to-blue-950' },
    { id: 'gold', name: 'Gold Coast', gradient: 'from-yellow-500 via-amber-600 to-yellow-700' },
]

const originCountries = [
    'Nigeria', 'Ghana', 'Senegal', 'Kenya', 'Ethiopia', 'South Africa',
    'Congo', 'Cameroon', 'Angola', 'Mali', 'Ivory Coast', 'Tanzania',
    'Uganda', 'Zimbabwe', 'Mozambique', 'Other African Nation'
]

const destinationCountries = [
    'United States', 'Brazil', 'United Kingdom', 'Jamaica', 'Haiti',
    'Trinidad & Tobago', 'France', 'Canada', 'Cuba', 'Dominican Republic',
    'Colombia', 'Venezuela', 'Other'
]

export default function HeritageCardGenerator() {
    const [formData, setFormData] = useState({
        name: '',
        origin: '',
        destination: '',
        surname: '',
        pattern: 'kente',
    })
    const [isGenerated, setIsGenerated] = useState(false)
    const cardRef = useRef(null)

    const selectedPattern = backgroundPatterns.find(p => p.id === formData.pattern)

    const handleGenerate = () => {
        if (formData.name && formData.origin && formData.destination) {
            setIsGenerated(true)
        }
    }

    const handleShare = () => {
        const text = `🌍 My Diaspora Heritage Journey\n\n${formData.origin} → ${formData.destination}\n\nDiscover your roots at diasporascan.com\n\n#DiasporaScan #BlackHistoryMonth #AfricanDiaspora`
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }

    const handleReset = () => {
        setIsGenerated(false)
        setFormData({ name: '', origin: '', destination: '', surname: '', pattern: 'kente' })
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6">
                <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[var(--color-accent-gold)]" />
                    Create Your Heritage Card
                </h3>

                <div className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-xs text-[var(--color-text-muted)] mb-1">Your Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your name"
                            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)] rounded"
                        />
                    </div>

                    {/* Surname */}
                    <div>
                        <label className="block text-xs text-[var(--color-text-muted)] mb-1">Family Surname (Optional)</label>
                        <input
                            type="text"
                            value={formData.surname}
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                            placeholder="Your family name"
                            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-green)] rounded"
                        />
                    </div>

                    {/* Origin */}
                    <div>
                        <label className="block text-xs text-[var(--color-text-muted)] mb-1">Ancestral Origin</label>
                        <select
                            value={formData.origin}
                            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-green)] rounded"
                        >
                            <option value="">Select origin country</option>
                            {originCountries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    {/* Destination */}
                    <div>
                        <label className="block text-xs text-[var(--color-text-muted)] mb-1">Current Location</label>
                        <select
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-green)] rounded"
                        >
                            <option value="">Select current location</option>
                            {destinationCountries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    {/* Pattern Selection */}
                    <div>
                        <label className="block text-xs text-[var(--color-text-muted)] mb-2">Card Style</label>
                        <div className="grid grid-cols-3 gap-2">
                            {backgroundPatterns.map(pattern => (
                                <button
                                    key={pattern.id}
                                    onClick={() => setFormData({ ...formData, pattern: pattern.id })}
                                    className={`h-12 rounded bg-gradient-to-br ${pattern.gradient} border-2 transition-all ${
                                        formData.pattern === pattern.id
                                            ? 'border-white scale-105'
                                            : 'border-transparent opacity-70 hover:opacity-100'
                                    }`}
                                    title={pattern.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={!formData.name || !formData.origin || !formData.destination}
                        className="w-full py-3 bg-[var(--color-accent-green)] hover:bg-[var(--color-accent-green-light)] disabled:bg-[var(--color-bg-tertiary)] disabled:text-[var(--color-text-muted)] text-white font-bold rounded transition-all"
                    >
                        Generate Heritage Card
                    </button>
                </div>
            </div>

            {/* Preview Section */}
            <div className="flex flex-col items-center justify-center">
                {isGenerated ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-sm"
                    >
                        {/* The Card */}
                        <div
                            ref={cardRef}
                            className={`relative bg-gradient-to-br ${selectedPattern?.gradient} p-6 rounded-2xl shadow-2xl overflow-hidden`}
                        >
                            {/* Decorative pattern overlay */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                                }} />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Header */}
                                <div className="text-center mb-6">
                                    <div className="text-xs uppercase tracking-widest text-white/70 mb-1">
                                        My Diaspora Journey
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {formData.name}
                                    </h2>
                                    {formData.surname && (
                                        <div className="text-sm text-white/80 mt-1">
                                            {formData.surname} Family
                                        </div>
                                    )}
                                </div>

                                {/* Journey */}
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <div className="text-center">
                                        <MapPin className="w-5 h-5 mx-auto text-white/70 mb-1" />
                                        <div className="text-sm font-medium text-white">{formData.origin}</div>
                                        <div className="text-xs text-white/60">Origin</div>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="h-0.5 w-full bg-white/30 relative">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="absolute inset-0 bg-white"
                                            />
                                        </div>
                                        <div className="mx-2 text-white">→</div>
                                    </div>
                                    <div className="text-center">
                                        <Globe className="w-5 h-5 mx-auto text-white/70 mb-1" />
                                        <div className="text-sm font-medium text-white">{formData.destination}</div>
                                        <div className="text-xs text-white/60">Now</div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    <div className="bg-black/20 rounded p-2 text-center">
                                        <div className="text-lg font-mono font-bold text-white">∞</div>
                                        <div className="text-[10px] text-white/60">Generations</div>
                                    </div>
                                    <div className="bg-black/20 rounded p-2 text-center">
                                        <div className="text-lg font-mono font-bold text-[var(--color-accent-gold)]">🔥</div>
                                        <div className="text-[10px] text-white/60">Heritage</div>
                                    </div>
                                    <div className="bg-black/20 rounded p-2 text-center">
                                        <div className="text-lg font-mono font-bold text-white">
                                            <Users className="w-5 h-5 mx-auto" />
                                        </div>
                                        <div className="text-[10px] text-white/60">Connected</div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="text-center pt-4 border-t border-white/20">
                                    <div className="text-xs text-white/50">diasporascan.com</div>
                                    <div className="text-[10px] text-white/30 mt-1">
                                        #{Math.random().toString(36).substr(2, 8).toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleShare}
                                className="flex-1 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-medium rounded flex items-center justify-center gap-2 transition-colors"
                            >
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 py-2 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] font-medium rounded transition-colors"
                            >
                                Create New
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center text-[var(--color-text-muted)] p-8">
                        <div className="w-48 h-64 mx-auto border-2 border-dashed border-[var(--color-border)] rounded-xl flex items-center justify-center mb-4">
                            <Sparkles className="w-12 h-12 opacity-30" />
                        </div>
                        <p className="text-sm">Fill in the form to generate your personalized Heritage Card</p>
                    </div>
                )}
            </div>
        </div>
    )
}
