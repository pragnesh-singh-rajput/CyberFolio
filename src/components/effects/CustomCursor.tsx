
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [outlinePosition, setOutlinePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touchSupport);
      if (!touchSupport) {
        document.body.style.cursor = 'none';
      }
    }
    return () => {
      if (typeof window !== 'undefined' && !('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
         document.body.style.cursor = 'auto';
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient || isTouchDevice) return;

    const updateMousePositionDirect = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible && document.pointerLockElement === null) {
        setIsVisible(true);
      }
    };
    document.addEventListener('mousemove', updateMousePositionDirect, { passive: true });
    return () => document.removeEventListener('mousemove', updateMousePositionDirect);
  }, [isVisible, isClient, isTouchDevice]);

  useEffect(() => {
    if (!isClient || isTouchDevice) return;

    let animationFrameId: number;
    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

    const animateOutline = () => {
      setOutlinePosition(prev => ({
        x: lerp(prev.x, mousePosition.x, 0.15), // Keep lerp for smooth trail
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationFrameId = requestAnimationFrame(animateOutline);
    };

    animationFrameId = requestAnimationFrame(animateOutline);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition, isClient, isTouchDevice]);


  useEffect(() => {
    if (!isClient || isTouchDevice) return;

    const handleMouseEnterDoc = () => {
        if(document.pointerLockElement === null) setIsVisible(true);
    }
    const handleMouseLeaveDoc = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const targetElement = e.target as HTMLElement;
        setIsPointer(
          !!targetElement.closest(
            'a, button, input[type="submit"], input[type="checkbox"], input[type="radio"], label[for], select, textarea, [role="button"], [data-cursor-interactive]'
          )
        );
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    
    const handlePointerLockChange = () => {
        if (document.pointerLockElement) {
            setIsVisible(false);
        }
    };

    document.documentElement.addEventListener('mouseenter', handleMouseEnterDoc);
    document.documentElement.addEventListener('mouseleave', handleMouseLeaveDoc);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.documentElement.removeEventListener('mouseenter', handleMouseEnterDoc);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeaveDoc);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [isClient, isTouchDevice]);

  if (!isClient || isTouchDevice) {
    return null;
  }

  const outlineBaseSize = 36; // Slightly smaller base
  const dotBaseSize = 7;    // Slightly smaller base

  const outlineStyle = {
    width: `${isPointer ? outlineBaseSize * 1.4 : outlineBaseSize}px`, // Reduced hover scale
    height: `${isPointer ? outlineBaseSize * 1.4 : outlineBaseSize}px`,
    transform: `translate(-50%, -50%) translate3d(${outlinePosition.x}px, ${outlinePosition.y}px, 0) scale(${isMouseDown ? 0.8 : 1})`, // Slightly increased mousedown scale down
    borderColor: 'hsl(var(--accent))', // Always accent color
    borderWidth: '1.5px', // Thinner border
  };

  const dotStyle = {
    width: `${dotBaseSize}px`,
    height: `${dotBaseSize}px`,
    transform: `translate(-50%, -50%) translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale(${isMouseDown ? 1.4 : 1})`, // More pronounced mousedown scale for dot
    backgroundColor: 'hsl(var(--accent))', // Always accent color
  };

  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9998]',
          'transition-all duration-100 ease-out', 
          isVisible ? 'opacity-70' : 'opacity-0' // Slightly more opaque
        )}
        style={outlineStyle}
      />
      <div
        className={cn(
          'fixed top-0 left-0 rounded-full pointer-events-none z-[9999]',
          'transition-opacity duration-50 ease-out',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={dotStyle}
      />
    </>
  );
}
