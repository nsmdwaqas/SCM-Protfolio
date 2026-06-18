import { motion, HTMLMotionProps } from 'motion/react';
import React from 'react';

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlassPanel({ children, className = '', delay = 0, ...props }: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={`
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-3xl p-6 lg:p-8 overflow-hidden relative
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
