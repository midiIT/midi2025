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
    <div className="relative z-10 flex flex-col justify-center items-center px-4 py-24">
      <TeamGrid />
    </div>
  );
}

const TeamGrid = () => {
  return (
    <div className="rounded-lg w-full max-w-7xl px-4 sm:px-6 lg:px-8 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {teamMembers.map((member: TeamMember, index: number) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-4 border-black"
          >
            <div className="picture relative pt-[100%]">
              <img
                src={member.picture}
                alt={member.name}
                className="absolute team-member-img top-0 left-0 w-full h-full object-cover transition duration-500 ease-in-out"
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

export default TeamContent;
