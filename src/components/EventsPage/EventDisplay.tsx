import events from '@/events.json';
import { useAppSelector } from '@/app/hooks.ts';
import { selectEventDate } from '@/app/ApplicationsSlice.ts';

const EventDisplay = () => {
  const eventDate = useAppSelector(selectEventDate);
  const eventsForDate = events.filter(event => event.date === eventDate);

  return (
    <div
      className="w-full h-full bg-black p-6 flex flex-col overflow-y-auto"
      style={{ maxHeight: '80vh' }}
    >
      {eventsForDate.length > 0 ? (
        eventsForDate.map((event, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold" style={{ color: '#0175B4' }}>
              {event.title}
            </h2>

            <div
              className="text-gray-400 mt-2"
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {event.description}
            </div>

            <p className="mt-5" style={{ color: '#0175B4' }}>
              {event.date}
            </p>
            {index < eventsForDate.length - 1 && (
              <hr className="my-2 border-gray-600" />
            )}
          </div>
        ))
      ) : (
        <div className="text-red-500">No events found for this date.</div>
      )}
    </div>
  );
};

export default EventDisplay;
