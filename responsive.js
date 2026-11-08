// Fits the 448px-wide finished hero logo inside the page gutters.
(function () {
  var root = document.documentElement;

  function fit() {
    root.style.setProperty('--hero-scale', Math.min(1, (root.clientWidth - 56) / 448));
  }

  fit();
  window.addEventListener('resize', fit);

  // chrome.min.js toggles the menu on both tap/click and focus, so one tap can
  // open and immediately close it. Take over so each tap toggles exactly once.
  function isMenuButton(event) {
    return event.target.closest && event.target.closest('#menu-nav');
  }

  ['touchstart', 'touchend', 'mousedown', 'mouseup', 'focus'].forEach(function (type) {
    document.addEventListener(type, function (event) {
      if (isMenuButton(event)) event.stopImmediatePropagation();
    }, true);
  });

  document.addEventListener('click', function (event) {
    if (!isMenuButton(event)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    document.body.classList.toggle('nav-expanded');
  }, true);
})();
