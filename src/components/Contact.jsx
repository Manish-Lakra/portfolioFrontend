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
        <section className="sect band-pink section" id="contact">
            <div className="wrap">
                <p className="eyebrow">Contact</p>
                <h2>Let's <span className="slab">connect</span></h2>
                <div className="contactgrid">
                    <ul className="cinfo">
                        {CONTACT_INFO.map((item, i) => (
                            <li key={i}>
                                <span className="badge" aria-hidden="true">{item.icon}</span>
                                <div style={{ minWidth: 0 }}>
                                    <div className="clabel">{item.label}</div>
                                    <div className="cval">
                                        {item.href ? (
                                            <a href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                                                {item.value}
                                            </a>
                                        ) : item.value}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <form className="form" onSubmit={handleSubmit} id="contact-form">
                        <div className="bar">
                            <span className="dots" aria-hidden="true"><i></i><i></i><i></i></span>
                            new message
                        </div>
                        <div className="formbody">
                            <div>
                                <label htmlFor="contact-name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    id="contact-name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    id="contact-email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-message">Message</label>
                                <textarea
                                    name="message"
                                    placeholder="What are you building?"
                                    id="contact-message"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-ink"
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? 'Sending...' :
                                    status === 'success' ? '✓ Message sent!' :
                                        status === 'error' ? 'Error - try again' :
                                            'Send message →'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
