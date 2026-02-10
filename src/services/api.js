/**
 * API Service for fetching diaspora-related data
 * Uses REST Countries, Wikipedia, and Wikidata APIs
 */

const RESTCOUNTRIES_API = 'https://restcountries.com/v3.1'
const WIKIPEDIA_API = 'https://en.wikipedia.org/api/rest_v1'
const WIKIDATA_API = 'https://www.wikidata.org/w/api.php'

// African country codes for filtering
const AFRICAN_COUNTRY_CODES = [
  'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CV', 'CM', 'CF', 'TD', 'KM', 'CG', 'CD',
  'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'CI', 'KE',
  'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG',
  'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG', 'TN', 'UG',
  'ZM', 'ZW'
]

// Diaspora countries
const DIASPORA_COUNTRY_CODES = [
  'US', 'BR', 'JM', 'HT', 'TT', 'GB', 'FR', 'CA', 'CO', 'VE', 'DO', 'CU', 'PR',
  'BB', 'BS', 'GY', 'SR', 'PA', 'CR', 'NL', 'BE', 'PT', 'IT', 'DE'
]

/**
 * Fetch all African countries with detailed information
 */
export async function fetchAfricanCountries() {
  try {
    const response = await fetch(`${RESTCOUNTRIES_API}/region/africa`)
    if (!response.ok) throw new Error('Failed to fetch African countries')
    
    const data = await response.json()
    
    return data.map(country => ({
      id: country.cca2.toLowerCase(),
      name: country.name.common,
      officialName: country.name.official,
      code: country.cca2,
      region: country.subregion || 'Africa',
      population: country.population,
      capital: country.capital?.[0] || 'N/A',
      languages: Object.values(country.languages || {}),
      currencies: Object.values(country.currencies || {}).map(c => c.name),
      timezones: country.timezones,
      flag: country.flags?.svg || country.flags?.png,
      coatOfArms: country.coatOfArms?.svg || country.coatOfArms?.png,
      maps: country.maps,
      borders: country.borders || [],
      area: country.area,
      landlocked: country.landlocked,
      unMember: country.unMember,
      independent: country.independent,
      startOfWeek: country.startOfWeek,
      latlng: country.latlng,
      continents: country.continents,
    }))
  } catch (error) {
    console.error('Error fetching African countries:', error)
    return []
  }
}

/**
 * Fetch diaspora countries (Americas, Europe, Caribbean)
 */
export async function fetchDiasporaCountries() {
  try {
    const codes = DIASPORA_COUNTRY_CODES.join(',')
    const response = await fetch(`${RESTCOUNTRIES_API}/alpha?codes=${codes}`)
    if (!response.ok) throw new Error('Failed to fetch diaspora countries')
    
    const data = await response.json()
    
    return data.map(country => ({
      id: country.cca2.toLowerCase(),
      name: country.name.common,
      officialName: country.name.official,
      code: country.cca2,
      region: `${country.subregion || country.region} (Diaspora)`,
      population: country.population,
      capital: country.capital?.[0] || 'N/A',
      languages: Object.values(country.languages || {}),
      currencies: Object.values(country.currencies || {}).map(c => c.name),
      flag: country.flags?.svg || country.flags?.png,
      maps: country.maps,
      latlng: country.latlng,
    }))
  } catch (error) {
    console.error('Error fetching diaspora countries:', error)
    return []
  }
}

/**
 * Fetch a specific country by code
 */
export async function fetchCountryByCode(code) {
  try {
    const response = await fetch(`${RESTCOUNTRIES_API}/alpha/${code}`)
    if (!response.ok) throw new Error(`Failed to fetch country: ${code}`)
    
    const data = await response.json()
    const country = Array.isArray(data) ? data[0] : data
    
    return {
      id: country.cca2.toLowerCase(),
      name: country.name.common,
      officialName: country.name.official,
      nativeName: Object.values(country.name.nativeName || {})[0]?.common,
      code: country.cca2,
      region: country.subregion || country.region,
      population: country.population,
      capital: country.capital?.[0] || 'N/A',
      languages: Object.values(country.languages || {}),
      currencies: Object.values(country.currencies || {}).map(c => ({ name: c.name, symbol: c.symbol })),
      flag: country.flags?.svg || country.flags?.png,
      coatOfArms: country.coatOfArms?.svg || country.coatOfArms?.png,
      maps: country.maps,
      borders: country.borders || [],
      area: country.area,
      landlocked: country.landlocked,
      timezones: country.timezones,
      latlng: country.latlng,
      demonyms: country.demonyms?.eng,
      gini: country.gini,
      car: country.car,
    }
  } catch (error) {
    console.error('Error fetching country:', error)
    return null
  }
}

/**
 * Search Wikipedia for information about a topic
 */
export async function searchWikipedia(query, limit = 10) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=${limit}`
    )
    if (!response.ok) throw new Error('Wikipedia search failed')
    
    const data = await response.json()
    return data.query?.search?.map(result => ({
      title: result.title,
      snippet: result.snippet.replace(/<\/?[^>]+(>|$)/g, ''), // Remove HTML tags
      pageId: result.pageid,
      wordCount: result.wordcount,
    })) || []
  } catch (error) {
    console.error('Wikipedia search error:', error)
    return []
  }
}

/**
 * Get Wikipedia summary for a specific topic
 */
export async function getWikipediaSummary(title) {
  try {
    const response = await fetch(
      `${WIKIPEDIA_API}/page/summary/${encodeURIComponent(title)}`
    )
    if (!response.ok) throw new Error('Failed to get Wikipedia summary')
    
    const data = await response.json()
    return {
      title: data.title,
      description: data.description,
      extract: data.extract,
      thumbnail: data.thumbnail?.source,
      originalImage: data.originalimage?.source,
      url: data.content_urls?.desktop?.page,
    }
  } catch (error) {
    console.error('Wikipedia summary error:', error)
    return null
  }
}

/**
 * Fetch historical figures from Wikipedia using category search
 */
export async function fetchHistoricalFigures(category, limit = 50) {
  // Category mappings for African diaspora historical figures
  const categoryMap = {
    'civil_rights': 'African-American_civil_rights_activists',
    'political_leaders': 'Pan-Africanists',
    'musicians': 'African-American_musicians',
    'writers': 'African-American_writers',
    'scientists': 'African-American_scientists',
    'athletes': 'African-American_sportspeople',
    'abolitionists': 'American_abolitionists',
    'african_leaders': 'African_heads_of_state',
  }

  const wikiCategory = categoryMap[category] || category

  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${wikiCategory}&cmlimit=${limit}&format=json&origin=*`
    )
    if (!response.ok) throw new Error('Failed to fetch category members')
    
    const data = await response.json()
    const members = data.query?.categorymembers || []
    
    // Filter out non-person pages (subcategories, lists, etc.)
    const personPages = members.filter(m => 
      m.ns === 0 && !m.title.startsWith('List of') && !m.title.includes('(disambiguation)')
    )
    
    // Fetch summaries for each person (limited to avoid rate limiting)
    const summaries = await Promise.all(
      personPages.slice(0, 20).map(page => getWikipediaSummary(page.title))
    )
    
    return summaries.filter(Boolean).map(s => ({
      id: s.title.toLowerCase().replace(/\s+/g, '-'),
      name: s.title,
      description: s.extract?.slice(0, 300) + '...',
      image: s.thumbnail || s.originalImage,
      category: category,
      url: s.url,
    }))
  } catch (error) {
    console.error('Error fetching historical figures:', error)
    return []
  }
}

/**
 * Fetch ethnic groups / tribes from Wikidata
 */
export async function fetchEthnicGroups(limit = 50) {
  const query = `
    SELECT DISTINCT ?group ?groupLabel ?countryLabel ?population ?languageLabel WHERE {
      ?group wdt:P31 wd:Q41710.  # Instance of ethnic group
      ?group wdt:P17 ?country.   # Country
      ?country wdt:P30 wd:Q15.   # Located in Africa
      OPTIONAL { ?group wdt:P1082 ?population. }
      OPTIONAL { ?group wdt:P2936 ?language. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    ORDER BY DESC(?population)
    LIMIT ${limit}
  `

  try {
    const response = await fetch(
      `https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}&format=json`
    )
    if (!response.ok) throw new Error('Wikidata query failed')
    
    const data = await response.json()
    
    return data.results.bindings.map(item => ({
      id: item.group.value.split('/').pop(),
      name: item.groupLabel.value,
      country: item.countryLabel?.value || 'Unknown',
      population: parseInt(item.population?.value) || null,
      language: item.languageLabel?.value || 'Various',
    }))
  } catch (error) {
    console.error('Error fetching ethnic groups:', error)
    return []
  }
}

/**
 * Fetch African music genres from Wikipedia
 */
export async function fetchMusicGenres() {
  const genres = [
    'Afrobeat', 'Highlife', 'Jùjú_music', 'Fuji_music', 'Afrobeats',
    'Kwaito', 'Amapiano', 'Bongo_Flava', 'Soukous', 'Mbalax',
    'Reggae', 'Dancehall', 'Soca_music', 'Calypso_music', 'Kompa',
    'Blues', 'Jazz', 'Gospel_music', 'Hip_hop_music', 'R%26B'
  ]
  
  try {
    const summaries = await Promise.all(
      genres.map(genre => getWikipediaSummary(genre.replace(/_/g, ' ')))
    )
    
    return summaries.filter(Boolean).map(s => ({
      id: s.title.toLowerCase().replace(/\s+/g, '-'),
      name: s.title,
      description: s.extract?.slice(0, 250) + '...',
      image: s.thumbnail,
      url: s.url,
    }))
  } catch (error) {
    console.error('Error fetching music genres:', error)
    return []
  }
}

/**
 * Fetch African foods from Wikipedia
 */
export async function fetchAfricanFoods() {
  const foods = [
    'Jollof_rice', 'Fufu', 'Injera', 'Couscous', 'Tagine',
    'Bobotie', 'Bunny_chow', 'Ugali', 'Sadza', 'Pap_(food)',
    'Suya', 'Egusi', 'Groundnut_soup', 'Thieboudienne', 'Maafe',
    'Gumbo', 'Jambalaya', 'Jerk_(cooking)', 'Ackee_and_saltfish', 'Feijoada'
  ]
  
  try {
    const summaries = await Promise.all(
      foods.map(food => getWikipediaSummary(food.replace(/_/g, ' ')))
    )
    
    return summaries.filter(Boolean).map(s => ({
      id: s.title.toLowerCase().replace(/\s+/g, '-'),
      name: s.title,
      description: s.extract?.slice(0, 250) + '...',
      image: s.thumbnail,
      url: s.url,
    }))
  } catch (error) {
    console.error('Error fetching African foods:', error)
    return []
  }
}

/**
 * Fetch African languages info
 */
export async function fetchAfricanLanguages() {
  const languages = [
    'Swahili_language', 'Yoruba_language', 'Hausa_language', 'Zulu_language',
    'Amharic', 'Igbo_language', 'Oromo_language', 'Shona_language',
    'Wolof_language', 'Fulani_language', 'Lingala', 'Twi_language',
    'Somali_language', 'Tigrinya_language', 'Sesotho', 'Setswana'
  ]
  
  try {
    const summaries = await Promise.all(
      languages.map(lang => getWikipediaSummary(lang.replace(/_/g, ' ')))
    )
    
    return summaries.filter(Boolean).map(s => ({
      id: s.title.toLowerCase().replace(/\s+/g, '-').replace(' language', ''),
      name: s.title.replace(' language', ''),
      description: s.extract?.slice(0, 250) + '...',
      url: s.url,
    }))
  } catch (error) {
    console.error('Error fetching African languages:', error)
    return []
  }
}

/**
 * Universal search across all data types
 */
export async function universalSearch(query, filters = {}) {
  const results = {
    countries: [],
    figures: [],
    ethnicGroups: [],
    culture: []
  }

  // Search Wikipedia for general results
  const wikiResults = await searchWikipedia(`${query} Africa diaspora`, 20)
  
  // Categorize results based on keywords
  wikiResults.forEach(result => {
    const titleLower = result.title.toLowerCase()
    const snippetLower = result.snippet.toLowerCase()
    
    if (snippetLower.includes('country') || snippetLower.includes('nation') || snippetLower.includes('republic')) {
      results.countries.push(result)
    } else if (snippetLower.includes('born') || snippetLower.includes('activist') || snippetLower.includes('leader')) {
      results.figures.push(result)
    } else if (snippetLower.includes('ethnic') || snippetLower.includes('tribe') || snippetLower.includes('people')) {
      results.ethnicGroups.push(result)
    } else if (snippetLower.includes('music') || snippetLower.includes('food') || snippetLower.includes('language') || snippetLower.includes('culture')) {
      results.culture.push(result)
    }
  })

  return results
}

/**
 * Cache manager for API responses
 */
class CacheManager {
  constructor(ttl = 3600000) { // 1 hour default TTL
    this.cache = new Map()
    this.ttl = ttl
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null
    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }
    return item.data
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + this.ttl
    })
  }

  clear() {
    this.cache.clear()
  }
}

export const apiCache = new CacheManager()

/**
 * Fetch with caching
 */
export async function fetchWithCache(key, fetchFn) {
  const cached = apiCache.get(key)
  if (cached) return cached

  const data = await fetchFn()
  apiCache.set(key, data)
  return data
}

// Export all functions
export default {
  fetchAfricanCountries,
  fetchDiasporaCountries,
  fetchCountryByCode,
  searchWikipedia,
  getWikipediaSummary,
  fetchHistoricalFigures,
  fetchEthnicGroups,
  fetchMusicGenres,
  fetchAfricanFoods,
  fetchAfricanLanguages,
  universalSearch,
  fetchWithCache,
  apiCache,
}
