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

export default function Awards() {
    return (
        <section className="section" id="awards">
            <span className="section__label">Recognition</span>
            <h2 className="section__title">
                Awards & <span>Achievements</span>
            </h2>
            <div className="awards__grid">
                {AWARDS.map((award, i) => (
                    <div className="glass-card award-card" key={i}>
                        <div className="award-card__icon">{award.icon}</div>
                        <div className="award-card__title">{award.title}</div>
                        <div className="award-card__org">{award.org}</div>
                        <div className="award-card__desc">{award.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}
