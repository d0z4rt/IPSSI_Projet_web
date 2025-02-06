import { For, ParentComponent, createSignal } from 'solid-js'
import Button from '../components/Button'
import Card from '../components/Card'
import FormInput from '../components/FormInput'
import { concerts } from '../data/concert'
import styles from './concerts.module.css'

const Concerts: ParentComponent = (props) => {
  const [searchValue, setSearchValue] = createSignal('')
  const [selectedDate, setSelectedDate] = createSignal('')
  const [selectedGenre, setSelectedGenre] = createSignal('')

  const filteredConcerts = () =>
    concerts.filter((concert) => {
      const nameMatch = concert.name.toLowerCase().includes(searchValue())

      // Extraction de la date (mois année)
      const concertDateMatch =
        concert.date.toLowerCase().includes(selectedDate()) ||
        selectedDate() === ''

      // Vérification du genre
      const concertGenres = concert.tag.map((genre) => genre.toLowerCase())
      const genreMatch =
        concertGenres.includes(selectedGenre()) || selectedGenre() === ''

      return nameMatch && concertDateMatch && genreMatch
    })

  return (
    <main class={styles['main-content']}>
      <div>{props.children}</div>
      <div class={styles['filter-bar']}>
        <FormInput
          name="recherche"
          type="text"
          id={styles.search}
          onInput={(e) => setSearchValue(e.currentTarget.value.toLowerCase())}
          placeholder="🔍 Rechercher un concert..."
        />

        <select
          onChange={(e) => setSelectedDate(e.currentTarget.value.toLowerCase())}
        >
          <option value="">📅 Date</option>
          <option value="mai 2025">Mai 2025</option>
          <option value="juin 2025">Juin 2025</option>
          <option value="juillet 2025">Juillet 2025</option>
        </select>

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

      <section class={styles['concerts-grid']} id="concerts-list">
        <For each={filteredConcerts()}>
          {(concert) => (
            <Card
              href={concert.id}
              horizontal
              title={concert.name}
              cover={`/${concert.img}`}
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
