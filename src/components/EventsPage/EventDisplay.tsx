import events from '@/events.json';
import { useAppSelector } from '@/app/hooks.ts';
import { selectEventDate } from '@/app/ApplicationsSlice.ts';

const EventDisplay = () => {
  const eventDate = useAppSelector(selectEventDate);
  const eventInfo = events.find(event => event.date === eventDate);

  return (
    <div className="max-w-sm w-full bg-gray-100 p-6 rounded-lg">
      {eventInfo ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {eventInfo.title}
          </h2>
          <p className="mt-2 text-gray-600">{eventInfo.description}</p>
          <p className="mt-4 text-sm text-gray-500">{eventInfo.date}</p>
        </div>
      ) : (
        <div className="text-red-500">Error getting event.</div>
      )}
    </div>
  );
};

export default EventDisplay;
