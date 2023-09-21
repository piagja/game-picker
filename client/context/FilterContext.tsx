'use client'

import React, { createContext, useContext, useState } from 'react'

interface ChildrenNode {
  children: React.ReactNode
}

interface IFilters {
  selectedFilters: {
    platform: string[]
    genre: string[]
    rating: {
      min: string
      max: string
      followers: string
    }
  }
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{
      platform: string[]
      genre: string[]
      rating: {
        min: string
        max: string
        followers: string
      }
    }>
  >
}

const FilterContext = createContext<IFilters | undefined>(undefined)

export const useFilters = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}

export const FilterProvider = ({ children }: ChildrenNode) => {
  const [selectedFilters, setSelectedFilters] = useState({
    platform: [] as string[],
    genre: [] as string[],
    rating: {
      min: '',
      max: '',
      followers: ''
    }
  })

  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

// Object literal may only specify known properties, and 'selectedFilters' does not exist in type '{ platform: never[]; genre: never[]; rating: { min: string; max: string; followers: string; }; }'.ts(2353)
// index.d.ts(364, 9): The expected type comes from property 'value' which is declared here on type 'IntrinsicAttributes & ProviderProps<{ platform: never[]; genre: never[]; rating: { min: string; max: string; followers: string; }; }>'
// (property) selectedFilters: {
//     platform: never[];
//     genre: never[];
//     rating: {
//         min: string;
//         max: string;
//         followers: string;
//     };
// }
