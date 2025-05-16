
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

  useEffect(() => {
    if (!isClient) return;

    let animationFrameId: number;
    const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

    const animateOutline = () => {
      setOutlinePosition(prev => ({
        x: lerp(prev.x, mousePosition.x, 0.15), // Slightly slower lerp for smoother trail
        y: lerp(prev.y, mousePosition.y, 0.15),
      }));
      animationFrameId = requestAnimationFrame(animateOutline);
    };

    if (isClient) {
      animationFrameId = requestAnimationFrame(animateOutline);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition, isClient]);


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

  const outlineBaseSize = 36; // Slightly larger outline
  const dotBaseSize = 6; // Slightly smaller dot

  const outlineStyle = {
    width: `${isPointer ? outlineBaseSize * 1.5 : outlineBaseSize}px`, // More pronounced interactive scale
    height: `${isPointer ? outlineBaseSize * 1.5 : outlineBaseSize}px`,
    transform: `translate(-50%, -50%) translate3d(${outlinePosition.x}px, ${outlinePosition.y}px, 0) scale(${isMouseDown ? 0.8 : 1})`, // Slightly more shrink on click
    borderColor: 'hsl(var(--accent))',
    borderWidth: '1.5px', // Thinner border for a sleeker look
  };

  const dotStyle = {
    width: `${dotBaseSize}px`,
    height: `${dotBaseSize}px`,
    transform: `translate(-50%, -50%) translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale(${isMouseDown ? 1.2 : 1})`,
    backgroundColor: 'hsl(var(--accent))',
  };

  return (
    <>
      <div
        className={cn(
          'fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9998]',
          'transition-all duration-100 ease-out', 
          isVisible ? 'opacity-75' : 'opacity-0' // Slightly less opacity for the outline
        )}
        style={outlineStyle}
      />
      <div
        className={cn(
          'fixed top-0 left-0 rounded-full pointer-events-none z-[9999]',
          'transition-opacity duration-50 ease-out', // Faster opacity transition for dot
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={dotStyle}
      />
    </>
  );
}
