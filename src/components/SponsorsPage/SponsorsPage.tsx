import AuksasSponsor1 from '@/images/Sponsors/Auksas/nasa.png';
import AuksasSponsor2 from '@/images/Sponsors/Auksas/uni.png';

import SidabrasSponsor1 from '@/images/Sponsors/Sidabras/pepsi.png';
import SidabrasSponsor2 from '@/images/Sponsors/Sidabras/koksas.png';

import BronzaSponsor1 from '@/images/Sponsors/Bronza/apple.png';
import BronzaSponsor2 from '@/images/Sponsors/Bronza/google.png';

import StandartinisSponsor1 from '@/images/Sponsors/Standartinis/kfc.png';

import PartneriaiSponsor1 from '@/images/Sponsors/Partneriai/bk.png';

enum SponsorTier {
  auksas,
  sidabras,
  bronza,
  standartinis,
  partneriai,
}

interface Sponsor {
  href: string;
  src: string;
  alt: string;
  tier: SponsorTier;
}

const sponsors: Sponsor[] = [
  // Auksas sponsors
  {
    href: 'https://sponsor1-website.com',
    src: AuksasSponsor1,
    alt: 'Koksas',
    tier: SponsorTier.auksas,
  },

  {
    href: 'https://sponsor1-website.com',
    src: AuksasSponsor2,
    alt: 'Koksas',
    tier: SponsorTier.auksas,
  },

  // Sidabras sponsors
  {
    href: 'https://sidabras-sponsor1-website.com',
    src: SidabrasSponsor1,
    alt: 'Sidabras Sponsor 1',
    tier: SponsorTier.sidabras,
  },

  {
    href: 'https://sidabras-sponsor2-website.com',
    src: SidabrasSponsor2,
    alt: 'Sidabras Sponsor 2',
    tier: SponsorTier.sidabras,
  },

  // Bronza sponsors
  {
    href: 'https://bronza-sponsor1-website.com',
    src: BronzaSponsor1,
    alt: 'Bronza Sponsor 1',
    tier: SponsorTier.bronza,
  },

  {
    href: 'https://bronza-sponsor2-website.com',
    src: BronzaSponsor2,
    alt: 'Bronza Sponsor 2',
    tier: SponsorTier.bronza,
  },

  // Standartinis sponsors
  {
    href: 'https://standartinis-sponsor1-website.com',
    src: StandartinisSponsor1,
    alt: 'Standartinis Sponsor 1',
    tier: SponsorTier.standartinis,
  },

  // Partneriai
  {
    href: 'https://partneriai-sponsor1-website.com',
    src: PartneriaiSponsor1,
    alt: 'Partneriai Sponsor 1',
    tier: SponsorTier.partneriai,
  },
];

function renderSponsorSection(tier: SponsorTier, sponsors: Sponsor[]) {
  const filteredSponsors = sponsors.filter(sponsor => sponsor.tier === tier);

  if (filteredSponsors.length === 0) return null;

  const tierTitles = {
    [SponsorTier.auksas]: 'Auksiniai rėmėjai',
    [SponsorTier.sidabras]: 'Sidabriniai rėmėjai',
    [SponsorTier.bronza]: 'Bronziniai rėmėjai',
    [SponsorTier.standartinis]: 'Standartiniai rėmėjai',
    [SponsorTier.partneriai]: 'Partneriai',
  };

  const tierClasses = {
    [SponsorTier.auksas]: 'text-gold border-gold',
    [SponsorTier.sidabras]: 'text-silver border-silver',
    [SponsorTier.bronza]: 'text-bronze border-bronze',
    [SponsorTier.standartinis]: 'text-standard border-standard',
    [SponsorTier.partneriai]: 'text-partner border-partner',
  };

  return (
    <div key={tier} className="my-12">
      <div className={`flex items-center justify-center mb-6`}>
        <div className={`border-t-4 ${tierClasses[tier]} flex-grow mx-4`}></div>
        <h2
          className={`text-4xl px-6 text-center ${tierClasses[tier].split(' ')[0]}`}
        >
          {tierTitles[tier]}
        </h2>
        <div className={`border-t-4 ${tierClasses[tier]} flex-grow mx-4`}></div>
      </div>

      <div className="flex flex-wrap gap-1 justify-center">
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
              className="w-40 h-40 m-4 object-contain hover:opacity-80"
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
      {Object.values(SponsorTier).map(tier =>
        renderSponsorSection(tier as SponsorTier, sponsors),
      )}
    </div>
  );
}

export default SponsorsPage;
