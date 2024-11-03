import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * Custom hook para lidar com os parâmetros de busca na URL.
 *
 * @returns Um objeto com as seguintes propriedades:
 * - `searchTerm`: o termo de busca atual a partir da URL.
 * - `updateSearchTerm`: uma função para atualizar o termo de busca na URL.
 */
export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('busca') || ''

  const updateSearchTerm = useCallback(
    (term: string) => {
      setSearchParams({ busca: term })
    },
    [setSearchParams]
  )

  return {
    searchTerm,
    updateSearchTerm
  }
}
