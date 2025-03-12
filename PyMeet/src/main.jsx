import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx';
import { ThemeProvider } from './Context/ThemeContext.jsx';
import { UserProvider } from './Context/userContext.jsx';
import { PostProvider } from './Context/postContext.jsx';
import { CommentProvider } from './Context/commentContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <AuthProvider>
        <ThemeProvider>
          <PostProvider>
            <CommentProvider>
              <App />
            </CommentProvider >  
          </PostProvider>
        </ThemeProvider>
      </AuthProvider>
    </UserProvider>
  </StrictMode>
)
