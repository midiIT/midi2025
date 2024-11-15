import React from 'react';
import CRTDisplay from '@/components/CTRDisplay/CTRDisplay';

const GraphicalInterface: React.FC = () => {
  return (
    <CRTDisplay
      initialPowerState={true}
      onPowerChange={isOn => console.log('Power state:', isOn)}
    >
      <div className="space-y-2">
        <p>GUI</p>
        <p className="animate-pulse">█</p>
      </div>
    </CRTDisplay>
  );
};

export default GraphicalInterface;
