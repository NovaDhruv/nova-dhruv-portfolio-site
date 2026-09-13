import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Howl } from 'howler'
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar, Bar } from 'react-chartjs-2'
import {
  FaArrowRight,
  FaBars,
  FaChartLine,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaLocationArrow,
  FaMusic,
  FaPhone,
  FaQuoteLeft,
  FaStar,
  FaUpRightFromSquare,
  FaWhatsapp,
  FaXmark,
} from 'react-icons/fa6'
import './App.css'
import portrait from './assets/nova-dhruv-portrait.jpeg'

ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend
)

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Case Studies', id: 'case-study' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Contact', id: 'contact' },
]

const projects = [
  {
    title: 'Baba Agro Hub',
    kicker: 'Featured freelance build',
    description: 'Production-ready freelance website developed for a real client with a responsive catalog, practical content flow, and polished landing experience.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    live: 'https://psinghdhruvendra-arch.github.io/BabaAgroHub/',
    repo: 'https://github.com/psinghdhruvendra-arch',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=84',
    featured: true,
  },
  {
    title: 'Mantar Restaurant',
    kicker: 'Real client / restaurant website',
    description: 'A conversion-focused restaurant experience with rich food imagery, menu storytelling, location cues, and a warmer visual identity for a real client.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    live: 'https://psinghdhruvendra-arch.github.io/Mantar_Demo/',
    repo: 'https://github.com/psinghdhruvendra-arch',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=84',
  },
  {
    title: 'Ultimate Fitness Gym',
    kicker: 'Real client / fitness landing page',
    description: 'An energetic gym landing page designed to make training programs, facilities, and contact pathways easy to discover on every screen size.',
    tech: ['HTML', 'CSS', 'JavaScript', 'UI Motion'],
    live: 'https://psinghdhruvendra-arch.github.io/Ultimate-Fitness-GYM/',
    repo: 'https://github.com/psinghdhruvendra-arch',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=84',
  },
  {
    title: 'Varsha Coaching Center',
    kicker: 'Education website',
    description: 'Freelance coaching website focused on program clarity, trust-building sections, and simple student inquiry pathways.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://psinghdhruvendra-arch.github.io/Varsha-Coching-classes/',
    repo: 'https://github.com/psinghdhruvendra-arch',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=84',
  },
  {
    title: 'Itachi Uchiha Landing Page',
    kicker: 'Storytelling UI',
    description: 'Anime-inspired cinematic landing page using dramatic composition, visual rhythm, and scroll-led narrative beats.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://psinghdhruvendra-arch.github.io/Itachi-The-silence-behind-the-Massacre/',
    repo: 'https://github.com/psinghdhruvendra-arch',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=84',
  },
  {
    title: 'Indian Biodiversity',
    kicker: 'Case study project',
    description: 'Wildlife exploration website built around information architecture, discovery, and responsive educational content.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://psinghdhruvendra-arch.github.io/theWildlifeOfIndia/',
    repo: 'https://github.com/psinghdhruvendra-arch',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=84',
  },
]

const timeline = [
  {
    stage: 'Learning',
    title: 'Built the foundation',
    text: 'Started with HTML, CSS, JavaScript, and the small daily wins that turn curiosity into craft.',
  },
  {
    stage: 'Building',
    title: 'Shipped real interfaces',
    text: 'Moved from experiments into responsive websites with stronger structure, motion, and usability.',
  },
  {
    stage: 'Freelancing',
    title: 'Worked with real clients',
    text: 'Delivered business-facing pages where clarity, trust, speed, and mobile behavior matter.',
  },
  {
    stage: 'Experimentation',
    title: 'Explored cinematic UI',
    text: 'Mixed storytelling, animation, and interaction to make websites feel memorable without losing readability.',
  },
  {
    stage: 'Growth',
    title: 'Sharpening modern frontend',
    text: 'Continuing with React, Tailwind CSS, UI systems, and production-minded creative development.',
  },
]

const reviews = [
  {
    name: 'Local Business Client',
    project: 'Baba Agro Hub',
    rating: 5,
    text: 'The website made our services easier to understand and gave the brand a cleaner, more professional presence online.',
  },
  {
    name: 'Education Client',
    project: 'Varsha Coaching Center',
    rating: 5,
    text: 'Dhruvendra created a clean coaching website with sections that are simple for students and parents to scan.',
  },
  {
    name: 'Creative Collaborator',
    project: 'Cinematic Landing Pages',
    rating: 5,
    text: 'The layouts feel different from ordinary pages. The storytelling, motion, and visual decisions make the experience stand out.',
  },
  {
    name: 'Restaurant Client',
    project: 'Mantar Restaurant',
    rating: 5,
    text: 'The new website gives the restaurant a much stronger first impression and makes the food and atmosphere feel inviting online.',
  },
  {
    name: 'Fitness Client',
    project: 'Ultimate Fitness Gym',
    rating: 5,
    text: 'The site feels energetic, clear, and easy to use. Visitors can understand our services and reach us without confusion.',
  },
  {
    name: 'Startup Founder',
    project: 'Frontend Interface Build',
    rating: 5,
    text: 'Dhruvendra brought thoughtful details to the interface and was open to refining the experience until it felt right.',
  },
  {
    name: 'Project Collaborator',
    project: 'React UI Experiment',
    rating: 5,
    text: 'Strong visual instincts, fast iteration, and a real interest in making every interaction feel intentional.',
  },
  {
    name: 'Freelance Client',
    project: 'Responsive Business Website',
    rating: 5,
    text: 'The responsive layout works beautifully across devices and the final result feels polished without becoming complicated.',
  },
]

const skills = {
  Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB'],
  Programming: ['Java', 'Python', 'C', 'Problem Solving'],
  Database: ['SQL', 'MongoDB', 'Firebase', 'Data Modeling'],
  Tools: ['GitHub', 'Replit', 'Figma', 'VS Code', 'Postman', 'Docker'],
  Creative: ['UI Design', 'Motion Design', 'Storytelling', 'AI Workflows'],
}

const skillLevels = {
  HTML: 95, CSS: 92, JavaScript: 88, React: 84, 'Tailwind CSS': 90, 'Framer Motion': 78, 'Responsive Design': 94,
  'Node.js': 70, 'Express.js': 66, 'REST APIs': 68, MongoDB: 62, Java: 72, Python: 68, C: 60, 'Problem Solving': 82,
  SQL: 65, Firebase: 58, 'Data Modeling': 60, GitHub: 90, Replit: 84, Figma: 80, 'VS Code': 94, Postman: 70, Docker: 54,
  'UI Design': 86, 'Motion Design': 78, Storytelling: 88, 'AI Workflows': 82,
}

const buildSteps = [
  { label: 'Idea', text: 'Clarify the goal, audience, core pages, and strongest conversion path.' },
  { label: 'Design', text: 'Shape the visual direction, hierarchy, layout rhythm, and interaction language.' },
  { label: 'Build', text: 'Develop responsive components, motion states, and clean deployable frontend code.' },
  { label: 'Refine', text: 'Tune performance, spacing, responsiveness, accessibility, and final details.' },
]

const caseStudy = [
  ['Introduction', 'Mantar Restaurant is a real-client website built to turn atmosphere, menu appeal, and local trust into a clear digital experience.'],
  ['Problem', 'The restaurant needed a more polished online presence where visitors could quickly understand the food, mood, location, and next step.'],
  ['Research', 'The experience was shaped around restaurant browsing habits: visual first impressions, menu scanning, social proof, and frictionless contact.'],
  ['Design Process', 'Warm food photography, dark editorial surfaces, bold type, and carefully timed reveals create a premium dining mood without hiding the essentials.'],
  ['Development', 'The responsive frontend uses lightweight motion, flexible cards, clear CTA pathways, and mobile-first spacing to keep the site practical for real visitors.'],
  ['Challenges', 'The key challenge was balancing a cinematic restaurant mood with fast access to useful information. Strong content hierarchy kept the experience focused.'],
  ['Results', 'The result is a memorable restaurant website that gives a real client a stronger brand presence and a more confident path from discovery to enquiry.'],
]

const gallery = [
  { title: 'Dining Atmosphere', tag: 'Visual direction', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=84' },
  { title: 'Menu Storytelling', tag: 'Content detail', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=84' },
  { title: 'Responsive Flow', tag: 'Mobile layout', image: 'https://images.unsplash.com/photo-1552566626-52f8b828addb?auto=format&fit=crop&w=1200&q=84' },
]

const contactMethods = [
  { label: 'Gmail', value: 'psinghdhruvendra@gmail.com', href: 'mailto:psinghdhruvendra@gmail.com', icon: <FaEnvelope /> },
  { label: 'Mobile', value: '+91 94105 21000', href: 'tel:+919410521000', icon: <FaPhone /> },
  { label: 'WhatsApp', value: 'Message on WhatsApp', href: 'https://wa.me/919410521000', icon: <FaWhatsapp /> },
  { label: 'GitHub', value: 'psinghdhruvendra-arch', href: 'https://github.com/psinghdhruvendra-arch', icon: <FaGithub /> },
]

const reveal = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function createAmbientTrack() {
  const sampleRate = 22050
  const seconds = 9
  const samples = sampleRate * seconds
  const buffer = new ArrayBuffer(44 + samples * 2)
  const view = new DataView(buffer)
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i += 1) view.setUint8(offset + i, string.charCodeAt(i))
  }
  writeString(0, 'RIFF')
  view.setUint32(4, 36 + samples * 2, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, samples * 2, true)

  const notes = [[0.2, 146.83], [2.2, 196], [4.1, 220], [6.3, 174.61]]
  for (let i = 0; i < samples; i += 1) {
    const t = i / sampleRate
    const fade = Math.min(1, t / 1.4, (seconds - t) / 1.8)
    const pad = Math.sin(2 * Math.PI * 73.42 * t) * 0.22 + Math.sin(2 * Math.PI * 110 * t) * 0.12
    const bells = notes.reduce((sum, [start, freq]) => {
      const age = t - start
      if (age < 0 || age > 1.6) return sum
      return sum + Math.sin(2 * Math.PI * freq * age) * Math.exp(-2.7 * age) * 0.28
    }, 0)
    const value = Math.max(-1, Math.min(1, (pad + bells) * fade))
    view.setInt16(44 + i * 2, value * 32767, true)
  }

  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i])
  return `data:audio/wav;base64,${btoa(binary)}`
}

function useActiveSection() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-36% 0px -54% 0px', threshold: [0.12, 0.35, 0.6] }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}

function ParticleField() {
  const canvasRef = useRef(null)
  const pointer = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let width = 0
    let height = 0
    let frame = 0
    let particles = []

    const resize = () => {
      width = canvas.width = window.innerWidth * window.devicePixelRatio
      height = canvas.height = window.innerHeight * window.devicePixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      particles = Array.from({ length: Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 14000)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25 * window.devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.25 * window.devicePixelRatio,
        size: (0.7 + Math.random() * 1.8) * window.devicePixelRatio,
        hue: Math.random() > 0.76 ? '253,54,126' : '5,133,230',
      }))
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'
      const px = pointer.current.x * window.devicePixelRatio
      const py = pointer.current.y * window.devicePixelRatio

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        const distance = Math.hypot(particle.x - px, particle.y - py)
        if (distance < 150 * window.devicePixelRatio) {
          particle.x += ((particle.x - px) / Math.max(distance, 1)) * 0.25
          particle.y += ((particle.y - py) / Math.max(distance, 1)) * 0.25
        }

        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(${particle.hue},0.32)`
        context.shadowColor = `rgba(${particle.hue},0.7)`
        context.shadowBlur = 10
        context.fill()
        context.shadowBlur = 0

        for (let j = index + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const lineDistance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (lineDistance < 110 * window.devicePixelRatio) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(5,133,230,${0.12 * (1 - lineDistance / (110 * window.devicePixelRatio))})`
            context.lineWidth = window.devicePixelRatio
            context.stroke()
          }
        }
      })

      context.globalCompositeOperation = 'source-over'
      frame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event) => {
      pointer.current = { x: event.clientX, y: event.clientY }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />
}

function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(18px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="loader-grid" />
      <motion.div className="loader-mark" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        o_0
      </motion.div>
      <motion.p className="loader-name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.7 }}>
        Dhruvendra P. Singh
      </motion.p>
      <motion.p className="loader-alias" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35, duration: 0.7 }}>
        Nova Dhruv
      </motion.p>
      <div className="loader-progress">
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2, duration: 0.9, ease: 'easeInOut' }} />
      </div>
      <span className="scan-line" />
    </motion.div>
  )
}

function Navbar({ musicOn, onMusicToggle }) {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <a className="nav-logo" href="#home" aria-label="Nova Dhruv home">o_0</a>
      <nav className={open ? 'nav-links nav-links-open' : 'nav-links'} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.id}
            className={active === item.id ? 'active' : ''}
            href={`#${item.id}`}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="nav-talk" href="#contact">Let's Talk <FaLocationArrow /></a>
        <button
          className={musicOn ? 'icon-button music-active' : 'icon-button'}
          type="button"
          onClick={onMusicToggle}
          aria-label={musicOn ? 'Pause ambient music' : 'Play ambient music'}
          title={musicOn ? 'Pause ambient music' : 'Play ambient music'}
        >
          {musicOn ? <span className="equalizer"><i /><i /><i /></span> : <FaMusic />}
        </button>
        <button className="icon-button mobile-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ x, y })
  }

  return (
    <section className="hero section" id="home" onPointerMove={onMove}>
      <motion.div className="hero-copy" variants={reveal} initial="hidden" animate="show">
        <span className="hello-pill"><i /> Hello, I'm</span>
        <h1>Dhruvendra<br /><span>P. Singh</span></h1>
        <p className="alias">Nova Dhruv</p>
        <p className="subtitle">Frontend Developer&nbsp; • &nbsp;UI Engineer&nbsp; • &nbsp;Creative Web Developer</p>
        <p className="tagline">I build modern, responsive, and user-friendly web experiences with clean code, thoughtful interactions, and a passion for design.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">View My Work <FaArrowRight /></a>
          <a className="button button-secondary" href="#contact">Hire Me <FaLocationArrow /></a>
        </div>
        <a className="scroll-cue" href="#about"><span>↓</span> Scroll Down</a>
      </motion.div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.8 }}>
        <div
          className="portrait-orbit"
          style={{ transform: `perspective(900px) rotateX(${tilt.y * -12}deg) rotateY(${tilt.x * 16}deg)` }}
        >
          <div className="orbit-glow" />
          <div className="orbit-card orbit-card-code"><span>01</span><strong>UI / UX</strong><small>Thoughtful systems</small></div>
          <div className="orbit-card orbit-card-motion"><span>✦</span><strong>MOTION</strong><small>Fluid interactions</small></div>
          <div className="portrait-ring"><img src={portrait} alt="Dhruvendra P. Singh" /></div>
          <span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" />
        </div>
      </motion.div>
      <motion.div className="stats-strip" variants={reveal} initial="hidden" animate="show">
        <div><strong>10<span>+</span></strong><small>Projects<br />Completed</small></div>
        <div><strong>3<span>+</span></strong><small>Years of<br />Learning</small></div>
        <div><strong>20<span>+</span></strong><small>Technologies<br />Mastered</small></div>
        <div><strong>15<span>+</span></strong><small>Happy<br />Clients</small></div>
        <div><strong>100<span>%</span></strong><small>Passion &<br />Dedication</small></div>
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" eyebrow="About Me" title="A frontend developer building with clarity, motion, and intent.">
      <div className="about-layout">
        <motion.div className="portrait-panel" variants={reveal}>
          <div className="portrait-frame">
            <img src={portrait} alt="Nova Dhruv portrait" />
            <small>Nova Dhruv</small>
          </div>
          <div className="signal-list">
            <span>Responsive UI</span>
            <span>Freelance Delivery</span>
            <span>Modern Web Craft</span>
          </div>
        </motion.div>
        <motion.div className="about-copy" variants={reveal}>
          <p>
            I am Dhruvendra P. Singh, a frontend developer focused on modern interfaces that feel fast, elegant, and easy to use. My work blends responsive layouts, polished UI details, practical UX thinking, and cinematic motion.
          </p>
          <p>
            I have built real freelance websites, creative landing pages, and AI-assisted frontend experiments while continuously sharpening React, Tailwind CSS, JavaScript, and visual development workflows.
          </p>
          <div className="timeline">
            {timeline.map((item) => (
              <article className="timeline-item" key={item.stage}>
                <span>{item.stage}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Reviews() {
  const [activeReview, setActiveReview] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActiveReview((current) => (current + 1) % reviews.length), 4200)
    return () => clearInterval(timer)
  }, [])

  const visibleReviews = [0, 1, 2].map((offset) => reviews[(activeReview + offset) % reviews.length])

  return (
    <section className="section reviews-band" id="reviews" aria-labelledby="reviews-title">
      <motion.div className="section-heading compact" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
        <span className="eyebrow">Client Reviews</span>
        <h2 id="reviews-title">Credibility from real-world project delivery.</h2>
      </motion.div>
      <p className="horizontal-hint">Swipe or shift-scroll to explore testimonials <span>→</span></p>
      <div className="reviews-carousel" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div className="reviews-grid reviews-grid-carousel" key={activeReview} initial={{ opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -34 }} transition={{ duration: .45 }}>
            {visibleReviews.map((review) => (
              <TiltCard className="review-card" key={review.project}>
                <FaQuoteLeft className="quote-icon" />
                <div className="stars" aria-label={`${review.rating} star review`}>
                  {Array.from({ length: review.rating }).map((_, i) => <FaStar key={i} />)}
                </div>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
                <span>{review.project}</span>
              </TiltCard>
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="review-dots" aria-label="Testimonial slides">
          {reviews.map((review, index) => <button className={index === activeReview ? 'active' : ''} type="button" key={review.project} onClick={() => setActiveReview(index)} aria-label={`Show testimonial ${index + 1}`} />)}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const featured = projects.find((project) => project.featured)
  const rest = projects.filter((project) => !project.featured)

  return (
    <Section id="projects" eyebrow="Projects" title="Freelance builds, cinematic interfaces, and responsive frontend work.">
      <p className="horizontal-hint">Swipe or shift-scroll to explore projects <span>→</span></p>
      <TiltCard className="featured-project">
        <div className="project-image-wrap"><img src={featured.image} alt={`${featured.title} project preview`} /></div>
        <div>
          <span className="project-kicker">{featured.kicker}</span>
          <h3>{featured.title}</h3>
          <p>{featured.description}</p>
          <TechList items={featured.tech} />
        </div>
        <ProjectActions project={featured} />
      </TiltCard>
      <div className="projects-grid">
        {rest.map((project, index) => (
          <TiltCard className="project-card" key={project.title} delay={index * 0.06}>
            {project.image && <div className="project-image-wrap"><img src={project.image} alt={`${project.title} project preview`} /></div>}
            <span className="project-kicker">{project.kicker}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <TechList items={project.tech} />
            <ProjectActions project={project} />
          </TiltCard>
        ))}
      </div>
    </Section>
  )
}

function CaseStudy() {
  const [active, setActive] = useState(null)

  return (
    <Section id="case-study" eyebrow="Case Study" title="Mantar Restaurant, shaped as a warm and conversion-focused digital experience.">
      <div className="case-layout">
        <div className="case-steps">
          {caseStudy.map(([title, text]) => (
            <motion.article className="case-step" key={title} variants={reveal}>
              <span>{title}</span>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
        <motion.div className="gallery-panel" variants={reveal}>
          <div className="gallery-header">
            <h3>Interactive Gallery</h3>
            <a href="https://psinghdhruvendra-arch.github.io/Mantar_Demo/" target="_blank" rel="noreferrer">Open project <FaUpRightFromSquare /></a>
          </div>
          <div className="gallery-grid">
            {gallery.map((item, index) => (
              <button className="gallery-item" type="button" key={item.title} style={{ '--gallery-image': `url(${item.image})` }} onClick={() => setActive(index)}>
                <span>{item.tag}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div className="lightbox-content" initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.96 }} onClick={(event) => event.stopPropagation()}>
              <button type="button" onClick={() => setActive(null)} aria-label="Close gallery"><FaXmark /></button>
              <div className="mock-screenshot" style={{ backgroundImage: `linear-gradient(180deg, rgba(7,16,32,.1), rgba(7,16,32,.92)), url(${gallery[active].image})` }}>
                <span>{gallery[active].tag}</span>
                <h3>{gallery[active].title}</h3>
                <p>Preview panel for the Mantar Restaurant case study gallery.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹8k',
    detail: 'For a sharp one-page presence.',
    features: ['Landing page', 'Responsive layout', 'Basic motion', 'Contact CTA'],
  },
  {
    name: 'Growth',
    price: '₹18k',
    detail: 'For businesses ready to look established online.',
    features: ['Multi-section website', 'Custom visual direction', 'Interactive UI', 'Deployment support'],
    featured: true,
  },
  {
    name: 'Signature',
    price: '₹30k+',
    detail: 'For a premium, story-led digital experience.',
    features: ['Custom page system', 'Advanced motion', 'Case-study storytelling', 'Post-launch refinement'],
  },
]

function Pricing() {
  return (
    <Section id="pricing" eyebrow="Pricing" title="Clear packages for building something worth remembering.">
      <div className="pricing-grid">
        {pricingPlans.map((plan, index) => (
          <motion.article className={plan.featured ? 'price-card price-card-featured' : 'price-card'} key={plan.name} variants={reveal} transition={{ delay: index * 0.08 }}>
            {plan.featured && <span className="price-badge">Most popular</span>}
            <span className="price-name">{plan.name}</span>
            <strong className="price-value">{plan.price}</strong>
            <p>{plan.detail}</p>
            <div className="price-features">{plan.features.map((feature) => <span key={feature}>✦ {feature}</span>)}</div>
            <a className={plan.featured ? 'button button-primary' : 'button button-secondary'} href="#contact">Choose {plan.name} <FaArrowRight /></a>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  const activeSkills = skills[activeCategory]
  const radarData = useMemo(() => ({
    labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'UI Motion'],
    datasets: [{
      label: 'Frontend Strength',
      data: [92, 90, 84, 78, 88, 82],
      borderColor: '#0585E6',
      backgroundColor: 'rgba(5,133,230,0.22)',
      pointBackgroundColor: '#FD367E',
      pointBorderColor: '#F5E9DA',
      pointRadius: 4,
    }],
  }), [])

  const barData = useMemo(() => ({
    labels: ['Frontend', 'Backend', 'Programming', 'Database', 'Tools'],
    datasets: [{
      label: 'Skill Coverage',
      data: [92, 58, 70, 55, 82],
      backgroundColor: ['#0585E6', '#1DA1F2', '#FD367E', '#4ABDAC', '#F5E9DA'],
      borderRadius: 8,
    }],
  }), [])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#F5E9DA', font: { family: 'Inter' } } },
      tooltip: { backgroundColor: '#0B162A', borderColor: 'rgba(5,133,230,0.4)', borderWidth: 1 },
    },
    scales: {
      r: {
        ticks: { display: false },
        grid: { color: 'rgba(245,233,218,0.12)' },
        angleLines: { color: 'rgba(245,233,218,0.12)' },
        pointLabels: { color: '#F5E9DA', font: { family: 'Inter', size: 12 } },
      },
      x: { ticks: { color: '#F5E9DA' }, grid: { display: false } },
      y: { ticks: { color: 'rgba(245,233,218,0.65)' }, grid: { color: 'rgba(245,233,218,0.08)' } },
    },
  }

  return (
    <Section id="skills" eyebrow="Skills" title="A practical frontend toolkit with room for serious growth.">
      <div className="skills-layout">
        <div className="skills-list">
          <div className="skill-category-tabs" role="tablist" aria-label="Skill categories">
            {Object.keys(skills).map((category) => (
              <button className={activeCategory === category ? 'skill-tab active' : 'skill-tab'} type="button" role="tab" aria-selected={activeCategory === category} key={category} onClick={() => setActiveCategory(category)}>
                {category}
              </button>
            ))}
          </div>
          <motion.div className="skill-meter-panel" key={activeCategory} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="skill-meter-heading"><span>Selected discipline</span><strong>{activeCategory}</strong></div>
            <div className="skill-meter-list">
              {activeSkills.map((item) => (
                <div className="skill-meter" key={item}>
                  <div><span>{item}</span><strong>{skillLevels[item]}%</strong></div>
                  <span className="skill-meter-track"><i style={{ width: `${skillLevels[item]}%` }} /></span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div className="dashboard" variants={reveal}>
          <div className="chart-card">
            <h3><FaChartLine /> Radar</h3>
            <div className="chart-wrap"><Radar data={radarData} options={chartOptions} /></div>
          </div>
          <div className="chart-card">
            <h3><FaCode /> Analytics</h3>
            <div className="chart-wrap"><Bar data={barData} options={chartOptions} /></div>
          </div>
        </motion.div>
      </div>
      <div className="workflow">
        {buildSteps.map((step, index) => (
          <motion.article className="workflow-step" key={step.label} variants={reveal}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.label}</h3>
            <p>{step.text}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Portfolio / Landing Page',
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submitMessage = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setStatus({ type: '', text: 'Saving your message securely...' })

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Could not save the message.')
      }

      setStatus({ type: 'success', text: 'Message saved in MongoDB. I will get back to you soon.' })
      setForm({
        name: '',
        email: '',
        phone: '',
        service: 'Portfolio / Landing Page',
        budget: '',
        message: '',
      })
    } catch (error) {
      setStatus({ type: 'error', text: error.message || 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something great together.">
      <div className="contact-layout">
        {contactMethods.map((method) => (
          <a className="contact-card" href={method.href} key={method.label} target={method.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            <span>{method.icon}</span>
            <strong>{method.label}</strong>
            <p>{method.value}</p>
          </a>
        ))}
      </div>
      <div className="contact-cta">
        <p>Available for freelance websites, landing pages, responsive UI builds, and polished frontend experiences.</p>
        <a className="button button-primary" href="mailto:psinghdhruvendra@gmail.com">Start a Project <FaEnvelope /></a>
      </div>
      <form className="contact-form" onSubmit={submitMessage}>
        <div className="form-grid">
          <label>
            Name
            <input name="name" value={form.name} onChange={updateField} placeholder="Your name" required minLength={2} />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required />
          </label>
        </div>
        <div className="form-grid">
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={updateField} placeholder="+91..." />
          </label>
          <label>
            Service
            <input name="service" value={form.service} onChange={updateField} placeholder="Website, portfolio, UI build..." />
          </label>
        </div>
        <label>
          Budget
          <input name="budget" value={form.budget} onChange={updateField} placeholder="Optional project budget" />
        </label>
        <label>
          Message
          <textarea name="message" value={form.message} onChange={updateField} placeholder="Tell me what you want to build..." required minLength={10} />
        </label>
        <button className="button button-primary" type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Message'} <FaEnvelope />
        </button>
        <p className={`form-status ${status.type}`}>{status.text}</p>
      </form>
    </Section>
  )
}

function Section({ id, eyebrow, title, children }) {
  return (
    <motion.section
      className="section"
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ staggerChildren: 0.08 }}
    >
      <motion.div className="section-heading" variants={reveal}>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </motion.div>
      {children}
    </motion.section>
  )
}

function TiltCard({ className, children, delay = 0 }) {
  const ref = useRef(null)

  const onMove = (event) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    ref.current.style.setProperty('--rx', `${y * -7}deg`)
    ref.current.style.setProperty('--ry', `${x * 9}deg`)
    ref.current.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    ref.current.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }

  const onLeave = () => {
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }

  return (
    <motion.article
      ref={ref}
      className={`tilt-card ${className}`}
      variants={reveal}
      transition={{ delay }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.article>
  )
}

function TechList({ items }) {
  return <div className="tech-list">{items.map((item) => <span key={item}>{item}</span>)}</div>
}

function ProjectActions({ project }) {
  return (
    <div className="project-actions">
      <a href={project.live} target="_blank" rel="noreferrer">Live Demo <FaUpRightFromSquare /></a>
      <a href={project.repo} target="_blank" rel="noreferrer">Repository <FaGithub /></a>
    </div>
  )
}

function useVisitorTracking(enabled) {
  useEffect(() => {
    if (!enabled) return

    const storageKey = 'nova-dhruv-session-id'
    let sessionId = localStorage.getItem(storageKey)
    if (!sessionId) {
      sessionId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`
      localStorage.setItem(storageKey, sessionId)
    }

    fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        path: window.location.pathname + window.location.hash,
        referrer: document.referrer,
      }),
    }).catch(() => {
      // Visitor analytics should never interrupt the portfolio experience.
    })
  }, [enabled])
}

function Footer() {
  return (
    <footer className="footer">
      <p>Designed and developed by <strong>Nova Dhruv</strong> / Dhruvendra P. Singh</p>
      <a href="#home">Back to top</a>
    </footer>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [musicOn, setMusicOn] = useState(false)
  const audio = useRef(null)

  useVisitorTracking(!loading)

  const toggleMusic = useCallback(() => {
    if (musicOn) {
      audio.current?.fade(audio.current.volume(), 0, 650)
      setTimeout(() => {
        audio.current?.stop()
        audio.current?.unload()
        audio.current = null
      }, 700)
      setMusicOn(false)
      return
    }

    const sound = new Howl({ src: [createAmbientTrack()], loop: true, html5: false, volume: 0 })
    sound.play()
    sound.fade(0, 0.2, 1200)
    audio.current = sound
    setMusicOn(true)
  }, [musicOn])

  useEffect(() => () => {
    audio.current?.stop()
    audio.current?.unload()
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <>
          <ParticleField />
          <div className={musicOn ? 'ambient-shell music-lit' : 'ambient-shell'} />
          <Navbar musicOn={musicOn} onMusicToggle={toggleMusic} />
          <main>
            <Hero />
            <About />
            <Reviews />
            <Projects />
            <CaseStudy />
            <Skills />
            <Pricing />
            <Contact />
          </main>
          <Footer />
          <a className="whatsapp-float" href="https://wa.me/919410521000" target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp">
            <FaWhatsapp />
          </a>
        </>
      )}
    </>
  )
}
