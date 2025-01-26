import EventDisplay from '@/components/EventsPage/EventDisplay.tsx';
import DatePicker from '@/components/EventsPage/DatePicker.tsx';
import { useAppDispatch } from '@/app/hooks.ts';
import { setEventDate } from '@/app/ApplicationsSlice.ts';

function EventsPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <DatePicker
        onDatePicked={date =>
          dispatch(setEventDate(date.toISOString().split('T')[0]))
        }
      />
      <EventDisplay />
    </div>
  );
}

export default EventsPage;
