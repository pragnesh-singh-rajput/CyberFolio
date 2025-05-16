
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update mousePosition directly on mousemove
  useEffect(() => {
    if (!isClient) return;

    const updateMousePositionDirect = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible && document.pointerLockElement === null) {
        setIsVisible(true);
      }
    };
    document.addEventListener('mousemove', updateMousePositionDirect, { passive: true });
    return () => document.removeEventListener('mousemove', updateMousePositionDirect);
  }, [isVisible, isClient]);

  // Update outlinePosition with a delay (for the trail effect using lerp)
  useEffect(() => {
    if (!isClient) return;

    let animationFrameId: number;
    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

    const animateOutline = () => {
      setOutlinePosition(prev => ({
        x: lerp(prev.x, mousePosition.x, 0.2), // Adjust 0.2 for smoothing
        y: lerp(prev.y, mousePosition.y, 0.2),
      }));
      animationFrameId = requestAnimationFrame(animateOutline);
    };

    if (isClient) {
      animationFrameId = requestAnimationFrame(animateOutline);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition, isClient]);


  // Handle document visibility and interactive element states
  useEffect(() => {
    if (!isClient) return;

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
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  const outlineBaseSize = 32;
  const dotBaseSize = 8;

  const outlineStyle = {
    width: `${isPointer ? outlineBaseSize * 1.4 : outlineBaseSize}px`,
    height: `${isPointer ? outlineBaseSize * 1.4 : outlineBaseSize}px`,
    transform: `translate(-50%, -50%) translate3d(${outlinePosition.x}px, ${outlinePosition.y}px, 0) scale(${isMouseDown ? 0.85 : 1})`,
    borderColor: 'hsl(var(--accent))',
  };

  const dotStyle = {
    width: `${dotBaseSize}px`,
    height: `${dotBaseSize}px`,
    transform: `translate(-50%, -50%) translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale(${isMouseDown ? 1.1 : 1})`,
    backgroundColor: 'hsl(var(--accent))',
  };

  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9998]',
          'transition-all duration-150 ease-out', // For size, scale, and opacity (if class based)
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={outlineStyle}
      />
      <div
        className={cn(
          'fixed top-0 left-0 rounded-full pointer-events-none z-[9999]',
          'transition-opacity duration-100 ease-out', // For opacity
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={dotStyle}
      />
    </>
  );
}
