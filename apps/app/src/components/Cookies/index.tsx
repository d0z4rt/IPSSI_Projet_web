import { Show, createSignal, onMount } from 'solid-js'
import styles from './style.module.css'

const Cookies = () => {
  const [showBanner, setShowBanner] = createSignal(true)
  const [analyticsChecked, setAnalyticsChecked] = createSignal(false)
  const [adsChecked, setAdsChecked] = createSignal(false)

  onMount(() => {
    setShowBanner(!localStorage.getItem('cookiesAccepted'))
    setAnalyticsChecked(localStorage.getItem('analyticsCookies') === 'true')

    setAdsChecked(localStorage.getItem('adsCookies') === 'true')
  })

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookiesAccepted', 'false')
    setShowBanner(false)
  }

  const handlePreferences = () => {
    localStorage.setItem('analyticsCookies', `${analyticsChecked()}`)
    localStorage.setItem('adsCookies', `${adsChecked()}`)
  }

  return (
    <Show when={showBanner()}>
      <div id={styles['cookie-banner']} class={styles['cookie-banner']}>
        <h2>Nous respectons votre vie privée</h2>
        <p>
          En cliquant sur <strong>Accepter tous les cookies</strong>, vous
          consentez à l'utilisation de cookies pour améliorer la navigation,
          analyser l'utilisation du site et assister nos efforts marketing.
        </p>

        <div class={styles['cookie-buttons']}>
          <button
            type="button"
            id={styles['accept-all']}
            onClick={handleAccept}
          >
            Accepter tous les cookies
          </button>
          <button
            type="button"
            id={styles['reject-all']}
            onClick={handleReject}
          >
            Refuser tous les cookies
          </button>
        </div>

        <div
          id={styles['cookie-preferences']}
          class={styles['cookie-preferences']}
        >
          <h2>Gérer vos préférences de cookies</h2>
          <form id={styles['preferences-form']}>
            <label>
              <input
                type="checkbox"
                name="analytics"
                checked={analyticsChecked()}
                onChange={(e) => setAnalyticsChecked(e.currentTarget.checked)}
              />{' '}
              Cookies d'analyse
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="ads"
                checked={adsChecked()}
                onChange={(e) => setAdsChecked(e.currentTarget.checked)}
              />{' '}
              Cookies publicitaires
            </label>
            <br />
            <label>
              <input type="checkbox" name="essential" checked disabled />{' '}
              Cookies essentiels (obligatoires)
            </label>
            <br />
            <button
              type="button"
              id={styles['save-preferences']}
              onClick={handlePreferences}
            >
              Enregistrer mes préférences
            </button>
          </form>
        </div>
      </div>
    </Show>
  )
}

export default Cookies
