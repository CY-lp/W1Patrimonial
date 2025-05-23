import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="462743810903-oe96dii55d4lv3cikfjkihsjlaauu5vk.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);