import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, RefreshCw, ExternalLink, Loader2 } from 'lucide-react'

import SearchBar from '../components/search/SearchBar'
import TerminalStats from '../components/ui/TerminalStats'
import ActionButton from '../components/ui/ActionButton'
import Badge from '../components/ui/Badge'

import {
  useAllCountries,
  useEthnicGroups,
  useCultureData,
} from '../hooks/useApi'
import { fetchHistoricalFigures } from '../services/api'

// Static data as fallback
import countriesDataStatic from '../data/countries.json'
import figuresDataStatic from '../data/figures.json'
import clansDataStatic from '../data/clans.json'
import cultureDataStatic from '../data/culture.json'

const filterTabs = [
  { id: 'all', label: 'All Results' },
  { id: 'countries', label: 'Countries' },
  { id: 'figures', label: 'Historical Figures' },
  { id: 'clans', label: 'Clans & Tribes' },
  { id: 'culture', label: 'Culture' },
]

const figureCategories = [
  { id: 'civil_rights', label: 'Civil Rights' },
  { id: 'political_leaders', label: 'Political Leaders' },
  { id: 'musicians', label: 'Musicians' },
  { id: 'writers', label: 'Writers' },
  { id: 'scientists', label: 'Scientists' },
  { id: 'athletes', label: 'Athletes' },
  { id: 'abolitionists', label: 'Abolitionists' },
  { id: 'african_leaders', label: 'African Leaders' },
]

export default function Database() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const activeFilter = searchParams.get('type') || 'all'
  const searchQuery = searchParams.get('q') || ''
  
  // API data
  const { data: countriesData, loading: countriesLoading, error: countriesError } = useAllCountries()
  const { data: ethnicData, loading: ethnicLoading } = useEthnicGroups(100)
  const { data: cultureData, loading: cultureLoading } = useCultureData()
  
  // Figures loaded separately based on category selection
  const [figures, setFigures] = useState([])
  const [figuresLoading, setFiguresLoading] = useState(false)
  const [selectedFigureCategory, setSelectedFigureCategory] = useState('civil_rights')

  // Combined data (API + static fallback)
  const [allData, setAllData] = useState({
    countries: [],
    figures: [],
    clans: [],
    music: [],
    food: [],
    languages: [],
  })

  // Merge API data with static data
  useEffect(() => {
    const mergedCountries = [
      ...(countriesData?.all || []),
      ...countriesDataStatic.countries.filter(
        static_c => !countriesData?.all?.find(api_c => api_c.code === static_c.code)
      )
    ]

    const mergedClans = [
      ...(ethnicData || []),
      ...clansDataStatic.clans.filter(
        static_c => !ethnicData?.find(api_c => api_c.name.toLowerCase() === static_c.name.toLowerCase())
      )
    ]

    setAllData(prev => ({
      ...prev,
      countries: mergedCountries,
      clans: mergedClans,
      figures: [...figures, ...figuresDataStatic.figures.filter(
        static_f => !figures.find(api_f => api_f.name.toLowerCase() === static_f.name.toLowerCase())
      )],
      music: [...(cultureData?.music || []), ...cultureDataStatic.culture.music],
      food: [...(cultureData?.food || []), ...cultureDataStatic.culture.food],
      languages: [...(cultureData?.languages || []), ...cultureDataStatic.culture.languages],
    }))
  }, [countriesData, ethnicData, cultureData, figures])

  // Load figures when category changes
  useEffect(() => {
    async function loadFigures() {
      setFiguresLoading(true)
      try {
        const data = await fetchHistoricalFigures(selectedFigureCategory, 30)
        setFigures(data)
      } catch (error) {
        console.error('Failed to load figures:', error)
      }
      setFiguresLoading(false)
    }
    
    if (activeFilter === 'figures' || activeFilter === 'all') {
      loadFigures()
    }
  }, [selectedFigureCategory, activeFilter])

  // When clicking a figure category, switch to figures filter
  const handleFigureCategoryClick = (categoryId) => {
    setSelectedFigureCategory(categoryId)
    // Auto-switch to figures filter when selecting a category
    if (activeFilter !== 'figures') {
      handleFilterChange('figures')
    }
  }

  // Filter data based on search query and active filter
  const filteredData = {
    countries: allData.countries.filter(c => 
      !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    figures: allData.figures.filter(f => 
      !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    clans: allData.clans.filter(c => 
      !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    culture: [
      ...allData.music.filter(m => !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase())),
      ...allData.food.filter(f => !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase())),
      ...allData.languages.filter(l => !searchQuery || l.name.toLowerCase().includes(searchQuery.toLowerCase())),
    ]
  }

  const handleFilterChange = (filter) => {
    const params = new URLSearchParams(searchParams)
    if (filter === 'all') {
      params.delete('type')
    } else {
      params.set('type', filter)
    }
    setSearchParams(params)
  }

  const isLoading = countriesLoading || ethnicLoading || cultureLoading || figuresLoading

  const totalResults = 
    (activeFilter === 'all' || activeFilter === 'countries' ? filteredData.countries.length : 0) +
    (activeFilter === 'all' || activeFilter === 'figures' ? filteredData.figures.length : 0) +
    (activeFilter === 'all' || activeFilter === 'clans' ? filteredData.clans.length : 0) +
    (activeFilter === 'all' || activeFilter === 'culture' ? filteredData.culture.length : 0)

  return (
    <div className="min-h-screen">
      <section className="px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Top Stats */}
          <div className="flex flex-wrap gap-8 lg:gap-16 mb-6">
            <div>
              <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                {isLoading ? <Loader2 className="w-10 h-10 animate-spin" /> : totalResults}
              </div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">
                Total results
              </div>
            </div>
            <div>
              <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-green)]">
                {allData.countries.length}
              </div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">
                Countries
              </div>
            </div>
            <div>
              <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-accent-gold)]">
                {allData.figures.length}
              </div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">
                Historical Figures
              </div>
            </div>
            <div>
              <div className="font-mono text-4xl md:text-5xl font-bold text-[var(--color-text-secondary)]">
                {allData.clans.length}
              </div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">
                Ethnic Groups
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar large />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-6">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
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

          {/* Figure Category Filter */}
          <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-[var(--color-text-muted)]">Fetch Historical Figures from Wikipedia:</span>
              {figuresLoading && <Loader2 className="w-4 h-4 animate-spin text-[var(--color-accent-green)]" />}
            </div>
            <div className="flex flex-wrap gap-2">
              {figureCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleFigureCategoryClick(cat.id)}
                  className={`text-xs px-3 py-1.5 rounded transition-colors ${
                    selectedFigureCategory === cat.id
                      ? 'bg-[var(--color-accent-green)] text-white'
                      : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {activeFilter !== 'figures' && (
              <p className="text-xs text-[var(--color-text-muted)] mt-2">
                Click a category above to fetch and view historical figures
              </p>
            )}
          </div>

          {/* Terminal Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-[var(--color-border)]">
            <TerminalStats
              title="DATABASE_INFO"
              stats={[
                { label: 'countries', value: allData.countries.length.toString(), color: 'green' },
                { label: 'figures', value: allData.figures.length.toString() },
                { label: 'ethnic_groups', value: allData.clans.length.toString() },
                { label: 'music_genres', value: allData.music.length.toString() },
                { label: 'foods', value: allData.food.length.toString() },
                { label: 'languages', value: allData.languages.length.toString() },
              ]}
            />
            <TerminalStats
              title="API_STATUS"
              stats={[
                { label: 'rest_countries', value: countriesError ? 'error' : 'connected', color: countriesError ? 'red' : 'green' },
                { label: 'wikipedia', value: 'connected', color: 'green' },
                { label: 'wikidata', value: 'connected', color: 'green' },
                { label: 'cache', value: 'active', color: 'gold' },
              ]}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent-green)]" />
              <span className="ml-3 text-[var(--color-text-muted)]">Fetching data from APIs...</span>
            </div>
          )}

          {/* Countries Table */}
          {(activeFilter === 'all' || activeFilter === 'countries') && filteredData.countries.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                Countries ({filteredData.countries.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Flag</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Name</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Region</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Capital</th>
                      <th className="py-2 px-3 text-right text-xs font-medium text-[var(--color-accent-green)]">Population</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Languages</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.countries.slice(0, 50).map((country, index) => (
                      <motion.tr
                        key={country.id || country.code}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
                        onClick={() => navigate(`/search?q=${encodeURIComponent(country.name)}&type=country`)}
                      >
                        <td className="py-3 px-3">
                          {country.flag && (
                            <img src={country.flag} alt={country.name} className="w-8 h-5 object-cover rounded" />
                          )}
                        </td>
                        <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                          {country.name}
                        </td>
                        <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                          {country.region}
                        </td>
                        <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                          {country.capital}
                        </td>
                        <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">
                          {(country.population / 1000000).toFixed(1)}M
                        </td>
                        <td className="py-3 px-3 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {country.languages?.slice(0, 2).map((lang, i) => (
                              <Badge key={i} variant="default">{lang}</Badge>
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Figures Table */}
          {(activeFilter === 'all' || activeFilter === 'figures') && filteredData.figures.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                Historical Figures ({filteredData.figures.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Image</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Name</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Category</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Origin</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Description</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.figures.slice(0, 50).map((figure, index) => (
                      <motion.tr
                        key={figure.id || index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors"
                      >
                        <td className="py-3 px-3">
                          {(figure.image || figure.thumbnail) && (
                            <img 
                              src={figure.image || figure.thumbnail} 
                              alt={figure.name} 
                              className="w-10 h-10 object-cover rounded"
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          )}
                        </td>
                        <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                          {figure.name}
                        </td>
                        <td className="py-3 px-3 text-sm">
                          <Badge variant="gold">{figure.category}</Badge>
                        </td>
                        <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                          {figure.origin || 'N/A'}
                        </td>
                        <td className="py-3 px-3 text-sm text-[var(--color-text-muted)] max-w-xs truncate">
                          {figure.description?.slice(0, 100)}...
                        </td>
                        <td className="py-3 px-3">
                          {figure.url && (
                            <a 
                              href={figure.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[var(--color-accent-green)] hover:text-[var(--color-accent-green-light)]"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Clans Table */}
          {(activeFilter === 'all' || activeFilter === 'clans') && filteredData.clans.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                Clans & Ethnic Groups ({filteredData.clans.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Name</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Country</th>
                      <th className="py-2 px-3 text-right text-xs font-medium text-[var(--color-accent-green)]">Population</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Language</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.clans.slice(0, 50).map((clan, index) => (
                      <motion.tr
                        key={clan.id || index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer"
                        onClick={() => navigate(`/search?q=${encodeURIComponent(clan.name)}&type=clan`)}
                      >
                        <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                          {clan.name}
                        </td>
                        <td className="py-3 px-3 text-sm text-[var(--color-text-muted)]">
                          {clan.country}
                        </td>
                        <td className="py-3 px-3 text-sm text-right font-mono text-[var(--color-accent-green)]">
                          {clan.population ? `${(clan.population / 1000000).toFixed(1)}M` : 'N/A'}
                        </td>
                        <td className="py-3 px-3 text-sm">
                          <Badge variant="blue">{clan.language}</Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Culture Table */}
          {(activeFilter === 'all' || activeFilter === 'culture') && filteredData.culture.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm text-[var(--color-text-muted)] mb-4">
                Culture ({filteredData.culture.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Image</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Name</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Type</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Description</th>
                      <th className="py-2 px-3 text-left text-xs font-medium text-[var(--color-accent-green)]">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.culture.slice(0, 50).map((item, index) => (
                      <motion.tr
                        key={item.id || index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="border-b border-[var(--color-border)]/50 hover:bg-[var(--color-bg-secondary)] transition-colors"
                      >
                        <td className="py-3 px-3">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-10 h-10 object-cover rounded"
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          )}
                        </td>
                        <td className="py-3 px-3 text-sm text-[var(--color-text-primary)]">
                          {item.name}
                        </td>
                        <td className="py-3 px-3 text-sm">
                          <Badge variant="default">
                            {item.keyArtists ? 'Music' : item.ingredients ? 'Food' : 'Language'}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-sm text-[var(--color-text-muted)] max-w-xs truncate">
                          {item.description?.slice(0, 100)}...
                        </td>
                        <td className="py-3 px-3">
                          {item.url && (
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[var(--color-accent-green)] hover:text-[var(--color-accent-green-light)]"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--color-border)]">
            <ActionButton href="/" variant="green">
              Back to Map
            </ActionButton>
            <ActionButton href="/explore" variant="red">
              Explore Diaspora
            </ActionButton>
            <span 
              onClick={() => navigate('/africa')}
              className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
            >
              Africa map <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
