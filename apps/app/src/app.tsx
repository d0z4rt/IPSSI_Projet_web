import { Link, Meta, MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import './app.css'
import Cookies from './components/Cookies'
import Footer from './components/Footer'
import Header from './components/Header'
import AuthProvider from './contexts/auth.context'

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <AuthProvider>
            <Title>Le Carré d'As</Title>
            <Meta
              name="description"
              content={
                'Un spot unique où jeux de société et concerts live se rencontrent dans une ambiance électrique. Que tu sois là pour défier tes potes autour d’un plateau ou te laisser porter par des vibes musicales endiablées, chaque soirée ici est une nouvelle expérience. Entre décor stylé, énergie conviviale et moments inoubliables, c’est l’endroit parfait pour chiller, jouer et vibrer.'
              }
            />
            <Meta
              name="twitter:card"
              content="summary_large_image"
              data-sm=""
            />
            <Meta name="twitter:site" content="@lecarredas" data-sm="" />
            <Meta name="twitter:title" content="Le Carré d'As" data-sm="" />
            <Meta name="twitter:image:src" content=" !TODO" data-sm="" />
            <Meta
              name="twitter:description"
              content="Un spot unique où jeux de société et concerts live se rencontrent dans une ambiance électrique. Que tu sois là pour défier tes potes autour d’un plateau ou te laisser porter par des vibes musicales endiablées, chaque soirée ici est une nouvelle expérience. Entre décor stylé, énergie conviviale et moments inoubliables, c’est l’endroit parfait pour chiller, jouer et vibrer."
              data-sm=""
            />

            <Meta property="og:type" content="website" data-sm="" />
            <Meta property="og:site_name" content="Le Carré d'As" data-sm="" />
            <Meta property="og:title" content="Le Carré d'As" data-sm="" />
            <Meta
              property="og:description"
              content="Un spot unique où jeux de société et concerts live se rencontrent dans une ambiance électrique. Que tu sois là pour défier tes potes autour d’un plateau ou te laisser porter par des vibes musicales endiablées, chaque soirée ici est une nouvelle expérience. Entre décor stylé, énergie conviviale et moments inoubliables, c’est l’endroit parfait pour chiller, jouer et vibrer."
              data-sm=""
            />
            <Meta property="og:image" content=" !TODO" data-sm="" />
            <Meta property="og:image:alt" content="Le Carré d'As" data-sm="" />
            <Meta property="og:image:width" content="1200" data-sm="" />
            <Meta property="og:image:height" content="600" data-sm="" />
            <Meta property="og:url" content="/" data-sm="" />

            <Link rel="canonical" href={'/'} data-sm="" />
            <Header />
            <Suspense>{props.children}</Suspense>
            <Cookies />
            <Footer />
          </AuthProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
