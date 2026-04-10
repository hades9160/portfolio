'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import Section from './section'
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom"; // Optional: adds zoom capability
import "yet-another-react-lightbox/styles.css";


/* ─────────────────────────────────────────────
   Data — Mama's Recipe
───────────────────────────────────────────── */
const techStack = [
  {
    name: 'Flutter',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  },
  {
    name: 'Dart',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  },
  {
    name: 'Firebase',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  },
  {
    name: 'Android Studio',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg',
  },
]

const mobileScreens = [
  { file: 'DietitianLogin',          label: 'Login' },
  { file: 'DietitianDashboard',      label: 'Dashboard' },
  { file: 'DietitianCreateMealPlan', label: 'Create Meal Plan' },
  { file: 'DietitianProfile',        label: 'Profile' },
  { file: 'DietitianMessaging',      label: 'Messaging' },
  { file: 'DietitianSubscriptions',  label: 'Subscriptions' },
]

const adminScreens = [
  { file: 'AdminLogin',               label: 'Login' },
  { file: 'AdminDashboard',           label: 'Dashboard' },
  { file: 'AdminDietitianManagement', label: 'Dietitian Mgmt' },
  { file: 'AdminUserManagement',      label: 'User Mgmt' },
  { file: 'AdminFeedback',            label: 'Feedback' },
  { file: 'AdminMessaging',           label: 'Messaging' },
]

const features = [
  {
    icon: '🥗',
    title: 'AI-Powered Meal Plans',
    desc: 'Generates personalized meal plans via descriptive & prescriptive analytics based on health goals and dietary restrictions.',
  },
  {
    icon: '👨‍⚕️',
    title: 'Dietitian Advisory',
    desc: 'Connects users directly with licensed dietitians through a subscription model — built-in messaging included.',
  },
  {
    icon: '🔐',
    title: 'Secure & Scalable',
    desc: 'Firebase Authentication and Realtime Database power secure login, real-time sync, and cloud storage across all devices.',
  },
  {
    icon: '📊',
    title: 'Admin Web Panel',
    desc: 'A dedicated Flutter web dashboard lets admins manage dietitians, users, subscriptions, and feedback in one place.',
  },
]

const metrics = [
  { label: 'Functional Suitability', score: '4.55' },
  { label: 'Performance Efficiency', score: '4.42' },
  { label: 'Security',               score: '4.50' },
  { label: 'Usability',              score: '4.36' },
]

/* ─────────────────────────────────────────────
   Data — Inventory Dashboard
───────────────────────────────────────────── */
const inventoryKPIs = [
  { label: 'Total Inventory',  value: '$19.71M', sub: 'WK20 All Types' },
  { label: 'Finished Goods',   value: '$19.71M', sub: 'WK20 FG' },
  { label: 'Raw Materials',    value: '$14.17M', sub: 'WK20 ZRAW' },
  { label: 'Semi-Finished',    value: '$6.29M',  sub: 'WK20 SEMI' },
]

const inventoryPlants = [
  { plant: 'Mexico',            share: '41.26%', value: '$187.23M' },
  { plant: 'Korea',             share: '21.93%', value: '$99.51M' },
  { plant: 'Philippines',       share: '21.74%', value: '$98.67M' },
  { plant: 'Goods in Transit',  share: '8.66%',  value: '$39.3M' },
  { plant: 'Others',            share: '6.41%',  value: '~$29M' },
]

const inventoryFeatures = [
  {
    icon: '🏭',
    title: 'Multi-Plant Visibility',
    desc: 'Tracks inventory value across Mexico, Philippines, Korea, and other global plants in a single view.',
  },
  {
    icon: '📦',
    title: 'Material Type Breakdown',
    desc: 'Segments inventory into FG, SEMI, and ZRAW categories — each filterable via top navigation buttons.',
  },
  {
    icon: '📈',
    title: 'Weekly Trend Analysis',
    desc: 'Area chart plots $-value by week number, revealing inventory spikes and drawdowns over time.',
  },
  {
    icon: '🔧',
    title: 'ETL & Data Modeling',
    desc: 'Raw data cleaned and transformed in Power Query; DAX measures drive all KPI cards and visuals dynamically.',
  },
]

const inventoryTools = [
  {
    name: 'Power BI',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg',
  },
  {
    name: 'Power Query',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  },
  {
    name: 'DAX',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  },
  {
    name: 'Excel',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  },
]

/* ─────────────────────────────────────────────
   Data — Javar
───────────────────────────────────────────── */
const javarScreens = [
  { file: 'Home',       label: 'Home' },
  { file: 'About',      label: 'About' },
  { file: 'Experience', label: 'Experience' },
  { file: 'Gallery',    label: 'Gallery' },
  { file: 'Contact',    label: 'Contact' },
]

const javarFeatures = [
  {
    icon: '⚡',
    title: 'Blazing-Fast Performance',
    desc: 'Built with Next.js 15 and the App Router for server-side rendering and static generation — pages load instantly with zero layout shift.',
  },
  {
    icon: '🎨',
    title: 'Polished Animations',
    desc: 'Framer Motion powers silky scroll-triggered reveals, staggered section entrances, and fluid modal transitions that feel native.',
  },
  {
    icon: '🌗',
    title: 'Dark / Light Mode',
    desc: 'A fully themeable design system using CSS variables and Tailwind ensures the portfolio looks sharp in both light and dark environments.',
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    desc: 'Every layout — cards, modals, galleries, and navigation — adapts gracefully from mobile to ultra-wide screens without a single media-query hack.',
  },
  {
    icon: '🗂️',
    title: 'Modular Architecture',
    desc: 'Each section (Home, About, Experience, Portfolio, Gallery, Contact) is an isolated component, making the codebase easy to maintain and extend.',
  },
  {
    icon: '🔍',
    title: 'SEO & Accessibility',
    desc: 'Semantic HTML, ARIA labels, and Next.js metadata API ensure the site is discoverable by search engines and usable by screen readers.',
  },
]

const javarTechStack = [
  {
    name: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://cdn.simpleicons.org/tailwindcss'
  },
  {
    name: 'Framer Motion',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },

]

const javarSections = [
  { label: 'Home',       desc: 'Animated hero with typewriter role headline and a CTA linking to the portfolio.' },
  { label: 'About',      desc: 'Personal bio, core values, and a concise skill snapshot in a clean two-column layout.' },
  { label: 'Experience', desc: 'Timeline of professional and academic milestones with expandable detail cards.' },
  { label: 'Portfolio',  desc: 'Project showcase with interactive modals — the very page you\'re reading right now.' },
  { label: 'Gallery',    desc: 'Photo gallery of events, outputs, and moments that tell the story beyond the résumé.' },
  { label: 'Contact',    desc: 'Minimal contact form wired to email delivery so recruiters can reach out instantly.' },
]

/* ─────────────────────────────────────────────
   Data — Barangay Document Management System
───────────────────────────────────────────── */
const barangayScreens = [
  { file: 'Login',         label: 'Login' },
  { file: 'Dashboard',     label: 'Dashboard' },
  { file: 'Documents',     label: 'Documents' },
  { file: 'Categories',    label: 'Categories' },
  { file: 'Barangay_Info', label: 'Barangay Info' },
  { file: 'Activity_Log',  label: 'Activity Log' },
  { file: 'Profile',       label: 'Profile' },
]

const barangayFeatures = [
  {
    icon: '📁',
    title: 'Document Management',
    desc: 'Upload, categorize, and manage barangay documents with support for file type filtering, search, and secure downloads.',
  },
  {
    icon: '🏛️',
    title: 'Barangay Profile',
    desc: 'Editable mission, vision, and official information page — keeping residents and officials informed at a glance.',
  },
  {
    icon: '🗂️',
    title: 'Category System',
    desc: 'Organizes documents into custom categories with a dedicated management interface for creating and updating classifications.',
  },
  {
    icon: '📋',
    title: 'Activity Logging',
    desc: 'Tracks every user action — views, downloads, uploads — with timestamps and IP logging for full audit trail compliance.',
  },
  {
    icon: '👤',
    title: 'User Profile & Auth',
    desc: 'Secure login system with session-based authentication, profile management, and avatar upload functionality.',
  },
  {
    icon: '🌤️',
    title: 'Weather Monitoring',
    desc: 'Integrated weather data module for local monitoring — useful for barangay-level disaster preparedness and reporting.',
  },
]

const barangayTechStack = [
  {
    name: 'PHP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  },
  {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    name: 'HTML5',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS3',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'XAMPP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
  },
]

const barangayModules = [
  { label: 'Login',         desc: 'Secure session-based authentication with role-aware access control.' },
  { label: 'Dashboard',     desc: 'Overview of document counts, recent activity, and quick-access stats.' },
  { label: 'Documents',     desc: 'Full CRUD for barangay documents — upload, view, download, and manage files.' },
  { label: 'Categories',    desc: 'Custom category management for organizing documents by type or department.' },
  { label: 'Barangay Info', desc: 'Editable barangay profile with mission, vision, and official information.' },
  { label: 'Activity Log',  desc: 'Audit trail of all system actions with user, timestamp, and IP records.' },
  { label: 'Profile',       desc: 'User profile with avatar upload, personal details, and password management.' },
]

/* ─────────────────────────────────────────────
   Screen Gallery (inside Mama's modal)
───────────────────────────────────────────── */
function ScreenGallery({
  screens,
  isMobile,
}: {
  screens: { file: string; label: string }[]
  isMobile: boolean
}) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const BASE = '/mamas'

  const slides = screens.map((s) => ({ src: `${BASE}/${s.file}.png`, alt: s.label }))

  return (
    <div className="space-y-4">
      <div
        className={`relative rounded-xl overflow-hidden border border-border bg-secondary/40 flex items-center justify-center mx-auto cursor-zoom-in group/img ${
          isMobile ? 'h-100 max-w-[210px]' : 'h-[240px] max-w-[480px]'
        }`}
        onClick={() => setLightboxOpen(true)}
        title="Click to zoom"
      >
        <img
          src={`${BASE}/${screens[active].file}.png`}
          alt={screens[active].label}
          className="w-full h-full object-contain"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        <img
          src={`${BASE}/${screens[active].file}.jpg`}
          alt={screens[active].label}
          className="w-full h-full object-contain"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border text-muted-foreground whitespace-nowrap">
          {screens[active].label}
        </span>
        <span className="absolute top-2 right-2 text-[10px] bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border text-muted-foreground opacity-0 group-hover/img:opacity-100 transition-opacity">
          🔍 Zoom
        </span>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {screens.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`text-[11px] px-3 py-1 rounded-full border transition-all duration-200 ${
              i === active
                ? 'bg-foreground text-background border-foreground'
                : 'bg-secondary text-muted-foreground border-border hover:border-foreground/40'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={active}
        slides={slides}
        plugins={[Zoom]}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Javar Screen Gallery
───────────────────────────────────────────── */
function JavarScreenGallery({ screens }: { screens: { file: string; label: string }[] }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const BASE = '/Javar'

  const slides = screens.map((s) => ({ src: `${BASE}/${s.file}.png`, alt: s.label }))

  return (
    <div className="space-y-4">
      <div
        className="relative rounded-xl overflow-hidden border border-border bg-secondary/40 flex items-center justify-center h-[220px] cursor-zoom-in group/img"
        onClick={() => setLightboxOpen(true)}
        title="Click to zoom"
      >
        <img
          src={`${BASE}/${screens[active].file}.png`}
          alt={screens[active].label}
          className="w-full h-full object-contain"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        <img
          src={`${BASE}/${screens[active].file}.jpg`}
          alt={screens[active].label}
          className="w-full h-full object-contain"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border text-muted-foreground whitespace-nowrap">
          {screens[active].label}
        </span>
        <span className="absolute top-2 right-2 text-[10px] bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border text-muted-foreground opacity-0 group-hover/img:opacity-100 transition-opacity">
          🔍 Zoom
        </span>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {screens.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`text-[11px] px-3 py-1 rounded-full border transition-all duration-200 ${
              i === active
                ? 'bg-foreground text-background border-foreground'
                : 'bg-secondary text-muted-foreground border-border hover:border-foreground/40'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={active}
        slides={slides}
        plugins={[Zoom]}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Barangay Screen Gallery
───────────────────────────────────────────── */
function BarangayScreenGallery({ screens }: { screens: { file: string; label: string }[] }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const BASE = '/Barangay'

  const slides = screens.map((s) => ({ src: `${BASE}/${s.file}.png`, alt: s.label }))

  return (
    <div className="space-y-4">
      <div
        className="relative rounded-xl overflow-hidden border border-border bg-secondary/40 flex items-center justify-center h-[220px] cursor-zoom-in group/img"
        onClick={() => setLightboxOpen(true)}
        title="Click to zoom"
      >
        <img
          src={`${BASE}/${screens[active].file}.png`}
          alt={screens[active].label}
          className="w-full h-full object-contain"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        <img
          src={`${BASE}/${screens[active].file}.jpg`}
          alt={screens[active].label}
          className="w-full h-full object-contain"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border text-muted-foreground whitespace-nowrap">
          {screens[active].label}
        </span>
        <span className="absolute top-2 right-2 text-[10px] bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border text-muted-foreground opacity-0 group-hover/img:opacity-100 transition-opacity">
          🔍 Zoom
        </span>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {screens.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`text-[11px] px-3 py-1 rounded-full border transition-all duration-200 ${
              i === active
                ? 'bg-foreground text-background border-foreground'
                : 'bg-secondary text-muted-foreground border-border hover:border-foreground/40'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={active}
        slides={slides}
        plugins={[Zoom]}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Mama's Recipe Modal
───────────────────────────────────────────── */
function MamasModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'mobile' | 'web'>('mobile')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />

        <div className="p-7 md:p-9 space-y-9">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Featured · Capstone Project · 2025
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Mama&apos;s Recipe
              </h2>
              <p className="text-sm text-muted-foreground">
                A Personalized &amp; Customizable Meal Planner and Dietitian Advisory Application
              </p>
              <div className="flex gap-2 flex-wrap pt-1">
                {['Mobile App', 'Web App', 'Capstone'].map((t) => (
                  <span key={t} className="text-[10px] px-2.5 py-0.5 bg-secondary text-foreground rounded-full border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 w-8 h-8 rounded-full border border-border bg-secondary/40 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          {/* About */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">About This Project</p>
            <div className="p-4 rounded-xl border border-border bg-secondary/30 text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                Mama&apos;s Recipe is a capstone project developed by a team of three — a full-stack mobile and web application built to address nutritional accessibility for Filipino users through personalized, AI-driven meal planning.
              </p>
              <p>
                The mobile app connects patients with licensed dietitians via a subscription model, while an accompanying Flutter web panel gives administrators full visibility over users, dietitians, subscriptions, and feedback. The system was formally evaluated under ISO/IEC 25010:2011 standards, achieving strong scores across functionality, performance, security, and usability.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Key Features</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl border border-border bg-secondary/30">
                  <span className="text-lg shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{f.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Tech Stack</p>
            <div className="flex flex-wrap gap-3">
              {techStack.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors"
                >
                  <img
                    src={t.icon}
                    alt={t.name}
                    width={20}
                    height={20}
                    className="object-contain"
                    onError={(e) => { ;(e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                  <span className="text-sm font-medium text-foreground">{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Screenshots</p>
              <div className="flex gap-1 p-1 rounded-lg border border-border bg-secondary/30">
                {(['mobile', 'web'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`text-[11px] px-3 py-1 rounded-md font-medium transition-all duration-200 ${
                      tab === t
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t === 'mobile' ? '📱 Mobile' : '🖥 Admin Web'}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <ScreenGallery
                  screens={tab === 'mobile' ? mobileScreens : adminScreens}
                  isMobile={tab === 'mobile'}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Evaluation */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
              Evaluation — ISO/IEC 25010:2011
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="text-center p-4 rounded-xl border border-border bg-secondary/30">
                  <p className="text-2xl font-bold text-foreground">{m.score}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Inventory Image Viewer
───────────────────────────────────────────── */
function InventoryImageViewer() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const slides = [{ src: '/inventory/Dashboard.png', alt: 'Inventory Management Dashboard' }]

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-border bg-secondary/40 flex items-center justify-center h-[220px] cursor-zoom-in group/img"
      onClick={() => setLightboxOpen(true)}
      title="Click to zoom"
    >
      <img
        src="/inventory/Dashboard.png"
        alt="Inventory Management Dashboard"
        className="w-full h-full object-contain"
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.display = 'none'
        }}
      />
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border text-muted-foreground whitespace-nowrap">
        Power BI · or_finals.pbix
      </span>
      <span className="absolute top-2 right-2 text-[10px] bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border text-muted-foreground opacity-0 group-hover/img:opacity-100 transition-opacity">
        🔍 Zoom
      </span>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        plugins={[Zoom]}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Inventory Management Modal
───────────────────────────────────────────── */
function InventoryModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />

        <div className="p-7 md:p-9 space-y-9">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Professional · Business Intelligence · 2025
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Inventory Management Dashboard
              </h2>
              <p className="text-sm text-muted-foreground">
                Multi-plant inventory analytics tracking $19.71M across FG, SEMI, and ZRAW material types
              </p>
              <div className="flex gap-2 flex-wrap pt-1">
                {['Power BI', 'Data Analytics', 'Business Intelligence'].map((t) => (
                  <span key={t} className="text-[10px] px-2.5 py-0.5 bg-secondary text-foreground rounded-full border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 w-8 h-8 rounded-full border border-border bg-secondary/40 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          {/* About */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">About This Project</p>
            <div className="p-4 rounded-xl border border-border bg-secondary/30 text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                This Power BI dashboard was built to provide supply chain and operations teams with a consolidated, real-time view of inventory value across multiple global manufacturing plants — including Mexico, Philippines, and Korea.
              </p>
              <p>
                Raw data was ingested and cleaned through Power Query, with DAX measures driving all KPI cards, trend charts, and material-type breakdowns dynamically. The dashboard enables data-driven decisions by surfacing weekly inventory movement, plant-level distribution, and category segmentation (FG, SEMI, ZRAW) in a single, filterable interface.
              </p>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Dashboard Preview</p>
            <InventoryImageViewer />
          </div>

          {/* Plant Distribution */}


          {/* Features */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">What It Does</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inventoryFeatures.map((f, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl border border-border bg-secondary/30">
                  <span className="text-lg shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{f.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Tools Used</p>
            <div className="flex flex-wrap gap-3">
              {inventoryTools.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors"
                >
                  <img
                    src={t.icon}
                    alt={t.name}
                    width={20}
                    height={20}
                    className="object-contain"
                    onError={(e) => { ;(e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                  <span className="text-sm font-medium text-foreground">{t.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Javar Portfolio Modal
───────────────────────────────────────────── */
function JavarModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />

        <div className="p-7 md:p-9 space-y-9">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Personal · Developer Portfolio · 2026
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Javar
              </h2>
<p className="text-sm text-muted-foreground">
  A modern personal portfolio website built with Next.js, TypeScript, and Framer Motion — designed to showcase projects, experience, and personality in one polished space.{" "}
  <a
    href="https://hades9160.github.io/javartattoo/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 underline hover:text-blue-600"
  >
    Visit site
  </a>
</p>
              <div className="flex gap-2 flex-wrap pt-1">
                {['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((t) => (
                  <span key={t} className="text-[10px] px-2.5 py-0.5 bg-secondary text-foreground rounded-full border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 w-8 h-8 rounded-full border border-border bg-secondary/40 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          {/* About */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">About This Project</p>
            <div className="p-4 rounded-xl border border-border bg-secondary/30 text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                Javar is a fully hand-crafted personal portfolio — not a template, not a theme. Every component, animation, and layout decision was made from scratch to reflect a unique developer identity.
              </p>
              <p>
                The site is structured around six purpose-built sections: a cinematic hero, a detailed about page, an experience timeline, an interactive project showcase (this very modal!), a visual gallery, and a functional contact form.
              </p>
            </div>
          </div>

          {/* Screenshots */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Page Screenshots</p>
            <JavarScreenGallery screens={javarScreens} />
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Key Features</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {javarFeatures.map((f, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl border border-border bg-secondary/30">
                  <span className="text-lg shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{f.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Tech Stack</p>
            <div className="flex flex-wrap gap-3">
              {javarTechStack.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors"
                >
                  <img
                    src={t.icon}
                    alt={t.name}
                    width={20}
                    height={20}
                    className="object-contain"
                    onError={(e) => { ;(e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                  <span className="text-sm font-medium text-foreground">{t.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Barangay Document Management System Modal
───────────────────────────────────────────── */
function BarangayModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top accent line — green tint to match the system's #1A6B3C theme */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-emerald-600/40 to-transparent" />

        <div className="p-7 md:p-9 space-y-9">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Academic · Web Application · 2026
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Barangay Document Management System
              </h2>
              <p className="text-sm text-muted-foreground">
                A web-based document management platform built for Barangay Munting Ilog — centralizing official records, file uploads, and resident-facing information in one secure system.
              </p>
              <div className="flex gap-2 flex-wrap pt-1">
                {['Web App', 'PHP', 'MySQL', 'XAMPP'].map((t) => (
                  <span key={t} className="text-[10px] px-2.5 py-0.5 bg-secondary text-foreground rounded-full border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 w-8 h-8 rounded-full border border-border bg-secondary/40 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          {/* About */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">About This Project</p>
            <div className="p-4 rounded-xl border border-border bg-secondary/30 text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                The Barangay Document Management System (BDMS) is a full-stack web application designed to modernize how local government units handle administrative documents. Built specifically for Barangay Munting Ilog, it replaces manual, paper-based processes with a streamlined digital workflow.
              </p>
              <p>
                The system provides officials with a centralized dashboard to upload, organize, and manage documents by category — from ordinances and resolutions to community announcements. Every action is logged for accountability, and residents can access public-facing barangay information and weather monitoring data through the same platform.
              </p>
            </div>
          </div>

          {/* Screenshots */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Page Screenshots</p>
            <BarangayScreenGallery screens={barangayScreens} />
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Key Features</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {barangayFeatures.map((f, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl border border-border bg-secondary/30">
                  <span className="text-lg shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{f.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Tech Stack */}
          <div className="space-y-3">
            <p className="text-[10px] tracking-widest text-muted-foreground uppercase">Tech Stack</p>
            <div className="flex flex-wrap gap-3">
              {barangayTechStack.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors"
                >
                  <img
                    src={t.icon}
                    alt={t.name}
                    width={20}
                    height={20}
                    className="object-contain"
                    onError={(e) => { ;(e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                  <span className="text-sm font-medium text-foreground">{t.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function Portfolio() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [mamasOpen, setMamasOpen] = useState(false)
  const [inventoryOpen, setInventoryOpen] = useState(false)
  const [javarOpen, setJavarOpen] = useState(false)
  const [barangayOpen, setBarangayOpen] = useState(false)

  const projects = [
    {
      title: "MAMA'S RECIPE",
      description:
        'Personalized meal planner with dietitian advisory features. A full-stack application combining mobile and web development to deliver a culturally relevant meal planning solution for Filipino users. Completed as capstone project with team of 3 developers.',
      tags: ['Flutter', 'Firebase', 'Web App', 'Mobile App'],
      onClick: () => setMamasOpen(true),
      featured: true,
      preview: (
        <div className="z-10 flex flex-col items-center gap-3 select-none">
          <div className="flex gap-3">
            {techStack.slice(0, 3).map((t) => (
              <img
                key={t.name}
                src={t.icon}
                alt={t.name}
                width={26}
                height={26}
                className="object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                onError={(e) => { ;(e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">Mama&apos;s Recipe</p>
          <span className="text-[10px] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex items-center gap-1">
            CLICK TO VIEW <span className="text-sm">→</span>
          </span>
        </div>
      ),
    },
    {
      title: 'Inventory Management Dashboard',
      description:
        'Comprehensive Power BI dashboard analyzing $59.45M inventory distribution across multiple plants and material types with real-time analytics and strategic insights for data-driven decision making.',
      tags: ['Power BI', 'Data Analytics', 'Business Intelligence'],
      onClick: () => setInventoryOpen(true),
      featured: false,
      preview: (
        <div className="z-10 flex flex-col items-center gap-3 select-none px-4 text-center">
          <span className="text-3xl">📊</span>
          <p className="text-muted-foreground text-sm">Inventory Dashboard</p>
          <span className="text-[10px] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex items-center gap-1">
            CLICK TO VIEW <span className="text-sm">→</span>
          </span>
        </div>
      ),
    },
    {
      title: 'Javar',
      description:
        'A fully hand-crafted personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Features six purpose-built sections, animated modals, dark/light mode, and is deployed on Vercel with automatic CI/CD.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      onClick: () => setJavarOpen(true),
      featured: false,
      preview: (
        <div className="z-10 flex flex-col items-center gap-3 select-none px-4 text-center">
          <div className="flex gap-3">
            {javarTechStack.slice(0, 3).map((t) => (
              <img
                key={t.name}
                src={t.icon}
                alt={t.name}
                width={26}
                height={26}
                className="object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                onError={(e) => { ;(e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">Javar · Portfolio</p>
          <span className="text-[10px] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex items-center gap-1">
            CLICK TO VIEW <span className="text-sm">→</span>
          </span>
        </div>
      ),
    },
    {
      title: 'Barangay Document Management System',
      description:
        'A web-based document management platform for Barangay Munting Ilog. Built with PHP and MySQL, it digitizes local government workflows — covering document uploads, category management, activity logging, and a barangay information portal.',
      tags: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
      onClick: () => setBarangayOpen(true),
      featured: false,
      preview: (
        <div className="z-10 flex flex-col items-center gap-3 select-none px-4 text-center">
          <div className="flex gap-3">
            {barangayTechStack.slice(0, 4).map((t) => (
              <img
                key={t.name}
                src={t.icon}
                alt={t.name}
                width={26}
                height={26}
                className="object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                onError={(e) => { ;(e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">Barangay · DMS</p>
          <span className="text-[10px] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex items-center gap-1">
            CLICK TO VIEW <span className="text-sm">→</span>
          </span>
        </div>
      ),
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <Section id="portfolio" title="Portfolio" accent>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            onClick={project.onClick}
            className="group cursor-pointer"
          >
            {/* Preview rectangle */}
            <div className="relative bg-background rounded-lg overflow-hidden h-64 mb-6 flex items-center justify-center border border-border">
              <div className="absolute inset-0 bg-linear-top from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {project.preview}
            </div>

            {/* Info */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-xs px-3 py-1 bg-secondary text-foreground rounded-full border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {mamasOpen && <MamasModal onClose={() => setMamasOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {inventoryOpen && <InventoryModal onClose={() => setInventoryOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {javarOpen && <JavarModal onClose={() => setJavarOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {barangayOpen && <BarangayModal onClose={() => setBarangayOpen(false)} />}
      </AnimatePresence>
    </Section>
  )
}