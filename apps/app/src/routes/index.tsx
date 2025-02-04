import styles from './index.module.css'

export default function Home() {
  return (
    <main class={styles['main-content']}>
      <section class={styles.bio}>
        <h2>Bienvenue au Carré d'As</h2>
        <p>
          Un spot unique où <em>jeux de société</em> et <em>concerts live</em>{' '}
          se rencontrent dans une ambiance électrique. Que tu sois là pour
          défier tes potes autour d’un plateau ou te laisser porter par des
          vibes musicales endiablées, chaque soirée ici est une{' '}
          <strong>nouvelle expérience</strong>. Entre <em>décor stylé</em>,{' '}
          <em>énergie conviviale</em> et <em>moments inoubliables</em>, c’est
          l’endroit parfait pour <strong>chiller</strong>,{' '}
          <strong>jouer</strong> et <strong>vibrer</strong>.
        </p>
      </section>

      <section class={styles.cards}>
        <a href="carte" class={styles.card}>
          <div class={styles['section-image']}>
            <img src="./images/test.png" alt="carte" loading="lazy" />
          </div>
          <div class={styles['section-text']}>
            <h3>Notre Carte</h3>
            <p>
              Des <strong>cocktails originaux</strong>, des{' '}
              <strong>bières artisanales</strong> et des{' '}
              <em>snacks gourmands</em> pour accompagner tes soirées.
            </p>
          </div>
        </a>

        <a href="jeux" class={styles.card}>
          <div class={styles['section-image']}>
            <img src="./images/test.png" alt="jeux" loading="lazy" />
          </div>
          <div class={styles['section-text']}>
            <h3>Jeux de Société</h3>
            <p>
              Des <em>jeux pour tous</em> : stratégie, fun rapide ou classiques.
              Viens défier tes potes dans une ambiance détendue !
            </p>
          </div>
        </a>

        <a href="concerts" class={styles.card}>
          <div class={styles['section-image']}>
            <img src="./images/test.png" alt="concerts" loading="lazy" />
          </div>
          <div class={styles['section-text']}>
            <h3>Concerts Live</h3>
            <p>
              Des <strong>concerts intenses</strong> chaque semaine avec des{' '}
              <em>artistes locaux</em> et des <em>vibes uniques</em>.
            </p>
          </div>
        </a>
      </section>
    </main>
  )
}
