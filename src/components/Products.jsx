export default function Products() {
    // Array of product videos to easily add more later
    const products = [
        {
            id: 1,
            title: "Bikanervala Live QSR Voice AI",
            description: "A live-environment Generative AI avatar built for Bikanervala Quick Service Restaurants. It handles real-time customer voice interactions seamlessly synchronized with a 3D avatar for automated ordering, powered by cutting-edge LLM orchestration.",
            youtubeId: "eoNfnJzf0Cc",
        },
        {
            id: 2,
            title: "Adani - Ospree Duty Free Mumbai",
            description: "HeyAlpha (Voice AI) fully integrated within an autonomous robot. The AI acts as the core brain, making dynamic decisions, independently controlling the robot's navigation, and intelligently assisting customers in the bustling Ospree Duty Free terminal.",
            youtubeId: "XwgUPWd-5bE",
        }
    ]

    return (
        <section className="section" id="products">
            <span className="section__label">Showcase</span>
            <h2 className="section__title">
                Generative AI <span>Products</span>
            </h2>
            <div className="projects__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                {products.map((product) => (
                    <div key={product.id} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
                            <div className="video-container" style={{ position: 'relative', width: '100%', maxWidth: '240px', aspectRatio: '9 / 16', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                                <iframe 
                                    src={`https://www.youtube.com/embed/${product.youtubeId}?autoplay=0&mute=0&controls=1&loop=1&playlist=${product.youtubeId}&modestbranding=1&rel=0&iv_load_policy=3`} 
                                    title={product.title}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                    }}
                                ></iframe>
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-light)' }}>{product.title}</h3>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                {product.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
