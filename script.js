/**
 * ========================================================
 * ABHISHEK RG PORTFOLIO — INTERACTION LOGIC
 * Handles mobile press-to-grayscale, scroll reveal,
 * smooth anchor navigation, and touch events
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. SCROLL FADE-IN & SLIDE-UP ANIMATION
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => scrollObserver.observe(el));


  // 2. MOBILE TOUCH: GRAYSCALE ONLY WHILE FINGER IS HELD / PRESSED
  const interactiveHoldElements = document.querySelectorAll('.image-viewport, .lift-card');

  interactiveHoldElements.forEach((element) => {
    // Touch begins -> activate grayscale + slight zoom
    element.addEventListener('touchstart', () => {
      element.classList.add('touch-pressed');
    }, { passive: true });

    // Touch ends / finger lifts -> immediately revert to normal color
    element.addEventListener('touchend', () => {
      element.classList.remove('touch-pressed');
    }, { passive: true });

    // Finger leaves target area or scroll takes over -> revert
    element.addEventListener('touchcancel', () => {
      element.classList.remove('touch-pressed');
    }, { passive: true });
  });


  // 3. SMOOTH SCROLL FOR ANCHOR LINKS
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

});