import { Show, createSignal, onMount } from 'solid-js'
import styles from './style.module.css'

// Composant de gestion des cookies
const Cookies = () => {
  // États pour gérer l'affichage de la bannière et les préférences de cookies
  const [showBanner, setShowBanner] = createSignal(true) // Indique si la bannière doit être affichée
  const [analyticsChecked, setAnalyticsChecked] = createSignal(false) // Stocke la préférence pour les cookies analytiques
  const [adsChecked, setAdsChecked] = createSignal(false) // Stocke la préférence pour les cookies publicitaires

  // Exécution au montage du composant pour récupérer les préférences utilisateur stockées
  onMount(() => {
    setShowBanner(!localStorage.getItem('cookiesAccepted')) // Vérifie si l'utilisateur a déjà accepté/refusé les cookies
    setAnalyticsChecked(localStorage.getItem('analyticsCookies') === 'true') // Récupère la préférence des cookies analytiques
    setAdsChecked(localStorage.getItem('adsCookies') === 'true') // Récupère la préférence des cookies publicitaires
  })

  // Fonction pour accepter tous les cookies
  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true') // Stocke l'acceptation des cookies
    setShowBanner(false) // Masque la bannière
  }

  // Fonction pour refuser tous les cookies
  const handleReject = () => {
    localStorage.setItem('cookiesAccepted', 'false') // Stocke le refus des cookies
    setShowBanner(false) // Masque la bannière
  }

  // Fonction pour enregistrer les préférences utilisateur
  const handlePreferences = () => {
    localStorage.setItem('analyticsCookies', `${analyticsChecked()}`) // Stocke la préférence pour les cookies analytiques
    localStorage.setItem('adsCookies', `${adsChecked()}`) // Stocke la préférence pour les cookies publicitaires
  }

  return (
    <Show when={showBanner()}>
      {/* Bannière des cookies */}
      <div id={styles['cookie-banner']} class={styles['cookie-banner']}>
        <h2>Nous respectons votre vie privée</h2>
        <p>
          En cliquant sur <strong>Accepter tous les cookies</strong>, vous
          consentez à l'utilisation de cookies pour améliorer la navigation,
          analyser l'utilisation du site et assister nos efforts marketing.
        </p>

        {/* Boutons d'acceptation/refus des cookies */}
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

        {/* Section pour gérer les préférences de cookies */}
        <div
          id={styles['cookie-preferences']}
          class={styles['cookie-preferences']}
        >
          <h2>Gérer vos préférences de cookies</h2>
          <form id={styles['preferences-form']}>
            {/* Checkbox pour les cookies analytiques */}
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
            {/* Checkbox pour les cookies publicitaires */}
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
            {/* Checkbox désactivée pour les cookies essentiels */}
            <label>
              <input type="checkbox" name="essential" checked disabled />{' '}
              Cookies essentiels (obligatoires)
            </label>
            <br />
            {/* Bouton pour enregistrer les préférences */}
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
