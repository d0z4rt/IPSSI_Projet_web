document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section')

  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show-text')
          } else {
            entry.target.classList.remove('show-text')
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach((section, index) => {
      section.style.transitionDelay = `${index * 0.2}s`
      observer.observe(section)
    })
  }
})
