import React from 'react';
import events from '@/events.json';

interface EventDisplayProps {
  eventDate: string;
}

const EventDisplay: React.FC<EventDisplayProps> = ({ eventDate }) => {
  const eventsForDate = events.filter(event => event.date === eventDate);

  return (
    <div className="max-w-sm w-full bg-gray-100 p-6 rounded-lg">
      {eventsForDate.length > 0 ? (
        eventsForDate.map((event, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {event.title}
            </h2>
            <p className="mt-2 text-gray-600">{event.description}</p>
            <p className="mt-4 text-sm text-gray-500">{event.date}</p>
            {index < eventsForDate.length - 1 && <hr className="my-2" />}
          </div>
        ))
      ) : (
        <div className="text-red-500">No events found for this date.</div>
      )}
    </div>
  );
};

export default EventDisplay;
