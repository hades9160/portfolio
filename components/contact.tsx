'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Section from './section'

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const contactLinks = [
    { label: 'Instagram', value: 'mrcn.vbn', href: 'https://www.instagram.com/mrcn.vbn/' },
    { label: 'Facebook', value: 'Marc Noe', href: 'https://www.facebook.com/mrcn.vbn/' },
    { label: 'Email', value: 'mnv.ubana@gmail.com', href: 'mailto:mnv.ubana@gmail.com' },
    { label: 'LinkedIn', value: 'linkedin.com/in/hadesvbn', href: 'https://linkedin.com/in/hadesvbn' },
    { label: 'GitHub', value: 'github.com/hades9160', href: 'https://github.com/hades9160' },
    { label: 'Location', value: 'Batangas, Philippines', href: '#' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <Section id="contact" title="Let's Connect">
      <div ref={ref} className="space-y-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          I am open to new opportunities and collaboration on web development projects. If you want to discuss a potential partnership or have a business inquiry regarding a web system, feel free to reach out. I am always interested in connecting with others to build functional and effective digital solutions together.  
        </motion.p>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {contactLinks.map((link, idx) => (
            <motion.a
              key={idx}
              variants={itemVariants}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border border-border rounded-lg hover:border-accent hover:bg-secondary transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {link.label}
              </p>
              <p className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {link.value}
              </p>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-12 border-t border-border"
        >
          <p className="text-muted-foreground text-sm">
            © 2026 Hades. 
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
