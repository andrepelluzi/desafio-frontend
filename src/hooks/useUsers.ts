import { useState, useEffect, useMemo } from 'react'
import type { User } from '../types/User'
import { getUsers } from '../services/api'

/**
 * Custom hook personalizado para gerenciar a lista de usuários com suporte a busca.
 *
 * @param searchTerm O termo de busca usado para filtrar a lista de usuários.
 * @returns Um objeto contendo:
 * - `users`: Uma lista de usuários filtrados com base no termo de busca.
 * - `loading`: Um estado booleano indicando se os dados dos usuários ainda estão carregando.
 * - `error`: Uma mensagem de erro se ocorrer um problema ao buscar os usuários.
 */
export const useUsers = (searchTerm: string) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
        setLoading(false)
      } catch (err) {
        setError((err as Error).message)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, searchTerm])

  return { users: filteredUsers, loading, error }
}
