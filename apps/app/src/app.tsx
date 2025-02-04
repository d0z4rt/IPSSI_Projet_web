import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import './app.css'
import Footer from './components/Footer'
import Header from './components/Header'
import AuthProvider from './contexts/auth.context'

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <AuthProvider>
            <Title>SolidStart - Basic</Title>
            <Header />
            <Suspense>{props.children}</Suspense>
            <Footer />
          </AuthProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
