import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './utils/appStore.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <PersistGate persistor={persistor}><App /></PersistGate>
    // <App/>
    
  // </StrictMode>,
)
