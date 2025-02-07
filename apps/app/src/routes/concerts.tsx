import {
  For,
  type ParentComponent,
  createResource,
  createSignal
} from 'solid-js'
import Button from '../components/Button'
import Card from '../components/Card'
import FormInput from '../components/FormInput'
import Select from '../components/Select'
import type { TConcert } from '../entities/concert.entity'
import styles from './concerts.module.css'

// Composant affichant la liste des concerts avec des filtres de recherche
const Concerts: ParentComponent = (props) => {
  // États pour gérer les filtres
  const [searchValue, setSearchValue] = createSignal('') // Stocke le terme de recherche saisi par l'utilisateur
  const [selectedDate, setSelectedDate] = createSignal('') // Stocke la date sélectionnée
  const [selectedGenre, setSelectedGenre] = createSignal('') // Stocke le genre musical sélectionné
  const [concerts, { refetch }] = createResource(async () => {
    const response = await fetch('http://127.0.0.1:4000/concerts/')
    return (await response.json()) as TConcert[]
  })

  // Fonction retournant la liste des concerts filtrés
  const filteredConcerts = () =>
    concerts()?.filter((concert) => {
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
        <h1>Concerts / </h1>
        {/* Champ de recherche par nom */}
        <FormInput
          name="recherche"
          type="text"
          id={styles.search}
          onInput={(e) => setSearchValue(e.currentTarget.value.toLowerCase())} // Met à jour le filtre en minuscules pour éviter les erreurs de casse
          placeholder="🔍 Rechercher un concert..."
        />

        {/* Sélecteur de date */}
        <Select
          name="📅 Date"
          options={['mai 2025', 'juin 2025', 'juillet 2025']}
          activeOption={selectedDate()}
          setActiveOption={setSelectedDate}
        />

        {/* Sélecteur de genre musical */}
        <Select
          name="🎵 Genre"
          options={['rap', 'pop', 'punk', 'metal', 'electro', 'reggae']}
          activeOption={selectedGenre()}
          setActiveOption={setSelectedGenre}
        />
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
