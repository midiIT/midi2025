import { useState } from 'react';

const Bp = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="h-full flex flex-col">
      <div className="flex h-10">
        <button
          className={`w-1/2 mx-1 transition-all duration-200 font-medium ${
            currentPage === 0
              ? 'bg-blue-600 text-white border-b-2 border-blue-700 shadow-lg'
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          }`}
          onClick={() => setCurrentPage(0)}
        >
          Marketingas
        </button>
        <button
          className={`w-1/2 mx-1 transition-all duration-200 font-medium ${
            currentPage === 1
              ? 'bg-blue-600 text-white border-b-2 border-blue-700 shadow-lg'
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          }`}
          onClick={() => setCurrentPage(1)}
        >
          Barterinis
        </button>
      </div>

      <div className="flex-1">
        <object
          data={currentPage === 0 ? 'BP.pdf' : 'BP2.pdf'}
          type="application/pdf"
          width="100%"
          height="100%"
          className="rounded shadow-md"
        >
          <p>Jūsų naršyklė nepalaiko PDF failų peržiūrėjimo</p>
        </object>
      </div>
    </div>
  );
};

export default Bp;
