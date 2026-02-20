// ===== Item Detail Overlay =====
(function () {
  var overlay = document.getElementById('item-detail-overlay');
  if (!overlay) return;

  var backdrop = document.getElementById('item-detail-backdrop');
  var closeBtn = document.getElementById('item-detail-close');
  var surface = document.getElementById('item-detail-surface');

  // Dynamic content elements
  var detailImage = document.getElementById('item-detail-image');
  var detailName = document.getElementById('item-detail-name');
  var detailCreator = document.getElementById('item-detail-creator');
  var detailPrice = document.getElementById('item-detail-price');
  var detailType = document.getElementById('item-detail-type');
  var detailTradeable = document.getElementById('item-detail-tradeable');
  var detailRarity = document.getElementById('item-detail-rarity');
  var detailCreated = document.getElementById('item-detail-created');
  var detailDescription = document.getElementById('item-detail-description');

  function openOverlay(card) {
    // Extract from card DOM
    var img = card.querySelector('.game-card__thumbnail img');
    var title = card.querySelector('.game-card__title');
    var creator = card.querySelector('.game-card__creator');
    var price = card.querySelector('.game-card__price-value');

    if (img) { detailImage.src = img.src; detailImage.alt = img.alt; }
    if (title) detailName.textContent = title.textContent;
    if (creator) detailCreator.textContent = creator.textContent.replace(/^by\s*/i, '');
    if (price) detailPrice.textContent = price.textContent;

    // Extract from data attributes
    detailType.textContent = card.getAttribute('data-type') || 'accessory';
    detailTradeable.textContent = card.getAttribute('data-tradeable') || 'yes';
    detailRarity.textContent = card.getAttribute('data-rarity') || 'common';
    detailCreated.textContent = card.getAttribute('data-created') || 'jan 1, 2024';
    detailDescription.textContent = card.getAttribute('data-description') || 'a marketplace item.';

    // Reset tabs to overview
    var tabs = overlay.querySelectorAll('.item-detail__tab');
    tabs.forEach(function (t) { t.classList.remove('item-detail__tab--active'); });
    tabs[0].classList.add('item-detail__tab--active');

    overlay.classList.add('item-detail-overlay--open');
    document.body.classList.add('item-detail-open');
    surface.scrollTop = 0;
  }

  function closeOverlay() {
    overlay.classList.remove('item-detail-overlay--open');
    document.body.classList.remove('item-detail-open');
  }

  // Attach click to game cards inside [data-item-overlay] containers
  var gameCards = document.querySelectorAll('[data-item-overlay] .game-card');
  gameCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      openOverlay(card);
    });
  });

  // Close handlers
  backdrop.addEventListener('click', closeOverlay);
  closeBtn.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('item-detail-overlay--open')) {
      closeOverlay();
    }
  });

  // Prevent surface clicks from closing
  surface.addEventListener('click', function (e) { e.stopPropagation(); });

  // Tab switching
  var tabs = overlay.querySelectorAll('.item-detail__tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('item-detail__tab--active'); });
      tab.classList.add('item-detail__tab--active');
    });
  });
})();
