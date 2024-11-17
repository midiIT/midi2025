import { TwitchEmbed } from 'react-twitch-embed';
import './twitchStyles.css';

const TwitchPlayer = () => {
  return (
    <div className="min-h-screen bg-black-900 text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-lg">
        <TwitchEmbed channel="midi_2024" muted className="twitch-player" />
      </div>
    </div>
  );
};

export default TwitchPlayer;
