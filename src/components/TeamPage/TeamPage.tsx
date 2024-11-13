import React, { useState } from 'react';
import './PixelImage.css';

// Assuming the team data is typed
interface TeamMember {
  OGpicture: string;
  pixelPicture: string;
  name: string;
  position: string;
  phone: string;
  email: string;
}

import teamMembers from '@/team.json';

function TeamPage() {
  return (
    <div className="bg-[#f5f5dc] min-h-screen flex flex-col justify-center items-center p-6">
      <h1>Team page</h1>
      <Lolzies />
    </div>
  );
}

const Lolzies = () => {
  // Initialize hover state for each member
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member: TeamMember, index: number) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            onMouseEnter={() => setHoveredMember(index)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <div className="picture relative">
              {/* Normal Image */}
              <img
                src={member.OGpicture}
                alt="Original"
                className={`w-full h-full transition duration-500 ease-in-out ${
                  hoveredMember === index ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {/* Pixelated Image with Glitch Effect */}
              <img
                src={member.pixelPicture}
                alt="Pixelated"
                className={`w-full h-full absolute top-0 left-0 transition duration-500 ease-in-out ${
                  hoveredMember === index ? 'opacity-100 glitch-effect' : 'opacity-0'
                }`}
              />
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{member.position}</p>
              <div className="flex items-center text-gray-700 mb-2">
                <span className="material-icons mr-2">Tel. nr: </span>
                <p>{member.phone}</p>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="material-icons mr-2">El. paštas:</span>
                <p>{member.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
