fetch('/donnees/jeu.json')
  .then(response => response.json())
  .then(data => {
    const gameCard = data;

    const gameContainer = document.getElementById('cards');

    let card = '';

    gameCard.forEach((gameCard) => {
      card += `
      <div class="card">
        <img src="${gameCard.img}" alt="${gameCard.name}">
        <div class="card-content">
          <h3>${gameCard.name}</h3>
          <p>${gameCard.info}</p>
          <p>Tags: ${gameCard.tag.join(', ')}</p>
          <p>Durée: ${gameCard.time} Minutes</p>
        </div>
      </div>
      `;
    });

    gameContainer.innerHTML = card;
  });

