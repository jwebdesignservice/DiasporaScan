import { useState, memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { motion } from 'framer-motion'

import countriesData from '../../data/countries.json'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const africanCountryNames = [
    'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon',
    'Central African Rep.', 'Chad', 'Côte d\'Ivoire', 'Dem. Rep. Congo', 'Djibouti',
    'Egypt', 'Eq. Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea',
    'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi',
    'Mali', 'Mauritania', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria',
    'Rwanda', 'Senegal', 'Sierra Leone', 'Somalia', 'South Africa', 'S. Sudan', 'Sudan',
    'Eswatini', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe',
    'Congo', 'Cape Verde', 'Comoros', 'Mauritius', 'Seychelles', 'São Tomé and Príncipe',
    'Ivory Coast', 'Democratic Republic of the Congo', 'Republic of the Congo',
    'South Sudan', 'Western Sahara', 'Central African Republic', 'Equatorial Guinea'
]

// Blue color palette matching SomaliScan
const colorScale = {
    highest: '#3b82f6',    // Bright blue - highest data
    high: '#2563eb',       // Medium blue
    medium: '#1d4ed8',     // Darker blue
    low: '#1e3a5f',        // Dark blue
    lowest: '#0f2744',     // Very dark blue
    noData: '#1a1a24',     // Background color for non-African
}

function AfricaMap({ onCountryClick }) {
    const [hoveredCountry, setHoveredCountry] = useState(null)
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e) => {
        setTooltipPos({ x: e.clientX, y: e.clientY })
    }

    const isAfricanCountry = (geo) => {
        const name = geo.properties.name
        return africanCountryNames.some(an =>
            name.toLowerCase().includes(an.toLowerCase()) ||
            an.toLowerCase().includes(name.toLowerCase())
        )
    }

    const getCountryData = (name) => {
        const nameMap = {
            'South Africa': 'South Africa',
            'Nigeria': 'Nigeria',
            'Ghana': 'Ghana',
            'Kenya': 'Kenya',
            'Ethiopia': 'Ethiopia',
            'Senegal': 'Senegal',
            'Egypt': 'Egypt',
        }

        const mappedName = nameMap[name] || name
        return countriesData.countries.find(c => c.name === mappedName)
    }

    const getCountryColor = (geo) => {
        if (!isAfricanCountry(geo)) {
            return 'transparent'
        }

        const countryData = getCountryData(geo.properties.name)
        if (countryData) {
            // Use diaspora population to determine color intensity
            const pop = countryData.diasporaPopulation || 0
            if (pop > 10000000) return colorScale.highest
            if (pop > 5000000) return colorScale.high
            if (pop > 1000000) return colorScale.medium
            return colorScale.low
        }

        return colorScale.lowest
    }

    return (
        <div className="relative w-full overflow-hidden" onMouseMove={handleMouseMove}>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 400,
                    center: [20, 5],
                }}
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies
                            .filter((geo) => isAfricanCountry(geo))
                            .map((geo) => {
                                const countryData = getCountryData(geo.properties.name)

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                                        onMouseLeave={() => setHoveredCountry(null)}
                                        onClick={() => countryData && onCountryClick?.(countryData)}
                                        style={{
                                            default: {
                                                fill: getCountryColor(geo),
                                                stroke: '#0a0a0f',
                                                strokeWidth: 0.5,
                                                outline: 'none',
                                                transition: 'all 0.2s',
                                                cursor: countryData ? 'pointer' : 'default',
                                            },
                                            hover: {
                                                fill: '#60a5fa',
                                                stroke: '#0a0a0f',
                                                strokeWidth: 0.5,
                                                outline: 'none',
                                            },
                                            pressed: {
                                                fill: '#93c5fd',
                                                stroke: '#0a0a0f',
                                                strokeWidth: 0.5,
                                                outline: 'none',
                                            },
                                        }}
                                    />
                                )
                            })
                    }
                </Geographies>
            </ComposableMap>

            {/* Tooltip */}
            {hoveredCountry && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed pointer-events-none z-50 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 shadow-xl"
                    style={{
                        left: tooltipPos.x + 10,
                        top: tooltipPos.y + 10,
                    }}
                >
                    <p className="font-semibold text-[var(--color-text-primary)]">{hoveredCountry}</p>
                    {getCountryData(hoveredCountry) ? (
                        <>
                            <p className="text-xs text-[var(--color-accent-green)]">
                                {getCountryData(hoveredCountry).region}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)]">Click to view details</p>
                        </>
                    ) : (
                        <p className="text-xs text-[var(--color-text-muted)]">Data coming soon</p>
                    )}
                </motion.div>
            )}
        </div>
    )
}

export default memo(AfricaMap)
