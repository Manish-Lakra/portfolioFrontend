const AWARDS = [
    {
        icon: '🏆',
        title: '"On The Dot" Performance Award',
        org: 'Alphadroid',
        desc: 'Recognized for exceptional delivery and consistent high performance in building the HeyAlpha platform.',
    },
    {
        icon: '🎖️',
        title: 'Certificate of Appreciation',
        org: 'RapiPay',
        desc: 'Awarded for spearheading the Digital Lending product launch and delivering ahead of schedule.',
    },
    {
        icon: '🚀',
        title: 'National Grand Hackathon Finalist',
        org: 'ONDC — Ministry of Commerce, Govt. of India',
        desc: 'Reached the finals of one of India\'s largest national hackathons for digital commerce innovation.',
    },
]

const COLORS = ['bg-lav', 'bg-pink', 'bg-yellow']

export default function Awards() {
    return (
        <section className="sect band-mint section" id="awards">
            <div className="wrap">
                <p className="eyebrow">Recognition</p>
                <h2>Awards &amp; <span className="slab">achievements</span></h2>
                <div className="cards3">
                    {AWARDS.map((award, i) => (
                        <article className={`tile ${COLORS[i % COLORS.length]}`} key={i}>
                            <span className="badge" aria-hidden="true">{award.icon}</span>
                            <p className="org">{award.org}</p>
                            <h3>{award.title}</h3>
                            <p>{award.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
