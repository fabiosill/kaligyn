/* ============================================================
   KALIGYM FITNESS CENTER — script.js
   JavaScript puro, sem dependências. Organizado por função:

   1. Menu mobile (hambúrguer)
   2. Cabeçalho com sombra ao rolar a página
   3. Revelação de elementos ao rolar (Intersection Observer)
   4. Link de navegação ativo conforme a seção visível
   5. Ano atual no rodapé
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------
     1. MENU MOBILE (hambúrguer + painel lateral)
     ------------------------------------------------------------ */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');
  var navBackdrop = document.getElementById('navBackdrop');
  var navLinks = nav ? nav.querySelectorAll('.nav__link') : [];

  function openMenu() {
    nav.classList.add('is-open');
    navBackdrop.classList.add('is-visible');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    navBackdrop.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('no-scroll');
  }

  function toggleMenu() {
    if (nav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger && nav && navBackdrop) {
    hamburger.addEventListener('click', toggleMenu);
    navBackdrop.addEventListener('click', closeMenu);

    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Se a tela crescer para o layout desktop com o menu mobile aberto,
    // fecha o painel para não ficar preso em estado inconsistente.
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && nav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ------------------------------------------------------------
     2. CABEÇALHO COM SOMBRA AO ROLAR
     ------------------------------------------------------------ */
  var header = document.getElementById('header');

  function updateHeaderState() {
    if (window.scrollY > 12) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  if (header) {
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  /* ------------------------------------------------------------
     3. REVELAÇÃO DE ELEMENTOS AO ROLAR (fade + slide sutil)
     ------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Sem suporte a Intersection Observer, ou usuário prefere menos
    // movimento: exibe o conteúdo imediatamente, sem animação.
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------------
     4. LINK DE NAVEGAÇÃO ATIVO CONFORME A SEÇÃO VISÍVEL
     ------------------------------------------------------------ */
  var sections = document.querySelectorAll('main section[id]');
  var menuLinks = document.querySelectorAll('.nav__link');

  if ('IntersectionObserver' in window && sections.length && menuLinks.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var id = entry.target.getAttribute('id');
        var activeLink = document.querySelector('.nav__link[href="#' + id + '"]');
        if (!activeLink) return;

        menuLinks.forEach(function (link) { link.classList.remove('nav__link--active'); });
        activeLink.classList.add('nav__link--active');
      });
    }, {
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ------------------------------------------------------------
     5. ANO ATUAL NO RODAPÉ (mantém o copyright sempre correto)
     ------------------------------------------------------------ */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
