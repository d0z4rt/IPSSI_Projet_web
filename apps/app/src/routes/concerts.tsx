import { For, ParentComponent, createSignal } from 'solid-js'
import Button from '../components/Button'
import Card from '../components/Card'
import FormInput from '../components/FormInput'
import { concerts } from '../data/concert'
import styles from './concerts.module.css'

// Composant affichant la liste des concerts avec des filtres de recherche
const Concerts: ParentComponent = (props) => {
  // États pour gérer les filtres
  const [searchValue, setSearchValue] = createSignal('') // Stocke le terme de recherche saisi par l'utilisateur
  const [selectedDate, setSelectedDate] = createSignal('') // Stocke la date sélectionnée
  const [selectedGenre, setSelectedGenre] = createSignal('') // Stocke le genre musical sélectionné

  // Fonction retournant la liste des concerts filtrés
  const filteredConcerts = () =>
    concerts.filter((concert) => {
      const nameMatch = concert.name.toLowerCase().includes(searchValue()) // Vérifie si le nom du concert contient le terme recherché

      // Vérification de la date : soit elle correspond, soit aucun filtre n'est appliqué
      const concertDateMatch =
        concert.date.toLowerCase().includes(selectedDate()) ||
        selectedDate() === ''

      // Vérification du genre musical sélectionné
      const concertGenres = concert.tag.map((genre) => genre.toLowerCase())
      const genreMatch =
        concertGenres.includes(selectedGenre()) || selectedGenre() === ''

      // Un concert est affiché uniquement s'il correspond aux trois critères
      return nameMatch && concertDateMatch && genreMatch
    })

  return (
    <main class={styles['main-content']}>
      {/* Contenu dynamique inséré depuis un autre composant */}
      <div>{props.children}</div>

      {/* Barre de filtres permettant de rechercher un concert */}
      <div class={styles['filter-bar']}>
        {/* Champ de recherche par nom */}
        <FormInput
          name="recherche"
          type="text"
          id={styles.search}
          onInput={(e) => setSearchValue(e.currentTarget.value.toLowerCase())} // Met à jour le filtre en minuscules pour éviter les erreurs de casse
          placeholder="🔍 Rechercher un concert..."
        />

        {/* Sélecteur de date */}
        <select
          onChange={(e) => setSelectedDate(e.currentTarget.value.toLowerCase())}
        >
          <option value="">📅 Date</option>
          <option value="mai 2025">Mai 2025</option>
          <option value="juin 2025">Juin 2025</option>
          <option value="juillet 2025">Juillet 2025</option>
        </select>

        {/* Sélecteur de genre musical */}
        <select
          id={styles['filter-genre']}
          onChange={(e) =>
            setSelectedGenre(e.currentTarget.value.toLowerCase())
          }
        >
          <option value="">🎵 Genre</option>
          <option value="rap">Rap</option>
          <option value="pop">Pop</option>
          <option value="punk">Punk</option>
          <option value="metal">Metal</option>
          <option value="electro">Electro</option>
          <option value="reggae">Reggae</option>
        </select>
      </div>

      {/* Grille des concerts filtrés */}
      <section class={styles['concerts-grid']} id="concerts-list">
        {/* Utilisation de <For> pour un rendu performant */}
        <For each={filteredConcerts()}>
          {(concert) => (
            <Card
              href={concert.id}
              horizontal
              title={concert.name}
              cover={`/${concert.img}`} // Image associée au concert
              alt={concert.name}
            >
              <p>{concert.info}</p>
              <p>
                <strong>{concert.date}</strong>
              </p>
              <Button type="button" class={styles['btn-buy']}>
                Acheter des billets
              </Button>
            </Card>
          )}
        </For>
      </section>
    </main>
  )
}

export default Concerts
