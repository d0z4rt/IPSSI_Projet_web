fetch('data/bar.json')
  .then((response) => response.json())
  .then((data) => {
    const categories = ['cocktails', 'bieres', 'sodas', 'tapas']

    categories.forEach((category) => {
      const list = document.getElementById(`${category}-list`)

      if (list) {
        data[category].forEach((item) => {
          const div = document.createElement('div')
          div.className = 'item'
          div.innerHTML = `
            <div class="item-header">
              <span class="item-price">${item.prix}</span>
              <p class="item-name">${item.nom}</p>
            </div>
            <p class="item-description">${item.description || ''}</p>
          `
          list.appendChild(div)
        })
      }
    })
  })
  .catch((error) => console.error('Erreur lors du chargement du menu:', error))
