import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollTrigger(sectionRef, animationFactory) {
  useEffect(() => {
    const ctx = gsap.context(animationFactory, sectionRef);
    return () => ctx.revert();
  }, []);
}
