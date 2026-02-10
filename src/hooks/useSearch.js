import { useState, useEffect, useMemo, useCallback } from 'react'

import countriesData from '../data/countries.json'
import figuresData from '../data/figures.json'
import clansData from '../data/clans.json'
import cultureData from '../data/culture.json'

export function useSearch(query, filters = {}) {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const searchData = useCallback((searchQuery, activeFilters) => {
    if (!searchQuery || searchQuery.length < 2) {
      return []
    }

    const searchResults = []
    const lowerQuery = searchQuery.toLowerCase()
    const { type } = activeFilters

    // Search countries
    if (!type || type === 'all' || type === 'country') {
      countriesData.countries.forEach(country => {
        const matches = 
          country.name.toLowerCase().includes(lowerQuery) ||
          country.region.toLowerCase().includes(lowerQuery) ||
          country.capital?.toLowerCase().includes(lowerQuery) ||
          country.languages?.some(l => l.toLowerCase().includes(lowerQuery))

        if (matches) {
          searchResults.push({
            ...country,
            type: 'country',
            matchScore: country.name.toLowerCase().startsWith(lowerQuery) ? 2 : 1,
          })
        }
      })
    }

    // Search figures
    if (!type || type === 'all' || type === 'figure') {
      figuresData.figures.forEach(figure => {
        const matches = 
          figure.name.toLowerCase().includes(lowerQuery) ||
          figure.category.toLowerCase().includes(lowerQuery) ||
          figure.origin.toLowerCase().includes(lowerQuery)

        if (matches) {
          searchResults.push({
            ...figure,
            type: 'figure',
            matchScore: figure.name.toLowerCase().startsWith(lowerQuery) ? 2 : 1,
          })
        }
      })
    }

    // Search clans
    if (!type || type === 'all' || type === 'clan') {
      clansData.clans.forEach(clan => {
        const matches = 
          clan.name.toLowerCase().includes(lowerQuery) ||
          clan.country.toLowerCase().includes(lowerQuery) ||
          clan.language.toLowerCase().includes(lowerQuery) ||
          clan.commonSurnames?.some(s => s.toLowerCase().includes(lowerQuery))

        if (matches) {
          searchResults.push({
            ...clan,
            type: 'clan',
            matchScore: clan.name.toLowerCase().startsWith(lowerQuery) ? 2 : 1,
          })
        }
      })
    }

    // Search surnames
    if (!type || type === 'all' || type === 'surname') {
      clansData.surnames.forEach(surname => {
        if (surname.surname.toLowerCase().includes(lowerQuery)) {
          searchResults.push({
            ...surname,
            id: surname.surname.toLowerCase(),
            name: surname.surname,
            type: 'surname',
            matchScore: surname.surname.toLowerCase().startsWith(lowerQuery) ? 2 : 1,
          })
        }
      })
    }

    // Search music
    if (!type || type === 'all' || type === 'culture' || type === 'music') {
      cultureData.culture.music.forEach(genre => {
        const matches = 
          genre.name.toLowerCase().includes(lowerQuery) ||
          genre.origin.toLowerCase().includes(lowerQuery) ||
          genre.keyArtists?.some(a => a.toLowerCase().includes(lowerQuery))

        if (matches) {
          searchResults.push({
            ...genre,
            type: 'music',
            matchScore: genre.name.toLowerCase().startsWith(lowerQuery) ? 2 : 1,
          })
        }
      })
    }

    // Search food
    if (!type || type === 'all' || type === 'culture' || type === 'food') {
      cultureData.culture.food.forEach(food => {
        const matches = 
          food.name.toLowerCase().includes(lowerQuery) ||
          food.origin.toLowerCase().includes(lowerQuery)

        if (matches) {
          searchResults.push({
            ...food,
            type: 'food',
            matchScore: food.name.toLowerCase().startsWith(lowerQuery) ? 2 : 1,
          })
        }
      })
    }

    // Search languages
    if (!type || type === 'all' || type === 'culture' || type === 'language') {
      cultureData.culture.languages.forEach(lang => {
        if (lang.name.toLowerCase().includes(lowerQuery)) {
          searchResults.push({
            ...lang,
            type: 'language',
            matchScore: lang.name.toLowerCase().startsWith(lowerQuery) ? 2 : 1,
          })
        }
      })
    }

    // Sort by match score
    return searchResults.sort((a, b) => b.matchScore - a.matchScore)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    
    // Simulate async search (for future API integration)
    const timer = setTimeout(() => {
      const searchResults = searchData(query, filters)
      setResults(searchResults)
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [query, filters, searchData])

  return {
    results,
    isLoading,
    totalCount: results.length,
    hasResults: results.length > 0,
  }
}

export function useSearchSuggestions(query, limit = 8) {
  return useMemo(() => {
    if (!query || query.length < 2) {
      return []
    }

    const suggestions = []
    const lowerQuery = query.toLowerCase()

    // Quick search for suggestions
    countriesData.countries.slice(0, 20).forEach(country => {
      if (country.name.toLowerCase().includes(lowerQuery)) {
        suggestions.push({
          type: 'country',
          id: country.id,
          name: country.name,
          subtitle: country.region,
        })
      }
    })

    figuresData.figures.slice(0, 20).forEach(figure => {
      if (figure.name.toLowerCase().includes(lowerQuery)) {
        suggestions.push({
          type: 'figure',
          id: figure.id,
          name: figure.name,
          subtitle: figure.category,
        })
      }
    })

    clansData.clans.slice(0, 20).forEach(clan => {
      if (clan.name.toLowerCase().includes(lowerQuery)) {
        suggestions.push({
          type: 'clan',
          id: clan.id,
          name: clan.name,
          subtitle: clan.country,
        })
      }
    })

    return suggestions.slice(0, limit)
  }, [query, limit])
}

export default useSearch
