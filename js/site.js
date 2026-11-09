(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fit the 448px-wide finished hero logo inside the page gutters.
  function fitHero() {
    root.style.setProperty('--hero-scale', Math.min(1, (root.clientWidth - 56) / 448));
  }

  fitHero();
  window.addEventListener('resize', fitHero);

  if (!reduceMotion) root.classList.add('hero-pending');

  function playHero() {
    var images = Array.prototype.slice.call(document.querySelectorAll('.hero-scene img'));
    var start = function () {
      root.classList.remove('hero-pending');
      if (!reduceMotion) root.classList.add('hero-play');
    };
    var decoded = images.map(function (image) {
      return image.decode ? image.decode().catch(function () {}) : Promise.resolve();
    });
    var timeout = new Promise(function (resolve) { setTimeout(resolve, 3000); });
    Promise.race([Promise.all(decoded), timeout]).then(start);
  }

  function setupMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
  }

  var MODE_MESSAGES = {
    pink: 'Pink mode is on. Ultron is now running 25% faster.',
    bypass: "Bypass is on. Your boss can't see this page. (Your boss can see this page.)"
  };

  function setupModes() {
    var banner = document.getElementById('mode-banner');
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-mode-toggle]'));

    function setMode(mode) {
      if (mode) root.dataset.mode = mode;
      else delete root.dataset.mode;

      buttons.forEach(function (button) {
        var active = button.dataset.modeToggle === mode;
        button.setAttribute('aria-pressed', String(active));
        button.textContent = active ? button.dataset.labelOn : button.dataset.labelOff;
      });

      if (banner) {
        banner.textContent = mode ? MODE_MESSAGES[mode] : '';
        banner.hidden = !mode;
      }
    }

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var mode = button.dataset.modeToggle;
        setMode(root.dataset.mode === mode ? null : mode);
      });
    });
  }

  function setupRamDownload() {
    var button = document.getElementById('ram-button');
    var meter = document.getElementById('ram-meter');
    var status = document.getElementById('ram-status');
    if (!button || !meter || !status) return;

    var bar = meter.firstElementChild;
    var gigabytes = 4;

    function setProgress(percent) {
      bar.style.width = percent + '%';
      meter.setAttribute('aria-valuenow', String(percent));
    }

    function finish() {
      gigabytes *= 2;
      meter.classList.remove('is-active');
      status.textContent = 'Download complete. You now have ' + gigabytes.toLocaleString('en-US') + ' GB of RAM.';
      button.disabled = false;
      button.textContent = 'Download even more RAM';
    }

    button.addEventListener('click', function () {
      if (reduceMotion) {
        finish();
        return;
      }

      var percent = 0;
      button.disabled = true;
      button.textContent = 'Downloading...';
      status.textContent = '';
      setProgress(0);
      meter.classList.add('is-active');

      var timer = setInterval(function () {
        percent = Math.min(100, percent + 5);
        setProgress(percent);
        if (percent === 100) {
          clearInterval(timer);
          finish();
        }
      }, 100);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    playHero();
    setupMenu();
    setupModes();
    setupRamDownload();
  });
})();
