import {For, createSignal, Show} from 'solid-js';
import {jeux} from '../data/jeu';
import styles from './jeu.module.css';
import Card from '../components/Card'


const Jeu = () => {
  const [searchValue, setSearchValue] = createSignal('');
  const [selectedGenre, setSelectedGenre] = createSignal('');
  const [sortCriteria, setSortCriteria] = createSignal('name');
  const [showFilterPage, setShowFilterPage] = createSignal(false);
  
  const allTags = Array.from(new Set(jeux.flatMap(jeu => jeu.tag.map(tag => tag.toLowerCase()))));
  
  const filteredJeux = () =>
  jeux.filter((jeu) => {
    const nameMatch = jeu.name.toLowerCase().includes(searchValue());
    const genreMatch = selectedGenre() === '' || jeu.tag.map((genre) => genre.toLowerCase()).includes(selectedGenre());
    
    return nameMatch && genreMatch;
  });
  const sortedJeux = () => {
    const jeuxToSort = filteredJeux();
    return jeuxToSort.sort((a, b) => {
      if (sortCriteria() === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortCriteria() === 'time') {
        return parseInt(a.time) - parseInt(b.time);
      }
      return 0;
    });
  };
  
  
  return (
  <>
  <div class={styles['filter-bar']}>
    <div class={styles['filter-bar']}>
      <input
      type="text"
      id={styles.search}
      onInput={(e) => setSearchValue(e.currentTarget.value.toLowerCase())}
      placeholder="🔍 Rechercher un jeu..."
      />
    </div>
    <div class={styles['filter-bar']}>
      <button class={styles.btn_list} type="button" onClick={() => setShowFilterPage(true)}>Filtres</button>
    </div>
    <select id="sort" aria-label="sort"class={styles['filter-genre']} onChange={(e) => setSortCriteria(e.currentTarget.value)}>
      <option value="default" disabled selected hidden>Trier par</option>
      <option value="name">Nom</option>
      <option value="time">Temps</option>
    </select>
  </div>
  
  
  <Show when={showFilterPage()}>
    <div class={styles['filter-page']}>
      <button class={styles['close-btn']} onClick={() => setShowFilterPage(false)} type='button'>Fermer</button>
      <button id="all" class={styles.btn_list} type="button" onClick={() => {
        setSelectedGenre('');
        setShowFilterPage(false);
      }}>Tout</button>
      <For each={allTags}>
        {(tag) => (
          <button
          class={styles.btn_list}
          type="button"
          onClick={() => {
            setSelectedGenre(tag);
            setShowFilterPage(false);
          }}
          >
          {tag.charAt(0).toUpperCase() + tag.slice(1)}
        </button>
        )}
      </For>
    </div>
  </Show>
  
  
  <div class={styles.cards} id="cards">
    <For each={sortedJeux()}>
      {(jeu) =>(
        <Card title={jeu.name} cover={jeu.img} alt={jeu.name}>
          <p>{jeu.info}</p>
          <p>{jeu.time} minutes</p>
          <p>{jeu.tag.join(', ')}</p>
        </Card>
        )}
      </For>
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    <section class={styles.contact}>
      <h2>Nous contacter</h2>
      <form class={styles.contact_form}>
        <div class={styles.contact_name}>
          <div class={styles.contact_info}>
            <label for="name">Nom</label>
            <input id="name" class={styles.contact_text} type="text" required/>
          </div>
          <div class={styles.contact_info}>
            <label for="firstname">Prénom</label>
            <input id="firstname" class={styles.contact_text} type="text" required/>
          </div>
        </div>
        <div classList={{[styles.contact_info]:true, [styles.other]:true}}>
          <label for="email">Email</label>
          <input id="email" class={styles.contact_text} type="email" required/>
        </div>
        <div classList={{[styles.contact_info]:true, [styles.other]:true}}>
          <label for="subject">Sujet</label>
          <input id="subject" class={styles.contact_text} type="text" required/>
        </div>
        <div classList={{[styles.contact_info]:true,  [styles.other]:true}}>
          <label for="message">Message</label>
          <input id="message" class={styles.contact_text} type="text" required/>
        </div>
        <button class={styles.button} type="submit">Envoyer</button>
      </form>
    </section> 
    
    
    </>
    );
  }
  
  export default Jeu;