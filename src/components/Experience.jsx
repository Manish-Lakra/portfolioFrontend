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
        <section className="sect band-lav section" id="experience">
            <div className="wrap">
                <p className="eyebrow">Experience</p>
                <h2>Where I've <span className="slab slab-mint">built</span></h2>
                <ol className="timeline">
                    {EXPERIENCE.map((exp, i) => (
                        <li className="job" key={i}>
                            <div className={`jobhead ${i === 0 ? 'bg-pink' : 'bg-sky'}`}>
                                <div>
                                    <h3>{exp.role}</h3>
                                    <div className="co">
                                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                                    </div>
                                </div>
                                <span className="when">{exp.date}</span>
                            </div>
                            <div className="jobbody">
                                <ul>
                                    {exp.points.map((point, j) => (
                                        <li key={j}>{point}</li>
                                    ))}
                                </ul>
                                {exp.highlight && (
                                    <div className="highlight">✦ {exp.highlight}</div>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
