import { useState, useEffect } from 'react';

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? null);

  useEffect(() => {
    if (!sectionIds.length) return;

    // Track intersection ratios for all observed sections
    const ratios = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios[entry.target.id] = entry.intersectionRatio;
        });

        // Pick the section with the highest intersection ratio
        let bestId = null;
        let bestRatio = 0;
        for (const id of sectionIds) {
          const ratio = ratios[id] ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId !== null && bestRatio > 0) {
          setActiveSection(bestId);
        }
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
