document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-bar');
  const filterSelect = document.getElementById('filter');
  const concerts = document.querySelectorAll('.concert-card');
  const loadMoreBtn = document.getElementById('load-more');

  let visibleConcerts = 4;

  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    concerts.forEach((concert, index) => {
      const title = concert.querySelector('h3').textContent.toLowerCase();
      concert.style.display = title.includes(searchValue) ? 'block' : 'none';
      if (index >= visibleConcerts && title.includes(searchValue)) {
        concert.style.display = 'none';
      }
    });
  });

  filterSelect.addEventListener('change', () => {
    const filterValue = filterSelect.value;
    concerts.forEach((concert, index) => {
      if (filterValue === 'all' || concert.dataset.category === filterValue) {
        concert.style.display = index < visibleConcerts ? 'block' : 'none';
      } else {
        concert.style.display = 'none';
      }
    });
  });


  loadMoreBtn.addEventListener('click', () => {
    visibleConcerts += 4;
    concerts.forEach((concert, index) => {
      if (index < visibleConcerts) {
        concert.style.display = 'block';
      }
    });

    if (visibleConcerts >= concerts.length) {
      loadMoreBtn.style.display = 'none';
    }
  });
});
