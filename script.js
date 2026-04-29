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

  function buildMainBookingMessage(form) {
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

  function buildTeamBookingMessage(form) {
    var staffName = form.getAttribute('data-staff-name') || 'Team member';
    var service = (form.querySelector('[name="service"]').value || '').trim();
    var date = form.querySelector('[name="date"]').value;
    var time = form.querySelector('[name="time"]').value;
    var name = (form.querySelector('[name="name"]').value || '').trim();
    var notes = (form.querySelector('[name="notes"]').value || '').trim();

    return [
      'Hola, quiero reservar una cita.',
      'Profesional: ' + staffName,
      'Servicio: ' + service,
      'Fecha: ' + date,
      'Hora preferida: ' + time,
      'Nombre del cliente: ' + name,
      'Descripcion: ' + notes,
      '',
      'Por favor confirmen por WhatsApp si este horario esta disponible.'
    ].join('\n');
  }

  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = encodeURIComponent(buildMainBookingMessage(form));
      window.open(WHATSAPP_BASE + '?text=' + text, '_blank', 'noopener');
    });
  }

  document.querySelectorAll('.js-whatsapp-booking-form').forEach(function (teamForm) {
    teamForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = encodeURIComponent(buildTeamBookingMessage(teamForm));
      window.open(WHATSAPP_BASE + '?text=' + text, '_blank', 'noopener');
    });
  });

  document.querySelectorAll('.team-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var targetId = button.getAttribute('data-target');
      var target = document.getElementById(targetId);
      if (!target) return;

      var isHidden = target.hasAttribute('hidden');
      target.toggleAttribute('hidden');
      button.setAttribute('aria-expanded', String(isHidden));
    });
  });

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

  // Booksy: un solo lugar para la URL (data-booksy-url en #booking-booksy-link)
  var booksyLink = document.getElementById('booking-booksy-link');
  if (booksyLink) {
    var bookUrl = booksyLink.getAttribute('data-booksy-url');
    if (bookUrl) booksyLink.setAttribute('href', bookUrl);
  }
})();
