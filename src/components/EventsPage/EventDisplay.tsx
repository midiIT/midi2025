import React from 'react';
import events from '@/events.json';

interface EventDisplayProps {
  eventDate: string;
}

const EventDisplay: React.FC<EventDisplayProps> = ({ eventDate }) => {
  const eventsForDate = events.filter(event => event.date === eventDate);

  return (
    <div className="w-100 h-80 bg-black p-6 rounded-lg mt-4">
      {eventsForDate.length > 0 ? (
        eventsForDate.map((event, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold" style={{ color: '#0175B4' }}>
              {' '}
              {event.title}{' '}
            </h2>

            {/* <p className="mt-2" style={{ color: '#0175B4' }}> {event.description}</p> */}
            <div key={index} className="text-gray-400 mt-2">
              {event.description.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>

            <p className="mt-5" style={{ color: '#0175B4' }}>
              {event.date}
            </p>
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
