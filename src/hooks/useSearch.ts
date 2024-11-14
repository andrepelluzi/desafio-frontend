import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * Custom hook para lidar com os parâmetros de busca na URL.
 *
 * @returns Um objeto com as seguintes propriedades:
 * - `searchTerm`: o termo de busca atual a partir da URL.
 * - `updateSearchTerm`: uma função para atualizar o termo de busca na URL.
 *
 * A função `updateSearchTerm` atualiza o valor do parâmetro `busca` na URL
 * sem alterar ou remover outros parâmetros.
 */
export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchTerm = searchParams.get('busca') || ''

  const updateSearchTerm = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams)
      if (term) {
        params.set('busca', term)
      } else {
        params.delete('busca')
      }
      setSearchParams(params)
    },
    [searchParams, setSearchParams]
  )

  return {
    searchTerm,
    updateSearchTerm
  }
}
