import CyberCareLogo from '@/images/Sponsors/Auksas/cyber_care.svg';
import AssecoLogo from '@/images/Sponsors/Auksas/asseco.svg';

// Updated Bronza sponsors with actual company names
import AccLogo from '@/images/Sponsors/Bronza/accLogo.png';
import BentleyLogo from '@/images/Sponsors/Bronza/bentleyLogo.png';
import LuminorLogo from '@/images/Sponsors/Bronza/LuminorLogo.png';
import CornerCaseLogo from '@/images/Sponsors/Bronza/cornerCaseLogo.png';
import KpmgLogo from '@/images/Sponsors/Bronza/kpmgLogo.png';
import WesternUnionLogo from '@/images/Sponsors/Bronza/WesternUnionLogo.png';
import sebLogo from '@/images/Sponsors/Bronza/seb.png';

// Updated Standartinis sponsor with actual company names
import OxylabsLogo from '@/images/Sponsors/Standartinis/oxylabs.png';
import NearaLogo from '@/images/Sponsors/Standartinis/nearaLogo.png';

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
    href: 'https://cybercare.cc',
    src: CyberCareLogo,
    alt: 'CyberCare',
    tier: SponsorTier.auksas,
  },

  {
    href: 'https://asseco.com',
    src: AssecoLogo,
    alt: 'Asseco',
    tier: SponsorTier.auksas,
  },

  // Bronza sponsors
  {
    href: 'https://www.accenture.com',
    src: AccLogo,
    alt: 'Accenture',
    tier: SponsorTier.bronza,
  },
  {
    href: 'https://www.bentley.com',
    src: BentleyLogo,
    alt: 'Bentley',
    tier: SponsorTier.bronza,
  },
  {
    href: 'https://www.luminor.lt',
    src: LuminorLogo,
    alt: 'Luminor',
    tier: SponsorTier.bronza,
  },
  {
    href: 'https://www.cornercasetech.com',
    src: CornerCaseLogo,
    alt: 'Corner Case',
    tier: SponsorTier.bronza,
  },
  {
    href: 'https://kpmg.com',
    src: KpmgLogo,
    alt: 'KPMG',
    tier: SponsorTier.bronza,
  },
  {
    href: 'https://www.westernunion.com',
    src: WesternUnionLogo,
    alt: 'Western Union',
    tier: SponsorTier.bronza,
  },
  {
    href: 'https://www.seb.lt/',
    src: sebLogo,
    alt: 'SEB',
    tier: SponsorTier.bronza,
  },

  // Standartinis sponsors
  {
    href: 'https://oxylabs.io',
    src: OxylabsLogo,
    alt: 'Oxylabs',
    tier: SponsorTier.standartinis,
  },
  {
    href: 'https://neara.com',
    src: NearaLogo,
    alt: 'Neara',
    tier: SponsorTier.standartinis,
  },

  // Partneriai
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
              className="w-56 h-56 m-5 object-contain hover:opacity-80"
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
