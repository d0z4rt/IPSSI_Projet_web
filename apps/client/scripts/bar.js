fetch('data/bar.json')
  .then((response) => response.json()) // Récupération des données JSON depuis le fichier
  .then((data) => {
    const categories = ['cocktails', 'bieres', 'sodas', 'tapas'] // Liste des catégories disponibles

    categories.forEach((category) => {
      const list = document.getElementById(`${category}-list`) // Sélection de l'élément correspondant à la catégorie

      if (list) {
        data[category].forEach((item) => {
          const div = document.createElement('div') // Création d'un élément div pour chaque item
          div.className = 'item' // Attribution d'une classe CSS
          div.innerHTML = `
            <div class="item-header">
              <span class="item-price">${item.prix}</span>
              <p class="item-name">${item.nom}</p>
            </div>
            <p class="item-description">${item.description || ''}</p>
          `
          list.appendChild(div) // Ajout de l'élément à la liste correspondante
        })
      }
    })
  })
  .catch((error) => console.error('Erreur lors du chargement du menu:', error)) // Gestion des erreurs en cas d'échec de chargement
