import CountdownComponent from '@/components/CountdownComponent/CountdownComponent.tsx';
import DatePicker from '@/components/EventsPage/DatePicker.tsx';

const Widgets = () => {
  return (
    <div
      className="flex flex-col space-y-4 items-end"
      onContextMenu={e => {
        // edit this to add context menu to all widgets
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div>
        <CountdownComponent />
      </div>
      <div>
        <DatePicker />
      </div>
    </div>
  );
};

export default Widgets;
