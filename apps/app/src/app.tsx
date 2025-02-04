import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import './app.css'
import AuthProvider from './contexts/auth.context'

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <AuthProvider>
            <Title>SolidStart - Basic</Title>
            <a href="/">Index</a>
            <a href="/about">About</a>
            <a href="/login">Login/register</a>
            <Suspense>{props.children}</Suspense>
          </AuthProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
