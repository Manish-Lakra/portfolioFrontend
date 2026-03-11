import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Awards from './components/Awards'
import Contact from './components/Contact'
import VoiceAssistant from './components/VoiceAssistant'

export default function App() {
    useEffect(() => {
        // IntersectionObserver for scroll-based section reveal
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section--visible')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        document.querySelectorAll('.section').forEach((section) => {
            observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <>
            {/* Animated background */}
            <div className="app-background">
                <div className="bg-orb bg-orb--1"></div>
                <div className="bg-orb bg-orb--2"></div>
                <div className="bg-orb bg-orb--3"></div>
            </div>
            <div className="bg-grid"></div>

            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Education />
                <Awards />
                <Contact />
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>
                    © 2024 Manish Lakra · Built with ❤️ and Voice AI ·{' '}
                    <a href="https://www.linkedin.com/in/manish-lakra-106b6492/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </p>
            </footer>

            {/* Voice Assistant (floating) */}
            <VoiceAssistant />
        </>
    )
}
