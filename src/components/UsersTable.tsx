import {
  TableHeader,
  TableBody,
  Row,
  Column,
  Cell
} from 'react-aria-components'
import { Table } from './styled/StyledComponents'
import type { User } from '../types/User'

interface UsersTableProps {
  users: User[]
}

/**
 * Componente que renderiza uma tabela com a lista de usuários.
 * Utiliza o componente `Table` de `react-aria-components`
 *
 * @param {{ users: User[] }} props
 * @prop {User[]} users - A lista de usuários a serem renderizados.
 * @returns {JSX.Element}
 */
export const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <Table aria-label='Users table' className='w-full border-collapse'>
      <TableHeader>
        <Column isRowHeader>Nome</Column>
        <Column>Email</Column>
        <Column>Telefone</Column>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <Row key={user.id}>
            <Cell>{user.name}</Cell>
            <Cell>{user.email}</Cell>
            <Cell>{user.phone}</Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  )
}
