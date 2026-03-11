export default function About() {
    return (
        <section className="section" id="about">
            <span className="section__label">About Me</span>
            <h2 className="section__title">
                Crafting <span>Intelligent</span> Experiences
            </h2>
            <div className="about__content">
                <div className="about__image-wrapper">
                    <div className="about__image-glow"></div>
                    <div className="about__image" style={{
                        background: 'linear-gradient(135deg, rgba(217, 119, 87, 0.2), rgba(194, 137, 110, 0.2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '5rem',
                        color: 'rgba(255,255,255,0.3)'
                    }}>
                        👨‍💻
                    </div>
                </div>
                <div className="about__text">
                    <p>
                        I'm an AI Engineer & Technical Lead with hands-on experience building production
                        Agentic AI systems, LLM orchestration, and low-latency voice-to-voice pipelines.
                        I thrive on solving complex engineering challenges and turning ambitious 0→1 ideas
                        into shipped products.
                    </p>
                    <p>
                        Currently at <strong style={{ color: 'var(--accent-cyan)' }}>Alphadroid</strong>,
                        I lead the development of HeyAlpha — a conversational AI platform featuring real-time
                        voice interactions, 3D avatar synchronization, and multi-agent LLM systems. I've
                        delivered enterprise deployments for clients like Apollo Hospitals and Bikanervala.
                    </p>
                    <div className="about__stats">
                        <div className="about__stat glass-card">
                            <div className="about__stat-number">7+</div>
                            <div className="about__stat-label">Years Experience</div>
                        </div>
                        <div className="about__stat glass-card">
                            <div className="about__stat-number">10+</div>
                            <div className="about__stat-label">Products Shipped</div>
                        </div>
                        <div className="about__stat glass-card">
                            <div className="about__stat-number">5+</div>
                            <div className="about__stat-label">Enterprise Clients</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
