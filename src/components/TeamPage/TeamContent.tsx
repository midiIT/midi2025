import './PixelImage.module.css';
import teamMembers from '@/data/team.json';

interface TeamMember {
  picture: string;
  name: string;
  position: string;
  email: string;
}

function TeamContent() {
  return (
    <div className="relative z-10 flex flex-col justify-center items-center px-4">
      <div className="absolute inset-0 bg-midi-blue bg-cover bg-center bg-no-repeat"></div>
      <TeamGrid />
    </div>
  );
}

const TeamGrid = () => {
  const sectionNames = {
    A: 'MIDI Vadovai',
    B: 'MIDI Renginių vadovai',
    C: 'MIDI Komunikacija',
    D: 'MIDI LAN Party vadovai',
    E: 'MIDI Mentoriai',
  };

  const sections = {
    A: teamMembers.slice(0, 9),
    B: teamMembers.slice(9, 19),
    C: teamMembers.slice(19, 25),
    D: teamMembers.slice(25, 29),
    E: teamMembers.slice(29, 33),
  };

  return (
    <div className="rounded-lg w-full max-w-7xl px-4 sm:px-6 lg:px-8 p-6">
      {Object.entries(sections).map(([sectionName, members]) => (
        <div key={sectionName} className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4">
            {sectionNames[sectionName as keyof typeof sectionNames]}
          </h2>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {members.map((member: TeamMember, index: number) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-4 border-black w-[200px] h-[280px] flex flex-col"
              >
                <div className="picture relative h-[160px] w-full">
                  <img
                    src={member.picture}
                    alt={member.name}
                    className="absolute team-member-img top-0 left-0 w-full h-full object-cover transition duration-500 ease-in-out"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1 break-words">
                    {member.position}
                  </p>
                  <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                    <div className="flex items-center">
                      <span className="mr-2 font-medium">Email:</span>
                      <p className="whitespace-normal break-all">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamContent;
