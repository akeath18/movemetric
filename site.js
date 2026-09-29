// Scroll reveal from the brand guide: blocks fade and rise 24px as they
// enter the viewport, once. Without IntersectionObserver, or with reduced
// motion, everything is shown immediately.
(function () {
  var items = document.querySelectorAll('.reveal');
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || still) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
