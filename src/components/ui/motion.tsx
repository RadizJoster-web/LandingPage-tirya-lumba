'use client';

import React from 'react';
import { motion, AnimatePresence, HTMLMotionProps, Variants } from 'motion/react';

// Cubic bezier for ultra-smooth modern easing (Apple/Radix aesthetic)
export const SMOOTH_EASE = [0.21, 0.47, 0.32, 0.98] as const;

export interface MotionFadeInProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  className?: string;
  children: React.ReactNode;
}

/**
 * Reusable clean In/Out fade & slide reveal wrapper for components.
 * Seamlessly animates in when entering the viewport, and animates out when leaving.
 */
export const MotionFadeIn: React.FC<MotionFadeInProps> = ({
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 24,
  once = false,
  amount = 0.15,
  className = '',
  children,
  ...rest
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: SMOOTH_EASE,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export interface MotionStaggerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  className?: string;
  children: React.ReactNode;
}

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay ?? 0.08,
      delayChildren: custom.delayChildren ?? 0,
    },
  }),
};

/**
 * Container component that staggers children reveal in/out cleanly.
 */
export const MotionStagger: React.FC<MotionStaggerProps> = ({
  staggerDelay = 0.08,
  delayChildren = 0,
  once = false,
  amount = 0.12,
  className = '',
  children,
  ...rest
}) => {
  return (
    <motion.div
      variants={staggerContainerVariants}
      custom={{ staggerDelay, delayChildren }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export interface MotionStaggerItemProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Child item inside MotionStagger for coordinated cascade in/out animation.
 */
export const MotionStaggerItem: React.FC<MotionStaggerItemProps> = ({
  direction = 'up',
  distance = 20,
  duration = 0.5,
  className = '',
  children,
  ...rest
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  const itemVariants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...rest}>
      {children}
    </motion.div>
  );
};

export interface MotionFloatProps extends HTMLMotionProps<'div'> {
  yOffset?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Subtle ambient aquatic floating animation for illustrations and badges.
 */
export const MotionFloat: React.FC<MotionFloatProps> = ({
  yOffset = 8,
  duration = 3.8,
  className = '',
  children,
  ...rest
}) => {
  return (
    <motion.div
      animate={{ y: [0, -yOffset, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

// Re-export motion primitives for advanced usage across the codebase
export { motion, AnimatePresence };
