import { useState } from 'react';

const Bp = () => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className="h-full">
      <div className="h-8 flex">
        <div
          className="w-[50%] h-full bg-gray-700 hover:bg-gray-800 rounded border border-gray-400 m-auto text-center hover:cursor-pointer"
          onClick={() => setCurrentPage(0)}
        >
          Marketingas
        </div>
        <div
          className="w-[50%] h-full bg-gray-700 hover:bg-gray-800 rounded border border-gray-400 m-auto text-center hover:cursor-pointer"
          onClick={() => setCurrentPage(1)}
        >
          Barteris
        </div>
      </div>
      {/*// The file should be in public folder*/}
      <object
        data={currentPage === 0 ? 'BP.pdf' : 'BP2.pdf'}
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>Jūsų naršyklė nepalaiko PDF failų peržiūrėjimo</p>
      </object>
    </div>
  );
};

export default Bp;
