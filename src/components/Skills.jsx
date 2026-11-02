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

const COLORS = ['var(--lav)', 'var(--pink)', 'var(--mint)', 'var(--sky)', 'var(--peach)']

export default function Skills() {
    return (
        <section className="sect band-yellow section" id="skills">
            <div className="wrap">
                <p className="eyebrow">Skills</p>
                <h2>Tools of the <span className="slab">trade</span></h2>
                <div className="skillgrid">
                    {SKILLS.map((skill, i) => (
                        <div className="skill" key={skill.name}>
                            <span className="badge" aria-hidden="true">{skill.icon}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h3>{skill.name}</h3>
                                <p>{skill.description}</p>
                                <div className="meter">
                                    <i style={{ width: `${skill.level}%`, background: COLORS[i % COLORS.length] }}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
