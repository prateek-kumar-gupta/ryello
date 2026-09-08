"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees (default: 10)
  perspective?: number; // Perspective distance in px (default: 1000)
  glare?: boolean; // Whether to show moving specular glare highlight
  scaleOnHover?: number; // Scale factor on hover (default: 1.02)
}

export function TiltCard({
  children,
  className,
  maxTilt = 10,
  perspective = 1000,
  glare = true,
  scaleOnHover = 1.02,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const xPct = (clientX / rect.width - 0.5) * 2; // -1 to 1
      const yPct = (clientY / rect.height - 0.5) * 2; // -1 to 1

      // Tilt values: negative Y translates to positive rotateX (tilting up)
      const rotX = -yPct * maxTilt;
      const rotY = xPct * maxTilt;

      setRotate({ x: rotX, y: rotY });
      setGlarePos({
        x: (clientX / rect.width) * 100,
        y: (clientY / rect.height) * 100,
        opacity: 0.25,
      });
    },
    [maxTilt]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
      }}
      className={cn("relative transition-transform duration-200 ease-out", className)}
      {...props}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, ${scaleOnHover})`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="relative size-full rounded-2xl will-change-transform"
      >
        {children}

        {/* Dynamic Specular Glare Highlight */}
        {glare && (
          <div
            aria-hidden="true"
            style={{
              background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`,
              opacity: glarePos.opacity,
              transition: isHovered ? "opacity 0.2s ease" : "opacity 0.5s ease",
            }}
            className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay z-30"
          />
        )}
      </div>
    </div>
  );
}
