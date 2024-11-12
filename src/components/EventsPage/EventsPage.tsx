import EventDisplay from "@/components/EventsPage/EventDisplay.tsx";
import DatePicker from "@/components/EventsPage/DatePicker.tsx";
import {useState} from "react";
import events from "@/events.json";

function EventsPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(events[0].date));
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <DatePicker onDatePicked={(date) => setSelectedDate(date)} />
            <EventDisplay eventDate={selectedDate.toISOString().split('T')[0]} />
        </div>
    );
}

export default EventsPage;
