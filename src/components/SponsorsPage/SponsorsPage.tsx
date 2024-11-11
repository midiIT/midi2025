import goldImage from '@/images/gold.png';
import silverImage from '@/images/silver.png';
import bronzeImage from '@/images/bronze.png';
import standardImage from '@/images/standart.png';

enum SponsorTier {
  gold,
  silver,
  bronze,
  standart,
}

interface Sponsor {
  href: string;
  src: string;
  alt: string;
  tier: SponsorTier;
}

const sponsors: Sponsor[] = [
  { href: "https://lt.wikipedia.org/wiki/Auksas", src: goldImage, alt: "Gold Sponsor", tier: SponsorTier.gold },
  { href: "https://lt.wikipedia.org/wiki/Sidabras", src: silverImage, alt: "Silver Sponsor", tier: SponsorTier.silver },
  { href: "https://lt.wikipedia.org/wiki/Bronza", src: bronzeImage, alt: "Bronze Sponsor", tier: SponsorTier.bronze },
  { href: "https://lt.wikipedia.org/wiki/Standartas", src: standardImage, alt: "Standard Sponsor", tier: SponsorTier.standart },
];

function renderSponsorSection(tier: SponsorTier, sponsors: Sponsor[]) {
  const filteredSponsors = sponsors.filter(sponsor => sponsor.tier === tier);

  if (filteredSponsors.length === 0) return null;

  const tierTitle = `${SponsorTier[tier][0].toUpperCase()}${SponsorTier[tier].slice(1)}`;

  const tierClasses = {
    [SponsorTier.gold]: 'text-gold border-gold',
    [SponsorTier.silver]: 'text-silver border-silver',
    [SponsorTier.bronze]: 'text-bronze border-bronze',
    [SponsorTier.standart]: 'text-standard border-standard',
  };

  return (
    <div key={tier} className={`my-8 p-4 border-l-4 ${tierClasses[tier]}`}>
      <h2 className="text-2xl font-bold mb-4">{tierTitle} Sponsors</h2>
      <div className="flex flex-wrap gap-6">
        {filteredSponsors.map((sponsor, index) => (
          <a
            key={index}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <img
              src={sponsor.src}
              alt={sponsor.alt}
              className="w-20 h-20 object-contain hover:opacity-80"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

function SponsorsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Sponsors Page</h1>
      {Object.values(SponsorTier)
        .filter((tier) => typeof tier === 'number')
        .map((tier) => renderSponsorSection(tier as SponsorTier, sponsors))}
    </div>
  );
}

export default SponsorsPage;