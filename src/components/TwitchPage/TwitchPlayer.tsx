import { TwitchEmbed } from 'react-twitch-embed';

const TwitchPlayer = () => {
  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
        <TwitchEmbed
          channel="midi_2024"
          muted
          width="100%"
          height="90%"
          className="max-w-sm md:max-w-lg lg:max-w-full lg:p-8 w-full"
        />
    </div>
  );
};

export default TwitchPlayer;
