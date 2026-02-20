// ===== Game Detail Overlay =====
(function () {
  var overlay = document.getElementById('game-detail-overlay');
  if (!overlay) return;

  var backdrop = document.getElementById('game-detail-backdrop');
  var closeBtn = document.getElementById('game-detail-close');
  var surface = document.getElementById('game-detail-surface');

  // Dynamic content refs
  var detailImage = document.getElementById('game-detail-image');
  var detailName = document.getElementById('game-detail-name');
  var detailCreator = document.getElementById('game-detail-creator');
  var detailAvatar = document.getElementById('game-detail-avatar');
  var detailDescription = document.getElementById('game-detail-description');
  var detailLongDesc = document.getElementById('game-detail-long-desc');
  var detailGenre = document.getElementById('game-detail-genre');
  var detailPlayers = document.getElementById('game-detail-players');
  var detailCreated = document.getElementById('game-detail-created');

  // Thumbnail refs
  var thumbsTrack = overlay.querySelector('.game-detail__thumbs-track');
  var thumbs = overlay.querySelectorAll('.game-detail__thumb');
  var thumbImages = [];
  thumbs.forEach(function (t) { thumbImages.push(t.querySelector('img')); });

  // Carousel nav
  var thumbNavLeft = overlay.querySelector('.game-detail__thumbs-nav--left');
  var thumbNavRight = overlay.querySelector('.game-detail__thumbs-nav--right');
  var thumbScrollAmount = 102; // thumb width (90) + gap (12)
  thumbNavLeft.addEventListener('click', function (e) {
    e.stopPropagation();
    thumbsTrack.scrollLeft -= thumbScrollAmount;
  });
  thumbNavRight.addEventListener('click', function (e) {
    e.stopPropagation();
    thumbsTrack.scrollLeft += thumbScrollAmount;
  });

  function openOverlay(card) {
    // Extract from card DOM
    var img = card.querySelector('.game-card__thumbnail img');
    var title = card.querySelector('.game-card__title');
    var creator = card.querySelector('.game-card__creator');

    if (img) {
      detailImage.src = img.src;
      detailImage.alt = img.alt;
      // Set all 4 thumbnails to the same image (placeholder — only 1 image per game for now)
      thumbImages.forEach(function (ti) {
        if (ti) { ti.src = img.src; ti.alt = img.alt; }
      });
    }
    if (title) detailName.textContent = title.textContent;
    if (creator) detailCreator.textContent = creator.textContent.replace(/^by\s*/i, '');

    // Extract from data attributes
    var fullDesc = card.getAttribute('data-description') || 'a fun game to play with friends.';
    var paragraphs = fullDesc.split('\n\n');
    detailDescription.textContent = paragraphs[0];
    detailLongDesc.innerHTML = '';
    paragraphs.forEach(function (p) {
      var el = document.createElement('p');
      el.className = 'p1';
      el.textContent = p.trim();
      detailLongDesc.appendChild(el);
    });
    detailGenre.textContent = card.getAttribute('data-genre') || 'adventure';
    detailPlayers.textContent = card.getAttribute('data-players') || '50';
    detailCreated.textContent = card.getAttribute('data-created') || 'jan 1, 2024';

    // Reset tabs to overview
    var tabs = overlay.querySelectorAll('.game-detail__tab');
    var panels = overlay.querySelectorAll('.game-detail__tab-content');
    tabs.forEach(function (t) { t.classList.remove('game-detail__tab--active'); });
    tabs[0].classList.add('game-detail__tab--active');
    panels.forEach(function (p, i) { p.style.display = i === 0 ? '' : 'none'; });

    // Reset thumbnails
    thumbs.forEach(function (t) { t.classList.remove('game-detail__thumb--active'); });
    if (thumbs[0]) thumbs[0].classList.add('game-detail__thumb--active');
    thumbsTrack.scrollLeft = 0;

    // Reset action buttons
    var actionBtns = overlay.querySelectorAll('.game-detail__action-btn');
    actionBtns.forEach(function (btn) { btn.classList.remove('game-detail__action-btn--active'); });

    // Open
    overlay.classList.add('game-detail-overlay--open');
    document.body.classList.add('game-detail-open');
    surface.scrollTop = 0;
  }

  function closeOverlay() {
    overlay.classList.remove('game-detail-overlay--open');
    document.body.classList.remove('game-detail-open');
  }

  // Attach click to game cards inside [data-game-overlay] containers
  var gameCards = document.querySelectorAll('[data-game-overlay] .game-card');
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
    if (e.key === 'Escape' && overlay.classList.contains('game-detail-overlay--open')) {
      closeOverlay();
    }
  });

  // Prevent surface clicks from closing
  surface.addEventListener('click', function (e) { e.stopPropagation(); });

  // Tab switching
  var tabs = overlay.querySelectorAll('.game-detail__tab');
  var panels = overlay.querySelectorAll('.game-detail__tab-content');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('game-detail__tab--active'); });
      tab.classList.add('game-detail__tab--active');
      var target = tab.getAttribute('data-tab');
      panels.forEach(function (p) {
        p.style.display = p.getAttribute('data-panel') === target ? '' : 'none';
      });
    });
  });

  // Thumbnail selector
  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(function (t) { t.classList.remove('game-detail__thumb--active'); });
      thumb.classList.add('game-detail__thumb--active');
      var thumbImg = thumb.querySelector('img');
      if (thumbImg) detailImage.src = thumbImg.src;
    });
  });

  // Action button toggle
  var actionBtns = overlay.querySelectorAll('.game-detail__action-btn');
  actionBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      btn.classList.toggle('game-detail__action-btn--active');
      var label = btn.querySelector('.game-detail__action-label');
      if (label && label.textContent === 'favourite') {
        label.textContent = 'favourited';
      } else if (label && label.textContent === 'favourited') {
        label.textContent = 'favourite';
      }
    });
  });
})();
