/**
 * GoReview — Premium Supplement Review Platform
 * app.js — All Interactive Functionality
 */

(function($) {
  'use strict';

  /* ============================================================
     THEME TOGGLE (Light / Dark)
     ============================================================ */
  const ThemeManager = {
    key: 'goreview_theme',

    init() {
      const saved = localStorage.getItem(this.key) || 'light';
      this.apply(saved);

      $('#themeToggle').on('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        this.apply(next);
        localStorage.setItem(this.key, next);
      });
    },

    apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  /* ============================================================
     LANGUAGE MANAGER
     ============================================================ */
  const i18n = {
    en: {
      heroEyebrow: '2026 Expert Review',
      heroTitle: 'How a <em>Liver Supplement</em> Can Reduce Bloating & Brain Fog',
      heroLead: 'Harvard researchers warn that fatigue, brain fog, and bloating are the "Three Silent Symptoms" of toxic liver overload. 1 in 4 Americans have it without knowing.',
      crisisTitle: 'The Liver Health Crisis Doctors Aren\'t Discussing',
      navReviews: 'Top Reviews',
      navIngredients: 'Ingredients',
      navBuyGuide: 'Buying Guide',
      navAbout: 'About',
      btnTopPick: 'View Our #1 Pick',
      btnJumpReviews: 'Jump to Reviews',
      sectionBenefits: 'What Clinical-Grade Supplements Can Do',
      sectionIngredients: 'The 5 Ingredients You MUST Look For',
      sectionFails: 'Ingredients That Don\'t Work',
      sectionChecklist: 'Your 2026 Buying Checklist',
      sectionReviews: 'Top 5 Liver Health Supplements of 2026',
      sectionCompare: 'Head-to-Head Comparison',
      sectionTestimonials: 'Real Customer Experiences',
      footerDesc: 'Independent supplement reviews powered by clinical research, expert analysis, and real consumer feedback.',
      disclaimer: 'GoReview is an independent review platform. Some links on this page are affiliate links and we receive compensation when you purchase through them. This does not affect our editorial rankings. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
    },
    es: {
      heroEyebrow: 'Revisión Experta 2026',
      heroTitle: 'Cómo un <em>Suplemento Hepático</em> Puede Reducir la Hinchazón y la Niebla Mental',
      heroLead: 'Los investigadores de Harvard advierten que la fatiga, la niebla mental y la hinchazón son los "Tres Síntomas Silenciosos" de la sobrecarga tóxica del hígado. 1 de cada 4 estadounidenses lo padece sin saberlo.',
      crisisTitle: 'La Crisis de Salud Hepática que los Médicos No Mencionan',
      navReviews: 'Mejores Reseñas',
      navIngredients: 'Ingredientes',
      navBuyGuide: 'Guía de Compra',
      navAbout: 'Acerca de',
      btnTopPick: 'Ver Nuestra Opción #1',
      btnJumpReviews: 'Ver Reseñas',
      sectionBenefits: 'Lo que Pueden Hacer los Suplementos de Grado Clínico',
      sectionIngredients: 'Los 5 Ingredientes que DEBES Buscar',
      sectionFails: 'Ingredientes que No Funcionan',
      sectionChecklist: 'Su Lista de Compras 2026',
      sectionReviews: 'Los 5 Mejores Suplementos Hepáticos de 2026',
      sectionCompare: 'Comparación Cabeza a Cabeza',
      sectionTestimonials: 'Experiencias Reales de Clientes',
      footerDesc: 'Reseñas independientes de suplementos basadas en investigación clínica y análisis experto.',
      disclaimer: 'GoReview es una plataforma de revisión independiente. Algunos enlaces en esta página son enlaces de afiliados. Estas declaraciones no han sido evaluadas por la FDA. Este producto no está destinado a diagnosticar, tratar, curar o prevenir ninguna enfermedad.',
    },
    fr: {
      heroEyebrow: 'Avis d\'expert 2026',
      heroTitle: 'Comment un <em>Supplément Hépatique</em> Peut Réduire les Ballonnements',
      heroLead: 'Des chercheurs de Harvard avertissent que la fatigue, le brouillard cérébral et les ballonnements sont les "Trois Symptômes Silencieux" de la surcharge toxique du foie. 1 Américain sur 4 en souffre sans le savoir.',
      crisisTitle: 'La Crise de Santé Hépatique que les Médecins Ne Mentionnent Pas',
      navReviews: 'Meilleures Avis',
      navIngredients: 'Ingrédients',
      navBuyGuide: 'Guide d\'Achat',
      navAbout: 'À propos',
      btnTopPick: 'Voir Notre #1 Choix',
      btnJumpReviews: 'Voir les Avis',
      sectionBenefits: 'Ce que les Suppléments de Grade Clinique Peuvent Faire',
      sectionIngredients: 'Les 5 Ingrédients à RECHERCHER',
      sectionFails: 'Ingrédients qui Ne Fonctionnent Pas',
      sectionChecklist: 'Votre Liste de Vérification 2026',
      sectionReviews: 'Les 5 Meilleurs Suppléments Hépatiques de 2026',
      sectionCompare: 'Comparaison Directe',
      sectionTestimonials: 'Expériences Réelles des Clients',
      footerDesc: 'Avis indépendants sur les suppléments basés sur la recherche clinique et l\'analyse d\'experts.',
      disclaimer: 'GoReview est une plateforme d\'avis indépendante. Certains liens sur cette page sont des liens d\'affiliation. Ces déclarations n\'ont pas été évaluées par la FDA.',
    }
  };

  const LangManager = {
    current: 'en',
    key: 'goreview_lang',

    init() {
      const saved = localStorage.getItem(this.key) || 'en';
      this.apply(saved);

      $('#langBtn').on('click', (e) => {
        e.stopPropagation();
        $('#langDropdown').toggleClass('open');
      });
      $(document).on('click', () => $('#langDropdown').removeClass('open'));
      $('#langDropdown').on('click', (e) => e.stopPropagation());

      $('.lang-option').on('click', function() {
        const lang = $(this).data('lang');
        LangManager.apply(lang);
        localStorage.setItem(LangManager.key, lang);
        $('#langDropdown').removeClass('open');
      });
    },

    apply(lang) {
      if (!i18n[lang]) return;
      this.current = lang;
      const t = i18n[lang];

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
          el.innerHTML = t[key];
        }
      });

      // Update active state
      document.querySelectorAll('.lang-option').forEach(el => {
        el.classList.toggle('active', el.dataset.lang === lang);
      });

      // Update flag
      const flags = { en: '🇺🇸', es: '🇪🇸', fr: '🇫🇷' };
      const names = { en: 'EN', es: 'ES', fr: 'FR' };
      $('#langFlagDisplay').text(flags[lang] || '🇺🇸');
      $('#langNameDisplay').text(names[lang] || 'EN');
    }
  };

  /* ============================================================
     NAVBAR — Scroll effect
     ============================================================ */
  const NavManager = {
    init() {
      $(window).on('scroll', this.onScroll.bind(this));
      this.onScroll();

      $('#hamburger').on('click', () => {
        $('#mobileMenu').addClass('open');
        $('#mobileMenuOverlay').addClass('open');
        $('body').css('overflow', 'hidden');
      });
      $('#mobileClose, #mobileMenuOverlay').on('click', () => {
        $('#mobileMenu').removeClass('open');
        $('#mobileMenuOverlay').removeClass('open');
        $('body').css('overflow', '');
      });
    },

    onScroll() {
      const scrolled = $(window).scrollTop() > 20;
      $('#mainNav').toggleClass('scrolled', scrolled);
    }
  };

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  const BackToTop = {
    init() {
      $(window).on('scroll', this.onScroll);
      $('#backToTop').on('click', () => {
        $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
      });
    },
    onScroll() {
      const show = $(window).scrollTop() > 400;
      $('#backToTop').toggleClass('visible', show);
    }
  };

  /* ============================================================
     STICKY TABS — Highlight active section
     ============================================================ */
  const StickyTabs = {
    sections: [],
    init() {
      this.sections = $('.tab-link').map(function() {
        return $(this).attr('href');
      }).get().filter(href => href && href.startsWith('#'));

      $(window).on('scroll', this.onScroll.bind(this));

      $('.tab-link').on('click', function(e) {
        const href = $(this).attr('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = $(href);
          if (target.length) {
            const offset = target.offset().top - 120;
            $('html, body').animate({ scrollTop: offset }, 500);
          }
        }
      });
    },
    onScroll() {
      const scrollPos = $(window).scrollTop() + 160;
      StickyTabs.sections.forEach(id => {
        const el = $(id);
        if (el.length) {
          const top = el.offset().top;
          const bottom = top + el.outerHeight();
          if (scrollPos >= top && scrollPos < bottom) {
            $('.tab-link').removeClass('active');
            $(`.tab-link[href="${id}"]`).addClass('active');
          }
        }
      });
    }
  };

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  const ScrollReveal = {
    init() {
      const elements = document.querySelectorAll('.reveal');
      if (!elements.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      elements.forEach(el => observer.observe(el));
    }
  };

  /* ============================================================
     SCORE BAR ANIMATION
     ============================================================ */
  const ScoreBars = {
    init() {
      const bars = document.querySelectorAll('.score-bar-fill');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const width = target.dataset.width || '0%';
            setTimeout(() => { target.style.width = width; }, 100);
            observer.unobserve(target);
          }
        });
      }, { threshold: 0.3 });

      bars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
      });
    }
  };

  /* ============================================================
     ACCORDION / FAQ
     ============================================================ */
  const Accordion = {
    init() {
      $(document).on('click', '.accordion-trigger', function() {
        const $item = $(this).closest('.accordion-item');
        const $content = $item.find('.accordion-content');
        const isOpen = $item.hasClass('open');

        $('.accordion-item').not($item).removeClass('open').find('.accordion-content').slideUp(200);
        $item.toggleClass('open', !isOpen);
        if (!isOpen) { $content.slideDown(250); }
        else          { $content.slideUp(200); }
      });
    }
  };

  /* ============================================================
     SMOOTH CTA CLICK TRACKING (console log for demo)
     ============================================================ */
  const CTATracker = {
    init() {
      $(document).on('click', '.btn-primary, .btn-accent', function() {
        const label = $(this).text().trim();
        console.log('[GoReview] CTA clicked:', label);
      });
    }
  };

  /* ============================================================
     COUNTER ANIMATION
     ============================================================ */
  const CounterAnim = {
    init() {
      const counters = document.querySelectorAll('[data-count]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const duration = 1400;
            const step = Math.ceil(target / (duration / 16));
            let current = 0;
            const interval = setInterval(() => {
              current = Math.min(current + step, target);
              el.textContent = current + (el.dataset.suffix || '');
              if (current >= target) clearInterval(interval);
            }, 16);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(el => observer.observe(el));
    }
  };

  /* ============================================================
     TOOLTIP (simple)
     ============================================================ */
  const Tooltip = {
    init() {
      $(document).on('mouseenter', '[data-tip]', function(e) {
        const tip = $(this).data('tip');
        const $tooltip = $('<div class="gr-tooltip">').text(tip).appendTo('body');
        const pos = $(this).offset();
        $tooltip.css({
          top: pos.top - $tooltip.outerHeight() - 8,
          left: pos.left + $(this).outerWidth() / 2 - $tooltip.outerWidth() / 2
        });
      }).on('mouseleave', '[data-tip]', function() {
        $('.gr-tooltip').remove();
      });
    }
  };

  /* ============================================================
     INIT ALL
     ============================================================ */
  $(document).ready(function() {
    ThemeManager.init();
    LangManager.init();
    NavManager.init();
    BackToTop.init();
    StickyTabs.init();
    ScrollReveal.init();
    ScoreBars.init();
    Accordion.init();
    CTATracker.init();
    CounterAnim.init();
    Tooltip.init();

    // Smooth anchor links
    $('a[href^="#"]').not('.tab-link').on('click', function(e) {
      const href = $(this).attr('href');
      const target = $(href);
      if (target.length) {
        e.preventDefault();
        const offset = target.offset().top - 100;
        $('html, body').animate({ scrollTop: offset }, 550);
      }
    });

    console.log('%cGoReview Loaded', 'color:#1A6B4A;font-size:16px;font-weight:bold;');
  });

})(jQuery);