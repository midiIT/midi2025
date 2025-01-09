import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

interface SwipeablePagesProps {
  pages: JSX.Element[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  disableSwipe?: boolean;
}

const SwipeablePages: React.FC<SwipeablePagesProps> = ({
  pages,
  currentPage,
  setCurrentPage,
  disableSwipe = false,
}) => {
  const [transitioning, setTransitioning] = useState(false);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1 && !transitioning) {
      setTransitioning(true);
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0 && !transitioning) {
      setTransitioning(true);
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => !disableSwipe && goToNextPage(),
    onSwipedRight: () => !disableSwipe && goToPreviousPage(),
    delta: 10,
    trackTouch: true,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  useEffect(() => {
    const timeout = setTimeout(() => setTransitioning(false), 300);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  return (
    <div {...handlers} className="relative w-full h-full overflow-hidden">
      <div
        className="absolute flex w-full h-full transition-transform duration-300"
        style={{
          transform: `translateX(-${currentPage * 100}%)`,
        }}
      >
        {pages.map((page, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            {page}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwipeablePages;
