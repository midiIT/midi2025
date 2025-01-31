import EventDisplay from '@/components/EventsPage/EventDisplay.tsx';
import DatePicker from '@/components/EventsPage/DatePicker.tsx';

function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <DatePicker />
      <EventDisplay />
    </div>
  );
}

export default EventsPage;
