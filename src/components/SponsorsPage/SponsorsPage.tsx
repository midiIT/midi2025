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

  return (
    <div key={tier}>
      <h2>{tierTitle} Sponsors</h2>
      <div>
        {filteredSponsors.map((sponsor, index) => (
          <a key={index} href={sponsor.href} target="_blank" rel="noopener noreferrer">
            <img src={sponsor.src} alt={sponsor.alt} />
          </a>
        ))}
      </div>
    </div>
  );
}

function SponsorsPage() {
  return (
    <div>
      <h1>Sponsors Page</h1>
      {Object.values(SponsorTier)
        .filter((tier) => typeof tier === 'number')
        .map((tier) => renderSponsorSection(tier as SponsorTier, sponsors))}
    </div>
  );
}

export default SponsorsPage;
