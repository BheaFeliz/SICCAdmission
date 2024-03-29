import '@/app/globals.css'

import { Provider } from 'react-redux'

import RootLayout from '@/app/layout'
import Theme from '@/app/theme'
import RouteGuard from '@/components/templates/RouteGuard'
import ToastProvider from '@/components/templates/ToastProvider'
import { store } from '@/hooks/store'

export const metadata = {
  title: 'PCBee ',
  description: 'Ordering Parts System',
}

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <RouteGuard>
        <RootLayout>
          <Theme>
            <ToastProvider>
              <Component {...pageProps} />
            </ToastProvider>
          </Theme>
        </RootLayout>
      </RouteGuard>
    </Provider>
  )
}

export default App
