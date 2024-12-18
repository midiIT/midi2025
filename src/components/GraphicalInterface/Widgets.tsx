import CountdownComponent from '@/components/CountdownComponent/CountdownComponent.tsx';
import DatePicker from '@/components/EventsPage/DatePicker.tsx';

import { useAppDispatch } from '@/app/hooks.ts';
import { openApplication, setEventDate } from '@/app/ApplicationsSlice.ts';

import calendarIcon from '@/images/calendar.png';
import { DEFAULT_Z_INDEX } from '@/components/GraphicalInterface/consts.ts';

const Widgets = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col space-y-4 items-end">
      <div>
        <CountdownComponent />
      </div>
      <div>
        <DatePicker
          onDatePicked={date => {
            dispatch(setEventDate(date.toISOString().split('T')[0]));

            dispatch(
              openApplication({
                minimized: false,
                title: 'Calendar',
                iconPath: calendarIcon,
                zIndex: DEFAULT_Z_INDEX,
              }),
            );
          }}
        />
      </div>
    </div>
  );
};

export default Widgets;
