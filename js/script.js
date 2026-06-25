// Smooth scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    if (!href || href === '#') return;

    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// Stats Card Click-to-Pop Interaction (FIXED)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const statCards = document.querySelectorAll('.stat-card');
  
  if (statCards.length === 0) return; // Exit if no stat cards found
  
  statCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Remove popped class from all other cards
      statCards.forEach(c => c.classList.remove('popped'));
      
      // Add popped class to clicked card
      this.classList.add('popped');
    });
  });
  
  // Remove popped effect when clicking outside
  document.addEventListener('click', function(e) {
    // Check if click is outside any stat-card
    if (!e.target.closest('.stat-card')) {
      statCards.forEach(c => c.classList.remove('popped'));
    }
  });
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// If contact form transmitMessage uses inline mailto, keep as-is.
// Ensure mailto navigation works by not preventing default anywhere.

// ============================================
// Reveal on scroll
// ============================================
const revealEls = document.querySelectorAll('[data-reveal]');
const revealGroups = document.querySelectorAll('[data-reveal-group]');

const io = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  }
);

revealEls.forEach(el => io.observe(el));

revealGroups.forEach(group => {
  const items = group.querySelectorAll('[data-reveal]');
  items.forEach(el => io.observe(el));
});

// ============================================
// Simple modal (trailer)
// ============================================
const modal = document.getElementById('trailer-modal');

if (modal) {
  const openers = document.querySelectorAll('[data-modal-open]');
  const closers = modal.querySelectorAll('[data-modal-close]');

  const open = () => {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openers.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      open();
    });
  });

  closers.forEach(btn => {
    btn.addEventListener('click', close);
  });

  modal.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('modal-backdrop')) {
      close();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      close();
    }
  });
}

// ============================================
// Lightweight pointer tilt for hero phone
// ============================================
const tilt = document.querySelector('[data-tilt]');

if (tilt) {
  tilt.addEventListener('pointermove', e => {
    const rect = tilt.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotY = (px - 0.5) * 10;
    const rotX = (0.5 - py) * 8;

    tilt.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  tilt.addEventListener('pointerleave', () => {
    tilt.style.transform = '';
  });
}

// ============================================
// Game card arrow navigation
// ============================================
// Game 1 → Game 2 → Coming Soon → Stop
const gameCards = Array.from(
  document.querySelectorAll('.games-grid .game-card')
);

gameCards.forEach((card, index) => {
  const arrowBtn = card.querySelector('.circle-btn');
  if (!arrowBtn) return;

  // Disable arrow on last card (Coming Soon)
  if (index === gameCards.length - 1) {
    arrowBtn.style.pointerEvents = 'none';
    arrowBtn.style.opacity = '0.4';
    arrowBtn.style.cursor = 'default';
    return;
  }

  arrowBtn.addEventListener('click', e => {
    e.preventDefault();

    const nextCard = gameCards[index + 1];
    if (!nextCard) return;

    nextCard.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    nextCard.classList.remove('card-highlight');
    void nextCard.offsetWidth;
    nextCard.classList.add('card-highlight');

    nextCard.addEventListener(
      'animationend',
      () => nextCard.classList.remove('card-highlight'),
      { once: true }
    );
  });
});