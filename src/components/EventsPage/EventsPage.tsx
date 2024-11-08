import EventDisplay from "@/components/EventsPage/EventDisplay.tsx";

function EventsPage() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <EventDisplay eventDate={"2025-01-01"}/>
      </div>
  );
}

export default EventsPage;
