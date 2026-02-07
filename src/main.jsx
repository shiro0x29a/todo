import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import LangProvider from './context/LangContext'
import { FilterProvider } from './context/FilterContext'
import { SortProvider } from './context/SortContext'
import { DeletePopupProvider } from './context/DeletePopupContext'
import App from './App.jsx'
import './index.css'

function composeProviders(...providers) {
  return ({ children }) => 
    providers.reduce(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    )
}

export const AllProviders = composeProviders(
  AuthProvider,
  LangProvider,
  FilterProvider,
  SortProvider,
  DeletePopupProvider
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AllProviders>
        <App />
    </AllProviders>
  </BrowserRouter>
)
