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
