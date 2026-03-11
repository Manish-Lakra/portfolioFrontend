const EXPERIENCE = [
    {
        role: 'AI Engineer || Lead Software Engineer',
        company: 'Alphadroid',
        location: 'NOIDA',
        date: '2024 — Present',
        points: [
            'Launched a Conversational AI platform for HeyAlpha with real-time voice interactions and 3D avatar',
            'Designed a multi-agent language model system with context-aware tools using RAG',
            'Developed a fast streaming pipeline from STT to LLM and TTS, optimizing for smooth interactions',
            'Engineered avatar synchronization for speech and animation alignment with minimal latency',
            'Led the product from development to production, managing roadmap and client integrations',
        ],
        highlight: 'Stabilized live deployments for enterprise customers like Apollo Hospitals and Bikanervala',
    },
    {
        role: 'Lead / Senior Software Engineer',
        company: 'Bijnis | Dresma.ai | RapiPay | Affle',
        location: '',
        date: '2018 — 2024',
        points: [
            'Led the development of consumer, enterprise, and fintech products',
            'Focused on React Native and backend APIs',
            'Oversaw end-to-end feature delivery from architecture design to release',
            'Integrated AI-driven features like chatbots, automation, and object detection',
            'Implemented payment systems and KYC workflows',
            'Collaborated with product, backend, and QA teams',
        ],
        highlight: 'Enhanced system reliability, performance, and scalability',
    },
]

export default function Experience() {
    return (
        <section className="section" id="experience">
            <span className="section__label">Experience</span>
            <h2 className="section__title">
                Where I've <span>Built</span>
            </h2>
            <div className="timeline">
                {EXPERIENCE.map((exp, i) => (
                    <div className="timeline__item" key={i}>
                        <div className="timeline__dot"></div>
                        <div className="glass-card">
                            <div className="timeline__header">
                                <div>
                                    <div className="timeline__role">{exp.role}</div>
                                    <div className="timeline__company">
                                        {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                                    </div>
                                </div>
                                <span className="timeline__date">{exp.date}</span>
                            </div>
                            <ul className="timeline__points">
                                {exp.points.map((point, j) => (
                                    <li key={j}>{point}</li>
                                ))}
                            </ul>
                            {exp.highlight && (
                                <div className="timeline__highlight">
                                    ✦ {exp.highlight}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
