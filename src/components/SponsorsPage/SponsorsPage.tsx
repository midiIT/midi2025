// Auksas
import CyberCareLogo from '@/images/Sponsors/Auksas/cyber_care.svg';
import AssecoLogo from '@/images/Sponsors/Auksas/asseco.svg';

// Bronza
import AccLogo from '@/images/Sponsors/Bronza/accLogo.png';
import BentleyLogo from '@/images/Sponsors/Bronza/bentleyLogo.png';
import LuminorLogo from '@/images/Sponsors/Bronza/LuminorLogo.png';
import CornerCaseLogo from '@/images/Sponsors/Bronza/cornerCaseLogo.png';
import KpmgLogo from '@/images/Sponsors/Bronza/kpmgLogo.png';
import WesternUnionLogo from '@/images/Sponsors/Bronza/WesternUnionLogo.png';
import sebLogo from '@/images/Sponsors/Bronza/seb.png';

// Standartiniai
import OxylabsLogo from '@/images/Sponsors/Standartinis/oxylabs.png';
import NearaLogo from '@/images/Sponsors/Standartinis/nearaLogo.png';

// Partneriai
import backToBlackKeramikaLogo from '@/images/Sponsors/Partneriai/backToBlackKeramika.png';
import coffeeLabLogo from '@/images/Sponsors/Partneriai/coffeeLab.png';
import elmenhorsterLogo from '@/images/Sponsors/Partneriai/elmenhorster.png';
import formosaLogo from '@/images/Sponsors/Partneriai/formosa.png';
import gaidelisLogo from '@/images/Sponsors/Partneriai/gaidelis.png';
import nomedaLogo from '@/images/Sponsors/Partneriai/nomeda.png';
import krunchasLogo from '@/images/Sponsors/Partneriai/krunchas.png';
import lemonGymLogo from '@/images/Sponsors/Partneriai/lemonGym.svg';
import me2uLogo from '@/images/Sponsors/Partneriai/me2u.png';
import oyakataLogo from '@/images/Sponsors/Partneriai/oyakata.png';
import pauzeKeramikaLogo from '@/images/Sponsors/Partneriai/pauzeKeramika.png';
import pepsiLogo from '@/images/Sponsors/Partneriai/pepsi.png';
import pizzaVerdeLogo from '@/images/Sponsors/Partneriai/pizzaVerde.png';
import savaipSkinLogo from '@/images/Sponsors/Partneriai/savaipSkin.png';
import zaliZaliLogo from '@/images/Sponsors/Partneriai/zaliZali.png';

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
  {
    href: 'https://zalizali.lt/',
    src: zaliZaliLogo,
    alt: 'Žali Žali',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://pauzekeramika.com/',
    src: pauzeKeramikaLogo,
    alt: 'Pauzė keramika',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://www.instagram.com/backtoblack.ceramics/',
    src: backToBlackKeramikaLogo,
    alt: 'backtoblack.ceramics',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://coffeelab.lt/',
    src: coffeeLabLogo,
    alt: 'Coffee Lab',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://savaipskin.com/',
    src: savaipSkinLogo,
    alt: 'Savaip Skin',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://www.formosa.lt/',
    src: formosaLogo,
    alt: 'Formosa',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://www.elmenhorster.lt/',
    src: elmenhorsterLogo,
    alt: 'Elmenhorster',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://www.pepsi.com/',
    src: pepsiLogo,
    alt: 'Pepsi',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://www.lemongym.lt/en/',
    src: lemonGymLogo,
    alt: 'Lemon Gym',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://krunchas.lt/lt/',
    src: krunchasLogo,
    alt: 'Krunchas',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://gaidelisklasika.lt/',
    src: gaidelisLogo,
    alt: 'Gaidelis',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://www.pergale.lt/',
    src: nomedaLogo,
    alt: 'Nomeda',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://oyakata.lt/en/',
    src: oyakataLogo,
    alt: 'Oyakata',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://me2u.lt/en',
    src: me2uLogo,
    alt: 'me2u',
    tier: SponsorTier.partneriai,
  },
  {
    href: 'https://pizzaverde.lt/',
    src: pizzaVerdeLogo,
    alt: 'Pizza Verde',
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
              className={`
              ${sponsor.tier === SponsorTier.partneriai ? 'w-36' : 'w-56'}
              ${sponsor.tier === SponsorTier.partneriai ? 'h-36' : 'h-56'}
              m-5 object-contain hover:opacity-80`}
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
