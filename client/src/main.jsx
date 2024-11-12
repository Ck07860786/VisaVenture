import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/auth.jsx'
import { UserAuthProvider } from './context/userAuth.jsx'

createRoot(document.getElementById('root')).render(
    <UserAuthProvider>
<AuthProvider>
<BrowserRouter>
    <App />
    </BrowserRouter>
</AuthProvider>
</UserAuthProvider>
   
 
)




