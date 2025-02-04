import styles from './mentions.module.css'

const Mentions = () => {
  return (
    <main class={styles['main-content']}>
      <section class={styles.bio}>
        <h2>Informations Éditeur</h2>
        <p>
          <strong>Nom de l'entreprise :</strong> Le Carré d'As
        </p>
        <p>
          <strong>Adresse :</strong> 123 Rue Imaginaire, 75000 Paris, France
        </p>
        <p>
          <strong>Email :</strong> contact@carredas.fr
        </p>

        <h2>Hébergement</h2>
        <p>
          <strong>Hébergeur :</strong> Ce site est un projet fictif réalisé dans
          le cadre d’un exercice scolaire à l'IPSSI Montpellier.
        </p>
        <p>Aucun hébergement commercial n'est utilisé.</p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Tout le contenu de ce site (textes, logo) est la propriété de Le Carré
          d'As, sauf indication contraire.
        </p>
      </section>
    </main>
  )
}

export default Mentions
