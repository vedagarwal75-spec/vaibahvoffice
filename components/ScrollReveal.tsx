'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Adds the `.visible` class to `.fade-up` elements as they scroll into view. */
export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.fade-up:not(.visible)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 0.05}s`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, [pathname]);
  return null;
}
