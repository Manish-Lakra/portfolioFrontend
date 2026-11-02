import { Fragment } from 'react'

const MARQUEE = [
    'Agentic AI',
    'LLM orchestration',
    'Voice-to-voice',
    'RAG',
    '3D avatars',
    'Real-time streaming',
]

export default function Hero() {
    return (
        <>
            <section className="hero" id="hero">
                <svg className="swoosh" viewBox="0 0 1440 700" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M-40 520C220 380 420 640 700 470S1180 180 1480 330" />
                    <path d="M-40 250C260 120 520 330 820 210S1260 40 1480 120" />
                    <path d="M-40 660C300 560 560 700 900 600S1300 480 1480 560" />
                </svg>

                {/* floating stickers: mic, spark, chat bubble */}
                <svg className="sticker sticker-a" viewBox="0 0 120 120" aria-hidden="true">
                    <ellipse className="edge" cx="64" cy="66" rx="50" ry="50" />
                    <ellipse className="face pink" cx="58" cy="58" rx="50" ry="50" />
                    <rect className="ink-line" x="48" y="28" width="20" height="34" rx="10" />
                    <path className="ink-line" d="M40 54c0 10 8 18 18 18s18-8 18-18M58 72v14M48 86h20" />
                </svg>
                <svg className="sticker sticker-b" viewBox="0 0 120 120" aria-hidden="true">
                    <ellipse className="edge" cx="64" cy="66" rx="50" ry="50" />
                    <ellipse className="face yellow" cx="58" cy="58" rx="50" ry="50" />
                    <path className="ink-line" d="M58 26l7 20 20 7-20 7-7 20-7-20-20-7 20-7z" />
                </svg>
                <svg className="sticker sticker-c" viewBox="0 0 120 120" aria-hidden="true">
                    <ellipse className="edge" cx="64" cy="66" rx="50" ry="50" />
                    <ellipse className="face mint" cx="58" cy="58" rx="50" ry="50" />
                    <path className="ink-line" d="M32 38h52v30H54l-14 12V68h-8z" />
                    <path className="ink-line" d="M44 53h28" />
                </svg>

                <div className="wrap herogrid">
                    <div className="herotext">
                        <p className="chip">
                            <span className="dot" aria-hidden="true"></span>
                            Available for opportunities
                        </p>
                        <h1>
                            <span className="h1a">Manish Lakra</span>
                            <span className="h1b">builds AI that</span>
                            <span className="h1c"><span className="slab">talks back</span></span>
                        </h1>
                        <p className="lead">AI Engineer &amp; Technical Lead.</p>
                        <p className="sub">
                            Building production Agentic AI systems, LLM orchestration, and low-latency
                            voice-to-voice pipelines. Proven 0→1 product delivery, enterprise deployments,
                            and operational scaling for voice &amp; multimodal AI products.
                        </p>
                        <div className="ctas">
                            <button
                                className="btn btn-peach"
                                onClick={() => {
                                    const event = new CustomEvent('startVoice')
                                    window.dispatchEvent(event)
                                }}
                            >
                                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
                                Talk to my AI
                            </button>
                            <a className="btn btn-white" href="#contact" onClick={(e) => {
                                e.preventDefault()
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                            }}>
                                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                                Get in touch
                            </a>
                        </div>
                    </div>

                    <div className="heroart" aria-label="An illustrated voice AI pipeline and a shipped product">
                        <div className="win term">
                            <div className="bar">
                                <span className="dots" aria-hidden="true"><i></i><i></i><i></i></span>
                                pipeline.log <em>heyalpha</em>
                            </div>
                            <ol className="log">
                                <li className="go">mic → streaming speech-to-text</li>
                                <li className="ok">partial transcript received</li>
                                <li className="go">route to agent: order_taker</li>
                                <li className="ok">RAG: menu context retrieved</li>
                                <li className="go">LLM → TTS, streamed token by token</li>
                                <li className="warn">user interrupted, yielding the turn</li>
                                <li className="ok">avatar lip-sync aligned to audio</li>
                            </ol>
                        </div>
                        <div className="win card">
                            <div className="bar">
                                <span className="dots" aria-hidden="true"><i></i><i></i><i></i></span>
                                shipped
                            </div>
                            <div className="rep">
                                <div className="rephead"><b>QSR voice avatar for Bikanervala</b><span className="sev">Live</span></div>
                                <p className="repby">Alphadroid <span>·</span> HeyAlpha</p>
                                <ul className="steps">
                                    <li className="done">0→1 prototype</li>
                                    <li className="done">Multi-agent LLM + RAG</li>
                                    <li className="done">Streaming STT → LLM → TTS</li>
                                    <li className="done">3D avatar sync</li>
                                    <li className="todo">Next enterprise rollout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="marquee" aria-hidden="true">
                <div className="track">
                    {[...MARQUEE, ...MARQUEE].map((word, i) => (
                        <Fragment key={i}>
                            <span>{word}</span><i>✦</i>
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}
