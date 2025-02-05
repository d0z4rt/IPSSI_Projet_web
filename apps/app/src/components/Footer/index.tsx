import styles from './style.module.css'

const Footer = () => {
  return (
    <footer class={styles.footer}>
      <div class={styles["footer-content"]}>
        <p>📍 123 Rue des Stratèges, 75000 Paris</p>
        <p>📞 04 12 34 56 78 | ✉️ contact@carredas.fr</p>
        <div class={styles["footer-hours"]}>
          <p>🕒 Lundi - Jeudi : 18h - 00h | Vendredi - Dimanche : 17h - 02h</p>
        </div>

        <div class={styles["footer-social"]}>
          <a href="#">
            <img src="images/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="#">
            <img src="images/instagram-icon.png" alt="Instagram" />
          </a>
          <a href="#">
            <img src="images/twitter-icon.png" alt="Twitter" />
          </a>
        </div>

        <div class={styles["footer-legal"]}>
          <a href="mentions">Mentions légales</a> |
          <a href="privacy">Politique de confidentialité</a>
        </div>

        <p>© 2025 Le Carré d'As - Tous droits réservés</p>
      </div>
    </footer>
  )
}

export default Footer
