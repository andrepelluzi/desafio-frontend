import type { User } from '../types/User'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * Busca a lista de usuários na API.
 *
 * @returns Uma promisse que quando resolvida retorna a lista de usuários.
 * @throws {Error} Caso ocorra algum erro ao buscar os usuários.
 */
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) {
      throw new Error('Falha ao buscar usuários')
    }
    return response.json()
  } catch (error) {
    throw new Error('Erro ao carregar usuários')
  }
}
