const SKILLS = [
    {
        name: 'Agentic AI / Generative AI',
        icon: '🤖',
        description: 'Multi-agent systems, autonomous workflows',
        level: 95,
    },
    {
        name: 'Large Language Models',
        icon: '🧠',
        description: 'GPT, fine-tuning, prompt engineering, orchestration',
        level: 92,
    },
    {
        name: 'RAG',
        icon: '🔍',
        description: 'Retrieval-Augmented Generation, context-aware tools',
        level: 90,
    },
    {
        name: 'Vector Databases',
        icon: '📊',
        description: 'Embeddings, similarity search, knowledge bases',
        level: 85,
    },
    {
        name: '3D Avatar',
        icon: '🎭',
        description: 'Speech-synced animation, real-time rendering',
        level: 82,
    },
    {
        name: 'Conversational AI',
        icon: '💬',
        description: 'Voice bots, chat systems, NLU pipelines',
        level: 93,
    },
    {
        name: 'Real-time Streaming',
        icon: '⚡',
        description: 'Low-latency pipelines, WebRTC, WebSocket',
        level: 90,
    },
    {
        name: 'STT / TTS & Multimodal AI',
        icon: '🎤',
        description: 'Speech recognition, synthesis, multimodal fusion',
        level: 92,
    },
    {
        name: 'React & React Native',
        icon: '⚛️',
        description: 'Cross-platform apps, hooks, state management',
        level: 90,
    },
    {
        name: 'System Design & Architecture',
        icon: '🏗️',
        description: 'Scalable systems, microservices, API design',
        level: 88,
    },
]

export default function Skills() {
    return (
        <section className="section" id="skills">
            <span className="section__label">Skills</span>
            <h2 className="section__title">
                Tools of the <span>Trade</span>
            </h2>
            <div className="skills__grid">
                {SKILLS.map((skill, i) => (
                    <div
                        className="glass-card skill-card"
                        key={skill.name}
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        <div className="skill-card__icon">{skill.icon}</div>
                        <div className="skill-card__info">
                            <div className="skill-card__name">{skill.name}</div>
                            <div className="skill-card__description">{skill.description}</div>
                            <div className="skill-card__bar">
                                <div
                                    className="skill-card__bar-fill"
                                    style={{ width: `${skill.level}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
