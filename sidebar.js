/* ============================================================
   Sidebar Accordion — Only one category open at a time
   ============================================================ */

(function () {
  const categories = document.querySelectorAll('.sidebar-category');

  categories.forEach(function (category) {
    category.addEventListener('toggle', function () {
      if (this.open) {
        categories.forEach(function (other) {
          if (other !== category && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
})();


/* ============================================================
   Theme Toggle — Day / Night mode
   ============================================================ */

(function () {
  var toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('portals-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('portals-theme', 'dark');
    }
  });
})();


/* ============================================================
   Game Card Fade-In — hide all cards, reveal entire grid at once
   when all images have loaded (or after 3s safety timeout)
   ============================================================ */

(function () {
  var cards = document.querySelectorAll('.game-card');
  if (!cards.length) return;

  var images = [];
  cards.forEach(function (card) {
    var img = card.querySelector('img');
    if (img && !img.complete) images.push(img);
  });

  function revealAll() {
    cards.forEach(function (card, i) {
      setTimeout(function () {
        card.classList.add('game-card--visible');
      }, i * 50);
    });
  }

  if (images.length === 0) {
    revealAll();
    return;
  }

  var loaded = 0;
  var revealed = false;

  function onLoad() {
    loaded++;
    if (!revealed && loaded >= images.length) {
      revealed = true;
      revealAll();
    }
  }

  images.forEach(function (img) {
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onLoad);
  });

  setTimeout(function () {
    if (!revealed) {
      revealed = true;
      revealAll();
    }
  }, 3000);
})();
