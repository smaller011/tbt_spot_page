// Select all service cards
  const cards = document.querySelectorAll('.service-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Close other overlays first (optional)
      cards.forEach(c => {
        if (c !== card) c.classList.remove('active');
      });

      // Toggle active state on clicked card
      card.classList.toggle('active');
    });
  });