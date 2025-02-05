import {For, createSignal, Show, createMemo} from 'solid-js';
import {jeux} from '../data/jeu';
import styles from './jeu.module.css';
import Card from '../components/Card'

const Jeu = () => {
  const [searchValue, setSearchValue] = createSignal('');
  const [selectedMainTag, setSelectedMainTag] = createSignal('');
  const [selectedSubTag, setSelectedSubTag] = createSignal('');
  const [sortCriteria, setSortCriteria] = createSignal('name');
  const [showFilterPage, setShowFilterPage] = createSignal(false);
  
  const allMainTags = Array.from(new Set(jeux.map(jeu => jeu.mainTag.toLowerCase())));
  
  const availableSubTags = createMemo(() => {
    if (selectedMainTag() === '') {
      return Array.from(new Set(jeux.map(jeu => jeu.subTag.toLowerCase())));
    }
    return Array.from(new Set(jeux.filter(jeu => jeu.mainTag.toLowerCase() === selectedMainTag()).map(jeu => jeu.subTag.toLowerCase())));
  });
  
  const filteredJeux = () =>
    jeux.filter((jeu) => {
      const nameMatch = jeu.name.toLowerCase().includes(searchValue());
      const mainTagMatch = selectedMainTag() === '' || jeu.mainTag.toLowerCase() === selectedMainTag();
      const subTagMatch = selectedSubTag() === '' || jeu.subTag.toLowerCase() === selectedSubTag();
      
      return nameMatch && mainTagMatch && subTagMatch;
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
        <button class={styles.filter_btn} type="button" onClick={() => setShowFilterPage(true)}>Filtres</button>
        </div>
        <div class={styles['filter-bar']}>
        <select id="sort" aria-label="sort" class={styles['filter-bar']} onChange={(e) => setSortCriteria(e.currentTarget.value)}>
          <option value="default" disabled selected hidden>Trier par</option>
          <option value="name">Nom</option>
          <option value="time">Temps</option>
        </select>
      </div>
      </div>
      
      <Show when={showFilterPage()}>
        <div class={styles['filter-page']}>
          <button class={styles['close-btn']} onClick={() => setShowFilterPage(false)} type='button'>Fermer</button>
          <button id="all" class={styles.btn_list} type="button" onClick={() => {
            setSelectedMainTag('');
            setSelectedSubTag('');
            setShowFilterPage(false);
          }}>Tout</button>
          <h3>Genre principal</h3>
          <div class={styles['tag-container']}>
            <For each={allMainTags}>
              {(tag) => (
                <button
                  class={`${styles.btn_list} ${selectedMainTag() === tag ? styles.selected : ''}`}
                  type="button"
                  onClick={() => {
                    setSelectedMainTag(selectedMainTag() === tag ? '' : tag);
                    setSelectedSubTag('');
                  }}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              )}
            </For>
          </div>
          <h3>Genre secondaire</h3>
          <div class={styles['tag-container']}>
            <For each={availableSubTags()}>
              {(tag) => (
                <button
                  class={`${styles.btn_list} ${selectedSubTag() === tag ? styles.selected : ''}`}
                  type="button"
                  onClick={() => {
                    setSelectedSubTag(selectedSubTag() === tag ? '' : tag);
                  }}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              )}
            </For>
          </div>
        </div>
      </Show>
      
      <div class={styles.cards} id="cards">
        <For each={sortedJeux()}>
          {(jeu) => (
            <Card title={jeu.name} cover={jeu.img} alt={jeu.name}>
              <p>{jeu.info}</p>
              <p>{jeu.time} minutes</p>
              <p>{jeu.mainTag}: {jeu.subTag}</p>
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