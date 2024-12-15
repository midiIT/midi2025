import React, { useEffect, useState, ReactNode } from 'react';
import './styles.css';

interface CRTDisplayProps {
  children: ReactNode;
  className?: string;
  initialPowerState?: boolean;
  onPowerChange?: (isOn: boolean) => void;
}

interface PowerIconProps {
  className?: string;
  size?: number;
}

const PowerIcon: React.FC<PowerIconProps> = ({ className = '', size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

const CRTDisplay: React.FC<CRTDisplayProps> = ({
  children,
  className = '',
  initialPowerState = true,
  onPowerChange,
}) => {
  const [powerOn, setPowerOn] = useState<boolean>(initialPowerState);

  useEffect(() => {
    setPowerOn(initialPowerState);
  }, [initialPowerState]);

  const handlePowerToggle = (): void => {
    const newPowerState = !powerOn;
    setPowerOn(newPowerState);
    onPowerChange?.(newPowerState);
  };

  return (
    <div className="fixed inset-0 bg-black p-8">
      {/* Outer casing with very rounded edges */}
      <div className="relative w-full h-full bg-gray-800 rounded-3xl shadow-2xl">
        {/* Inner bezels and borders */}
        <div className="absolute inset-2 bg-gray-900 rounded-2xl">
          {/* Plastic texture overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Beveled edges */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow: `
                   inset 3px 3px 5px rgba(255, 255, 255, 0.1),
                   inset -3px -3px 5px rgba(0, 0, 0, 0.4)
                 `,
            }}
          />

          {/* Control Panel */}
          <div className="absolute bottom-2 right-2 z-50">
            <div className="relative">
              <button
                onClick={handlePowerToggle}
                className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-400 transition-colors duration-200 text-white shadow-lg
                  ${powerOn ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                style={{
                  boxShadow:
                    '2px 2px 3px rgba(0, 0, 0, 0.4), -1px -1px 2px rgba(255, 255, 255, 0.1)',
                }}
                aria-label="Power"
                type="button"
              >
                <PowerIcon />
              </button>
            </div>
          </div>

          {/* Screen container with inner shadow */}
          <div
            className={`relative w-full h-full overflow-hidden rounded-2xl ${className}`}
            style={{
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Black screen when powered off */}
            <div
              className={`absolute inset-0 bg-black z-40 transition-opacity duration-1000 ${powerOn ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Screen content - only rendered when powered on */}
            <div
              className={`relative w-full h-full transition-opacity duration-1000 ${powerOn ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Scan lines overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                  backgroundSize: '100% 3px',
                  backgroundImage:
                    'linear-gradient(0deg, transparent 50%, rgba(0, 0, 0, 0.05) 50%)',
                }}
              />

              {/* Main screen content */}
              <div className="relative w-full h-full">
                {/* Screen flicker animation */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20 z-20"
                  style={{
                    animation: 'flicker 0.15s infinite',
                  }}
                />

                {/* Vignette effect */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      'radial-gradient(circle at center, transparent 10%, rgba(0, 0, 0, 0.4) 100%)',
                  }}
                />

                {/* Screen glow */}
                <div
                  className="absolute inset-0 opacity-50 pointer-events-none z-10"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(32, 196, 196, 0.1) 0%, transparent 70%)',
                  }}
                />

                {/* Screen curvature */}
                <div
                  className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
                  style={{
                    boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.5)',
                  }}
                />

                {/* Content */}
                <div className="relative h-full z-40 p-8 font-mono text-green-400 overflow-auto">
                  {children}
                </div>

                {/* Screen reflection */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30 z-20"
                  style={{
                    background:
                      'linear-gradient(165deg, transparent 0%, rgba(255, 255, 255, 0.05) 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Outer bevel effect */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow: `
              inset 4px 4px 8px rgba(255, 255, 255, 0.1),
              inset -4px -4px 8px rgba(0, 0, 0, 0.4),
              3px 3px 6px rgba(0, 0, 0, 0.4),
              -2px -2px 4px rgba(255, 255, 255, 0.1)
            `,
          }}
        />
      </div>
    </div>
  );
};

export default CRTDisplay;
