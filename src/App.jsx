import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Products from './components/Products'
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
            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Products />
                <Education />
                <Awards />
                <Contact />
            </main>

            {/* Footer */}
            <footer className="foot">
                <div className="wrap footin">
                    <span className="mono sm" aria-hidden="true">M</span>
                    <p>
                        © {new Date().getFullYear()} Manish Lakra <span>·</span>{' '}
                        <a href="https://www.linkedin.com/in/manish-lakra-106b6492/" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                    </p>
                    <p className="quiet">Built with React and a voice AI you can talk to.</p>
                </div>
            </footer>

            {/* Voice Assistant (floating) */}
            <VoiceAssistant />
        </>
    )
}
