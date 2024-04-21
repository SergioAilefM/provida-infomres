import React from 'react'
import { render } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'

import { queryClient } from '@services/reactQuery/queryClient'
import { AppContextProvider } from '@storage/context/AppContextProvider'
import { AdobeContextProvider } from '@storage/context/AdobeContextProvider'
import reportWebVitals from './reportWebVitals'

import App from './App'

render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient()}>
            <BrowserRouter basename="/">
                <AppContextProvider>
                    <AdobeContextProvider>
                        <App />
                    </AdobeContextProvider>
                </AppContextProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
reportWebVitals(console.info)
