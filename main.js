// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', !expanded);
  mobileMenu.classList.toggle('hidden');
  if (!expanded) {
    // Focus first link in mobile menu
    const firstLink = mobileMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }
});

document.addEventListener('keydown', (e) => {
  if (!mobileMenu.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
    // Focus trap
    const focusableEls = mobileMenu.querySelectorAll('a');
    if (focusableEls.length > 0) {
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  }
});

// About Section Image Slider

document.addEventListener('DOMContentLoaded', function() {
  const sliderImgs = document.querySelectorAll('#about-slider .slider-img');
  const sliderDots = document.querySelectorAll('#about-slider .slider-dot');
  const sliderPrev = document.getElementById('slider-prev');
  const sliderNext = document.getElementById('slider-next');
  let sliderIndex = 0;
  let autoPlayInterval = null;

  function showSliderImage(idx) {
    sliderImgs.forEach((img, i) => {
      img.style.opacity = i === idx ? '1' : '0';
      img.style.zIndex = i === idx ? '1' : '0';
      img.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
    });
    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('bg-pink-400', i === idx);
      dot.classList.toggle('bg-pink-200', i !== idx);
    });
  }

  function nextSliderImage() {
    sliderIndex = (sliderIndex + 1) % sliderImgs.length;
    showSliderImage(sliderIndex);
  }

  function prevSliderImage() {
    sliderIndex = (sliderIndex - 1 + sliderImgs.length) % sliderImgs.length;
    showSliderImage(sliderIndex);
  }

  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      nextSliderImage();
    }, 4000);
  }

  function resetAutoPlay() {
    startAutoPlay();
  }

  if (sliderPrev && sliderNext && sliderImgs.length > 0) {
    sliderPrev.addEventListener('click', () => {
      prevSliderImage();
      resetAutoPlay();
    });
    sliderNext.addEventListener('click', () => {
      nextSliderImage();
      resetAutoPlay();
    });
    sliderDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        sliderIndex = i;
        showSliderImage(sliderIndex);
        resetAutoPlay();
      });
    });
    showSliderImage(sliderIndex);
    startAutoPlay();
  }
});

// About section background image slider
const aboutSliderImgs = document.querySelectorAll('.about-slider-bg');
const aboutSliderDots = document.querySelectorAll('.about-slider-dot');
const aboutSliderPrev = document.getElementById('about-slider-prev');
const aboutSliderNext = document.getElementById('about-slider-next');
let aboutSliderIndex = 0;
let aboutSliderInterval = null;

function showAboutSliderImage(idx) {
  aboutSliderImgs.forEach((img, i) => {
    img.style.opacity = i === idx ? '1' : '0';
  });
  aboutSliderDots.forEach((dot, i) => {
    dot.classList.toggle('bg-pink-400', i === idx);
    dot.classList.toggle('bg-pink-200', i !== idx);
  });
}

function nextAboutSliderImage() {
  aboutSliderIndex = (aboutSliderIndex + 1) % aboutSliderImgs.length;
  showAboutSliderImage(aboutSliderIndex);
}

function prevAboutSliderImage() {
  aboutSliderIndex = (aboutSliderIndex - 1 + aboutSliderImgs.length) % aboutSliderImgs.length;
  showAboutSliderImage(aboutSliderIndex);
}

aboutSliderNext.addEventListener('click', nextAboutSliderImage);
aboutSliderPrev.addEventListener('click', prevAboutSliderImage);
aboutSliderDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    aboutSliderIndex = i;
    showAboutSliderImage(aboutSliderIndex);
  });
});

function startAboutSliderInterval() {
  clearInterval(aboutSliderInterval);
  aboutSliderInterval = setInterval(nextAboutSliderImage, 4000);
}

showAboutSliderImage(aboutSliderIndex);
startAboutSliderInterval();
// Pause auto-slide on hover
const aboutSection = document.getElementById('about');
aboutSection.addEventListener('mouseenter', () => clearInterval(aboutSliderInterval));
aboutSection.addEventListener('mouseleave', startAboutSliderInterval);

// Floating particles for About section
function createAboutParticles() {
  const container = document.getElementById('about-particles');
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#f9a8d4', '#a5b4fc', '#f472b6', '#93c5fd'];
  const icons = [
    '<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 21s-6.5-5.5-9-9.5C-1.5 7.5 2.5 3 7 5.5c2.1 1.2 3 3.5 3 3.5s.9-2.3 3-3.5C21.5 3 25.5 7.5 21 11.5c-2.5 4-9 9.5-9 9.5z" fill="#f9a8d4"/></svg>',
    '<svg width="18" height="18" fill="#a5b4fc" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>',
    '<svg width="20" height="20" fill="#f472b6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>',
    '<svg width="16" height="16" fill="#93c5fd" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>'
  ];
  const numParticles = 14;
  for (let i = 0; i < numParticles; i++) {
    const el = document.createElement('div');
    el.className = 'about-particle';
    el.style.position = 'absolute';
    el.style.left = Math.random() * 95 + '%';
    el.style.top = Math.random() * 90 + '%';
    el.style.opacity = 0.18 + Math.random() * 0.22;
    el.style.zIndex = 10;
    el.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    container.appendChild(el);
    animateAboutParticle(el, i);
  }
}

function animateAboutParticle(el, i) {
  const duration = 10 + Math.random() * 10;
  const direction = Math.random() > 0.5 ? 1 : -1;
  const start = parseFloat(el.style.top);
  const end = start + direction * (10 + Math.random() * 10);
  el.animate([
    { transform: `translateY(0px)` },
    { transform: `translateY(${end - start}vh)` }
  ], {
    duration: duration * 1000,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out'
  });
}

document.addEventListener('DOMContentLoaded', createAboutParticles);
window.addEventListener('resize', createAboutParticles);

// Team card interactivity
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
  card.setAttribute('tabindex', '0'); // Make focusable
  card.addEventListener('click', () => {
    teamCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      teamCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    }
  });
}); 