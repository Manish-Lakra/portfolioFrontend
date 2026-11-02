export default function Products() {
    // Array of product videos to easily add more later
    const products = [
        {
            id: 1,
            title: "Bikanervala Live QSR Voice AI",
            tag: "bikanervala",
            description: "A live-environment Generative AI avatar built for Bikanervala Quick Service Restaurants. It handles real-time customer voice interactions seamlessly synchronized with a 3D avatar for automated ordering, powered by cutting-edge LLM orchestration.",
            youtubeId: "eoNfnJzf0Cc",
        },
        {
            id: 2,
            title: "Adani - Ospree Duty Free Mumbai",
            tag: "ospree robot",
            description: "HeyAlpha (Voice AI) fully integrated within an autonomous robot. The AI acts as the core brain, making dynamic decisions, independently controlling the robot's navigation, and intelligently assisting customers in the bustling Ospree Duty Free terminal.",
            youtubeId: "XwgUPWd-5bE",
        }
    ]

    return (
        <section className="sect band-ink section" id="products">
            <div className="wrap">
                <p className="eyebrow">Showcase</p>
                <h2>Generative AI <span className="slab slab-pink" style={{ color: 'var(--ink)' }}>products</span></h2>
                <div className="prodgrid">
                    {products.map((product) => (
                        <article key={product.id} className="prod">
                            <div className="bar">
                                <span className="dots" aria-hidden="true"><i></i><i></i><i></i></span>
                                demo <em>{product.tag}</em>
                            </div>
                            <div className="prodvid">
                                <div>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${product.youtubeId}?autoplay=0&mute=0&controls=1&loop=1&playlist=${product.youtubeId}&modestbranding=1&rel=0&iv_load_policy=3`}
                                        title={product.title}
                                        loading="lazy"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                            <div className="prodbody">
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
