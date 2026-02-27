(function () {
  'use strict';

  // Hero dots – switch slides (single slide for now; add more .hero-slide in HTML to extend)
  var heroDots = document.querySelectorAll('.hero-dot');
  var heroSlides = document.querySelectorAll('.hero-slide');

  function setActiveSlide(index) {
    heroSlides.forEach(function (s, i) {
      s.classList.toggle('active', i === index);
    });
    heroDots.forEach(function (d, i) {
      d.classList.toggle('active', i === index);
    });
  }

  heroDots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      setActiveSlide(index);
    });
  });

  // World tabs – toggle active state (visual only)
  var worldTabs = document.querySelectorAll('.world-tab');
  worldTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      worldTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
    });
  });
})();
