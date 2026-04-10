'use client'

import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [hovered, setHovered] = useState(false)

  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Animated background dot grid */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: 'radial-gradient(circle, #f59e0b 3px, transparent 3px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main interactive container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover target area — wraps both M and the image so they occupy the same space */}
        <div className="relative flex items-center justify-center cursor-pointer select-none">

          {/* The "M" letter */}
          <motion.h1
            className="text-[20vw] font-bold text-foreground leading-none"
            animate={{
              opacity: hovered ? 0 : 1,
              scale: hovered ? 0.92 : 1,
              filter: hovered ? 'blur(12px)' : 'blur(0px)',
            }}
            transition={{
              duration: 0.65,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            M
          </motion.h1>

          {/* Profile image — positioned absolutely over the M */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 1.06,
              filter: hovered ? 'blur(0px)' : 'blur(10px)',
            }}
            transition={{
              duration: 0.65,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                /* 5:4 aspect ratio, scales with the M's approximate size */
                width: 'clamp(220px, 28vw, 520px)',
                aspectRatio: '5 / 4',
                /* Vignette blend so edges melt into the black background */
                maskImage:
                  'radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)',
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Profile"
                fill
                priority
                className="object-cover"
                style={{
                  /* Subtle desaturation keeps it moody on a dark site;
                     remove the filter line if you prefer full color */
                  filter: 'grayscale(20%) contrast(1.05) brightness(0.92)',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Sub-text below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 space-y-2"
        >
          <h2 className="text-2xl md:text-4xl font-light text-foreground"></h2>
          <p className="text-accent text-sm md:text-base font-medium tracking-widest uppercase">
            CODENAME: HADES
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">Scroll to explore</p>
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>

      {/* Subtle accent line */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 100 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/2 right-8 h-1 bg-accent"
      />
    </section>
  )
}