import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Init from './Init';


const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const queryClient = new QueryClient()

function App() {
  
  return (
    <AuthProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Init />
      </QueryClientProvider>
     </AuthProvider>
  )
}

export default App
