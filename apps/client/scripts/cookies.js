document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById('cookie-banner');

  if (!localStorage.getItem('cookiesAccepted')) {
    banner.style.display = 'block';
  }

  document.getElementById('accept-all').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    banner.style.display = 'none';
  });

  document.getElementById('reject-all').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'false');
    banner.style.display = 'none';
  });

  document.getElementById('save-preferences').addEventListener('click', () => {
    const analytics = document.querySelector('input[name="analytics"]').checked;
    const ads = document.querySelector('input[name="ads"]').checked;

    localStorage.setItem('analyticsCookies', analytics);
    localStorage.setItem('adsCookies', ads);
    banner.style.display = 'none';
  });
});
