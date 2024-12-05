import './PixelImage.css';
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
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-[url('/images/background4.jpg')] bg-cover bg-center bg-no-repeat"></div>

      <div className="relative z-10 flex flex-col justify-center items-center px-4 py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-purple mb-8 md:mb-16">
          Meet Our Team
        </h1>

        <TeamGrid />
      </div>
    </div>
  );
}

const TeamGrid = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <div className=" bg-black rounded-lg w-full max-w-7xl px-4 sm:px-6 lg:px-8 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {teamMembers.map((member: TeamMember, index: number) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onMouseEnter={() => setHoveredMember(index)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <div className="picture relative pt-[100%]">
              <img
                src={member.OGpicture}
                className={`absolute top-0 left-0 w-full h-full object-cover transition duration-500 ease-in-out ${
                  hoveredMember === index ? 'opacity-0' : 'opacity-100'
                }`}
              />

              <img
                src={member.pixelPicture}
                className={`absolute top-0 left-0 w-full h-full object-cover transition duration-500 ease-in-out ${
                  hoveredMember === index
                    ? 'opacity-100 glitch-effect'
                    : 'opacity-0'
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
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
