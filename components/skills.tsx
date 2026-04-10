'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Section from './section'

export default function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const skillCategories = [
    {
      name: 'Web Development',
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'React', 'Next.js', 'TypeScript'],
    },
    {
      name: 'Mobile & Backend',
      skills: ['Flutter', 'Dart', 'SQL', 'Firebase'],
    },
    {
      name: 'Data & Analytics',
      skills: ['Power BI', 'Python', 'Excel', 'Data Analysis', 'Business Intelligence', 'Data Modeling', 'Database Design'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <Section id="skills" title="Skills">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {skillCategories.map((category, idx) => (
          <motion.div key={idx} variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <h3 className="text-2xl font-bold text-foreground">{category.name}</h3>
            </div>
            <ul className="space-y-3">
              {category.skills.map((skill, skillIdx) => (
                <motion.li
                  key={skillIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + skillIdx * 0.1,
                  }}
                  className="text-muted-foreground flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
