import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserDisplay from '../src/components/UserDisplay'
import * as api from '../src/services/api'
import { mockUsers } from './mocks/users'
import { renderWithRouter } from './test-utils'

jest.mock('../src/services/api')
const mockedGetUsers = api.getUsers as jest.MockedFunction<typeof api.getUsers>

const renderUserDisplayWithSetup = async () => {
  renderWithRouter(<UserDisplay />);
  const user = userEvent.setup();
  await waitFor(() => {
    expect(screen.getByText('João Silva')).toBeInTheDocument();
  });
  return user;
};

describe('UserDisplay', () => {
  beforeEach(() => {
    mockedGetUsers.mockClear()
    mockedGetUsers.mockResolvedValue(mockUsers)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza o estado de carregamento inicialmente', async () => {
    renderWithRouter(<UserDisplay />);

    await waitFor(() => {
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });
  });

  it('renderiza os dados dos usuários após o carregamento', async () => {
    await renderUserDisplayWithSetup();

    expect(screen.getByText(/maria@exemplo.com/)).toBeInTheDocument();
  });

  it('alterna entre visualização de card e tabela', async () => {
    const user = await renderUserDisplayWithSetup();

    await user.click(
      screen.getByRole('button', { name: 'Visualização em Tabela' })
    );
    expect(screen.getByRole('grid')).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Visualização em Card' })
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('filtra usuários com base no termo de busca', async () => {
    const user = await renderUserDisplayWithSetup();

    const searchInput = screen.getByLabelText('Buscar usuários')
    await user.type(searchInput, 'Maria')

    await waitFor(() => {
      expect(screen.queryByText('João Silva')).not.toBeInTheDocument()
      expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    });

    await user.clear(searchInput)
  });

  it('persiste/remove o termo de busca na URL ', async () => {
    const user = await renderUserDisplayWithSetup();

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'Maria')

    await waitFor(() => {
      expect(new URLSearchParams(window.location.search).get('busca')).toBe(
        'Maria'
      )
    });

    await user.clear(searchInput)

    await waitFor(() => {
      expect(new URLSearchParams(window.location.search).get('busca')).toBe(
        null
      )
    });
  });

  it('persiste o termo de busca na URL sem alterar outros parâmetros', async () => {
    window.history.pushState(
      {},
      '',
      `?outroParametro=valor`
    )

    const user = await renderUserDisplayWithSetup();

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'Maria')

    await waitFor(() => {
      expect(new URLSearchParams(window.location.search).get('busca')).toBe(
        'Maria'
      )
      expect(new URLSearchParams(window.location.search).get('outroParametro'))
        .toBe('valor')
    });

    await user.clear(searchInput)

    await waitFor(() => {
      expect(new URLSearchParams(window.location.search).get('busca')).toBe(
        null
      )
      expect(new URLSearchParams(window.location.search).get('outroParametro'))
        .toBe('valor')
    });
  });

  it('exibe mensagem de erro quando a API falha', async () => {
    const errorMessage = 'Erro ao carregar usuários';
    mockedGetUsers.mockRejectedValueOnce(new Error(errorMessage));

    renderWithRouter(<UserDisplay />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
    });
  });
})
