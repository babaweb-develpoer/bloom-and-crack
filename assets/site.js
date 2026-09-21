/* Bloom & Crack
   Photography and the hero loop come from Canva. The loop only downloads where it is wanted,
   and holding the pour button crossfades two photographs of the same cup. */
(function () {
  'use strict';

  var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };

  /* ------------------------------------------------------------------ *
   * Page behaviour
   * ------------------------------------------------------------------ */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  var buybar = document.getElementById('buybar');
  var timeline = document.getElementById('timeline');
  var pinned = false;

  /* entrances */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      if (e.target.classList.contains('stagger')) {
        var kids = [].slice.call(e.target.children);
        kids.forEach(function (kid, i) { kid.style.setProperty('--d', (i * 0.08).toFixed(2) + 's'); });
        window.setTimeout(function () { e.target.classList.add('done'); }, 900 + kids.length * 80);
      }
      io.unobserve(e.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  [].slice.call(document.querySelectorAll('[data-in]')).forEach(function (el) { io.observe(el); });

  /* menu */
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* the line that draws itself down the timeline */
  var lineDrawn = -1;
  function drawLine() {
    if (!timeline || pinned) return;
    var r = timeline.getBoundingClientRect();
    var span = r.height + window.innerHeight * 0.4;
    var d = clamp((window.innerHeight * 0.85 - r.top) / span, 0, 1);
    if (Math.abs(d - lineDrawn) < 0.01) return;
    lineDrawn = d;
    timeline.style.setProperty('--draw', d.toFixed(3));
  }

  /* the sticky buy bar steps aside once the form itself is on screen */
  var ticking = false, barShown = null, formInView = false;
  var pickSec = document.getElementById('pick');
  if (pickSec && buybar) {
    new IntersectionObserver(function (entries) {
      formInView = entries[0].isIntersecting;
      onScroll();
    }, { threshold: 0.12 }).observe(pickSec);
  }
  function onScroll() {
    if (nav) nav.classList.toggle('solid', window.scrollY > 24);
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      drawLine();
      if (buybar) {
        var shop = document.getElementById('buy');
        var show = !!shop && !formInView &&
          window.scrollY > shop.offsetTop - window.innerHeight * 0.4;
        if (show !== barShown) { barShown = show; buybar.classList.toggle('show', show); }
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* the hero brew loop: plays everywhere, but a phone gets a third of the bytes */
  var heroVideo = document.getElementById('heroVideo');
  var heroSmall = window.matchMedia('(max-width: 720px)');
  var heroOnScreen = true;
  function heroBlocked() {
    return reduced.matches || !!(navigator.connection && navigator.connection.saveData);
  }
  function heroSrc() {
    return heroSmall.matches ? 'assets/hero-loop-sm.mp4' : 'assets/hero-loop.mp4';
  }
  function armHeroVideo() {
    if (!heroVideo) return;
    if (heroBlocked()) {
      if (heroVideo.getAttribute('src')) {
        heroVideo.pause();
        heroVideo.removeAttribute('src');
        heroVideo.load();                      /* the poster stays, the file is dropped */
      }
      return;
    }
    var want = heroSrc();
    if (heroVideo.getAttribute('src') !== want) {
      heroVideo.setAttribute('src', want);     /* swaps if the viewport crosses the breakpoint */
      heroVideo.load();
    }
    playHero();
  }
  function playHero() {
    if (!heroVideo || heroBlocked() || !heroOnScreen || document.hidden) return;
    var p = heroVideo.play();
    if (p && p.catch) p.catch(function () { /* autoplay can be refused; the poster carries it */ });
  }
  if (heroVideo) {
    new IntersectionObserver(function (entries) {
      heroOnScreen = entries[0].isIntersecting;
      if (heroOnScreen) playHero(); else heroVideo.pause();
    }, { threshold: 0.05 }).observe(heroVideo);
    heroSmall.addEventListener('change', armHeroVideo);
  }

  /* hold to pour */
  var holdBtn = document.getElementById('holdBtn');
  var pourFrame = document.getElementById('pourFrame');
  var pourSec = document.getElementById('pour');
  var holdK = 0, holding = false, holdRaf = null, holdLast = 0, poured = false;

  /* holding crossfades the flat bed into the risen one: two photographs, same cup */
  function paintHold() {
    if (holdBtn) holdBtn.style.setProperty('--hold', holdK.toFixed(3));
    if (pourFrame) pourFrame.style.setProperty('--hold', holdK.toFixed(3));
  }

  function holdFrame(now) {
    var dt = Math.min(100, now - (holdLast || now));
    holdLast = now;
    /* let go early and it sinks back; finish the pour and it stays bloomed */
    holdK = clamp(holdK + (holding ? dt / 1700 : (poured ? 0 : -dt / 950)), 0, 1);
    paintHold();
    if (holdK >= 1 && !poured) {
      poured = true;
      if (pourSec) pourSec.classList.add('poured');
      if (holdBtn) holdBtn.querySelector('.holdbtn__label').textContent = 'Poured';
    }
    if (holding || (holdK > 0 && !poured)) holdRaf = requestAnimationFrame(holdFrame);
    else { holdRaf = null; holdLast = 0; }
  }
  function startHold() {
    if (holding) return;
    holding = true;
    if (holdRaf === null) { holdLast = 0; holdRaf = requestAnimationFrame(holdFrame); }
  }
  function endHold() {
    holding = false;
    if (holdRaf === null && holdK > 0 && !poured) { holdLast = 0; holdRaf = requestAnimationFrame(holdFrame); }
  }
  if (holdBtn) {
    holdBtn.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      try { holdBtn.setPointerCapture(e.pointerId); } catch (err) { /* capture is a nicety */ }
      startHold();
    });
    holdBtn.addEventListener('pointerup', endHold);
    holdBtn.addEventListener('pointercancel', endHold);
    holdBtn.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) startHold(); }
    });
    holdBtn.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') endHold(); });
    holdBtn.addEventListener('blur', endHold);
  }

  /* the answers */
  [].slice.call(document.querySelectorAll('.q__btn')).forEach(function (btn) {
    var panel = btn.nextElementSibling;
    var timer = null;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      window.clearTimeout(timer);
      if (open) {
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        timer = window.setTimeout(function () { panel.hidden = true; }, 430);
      } else {
        panel.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(function () { panel.classList.add('open'); });
      }
    });
  });

  /* the form: nothing is sent, and the page says so */
  var form = document.getElementById('pickForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = document.getElementById('formErr');
      var ok = document.getElementById('formOk');
      var brewSel = document.getElementById('brew-method');
      var tasteSel = document.getElementById('taste');
      var email = document.getElementById('email');
      var problem = '';
      if (!brewSel.value || !tasteSel.value) problem = 'Pick an answer for both questions first.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) problem = 'That email address does not look right.';
      if (problem) {
        err.textContent = problem;
        err.hidden = false;
        (!brewSel.value ? brewSel : !tasteSel.value ? tasteSel : email).focus();
        return;
      }
      err.hidden = true;
      form.hidden = true;
      ok.hidden = false;
      ok.setAttribute('tabindex', '-1');
      ok.focus();
    });
  }

  document.addEventListener('visibilitychange', function () {
    document.body.classList.toggle('paused', document.hidden);
    if (document.hidden) { if (heroVideo) heroVideo.pause(); } else playHero();
  });

  /* reduced motion, honored live in both directions */
  function pinToFinalStates() {
    pinned = true;
    if (timeline) timeline.style.setProperty('--draw', '1');
    if (pourSec) pourSec.classList.add('poured');
    holdK = 1;
    paintHold();
    [].slice.call(document.querySelectorAll('[data-in]')).forEach(function (el) {
      el.classList.add('in');
      if (el.classList.contains('stagger')) el.classList.add('done');
    });
  }
  function unpinFinalStates() {
    if (!pinned) return;
    pinned = false;
    lineDrawn = -1;
    if (timeline) timeline.style.removeProperty('--draw');
    if (!poured) {
      if (pourSec) pourSec.classList.remove('poured');
      holdK = 0;
      paintHold();
    }
    drawLine();
  }
  reduced.addEventListener('change', function (e) {
    if (e.matches) pinToFinalStates(); else unpinFinalStates();
    armHeroVideo();
  });

  var rt = null;
  window.addEventListener('resize', function () {
    window.clearTimeout(rt);
    rt = window.setTimeout(function () {
      lineDrawn = -1;
      drawLine();
    }, 160);
  });

  function boot() {
    armHeroVideo();
    paintHold();
    if (reduced.matches) pinToFinalStates();
    onScroll();
    drawLine();
  }
  if (document.readyState === 'complete') boot();
  else window.addEventListener('load', boot);
})();
