import { useState } from 'react';
import events from '@/events.json';
import { openApplication, setEventDate } from '@/app/ApplicationsSlice.ts';
import calendarIcon from '@/images/kalendorius.png';
import { DEFAULT_Z_INDEX } from '@/components/GraphicalInterface/consts.ts';
import { useAppDispatch } from '@/app/hooks.ts';

interface DatePickerProps {
  onDatePicked?: () => void;
}

const DatePicker = ({ onDatePicked }: DatePickerProps) => {
  const dispatch = useAppDispatch();
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(
    today.getMonth() + 1,
  );

  const weekdayHeaders = ['Pr', 'An', 'Tr', 'Kt', 'Pn', 'Š', 'Sk'];

  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = convertSundayToMondayStart(
      new Date(year, month - 1, 1).getDay(),
    );
    const daysArray = Array(firstDayOfMonth).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(new Date(Date.UTC(year, month - 1, day)));
    }

    const lastDayOfMonth = convertSundayToMondayStart(
      daysArray[daysArray.length - 1].getDay(),
    );
    daysArray.push(...Array(6 - lastDayOfMonth).fill(null));

    return daysArray;
  };

  const convertSundayToMondayStart = (day: number) => {
    return (day + 6) % 7;
  };

  const handleClick = (date: Date) => {
    dispatch(setEventDate(date.toISOString().split('T')[0]));

    dispatch(
      openApplication({
        minimized: false,
        title: 'EventDisplay',
        iconPath: calendarIcon,
        zIndex: DEFAULT_Z_INDEX,
        focused: false,
      }),
    );

    if (onDatePicked) onDatePicked();
  };

  const handleMonthChange = (direction: 'Atgal' | 'Kitas') => {
    if (direction === 'Atgal') {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  return (
    <div className="p-4 lg:mx-auto bg-black shadow-lg rounded-md w-full min-h-[440px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange('Atgal')}
          className="px-2 py-1 bg-black-500 rounded-md"
          style={{ color: '#466b7f' }}
        >
          &lt; Atgal
        </button>
        <h2
          className="text-xl font-semibold text-center"
          style={{ color: '#0175B4' }}
        >
          {new Date(currentYear, currentMonth - 1)
            .toLocaleString('lt', {
              month: 'long',
            })
            .replace(/^\w/, c => c.toUpperCase())}{' '}
          {currentYear}
        </h2>
        <button
          onClick={() => handleMonthChange('Kitas')}
          className="px-2 py-1 bg-black rounded-md"
          style={{ color: '#466b7f' }}
        >
          Pirmyn &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-500 mb-2">
        {weekdayHeaders.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {getDaysInMonth(currentYear, currentMonth).map((date, index) => (
          <div
            key={index}
            onClick={() => {
              if (
                date &&
                events.find(
                  event => event.date === date.toISOString().split('T')[0],
                )
              )
                handleClick(date);
            }}
            style={{ color: '#0175B4' }}
            className={`rounded-full w-10 h-10 flex flex-col items-center justify-center sm:w-12 sm:h-12
                        ${date ? 'border-2 bg-black' : 'bg-black-300'}
                        ${
                          date &&
                          events.find(
                            event =>
                              event.date === date.toISOString().split('T')[0],
                          )
                            ? 'cursor-pointer border-4 border-[#0175B4] hover:bg-gray-900'
                            : 'cursor-default border-[#466b7f]'
                        }`}
          >
            <span
              className={`
                        ${
                          date &&
                          date.getDate() === new Date().getDate() &&
                          currentMonth === new Date().getMonth() + 1
                            ? 'relative top-0.5 border-[#0175B4] border-[3px] rounded-full'
                            : ''
                        }
            `}
            ></span>
            <span>{date ? date.getDate() : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
