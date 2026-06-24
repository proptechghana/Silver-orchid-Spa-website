'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

function useInViewClient<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0, rootMargin: '-80px' }
) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      options
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [options.threshold, options.rootMargin]);

  return { ref, isInView };
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  direction = 'up',
  distance = 30,
}: FadeInProps) {
  const { ref, isInView } = useInViewClient<HTMLDivElement>({
    rootMargin: '-80px',
  });

  const directions = {
    up: { transform: `translateY(${distance}px)` },
    down: { transform: `translateY(${-distance}px)` },
    left: { transform: `translateX(${distance}px)` },
    right: { transform: `translateX(${-distance}px)` },
    none: { transform: 'translate(0, 0)' },
  };

  const startStyle = {
    opacity: 0,
    ...directions[direction],
    transition: `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
  };

  const endStyle = {
    opacity: 1,
    transform: 'translate(0, 0)',
    transition: `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
  };

  return (
    <div
      ref={ref}
      style={isInView ? endStyle : startStyle}
      className={className}
    >
      {children}
    </div>
  );
}
