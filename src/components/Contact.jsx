import { useState } from 'react'

const CONTACT_INFO = [
    { icon: '📧', label: 'Email', value: 'manish.lakra93@yahoo.com', href: 'mailto:manish.lakra93@yahoo.com' },
    { icon: '📱', label: 'Phone', value: '+91-9999590899', href: 'tel:+919999590899' },
    { icon: '📍', label: 'Location', value: '225, Mundka, Delhi', href: null },
    { icon: '🔗', label: 'LinkedIn', value: 'Manish Lakra', href: 'https://www.linkedin.com/in/manish-lakra-106b6492/' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle') // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('submitting')

        const formspreeId = import.meta.env.VITE_FORMSPREE_ID

        if (!formspreeId) {
            console.error("VITE_FORMSPREE_ID is missing!")
            setStatus('error')
            setTimeout(() => setStatus('idle'), 3000)
            return
        }

        try {
            const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            if (response.ok) {
                setStatus('success')
                setForm({ name: '', email: '', message: '' })
            } else {
                setStatus('error')
            }
        } catch (error) {
            console.error('Form submission error:', error)
            setStatus('error')
        }

        setTimeout(() => setStatus('idle'), 4000)
    }

    return (
        <section className="section" id="contact">
            <span className="section__label">Contact</span>
            <h2 className="section__title">
                Let's <span>Connect</span>
            </h2>
            <div className="contact__content">
                <div className="contact__info">
                    {CONTACT_INFO.map((item, i) => (
                        <div className="contact__item" key={i}>
                            <div className="contact__item-icon">{item.icon}</div>
                            <div>
                                <div className="contact__item-label">{item.label}</div>
                                <div className="contact__item-value">
                                    {item.href ? (
                                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                                            {item.value}
                                        </a>
                                    ) : item.value}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            id="contact-name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            id="contact-email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            id="contact-message"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn btn--primary btn--submit"
                        disabled={status === 'submitting'}
                    >
                        {status === 'submitting' ? 'Sending...' :
                            status === 'success' ? '✓ Message Sent!' :
                                status === 'error' ? 'Error - Try again' :
                                    'Send Message →'}
                    </button>
                </form>
            </div>
        </section>
    )
}
