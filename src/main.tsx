import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Authenticator from './components/Authenticator.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>,
)
