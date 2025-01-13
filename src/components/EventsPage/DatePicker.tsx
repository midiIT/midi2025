import React, { useState } from 'react';
import events from '@/events.json';

interface DatePickerProps {
  onDatePicked: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDatePicked }) => {
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [currentMonth, setCurrentMonth] = useState<number>(11); // 1-based (Jan = 1)

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
    onDatePicked(date);
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
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
    <div className="p-4 lg:max-w-md lg:mx-auto bg-white shadow-lg rounded-md w-full h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleMonthChange('prev')}
          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          &lt; Prev
        </button>
        <h2 className="text-xl font-semibold text-center">
          {new Date(currentYear, currentMonth - 1).toLocaleString('lt', {
            month: 'long',
          })}{' '}
          {currentYear}
        </h2>
        <button
          onClick={() => handleMonthChange('next')}
          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Next &gt;
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
            className={`cursor-pointer rounded-full w-10 h-10 flex flex-col items-center justify-center sm:w-12 sm:h-12
                            ${date ? 'bg-gray-200 text-gray-800' : 'bg-gray-300'}
                            ${
                              date &&
                              events.find(
                                event =>
                                  event.date ===
                                  date.toISOString().split('T')[0],
                              )
                                ? 'border-2 border-blue-500 hover:bg-blue-300 hover:text-white'
                                : ''
                            }`}
          >
            <span>{date ? date.getDate() : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
