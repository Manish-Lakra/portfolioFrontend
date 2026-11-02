const STATS = [
    { number: '7+', label: 'Years experience', color: 'bg-pink' },
    { number: '10+', label: 'Products shipped', color: 'bg-yellow' },
    { number: '5+', label: 'Enterprise clients', color: 'bg-mint' },
]

export default function About() {
    return (
        <section className="sect section" id="about">
            <div className="wrap">
                <p className="eyebrow">About me</p>
                <h2>Crafting <span className="slab slab-pink">intelligent</span> experiences</h2>
                <div className="aboutgrid">
                    <div className="abouttext">
                        <p>
                            I'm an AI Engineer &amp; Technical Lead with hands-on experience building production
                            Agentic AI systems, LLM orchestration, and low-latency voice-to-voice pipelines.
                            I thrive on solving complex engineering challenges and turning ambitious 0→1 ideas
                            into shipped products.
                        </p>
                        <p>
                            Currently at <strong>Alphadroid</strong>, I lead the development of HeyAlpha — a
                            conversational AI platform featuring real-time voice interactions, 3D avatar
                            synchronization, and multi-agent LLM systems. I've delivered enterprise deployments
                            for clients like Apollo Hospitals and Bikanervala.
                        </p>
                    </div>
                    <div className="stats">
                        {STATS.map((stat) => (
                            <div className={`stat ${stat.color}`} key={stat.label}>
                                <b>{stat.number}</b>
                                <span>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
