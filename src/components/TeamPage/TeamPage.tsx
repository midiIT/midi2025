import './PixelImage.module.css';
import teamMembers from '@/data/team.json';
import { useState } from 'react';

interface TeamMember {
  OGpicture: string;
  pixelPicture: string;
  name: string;
  position: string;
  phone: string;
  email: string;
}

function TeamPage() {
  return (
    <div className="min-h-screen w-full bg-[#4E4A59]">
      {' '}
      {/* Changed to min-h-screen and added background */}
      <div className="container mx-auto px-16 py-16">
        <h1 className="text-9xl sm:text-4xl md:text-5xl font-extrabold text-center text-purple mb-8 md:mb-16">
          MIDI 2025 komanda
        </h1>

        <TeamGrid />
      </div>
    </div>
  );
}

const TeamGrid = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  // Divide team members into three equal sections of 4 elements each
  const section1 = teamMembers.slice(0, 11);
  const section2 = teamMembers.slice(11, 20);
  const section3 = teamMembers.slice(20, 23);
  const section4 = teamMembers.slice(23, 26);
  const section5 = teamMembers.slice(26, 32);

  const TeamMemberCard = ({
    member,
    index,
  }: {
    member: TeamMember;
    index: number;
  }) => (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full"
      onMouseEnter={() => setHoveredMember(index)}
      onMouseLeave={() => setHoveredMember(null)}
    >
      <div className="picture relative pt-[100%]">
        <img
          src={member.OGpicture}
          className={`absolute team-member-img top-0 left-0 w-full h-full object-cover transition duration-500 ease-in-out ${
            hoveredMember === index ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <img
          src={member.pixelPicture}
          className={`absolute team-member-img top-0 left-0 w-full h-full object-cover transition duration-500 ease-in-out ${
            hoveredMember === index ? 'opacity-100 glitch-effect' : 'opacity-0'
          }`}
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
          {member.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate">
          {member.position}
        </p>
        <div className="text-xs sm:text-sm text-gray-700 space-y-1">
          <div className="flex items-center">
            <span className="mr-2 font-medium">Tel:</span>
            <p className="truncate">{member.phone}</p>
          </div>
          <div className="flex items-center">
            <span className="mr-2 font-medium">Email:</span>
            <p className="truncate">{member.email}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-16">
      {' '}
      {/* Increased gap between sections */}
      {/* Management Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-8 text-[#839073]">
          MIDI Vadovai
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {section1.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </section>
      {/* Development Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-8 text-[#839073]">
          MIDI Renginių vadovai
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {section2.map((member, index) => (
            <TeamMemberCard
              key={index + section1.length}
              member={member}
              index={index + section1.length}
            />
          ))}
        </div>
      </section>
      {/* Support Section */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-8 text-[#839073]">
          MIDI LAN Party vadovai
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {section3.map((member, index) => (
            <TeamMemberCard
              key={index + section1.length + section2.length}
              member={member}
              index={index + section1.length + section2.length}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-4xl font-bold text-center mb-8 text-[#839073]">
          MIDI Komunikacija
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {section4.map((member, index) => (
            <TeamMemberCard
              key={index + section1.length + section2.length}
              member={member}
              index={index + section1.length + section2.length}
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-4xl font-bold text-center mb-8 text-[#839073]">
          MIDI Mentoriai
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {section5.map((member, index) => (
            <TeamMemberCard
              key={index + section1.length + section2.length}
              member={member}
              index={index + section1.length + section2.length}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
