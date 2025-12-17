// @ts-check
/**
 * Minimal replacement for wow.js using IntersectionObserver.
 * Elements opt-in with:
 *  - class: "js-animate-on-scroll"
 *  - data-animate: e.g. "animate__fadeIn"
 *  - optional data-wow-delay: e.g. ".15s" or "150ms"
 */

function initScrollAnimations() {
  const els = document.querySelectorAll(".js-animate-on-scroll");
  if (!els.length) return;

  // Respect reduced motion
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (const el of els) {
      const animation = el.getAttribute("data-animate");
      if (animation) el.classList.add("animate__animated", animation);
      el.classList.remove("js-animate-on-scroll");
    }
    return;
  }

  const apply = (/** @type {Element} */ el) => {
    const animation = el.getAttribute("data-animate");
    if (!animation) return;

    const delay = el.getAttribute("data-wow-delay");
    if (delay) {
      // animate.css v4 uses standard CSS animation-delay
      // @ts-ignore - style exists in browsers
      el.style.animationDelay = delay;
    }

    el.classList.add("animate__animated", animation);
    el.classList.remove("js-animate-on-scroll");
  };

  if (!("IntersectionObserver" in window)) {
    for (const el of els) apply(el);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        apply(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );

  for (const el of els) observer.observe(el);
}

document.addEventListener("DOMContentLoaded", initScrollAnimations);


