export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero__badge">
                <span className="hero__badge-dot"></span>
                Available for opportunities
            </div>
            <h1 className="hero__name">
                Manish<br />
                <span className="hero__name-gradient">Lakra</span>
            </h1>
            <p className="hero__title">AI Engineer || Technical Lead</p>
            <p className="hero__description">
                Building production Agentic AI systems, LLM orchestration, and low-latency
                voice-to-voice pipelines. Proven 0→1 product delivery, enterprise deployments,
                and operational scaling for voice & multimodal AI products.
            </p>
            <div className="hero__cta-group">
                <button
                    className="btn btn--primary"
                    onClick={() => {
                        const event = new CustomEvent('startVoice')
                        window.dispatchEvent(event)
                    }}
                >
                    🎙️ Talk to My AI
                </button>
                <a href="#contact" className="btn btn--ghost" onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}>
                    Get in Touch →
                </a>
            </div>
            <div className="hero__scroll-indicator">
                <span>Scroll or speak</span>
                <div className="hero__scroll-line"></div>
            </div>
        </section>
    )
}
