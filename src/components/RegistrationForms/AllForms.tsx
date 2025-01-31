import React, { useState } from 'react';
import VolunteerForm from './VolunteerForm';
import SponsorsForm from './SponsorsForm';

const AllForms: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'volunteer' | 'sponsor' | null>(
    null,
  );

  return (
    <div className="bg-gray-800 min-h-screen px-6 py-10">
      {!activeForm && (
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Pasirinkite formą
        </h1>
      )}

      {!activeForm && (
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveForm('volunteer')}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-500"
          >
            Savanoriams
          </button>
          <button
            onClick={() => setActiveForm('sponsor')}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-500"
          >
            Rėmėjams
          </button>
        </div>
      )}

      {activeForm && (
        <div className="mt-0 w-full max-w-4xl mx-auto">
          {activeForm === 'volunteer' && <VolunteerForm />}
          {activeForm === 'sponsor' && <SponsorsForm />}
          <div className="mt-4 text-center">
            <button
              onClick={() => setActiveForm(null)}
              className="px-8 py-3 rounded-lg font-semibold text-white bg-gray-600 hover:bg-gray-500"
            >
              Grįžti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllForms;
