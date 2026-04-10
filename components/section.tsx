'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  accent?: boolean
}

export default function Section({ id, title, children, accent = false }: SectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
      }}
      className={`w-full min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 ${
        accent ? 'bg-card' : 'bg-background'
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
          className="text-5xl md:text-6xl font-bold mb-12 text-foreground"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  )
}
