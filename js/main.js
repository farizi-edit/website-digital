/**
 * MODERN WEB CODING TEMPLATE - MAIN INTERACTIVITY SCRIPT
 * Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all core interactive components
  initNavigation();
  initThemeToggle();
  initScrollReveal();
  initPortfolioFilter();
  initPlaygroundCustomizer();
  initContactForm();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const navLinksItems = navLinks.querySelectorAll('a');
  const sections = document.querySelectorAll('section');

  // Sticky Navbar Blur effect on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Link Highlighting on Scroll
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isExpanded = navLinks.classList.contains('open');
    mobileMenuBtn.innerHTML = isExpanded 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close Mobile Menu when clicking link
  navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* ==========================================================================
   2. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlEl = document.documentElement;

  // Load saved theme or default to light (matching Digitara Creative white theme)
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    showToast(`Mode tema diubah ke ${newTheme === 'dark' ? 'Gelap (Dark)' : 'Terang (Light)'}`, 'info');
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.style.color = '#ffbd2e';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.style.color = '#7f00ff';
    }
  }
}

/* ==========================================================================
   3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   4. PORTFOLIO SHOWCASE FILTERING
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const previewBtns = document.querySelectorAll('.preview-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Active Filter Button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Preview Buttons Event
  previewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      showToast(`<strong>${title}</strong>: ${desc}`, 'preview');
    });
  });
}

/* ==========================================================================
   5. LIVE PLAYGROUND COLOR CUSTOMIZER
   ========================================================================== */
function initPlaygroundCustomizer() {
  const swatches = document.querySelectorAll('.color-swatch');
  const gradientValDisplay = document.getElementById('current-gradient-val');
  const demoBtn = document.getElementById('demo-btn');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const color1 = swatch.getAttribute('data-color1');
      const color2 = swatch.getAttribute('data-color2');
      const newGradient = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;

      // Update Root CSS variable live
      document.documentElement.style.setProperty('--primary-gradient', newGradient);
      document.documentElement.style.setProperty('--accent-cyan', color1);

      if (gradientValDisplay) {
        gradientValDisplay.textContent = newGradient;
      }

      showToast(`Warna aksen berhasil diperbarui ke: ${color1} & ${color2}`, 'success');
    });
  });

  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      showToast('Tombol Aksen Interaktif Berhasil Diklik!', 'success');
    });
  }
}

/* ==========================================================================
   6. CONTACT FORM & TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name').value;
      const emailInput = document.getElementById('contact-email').value;

      if (!nameInput || !emailInput) {
        showToast('Harap isi semua kolom formulir dengan benar.', 'error');
        return;
      }

      // Simulate sending message
      showToast(`Terima kasih, ${nameInput}! Pesan Anda telah terkirim.`, 'success');
      contactForm.reset();
    });
  }
}

/**
 * Global Toast Notification Helper
 */
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconClass = 'fa-solid fa-circle-info';
  if (type === 'success') iconClass = 'fa-solid fa-circle-check';
  if (type === 'error') iconClass = 'fa-solid fa-circle-exclamation';
  if (type === 'preview') iconClass = 'fa-solid fa-eye';

  toast.innerHTML = `
    <div class="toast-icon"><i class="${iconClass}"></i></div>
    <div class="toast-message">${message}</div>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
