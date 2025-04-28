import { ConfigProvider } from 'antd';
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
        <ConfigProvider
          theme={{
            components: {
              Button:{
                colorPrimary: 'brown',
                colorPrimaryHover: '#b5651d',
                colorPrimaryActive: '#b5651d',
                colorPrimaryBorder: '#b5651d',
                colorPrimaryBorderHover: '#b5651d',
                colorPrimaryTextHover: '#fff',
                colorPrimaryTextActive: '#fff',
                colorPrimaryText: '#fff',
                borderRadius: 2,
              },
              Radio:{
                colorPrimary: 'brown',
                colorPrimaryHover: '#b5651d',
                colorPrimaryActive: 'brown',
              },
              Switch: {
                colorPrimary: 'brown',
              },
              Spin: {
                colorPrimary: 'brown',
              },
              Input: {
                colorPrimary: 'brown',
                colorPrimaryHover: '#b5651d',
                colorPrimaryActive: 'brown',
              },
              Select: {
                colorPrimary: 'brown',
                colorPrimaryHover: '#b5651d',
                colorPrimaryActive: 'brown',
              },
              DatePicker: {
                colorPrimary: 'brown',
                colorPrimaryHover: '#b5651d',
                colorPrimaryActive: 'brown',
              },
              Menu: {
                colorPrimary: 'brown',
                colorPrimaryHover: '#b5651d',
                colorPrimaryActive: 'brown',
              },
              Checkbox: {
                colorPrimary: 'brown',
                colorPrimaryHover: '#b5651d',
                colorPrimaryActive: 'brown',
              },
              Table: {
                colorPrimary: 'brown',
                colorPrimaryHover: '#b5651d',
                colorPrimaryActive: 'brown',
              }
            }
          }}
        >
          <Init />
        </ConfigProvider>
      </QueryClientProvider>
     </AuthProvider>
  )
}

export default App
