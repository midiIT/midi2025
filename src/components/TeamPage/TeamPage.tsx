import './PixelImage.module.css';
import TeamContent from './TeamContent';

function TeamPage() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-midi-blue bg-cover bg-center bg-no-repeat"></div>
      <nav className="bg-black text-white py-4 px-6 shadow-md fixed w-full top-0 z-20">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
          MIDI komanda
        </h1>
      </nav>
      <TeamContent />
    </div>
  );
}

export default TeamPage;
