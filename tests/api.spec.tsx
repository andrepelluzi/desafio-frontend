import fetchMock from 'jest-fetch-mock'
import { mockUsers } from './mocks/users'
import { getUsers } from '../src/services/api'

fetchMock.enableMocks()

beforeEach(() => {
  fetchMock.resetMocks()
})

describe('getUsers', () => {
  it('should fetch users successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockUsers))

    const users = await getUsers()

    expect(users).toEqual(mockUsers)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users'
    )
  })

  it('should throw an error when the response is not ok', async () => {
    fetchMock.mockResponseOnce('', { status: 404 })

    await expect(getUsers()).rejects.toThrow('Erro ao carregar usuários')
    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users'
    )
  })
})
