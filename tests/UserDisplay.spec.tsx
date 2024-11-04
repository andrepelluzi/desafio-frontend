import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserDisplay from '../src/components/UserDisplay'
import * as api from '../src/services/api'
import { mockUsers } from './mocks/users'
import { renderWithRouter } from './test-utils'

jest.mock('../src/services/api')
const mockedGetUsers = api.getUsers as jest.MockedFunction<typeof api.getUsers>

describe('UserDisplay', () => {
  beforeEach(() => {
    mockedGetUsers.mockClear()
    mockedGetUsers.mockResolvedValue(mockUsers)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza o estado de carregamento inicialmente', () => {
    renderWithRouter(<UserDisplay />)

    waitFor(() => {
      expect(screen.getByText('Carregando...')).toBeInTheDocument()
    })
  })

  it('renderiza os dados dos usuários após o carregamento', async () => {
    renderWithRouter(<UserDisplay />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
      expect(screen.getByText(/maria@exemplo.com/)).toBeInTheDocument()
    })
  })

  it('alterna entre visualização de card e tabela', async () => {
    renderWithRouter(<UserDisplay />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    await userEvent.click(
      screen.getByRole('button', { name: 'Visualização em Tabela' })
    )
    expect(screen.getByRole('grid')).toBeInTheDocument()

    await userEvent.click(
      screen.getByRole('button', { name: 'Visualização em Card' })
    )
    expect(screen.queryByRole('grid')).not.toBeInTheDocument()
  })

  it('filtra usuários com base no termo de busca', async () => {
    const user = userEvent.setup()
    renderWithRouter(<UserDisplay />)

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument()
    })

    const searchInput = screen.getByLabelText('Buscar usuários')
    await user.type(searchInput, 'Maria')

    await waitFor(() => {
      expect(screen.queryByText('João Silva')).not.toBeInTheDocument()
      expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    })

    await user.clear(searchInput)
  })

  it('persiste o termo de busca na URL', async () => {
    const user = userEvent.setup()
    renderWithRouter(<UserDisplay />)

    await waitFor(() => {
      expect(screen.getByRole('searchbox')).toBeInTheDocument()
    })

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'Maria')

    await waitFor(() => {
      expect(new URLSearchParams(window.location.search).get('busca')).toBe(
        'Maria'
      )
    })
  })

  it('exibe mensagem de erro quando a API falha', async () => {
    const errorMessage = 'Erro ao carregar usuários'
    mockedGetUsers.mockRejectedValueOnce(new Error(errorMessage))

    renderWithRouter(<UserDisplay />)

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })
})
