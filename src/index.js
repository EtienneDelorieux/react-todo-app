// React
import React from 'react'
import ReactDOM from 'react-dom'

// Components
import App from './components/App/App'

// Libraries
import { BrowserRouter } from "react-router-dom"

// CSS
import './stylesheets/index.css'

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
