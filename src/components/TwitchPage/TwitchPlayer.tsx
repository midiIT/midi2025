import { TwitchEmbed } from 'react-twitch-embed';

const TwitchPlayer = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="w-[400px] h-[300px] md:w-[1280px] md:h-[600px]">
        <TwitchEmbed
          channel="midi_2024"
          muted
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default TwitchPlayer;
