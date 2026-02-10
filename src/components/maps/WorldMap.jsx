import { useState, memo } from 'react'
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps'
import { motion } from 'framer-motion'

import countriesData from '../../data/countries.json'
import diasporaData from '../../data/diaspora.json'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Diaspora locations with coordinates
const diasporaLocations = [
  { name: 'USA', coordinates: [-95, 38], population: 47000000 },
  { name: 'Brazil', coordinates: [-47, -15], population: 97000000 },
  { name: 'Jamaica', coordinates: [-77, 18], population: 2800000 },
  { name: 'UK', coordinates: [0, 52], population: 2000000 },
  { name: 'France', coordinates: [2, 47], population: 5000000 },
  { name: 'Haiti', coordinates: [-72, 19], population: 11000000 },
  { name: 'Canada', coordinates: [-106, 56], population: 1500000 },
  { name: 'Colombia', coordinates: [-74, 4], population: 4500000 },
]

// Africa center for migration lines
const africaCenter = [20, 0]

// Migration routes
const migrationRoutes = [
  { from: [0, 10], to: [-60, -10], name: 'Transatlantic (Brazil)' },
  { from: [0, 10], to: [-75, 20], name: 'Transatlantic (Caribbean)' },
  { from: [0, 10], to: [-85, 35], name: 'Transatlantic (USA)' },
  { from: [0, 10], to: [-5, 50], name: 'To Europe' },
]

function WorldMap({ onCountryClick }) {
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // Get diaspora countries for highlighting
  const diasporaCountryNames = countriesData.countries
    .filter(c => c.region.includes('Diaspora'))
    .map(c => c.name)

  const africaCountryNames = countriesData.countries
    .filter(c => !c.region.includes('Diaspora'))
    .map(c => c.name)

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  const getCountryColor = (geo) => {
    const countryName = geo.properties.name
    
    // Check if it's an African country in our data
    if (africaCountryNames.includes(countryName)) {
      return 'var(--color-accent-green)'
    }
    
    // Check if it's a diaspora country
    if (diasporaCountryNames.includes(countryName)) {
      return 'var(--color-accent-gold)'
    }

    // Default color
    return 'var(--color-bg-tertiary)'
  }

  return (
    <div className="relative w-full" onMouseMove={handleMouseMove}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 20],
        }}
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredCountry === geo.properties.name
              const countryData = countriesData.countries.find(
                c => c.name === geo.properties.name
              )

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
                      stroke: 'var(--color-bg-primary)',
                      strokeWidth: 0.5,
                      outline: 'none',
                      transition: 'all 0.2s',
                      cursor: countryData ? 'pointer' : 'default',
                    },
                    hover: {
                      fill: countryData ? 'var(--color-accent-green-light)' : 'var(--color-border)',
                      stroke: 'var(--color-bg-primary)',
                      strokeWidth: 0.5,
                      outline: 'none',
                    },
                    pressed: {
                      fill: 'var(--color-accent-green)',
                      stroke: 'var(--color-bg-primary)',
                      strokeWidth: 0.5,
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>

        {/* Migration route lines */}
        {migrationRoutes.map((route, index) => (
          <Line
            key={index}
            from={route.from}
            to={route.to}
            stroke="var(--color-accent-gold)"
            strokeWidth={1}
            strokeOpacity={0.4}
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
        ))}

        {/* Diaspora location markers */}
        {diasporaLocations.map((location) => (
          <Marker key={location.name} coordinates={location.coordinates}>
            <circle
              r={Math.sqrt(location.population) / 1500}
              fill="var(--color-accent-gold)"
              fillOpacity={0.6}
              stroke="var(--color-accent-gold)"
              strokeWidth={1}
            />
          </Marker>
        ))}
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
          {countriesData.countries.find(c => c.name === hoveredCountry) && (
            <p className="text-xs text-[var(--color-text-muted)]">Click to view details</p>
          )}
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[var(--color-bg-secondary)]/90 backdrop-blur-sm border border-[var(--color-border)] rounded-lg p-3 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded bg-[var(--color-accent-green)]" />
          <span className="text-[var(--color-text-secondary)]">African Nations</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded bg-[var(--color-accent-gold)]" />
          <span className="text-[var(--color-text-secondary)]">Diaspora Communities</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[var(--color-accent-gold)]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--color-accent-gold) 0, var(--color-accent-gold) 4px, transparent 4px, transparent 6px)' }} />
          <span className="text-[var(--color-text-secondary)]">Migration Routes</span>
        </div>
      </div>
    </div>
  )
}

export default memo(WorldMap)
