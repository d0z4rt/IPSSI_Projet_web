document.addEventListener('DOMContentLoaded', () => {
  fetch('data/concert.json')
    .then(response => response.json())
    .then(data => {
      displayConcerts(data);
      setupFilters(data);
    })
    .catch(error => console.error('Erreur de chargement des concerts:', error));
});

function displayConcerts(concerts) {
  const concertsList = document.getElementById('concerts-list');
  concertsList.innerHTML = '';

  concerts.forEach(concert => {
    const concertCard = document.createElement('div');
    concertCard.className = 'concert-card';

    concertCard.innerHTML = `
      <img src="${concert.img}" alt="${concert.name}" class="concert-img">
      <div class="concert-info">
        <h3>${concert.name}</h3>
        <p>${concert.info}</p>
        <p><strong>${concert.date}</strong></p>
        <button class="btn-buy">Acheter des billets</button>
      </div>
    `;

    concertsList.appendChild(concertCard);
  });
}

function setupFilters(concerts) {
  const searchBar = document.getElementById('search');
  const filterDate = document.getElementById('filter-date');
  const filterGenre = document.getElementById('filter-genre');

  function filterConcerts() {
    const searchValue = searchBar.value.toLowerCase();
    const selectedDate = filterDate.value.toLowerCase();
    const selectedGenre = filterGenre.value.toLowerCase();

    const filteredConcerts = concerts.filter(concert => {
      const nameMatch = concert.name.toLowerCase().includes(searchValue);

      // Extraction de la date (mois année)
      const concertDateMatch = concert.date.toLowerCase().includes(selectedDate) || selectedDate === "";

      // Vérification du genre
      const concertGenres = concert.tag.map(genre => genre.toLowerCase());
      const genreMatch = concertGenres.includes(selectedGenre) || selectedGenre === "";

      return nameMatch && concertDateMatch && genreMatch;
    });

    displayConcerts(filteredConcerts);
  }

  searchBar.addEventListener('input', filterConcerts);
  filterDate.addEventListener('change', filterConcerts);
  filterGenre.addEventListener('change', filterConcerts);
}