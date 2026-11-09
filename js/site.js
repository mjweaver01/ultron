(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fit the 448px-wide finished hero logo inside its column.
  function fitHero() {
    var art = document.querySelector('.hero-art');
    var width = art ? art.clientWidth : root.clientWidth - 48;
    root.style.setProperty('--hero-scale', Math.min(1, Math.max(0.3, (width - 8) / 448)));
  }
  fitHero();
  window.addEventListener('resize', fitHero);
  document.addEventListener('DOMContentLoaded', fitHero);
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

  // Cycling hero word: fast / safe / NASA's / pink.
  var heroWordTimer;
  function setupHeroWord() {
    var el = document.getElementById('hero-word');
    if (!el) return;
    var words = el.dataset.words.split('|');
    if (reduceMotion) { el.textContent = words[2]; return; }
    var i = 0;
    heroWordTimer = setInterval(function () {
      i = (i + 1) % words.length;
      el.classList.add('is-out');
      setTimeout(function () { el.textContent = words[i]; el.classList.remove('is-out'); }, 300);
    }, 2200);
  }
  function landHeroWord(word) {
    var el = document.getElementById('hero-word');
    if (!el) return;
    clearInterval(heroWordTimer);
    el.classList.add('is-out');
    setTimeout(function () { el.textContent = word; el.classList.remove('is-out'); }, 300);
  }

  // Run fn once when el scrolls into view.
  function onceVisible(el, fn) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); fn(); }
    }, { threshold: 0.5 });
    io.observe(el);
  }

  function setupMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;
    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    nav.addEventListener('click', function (event) { if (event.target.closest('a')) setOpen(false); });
  }

  var MODE_MESSAGES = {
    pink: 'Pink mode is on. Ultron is now running 25% faster.',
    bypass: "Bypass is on. Your boss can't see this page. (Your boss can see this page.)"
  };

  function setupModes() {
    var banner = document.getElementById('mode-banner');
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-mode-toggle]'));
    function setMode(mode) {
      if (mode) root.dataset.mode = mode; else delete root.dataset.mode;
      buttons.forEach(function (button) {
        var active = button.dataset.modeToggle === mode;
        button.setAttribute('aria-pressed', String(active));
        button.textContent = active ? button.dataset.labelOn : button.dataset.labelOff;
      });
      if (banner) { banner.textContent = mode ? MODE_MESSAGES[mode] : ''; banner.hidden = !mode; }
    }
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var mode = button.dataset.modeToggle;
        setMode(root.dataset.mode === mode ? null : mode);
      });
    });
    // Pink demo: a short pulse when the card scrolls into view.
    var pinkCard = document.getElementById('pink');
    if (!reduceMotion) onceVisible(pinkCard, function () {
      if (root.dataset.mode) return;
      root.dataset.mode = 'pink';
      setTimeout(function () { if (root.dataset.mode === 'pink' && document.querySelector('[data-mode-toggle=pink]').getAttribute('aria-pressed') !== 'true') delete root.dataset.mode; }, 1400);
    });
  }

  // Animate a meter from 0 to 100 then call done.
  function runMeter(meter, duration, done) {
    var bar = meter.firstElementChild;
    var start = null;
    function setProgress(percent) {
      bar.style.width = percent + '%';
      meter.setAttribute('aria-valuenow', String(Math.round(percent)));
    }
    if (reduceMotion) { setProgress(100); done(); return; }
    setProgress(0);
    function step(ts) {
      if (start === null) start = ts;
      var percent = Math.min(100, ((ts - start) / duration) * 100);
      setProgress(percent);
      if (percent < 100) requestAnimationFrame(step); else done();
    }
    requestAnimationFrame(step);
  }

  function setupRamDownload() {
    var button = document.getElementById('ram-button');
    var meter = document.getElementById('ram-meter');
    var status = document.getElementById('ram-status');
    var count = document.getElementById('ram-count');
    if (!button || !meter || !status || !count) return;
    var gigabytes = 4;
    var busy = false;
    function download() {
      if (busy) return;
      busy = true;
      button.disabled = true;
      button.textContent = 'Downloading...';
      status.textContent = '';
      runMeter(meter, 2000, function () {
        gigabytes *= 2;
        count.innerHTML = 'You have <b>' + gigabytes.toLocaleString('en-US') + ' GB</b> of RAM';
        status.textContent = 'Download complete. You now have ' + gigabytes.toLocaleString('en-US') + ' GB.';
        button.disabled = false;
        button.textContent = 'Download even more RAM';
        busy = false;
      });
    }
    button.addEventListener('click', download);
    onceVisible(document.getElementById('download-ram'), download);
  }

  function setupSafetyCheck() {
    var button = document.getElementById('check-button');
    var meter = document.getElementById('check-meter');
    var status = document.getElementById('check-status');
    if (!button || !meter || !status) return;
    button.addEventListener('click', function () {
      button.disabled = true;
      status.textContent = 'Checking...';
      runMeter(meter, 1600, function () {
        status.textContent = '0 issues found. 0 checks performed.';
        button.disabled = false;
        button.textContent = 'Run it again';
      });
    });
  }

  function setupChat() {
    var answer = document.getElementById('chat-answer');
    var replay = document.getElementById('chat-replay');
    if (!answer || !replay) return;
    var text = answer.dataset.answer;
    var timer;
    function type() {
      clearInterval(timer);
      if (reduceMotion) { answer.textContent = text; return; }
      answer.textContent = '';
      answer.classList.add('is-typing');
      var i = 0;
      timer = setInterval(function () {
        i += 1;
        answer.textContent = text.slice(0, i);
        if (i >= text.length) { clearInterval(timer); answer.classList.remove('is-typing'); }
      }, 45);
    }
    replay.addEventListener('click', type);
    onceVisible(document.getElementById('chat-demo'), function () { setTimeout(type, 400); });
  }

  // Download Ultron: shake the cursor, flash Task Manager, declare victory.
  function setupInstall() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-install]'));
    var layer = document.getElementById('install');
    var cursor = layer && layer.querySelector('.install-cursor');
    var toast = document.getElementById('toast');
    if (!buttons.length || !layer || !cursor || !toast) return;
    var running = false;
    var toastTimer;

    function showToast(message) {
      toast.textContent = message;
      toast.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.hidden = true; }, 5000);
    }
    function finish() {
      layer.hidden = true;
      layer.classList.remove('show-taskman');
      running = false;
      showToast("There. You go. All done. It looks like Google Chrome, but it's really Ultron.");
      landHeroWord("NASA's");
    }
    function run() {
      if (running) return;
      running = true;
      if (reduceMotion) { finish(); return; }
      layer.hidden = false;
      var shakes = 0;
      var shake = setInterval(function () {
        cursor.style.left = (10 + Math.random() * 80) + '%';
        cursor.style.top = (10 + Math.random() * 80) + '%';
        shakes += 1;
        if (shakes >= 28) {
          clearInterval(shake);
          layer.classList.add('show-taskman');
          setTimeout(finish, 1300);
        }
      }, 60);
    }
    buttons.forEach(function (button) { button.addEventListener('click', run); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    playHero();
    setupHeroWord();
    setupMenu();
    setupModes();
    setupRamDownload();
    setupSafetyCheck();
    setupChat();
    setupInstall();
  });
})();
