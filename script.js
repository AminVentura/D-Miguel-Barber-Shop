(function () {
  'use strict';

  var PHONE = '13479016180';
  var WHATSAPP_BASE = 'https://wa.me/' + PHONE;

  // Language switcher: EN / ES
  var root = document.documentElement;
  var savedLang = localStorage.getItem('dmiguel-lang') || 'en';
  root.setAttribute('data-lang', savedLang);

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    if (btn.getAttribute('data-lang') === savedLang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = this.getAttribute('data-lang');
      root.setAttribute('data-lang', lang);
      root.setAttribute('lang', lang === 'es' ? 'es' : 'en');
      localStorage.setItem('dmiguel-lang', lang);
      document.querySelectorAll('.lang-btn').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang);
      });
    });
  });
  if (savedLang === 'es') root.setAttribute('lang', 'es');

  function buildWhatsAppMessage(form) {
    var date = form.querySelector('#date').value;
    var time = form.querySelector('#time').value;
    var barber = (form.querySelector('#barber').value || '').trim();
    var altTime = (form.querySelector('#alt-time').value || '').trim();
    var name = (form.querySelector('#name').value || '').trim();
    var phone = (form.querySelector('#phone').value || '').trim();

    var parts = [
      'Hi, I\'d like to book an appointment.',
      'Preferred date: ' + date,
      'Preferred time: ' + time
    ];
    if (barber) parts.push('Barber: ' + barber);
    if (altTime) parts.push('Alternative time: ' + altTime);
    parts.push('Name: ' + name);
    parts.push('Phone: ' + phone);
    parts.push('');
    parts.push('If this slot is not available with the requested barber, please suggest the nearest available time. Thanks!');

    return parts.join('\n');
  }

  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = encodeURIComponent(buildWhatsAppMessage(form));
      window.open(WHATSAPP_BASE + '?text=' + text, '_blank', 'noopener');
    });
  }

  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
    });
  }

  document.querySelectorAll('.nav-list a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
