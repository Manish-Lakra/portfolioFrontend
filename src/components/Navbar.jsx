import { useState, useEffect } from 'react'

const NAV_ITEMS = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'awards', label: 'Awards' },
    { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.3 }
        )

        NAV_ITEMS.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const handleClick = (e, id) => {
        e.preventDefault()
        setMobileOpen(false)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <a href="#" className="navbar__logo">ML.</a>
            <button
                className="navbar__mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
            >
                {mobileOpen ? '✕' : '☰'}
            </button>
            <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
                {NAV_ITEMS.map(({ id, label }) => (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            className={`navbar__link ${activeSection === id ? 'navbar__link--active' : ''}`}
                            onClick={(e) => handleClick(e, id)}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
