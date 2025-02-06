document.addEventListener('DOMContentLoaded', () => {
  // Chargement des données des concerts depuis le fichier JSON
  fetch('data/concert.json')
    .then((response) => response.json())
    .then((data) => {
      displayConcerts(data) // Affichage initial des concerts
      setupFilters(data) // Initialisation des filtres de recherche
    })
    .catch((error) =>
      console.error('Erreur de chargement des concerts:', error)
    ) // Gestion des erreurs
})

// Fonction pour afficher les concerts dans la liste
function displayConcerts(concerts) {
  const concertsList = document.getElementById('concerts-list')
  concertsList.innerHTML = '' // Réinitialisation de la liste

  concerts.forEach((concert) => {
    const concertCard = document.createElement('div')
    concertCard.className = 'concert-card'

    concertCard.innerHTML = `
      <img src="${concert.img}" alt="${concert.name}" class="concert-img">
      <div class="concert-info">
        <h3>${concert.name}</h3>
        <p>${concert.info}</p>
        <p><strong>${concert.date}</strong></p>
        <button class="btn-buy">Acheter des billets</button>
      </div>
    `

    concertsList.appendChild(concertCard) // Ajout de l'élément à la liste
  })
}

// Fonction pour gérer les filtres de recherche des concerts
function setupFilters(concerts) {
  const searchBar = document.getElementById('search')
  const filterDate = document.getElementById('filter-date')
  const filterGenre = document.getElementById('filter-genre')

  function filterConcerts() {
    const searchValue = searchBar.value.toLowerCase() // Valeur de recherche
    const selectedDate = filterDate.value.toLowerCase() // Date sélectionnée
    const selectedGenre = filterGenre.value.toLowerCase() // Genre sélectionné

    const filteredConcerts = concerts.filter((concert) => {
      const nameMatch = concert.name.toLowerCase().includes(searchValue) // Vérification du nom

      // Vérification de la correspondance de la date
      const concertDateMatch =
        concert.date.toLowerCase().includes(selectedDate) || selectedDate === ''

      // Vérification du genre
      const concertGenres = concert.tag.map((genre) => genre.toLowerCase())
      const genreMatch =
        concertGenres.includes(selectedGenre) || selectedGenre === ''

      return nameMatch && concertDateMatch && genreMatch // Retourne true si toutes les conditions sont remplies
    })

    displayConcerts(filteredConcerts) // Mise à jour de l'affichage avec les concerts filtrés
  }

  // Ajout des écouteurs d'événements sur les champs de filtrage
  searchBar.addEventListener('input', filterConcerts)
  filterDate.addEventListener('change', filterConcerts)
  filterGenre.addEventListener('change', filterConcerts)
}
