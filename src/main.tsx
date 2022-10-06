import 'core-js/es/map'
import 'core-js/es/set'

import React from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@store/index'
import App from './App'

import '@css/main.less'


declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { aptos: any }
}

const root = createRoot((document.getElementById('root') as Element))

window.addEventListener("load", () => {
  root.render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  )
})