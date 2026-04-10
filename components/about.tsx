'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Section from './section'

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <Section id="about" title="About" accent>
      <div ref={ref} className="space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed">
            I'm <span className="text-accent font-semibold">Marc Noe</span>, a full-stack developer focused on delivering high-impact web solutions. With a track record of developing functional applications including healthcare platforms and custom web systems.

            I am currently taking on web development commissions to further strengthen my foundation and help clients streamline their operations. I thrive on the challenge of architecting robust backend infrastructures and crafting clean, responsive interfaces.             </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="space-y-3">
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wider">Education</h3>
              <p className="text-muted-foreground">IT Graduate from Batangas State University specializing in Business Analytics</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wider">Expertise</h3>
              <p className="text-muted-foreground">Full-stack development, mobile apps, data analytics and business intelligence.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-accent font-semibold text-sm uppercase tracking-wider">Philosophy</h3>
              <p className="text-muted-foreground">The most vital systems—the backends, the databases, the hidden protocols—rule the world from the depths without ever needing a spotlight.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
