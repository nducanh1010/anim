import React, { forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface MagneticProps {
  children: React.ReactElement;
  sticky?: boolean;
  hoverScale?: number;
}

const Magnetic = forwardRef<HTMLDivElement, MagneticProps>(
  ({ children, sticky = false, hoverScale = 3 }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    // Use the forwarded ref if present, otherwise use the local ref
    const activeRef = (ref as React.RefObject<HTMLDivElement | null>) || localRef;

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
      if (!activeRef.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = activeRef.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      console.log(middleX)

      setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
      <motion.div
        className="relative group"
        ref={activeRef}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 350, damping: 5, mass: 0.5 }}
      >
        {sticky && (
          /* Invisible hover bounds target that scales up on hover */
          <div
            className="absolute inset-0 z-0 bg-transparent transition-transform duration-200 cursor-pointer pointer-events-auto [transform:scale(1)] group-hover:[transform:scale(var(--hover-scale,3))]"
            style={{
              // @ts-ignore
              "--hover-scale": hoverScale,
            }}
          />
        )}
        <div className={sticky ? "relative z-10 pointer-events-auto" : ""}>
          {children}
        </div>
      </motion.div>
    );
  }
);

Magnetic.displayName = "Magnetic";

export default Magnetic;
