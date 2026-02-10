import { useState, useEffect, useCallback } from 'react'
import {
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
} from '../services/api'

/**
 * Generic hook for API calls with loading and error states
 */
export function useApiCall(fetchFn, dependencies = [], immediate = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchFn(...args)
      setData(result)
      return result
    } catch (err) {
      setError(err.message || 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate, ...dependencies])

  return { data, loading, error, execute, refetch: execute }
}

/**
 * Hook for fetching African countries
 */
export function useAfricanCountries() {
  return useApiCall(
    () => fetchWithCache('african-countries', fetchAfricanCountries),
    [],
    true
  )
}

/**
 * Hook for fetching diaspora countries
 */
export function useDiasporaCountries() {
  return useApiCall(
    () => fetchWithCache('diaspora-countries', fetchDiasporaCountries),
    [],
    true
  )
}

/**
 * Hook for fetching all countries (African + Diaspora)
 */
export function useAllCountries() {
  const [data, setData] = useState({ african: [], diaspora: [], all: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      try {
        const [african, diaspora] = await Promise.all([
          fetchWithCache('african-countries', fetchAfricanCountries),
          fetchWithCache('diaspora-countries', fetchDiasporaCountries),
        ])
        setData({
          african: african || [],
          diaspora: diaspora || [],
          all: [...(african || []), ...(diaspora || [])]
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return { data, loading, error }
}

/**
 * Hook for fetching a single country by code
 */
export function useCountry(code) {
  return useApiCall(
    () => fetchWithCache(`country-${code}`, () => fetchCountryByCode(code)),
    [code],
    !!code
  )
}

/**
 * Hook for Wikipedia search
 */
export function useWikipediaSearch(query, limit = 10) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setData([])
      return
    }
    
    setLoading(true)
    setError(null)
    try {
      const results = await searchWikipedia(searchQuery, limit)
      setData(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) search(query)
    }, 300) // Debounce

    return () => clearTimeout(timer)
  }, [query, search])

  return { data, loading, error, search }
}

/**
 * Hook for Wikipedia summary
 */
export function useWikipediaSummary(title) {
  return useApiCall(
    () => fetchWithCache(`wiki-summary-${title}`, () => getWikipediaSummary(title)),
    [title],
    !!title
  )
}

/**
 * Hook for fetching historical figures by category
 */
export function useHistoricalFigures(category, limit = 20) {
  return useApiCall(
    () => fetchWithCache(`figures-${category}`, () => fetchHistoricalFigures(category, limit)),
    [category, limit],
    !!category
  )
}

/**
 * Hook for fetching ethnic groups
 */
export function useEthnicGroups(limit = 50) {
  return useApiCall(
    () => fetchWithCache('ethnic-groups', () => fetchEthnicGroups(limit)),
    [limit],
    true
  )
}

/**
 * Hook for fetching music genres
 */
export function useMusicGenres() {
  return useApiCall(
    () => fetchWithCache('music-genres', fetchMusicGenres),
    [],
    true
  )
}

/**
 * Hook for fetching African foods
 */
export function useAfricanFoods() {
  return useApiCall(
    () => fetchWithCache('african-foods', fetchAfricanFoods),
    [],
    true
  )
}

/**
 * Hook for fetching African languages
 */
export function useAfricanLanguages() {
  return useApiCall(
    () => fetchWithCache('african-languages', fetchAfricanLanguages),
    [],
    true
  )
}

/**
 * Hook for universal search
 */
export function useUniversalSearch(query) {
  const [data, setData] = useState({ countries: [], figures: [], ethnicGroups: [], culture: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setData({ countries: [], figures: [], ethnicGroups: [], culture: [] })
      return
    }
    
    setLoading(true)
    setError(null)
    try {
      const results = await universalSearch(searchQuery)
      setData(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) search(query)
    }, 300) // Debounce

    return () => clearTimeout(timer)
  }, [query, search])

  return { data, loading, error, search }
}

/**
 * Hook for loading all culture data
 */
export function useCultureData() {
  const [data, setData] = useState({ music: [], food: [], languages: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      try {
        const [music, food, languages] = await Promise.all([
          fetchWithCache('music-genres', fetchMusicGenres),
          fetchWithCache('african-foods', fetchAfricanFoods),
          fetchWithCache('african-languages', fetchAfricanLanguages),
        ])
        setData({
          music: music || [],
          food: food || [],
          languages: languages || []
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return { data, loading, error }
}

export default {
  useApiCall,
  useAfricanCountries,
  useDiasporaCountries,
  useAllCountries,
  useCountry,
  useWikipediaSearch,
  useWikipediaSummary,
  useHistoricalFigures,
  useEthnicGroups,
  useMusicGenres,
  useAfricanFoods,
  useAfricanLanguages,
  useUniversalSearch,
  useCultureData,
}
