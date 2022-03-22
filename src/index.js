import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppProvider } from './context'

ReactDOM.render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>,
    document.getElementById('root')
)
