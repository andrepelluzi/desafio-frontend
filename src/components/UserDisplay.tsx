import type React from 'react'
import { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'

import {
  Card,
  CardGrid,
  Container,
  Header,
  Label,
  SearchInput,
  SearchWrapper,
  ViewToggle
} from './styled/StyledComponents'
import { UsersTable } from './UsersTable'
import { useUsers } from '../hooks/useUsers'
import { useSearch } from '../hooks/useSearch'
import type { User } from '../types/User'

const UserDisplay: React.FC = () => {
  const { searchTerm, updateSearchTerm } = useSearch()
  const [viewType, setViewType] = useState<'card' | 'table'>('card')
  const { users, loading, error } = useUsers(searchTerm)

  if (loading) return <Container>Carregando...</Container>
  if (error) return <Container>{error}</Container>

  return (
    <Container>
      <Header>
        <h1>Diretório de Usuários</h1>
        <SearchWrapper>
          <Label htmlFor='search'>Buscar usuários</Label>
          <SearchInput
            id='search'
            type='search'
            value={searchTerm}
            onChange={(e) => updateSearchTerm(e.target.value)}
            placeholder='Digite para buscar...'
            aria-label='Buscar usuários'
          />
        </SearchWrapper>
        <div>
          <ViewToggle
            $$isActive={viewType === 'card'}
            onPress={() => setViewType('card')}
            aria-pressed={viewType === 'card'}
          >
            <LayoutGrid aria-label='Visualização em Card' />
          </ViewToggle>
          <ViewToggle
            $$isActive={viewType === 'table'}
            onPress={() => setViewType('table')}
            aria-pressed={viewType === 'table'}
          >
            <List aria-label='Visualização em Tabela' />
          </ViewToggle>
        </div>
      </Header>

      {viewType === 'card' ? (
        <CardGrid>
          {users.map((user: User) => (
            <Card key={user.id}>
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Telefone: {user.phone}</p>
            </Card>
          ))}
        </CardGrid>
      ) : (
        <UsersTable users={users} />
      )}
    </Container>
  )
}

export default UserDisplay
