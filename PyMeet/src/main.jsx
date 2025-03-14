import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx';
import { ThemeProvider } from './Context/ThemeContext.jsx';
import { UserProvider } from './Context/userContext.jsx';
import { CommentProvider } from './Context/commentContext.jsx';
import ErrorBoundary from './Pages/ErrorPages/ErrorBoundary.jsx';
import { ChatProvider } from './Context/chatContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <AuthProvider>
        <ThemeProvider>
            <CommentProvider>
              <ErrorBoundary>
                <ChatProvider>                    
                  <App />
                </ChatProvider>
              </ErrorBoundary>
            </CommentProvider >
        </ThemeProvider>
      </AuthProvider>
    </UserProvider>
  </StrictMode>
)
