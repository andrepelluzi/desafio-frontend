import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import UserDisplay from './components/UserDisplay'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Roboto, sans-serif;
    background-color: #f5f5f5;
  }
`

function App() {
  return (
    <Router>
      <GlobalStyle />
      <UserDisplay />
    </Router>
  )
}

export default App
