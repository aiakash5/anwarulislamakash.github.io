(function () {
  'use strict';

  // --- Nav: smooth scroll for anchor links ---
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        var id = href.slice(1);
        var target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // --- Nav: highlight active section based on scroll position ---
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    var scrollY = window.pageYOffset;
    var current = null;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      if (scrollY >= top - 80) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href === '#' + current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', function () {
    requestAnimationFrame(updateActiveNav);
  });
  updateActiveNav();

  // --- Lightbox for project images ---
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImage) {
    document.querySelectorAll('.project-image[data-lightbox]').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImage.src = this.src;
        lightboxImage.alt = this.alt;
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImage.src = '';
      document.body.style.overflow = '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
        closeLightbox();
      }
    });
  }
})();
