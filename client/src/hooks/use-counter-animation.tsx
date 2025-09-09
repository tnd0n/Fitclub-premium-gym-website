import { useState, useEffect, useRef } from "react";

export function useCounterAnimation(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(target * easeOutQuart);
            
            setCount(currentValue);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          
          animate();
        }
      },
      { threshold: 0.5 }
    );

    // Create a dummy element to observe since we can't directly observe the count
    const dummyElement = document.createElement('div');
    dummyElement.style.position = 'absolute';
    dummyElement.style.top = '0';
    dummyElement.style.left = '0';
    dummyElement.style.width = '1px';
    dummyElement.style.height = '1px';
    dummyElement.style.opacity = '0';
    dummyElement.style.pointerEvents = 'none';
    
    // Find the stats section and append our dummy element
    const statsSection = document.querySelector('[data-testid*="stat-"]')?.parentElement;
    if (statsSection) {
      statsSection.appendChild(dummyElement);
      observer.observe(dummyElement);
    }

    return () => {
      observer.disconnect();
      if (dummyElement.parentElement) {
        dummyElement.parentElement.removeChild(dummyElement);
      }
    };
  }, [target, duration, hasStarted]);

  return count;
}
