import styled from 'styled-components'
import {
  Header as AriaHeader,
  Input as AriaInput,
  Button as AriaButton,
  Table as AriaTable,
  Label as AriaLabel
} from 'react-aria-components'

const borderRadius = '4px'
const boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.2)'

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

export const Header = styled(AriaHeader)`
  margin-bottom: 2rem;
`

export const SearchInput = styled(AriaInput)`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ccc;
  border-radius: ${borderRadius};
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: ${boxShadow};
  }

  &::placeholder {
    color: #666;
  }
`

export const ViewToggle = styled(AriaButton)<{ $$isActive: boolean }>`
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border: 1px solid #ccc;
  border-radius: ${borderRadius};
  background-color: ${({ $$isActive }) => ($$isActive ? '#0066cc' : 'white')};
  color: ${({ $$isActive }) => ($$isActive ? 'white' : 'black')};
  cursor: pointer;

  &:hover {
    background-color: ${({ $$isActive }) => ($$isActive ? '#0052a3' : '#f0f0f0')};
  }
`

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: ${borderRadius};
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  p {
    margin: 0.25rem 0;
    color: #666;
  }
`

export const Table = styled(AriaTable)`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }

  th {
    background-color: #f5f5f5;
    font-weight: 600;
  }

  @media (max-width: 600px) {
    display: block;
    overflow-x: auto;
  }
`

export const SearchWrapper = styled.div`
  margin-bottom: 1rem;
`

export const Label = styled(AriaLabel)`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`
