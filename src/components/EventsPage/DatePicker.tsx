import React, { useState } from "react";
import events from "@/events.json";

interface DatePickerProps {
    onDatePicked: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDatePicked }) => {
    const year = 2024;
    const month = 11;
    const weekdayHeaders = ["Pr", "An", "Tr", "Kt", "Pn", "Š", "Sk"];

    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.UTC(year, month - 1, new Date(events[0].date).getDate())));
        
    const getDaysInMonth = () => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const firstDayOfMonth = convertSundayToMondayStart(new Date(year, month - 1, 1).getDay());
        const daysArray = Array(firstDayOfMonth).fill(null);

        for (let day = 1; day <= daysInMonth; day++) {
            daysArray.push(new Date(Date.UTC(year, month - 1, day)));
        }

        const lastDayOfMonth = convertSundayToMondayStart(daysArray[daysArray.length - 1].getDay());
        daysArray.push(...Array(6 - lastDayOfMonth).fill(null));
        
        return daysArray;
    };

    const convertSundayToMondayStart = (day: number) => {
        return (day + 6) % 7
    }

    const handleClick = (date: Date) => {
        setSelectedDate(date);
        onDatePicked(date);
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-md">
            <h2 className="text-xl font-semibold text-center mb-4">
                {new Date(year, month - 1).toLocaleString("lt", { month: "long" })} {year}
            </h2>
            <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-500 mb-2">
                {weekdayHeaders.map((day, index) => (
                    <div key={index}>{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth().map((date, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            if (date && events.find(event => event.date === date.toISOString().split('T')[0])) handleClick(date);
                        }}
                        className={`cursor-pointer rounded-full w-10 h-10 flex flex-col items-center justify-center
                            ${date ? (selectedDate?.getDate() === date?.getDate() ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800") : "bg-gray-300"}
                            ${date ? "hover:bg-blue-300 hover:text-white" : ""}
                            ${date && events.find(event => event.date == date.toISOString().split('T')[0]) ? "border-2 border-blue-500 hover:border-none" : ""}`}
                    >
                        <span>{date ? date.getDate() : ""}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DatePicker;
