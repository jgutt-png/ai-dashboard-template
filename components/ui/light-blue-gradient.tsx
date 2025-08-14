"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export const LightBlueGradient = ({
  className,
  showGradient = true,
}: {
  className?: string;
  showGradient?: boolean;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return;

    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!showGradient) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-0 overflow-hidden pointer-events-none -z-10",
        className
      )}
      style={{
        background: "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(219, 234, 254, 0.3) 70%, rgba(147, 197, 253, 0.4) 100%)",
      }}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      
      <div className="gradients-container h-full w-full blur-lg">
        {/* First gradient orb - light blue */}
        <motion.div
          className={cn(
            "absolute w-[80%] h-[80%] top-[60%] left-[calc(50%-40%)]",
            "bg-gradient-radial from-blue-200/40 via-blue-100/20 to-transparent",
            "opacity-60"
          )}
          style={{
            background: "radial-gradient(circle at center, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0.1) 50%, transparent 70%)",
          }}
          animate={{
            x: (mousePosition.x - windowSize.width / 2) * 0.15,
            y: (mousePosition.y - windowSize.height / 2) * 0.12,
          }}
          transition={{ type: "spring", stiffness: 20, damping: 25 }}
        />
        
        {/* Second gradient orb - sky blue */}
        <motion.div
          className={cn(
            "absolute w-[70%] h-[70%] top-[70%] left-[calc(50%-35%)]",
            "opacity-40"
          )}
          style={{
            background: "radial-gradient(circle at center, rgba(125, 211, 252, 0.3) 0%, rgba(125, 211, 252, 0.1) 50%, transparent 70%)",
          }}
          animate={{
            x: (mousePosition.x - windowSize.width / 2) * -0.12,
            y: (mousePosition.y - windowSize.height / 2) * -0.08,
          }}
          transition={{ type: "spring", stiffness: 15, damping: 30 }}
        />
        
        {/* Third gradient orb - powder blue */}
        <motion.div
          className={cn(
            "absolute w-[90%] h-[90%] top-[65%] left-[calc(50%-45%)]",
            "opacity-30"
          )}
          style={{
            background: "radial-gradient(circle at center, rgba(186, 230, 253, 0.3) 0%, rgba(186, 230, 253, 0.1) 50%, transparent 70%)",
          }}
          animate={{
            x: (mousePosition.x - windowSize.width / 2) * 0.18,
            y: (mousePosition.y - windowSize.height / 2) * 0.06,
          }}
          transition={{ type: "spring", stiffness: 12, damping: 35 }}
        />
        
        {/* Fourth gradient orb - light cyan */}
        <motion.div
          className={cn(
            "absolute w-[60%] h-[60%] top-[75%] left-[calc(50%-30%)]",
            "opacity-50"
          )}
          style={{
            background: "radial-gradient(circle at center, rgba(165, 243, 252, 0.25) 0%, rgba(165, 243, 252, 0.1) 50%, transparent 70%)",
          }}
          animate={{
            x: (mousePosition.x - windowSize.width / 2) * -0.08,
            y: (mousePosition.y - windowSize.height / 2) * 0.16,
          }}
          transition={{ type: "spring", stiffness: 25, damping: 20 }}
        />
        
        {/* Fifth gradient orb - additional cloud layer */}
        <motion.div
          className={cn(
            "absolute w-[100%] h-[100%] top-[55%] left-[calc(50%-50%)]",
            "opacity-20"
          )}
          style={{
            background: "radial-gradient(circle at center, rgba(219, 234, 254, 0.2) 0%, rgba(219, 234, 254, 0.05) 50%, transparent 70%)",
          }}
          animate={{
            x: (mousePosition.x - windowSize.width / 2) * 0.22,
            y: (mousePosition.y - windowSize.height / 2) * 0.18,
          }}
          transition={{ type: "spring", stiffness: 8, damping: 40 }}
        />
        
        {/* Sixth gradient orb - subtle background layer */}
        <motion.div
          className={cn(
            "absolute w-[120%] h-[120%] top-[50%] left-[calc(50%-60%)]",
            "opacity-15"
          )}
          style={{
            background: "radial-gradient(circle at center, rgba(147, 197, 253, 0.15) 0%, rgba(147, 197, 253, 0.03) 50%, transparent 70%)",
          }}
          animate={{
            x: (mousePosition.x - windowSize.width / 2) * -0.25,
            y: (mousePosition.y - windowSize.height / 2) * -0.2,
          }}
          transition={{ type: "spring", stiffness: 5, damping: 45 }}
        />
      </div>
    </motion.div>
  );
};