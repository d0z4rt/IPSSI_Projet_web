document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner')

  // Vérifie si l'utilisateur a déjà accepté ou refusé les cookies
  if (!localStorage.getItem('cookiesAccepted')) {
    banner.style.display = 'block' // Affiche la bannière si aucune décision n'a été prise
  }

  // Gestion du bouton d'acceptation de tous les cookies
  document.getElementById('accept-all').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true') // Stocke l'acceptation des cookies
    banner.style.display = 'none' // Cache la bannière après acceptation
  })

  // Gestion du bouton de refus de tous les cookies
  document.getElementById('reject-all').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'false') // Stocke le refus des cookies
    banner.style.display = 'none' // Cache la bannière après refus
  })

  // Gestion du bouton d'enregistrement des préférences utilisateur
  document.getElementById('save-preferences').addEventListener('click', () => {
    const analytics = document.querySelector('input[name="analytics"]').checked // Récupère la préférence pour les cookies analytiques
    const ads = document.querySelector('input[name="ads"]').checked // Récupère la préférence pour les cookies publicitaires

    localStorage.setItem('analyticsCookies', analytics) // Stocke la préférence des cookies analytiques
    localStorage.setItem('adsCookies', ads) // Stocke la préférence des cookies publicitaires
    banner.style.display = 'none' // Cache la bannière après enregistrement des préférences
  })
})
