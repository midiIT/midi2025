import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';
import TerminalInterfaceContent from './TerminalInterfaceContent';

const TerminalInterface: React.FC = () => {
  return (
    <CRTDisplay
      initialPowerState={true}
      onPowerChange={isOn => console.log('Power state:', isOn)}
    >
      <TerminalInterfaceContent />
    </CRTDisplay>
  );
};

export default TerminalInterface;
