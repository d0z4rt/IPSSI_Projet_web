const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-content">
        <p>📍 123 Rue des Stratèges, Montpellier</p>
        <p>📞 04 12 34 56 78 | ✉️ contact@carredas.fr</p>
        <div class="footer-hours">
          <p>🕒 Lundi - Jeudi : 18h - 00h | Vendredi - Dimanche : 17h - 02h</p>
        </div>

        <div class="footer-social">
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

        <div class="footer-legal">
          <a href="mentions">Mentions légales</a> |
          <a href="privacy">Politique de confidentialité</a>
        </div>

        <p>© 2025 Le Carré d'As - Tous droits réservés</p>
      </div>
    </footer>
  )
}

export default Footer
