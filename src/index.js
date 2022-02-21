import React from 'react'
import ReactDOM from 'react-dom'
import { StrictMode } from 'react/cjs/react.production.min'
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
