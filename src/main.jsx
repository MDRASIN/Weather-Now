import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'   // ✅ This line is IMPORTANT
import './style.css'       // optional, can be here or inside App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
