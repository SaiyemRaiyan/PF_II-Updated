import { useEffect } from 'react';

// Adds `.in` to every [data-reveal] element as it scrolls into view.
// Re-runs when `key` changes (e.g. after the project filter re-renders cards).
export function useReveal(key) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [key]);
}
