import events from '@/events.json';
import { useAppSelector } from '@/app/hooks.ts';
import { selectEventDate } from '@/app/ApplicationsSlice.ts';

interface Event {
  title: string;
  description: string;
  date: string;
  url_registration?: string;
  url_registration1?: string;
  url_tickets?: string;
  url_tickets1?: string;
  url_discord?: string;
}

const EventDisplay = () => {
  const eventDate = useAppSelector(selectEventDate);
  const eventsForDate: Event[] = events.filter(
    event => event.date === eventDate,
  );

  return (
    <div
      className="w-full h-full bg-black p-6 flex flex-col overflow-y-auto"
      style={{ maxHeight: '80vh' }}
    >
      {eventsForDate.length > 0 ? (
        eventsForDate.map((currEvent, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold" style={{ color: '#0175B4' }}>
              {currEvent.title}
            </h2>

            <div
              className="text-gray-400 mt-2"
              style={{ whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{
                __html: currEvent.description
                  .replace(
                    /url_registration1/g,
                    `<a style="color: #0275B4" href="${currEvent.url_registration1 ?? ''}">${currEvent.url_registration1 ?? ''}</a>`,
                  )
                  .replace(
                    /url_registration/g,
                    `<a style="color: #0275B4" href="${currEvent.url_registration ?? ''}">${currEvent.url_registration ?? ''}</a>`,
                  )
                  .replace(
                    /url_tickets1/g,
                    `<a style="color: #0275B4" href="${currEvent.url_tickets1 ?? ''}">${currEvent.url_tickets1 ?? ''}</a>`,
                  )
                  .replace(
                    /url_tickets/g,
                    `<a style="color: #0275B4" href="${currEvent.url_tickets ?? ''}">${currEvent.url_tickets ?? ''}</a>`,
                  )
                  .replace(
                    /url_discord/g,
                    `<a style="color: #0275B4" href="${currEvent.url_discord ?? ''}">${currEvent.url_discord ?? ''}</a>`,
                  ),
              }}
            ></div>

            {window.location.href.includes('mobile') && (
              <p className="mt-5" style={{ color: '#0175B4' }}>
                {currEvent.date}
              </p>
            )}
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
