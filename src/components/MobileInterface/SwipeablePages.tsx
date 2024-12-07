import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

interface SwipeablePagesProps {
  pages: JSX.Element[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SwipeablePages: React.FC<SwipeablePagesProps> = ({
  pages,
  currentPage,
  setCurrentPage,
}) => {
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setSwipeDirection('left');
      setTimeout(() => setCurrentPage(currentPage + 1), 300);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setSwipeDirection('right');
      setTimeout(() => setCurrentPage(currentPage - 1), 300);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNextPage(),
    onSwipedRight: () => goToPreviousPage(),
    delta: 10,
    trackTouch: true,
    trackMouse: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => setSwipeDirection(null), 300);
    return () => clearTimeout(timeout);
  }, [swipeDirection]);

  return (
    <div {...handlers} className="relative w-full h-full overflow-hidden">
      <div
        className={`absolute w-full h-full flex items-center justify-center transition-transform duration-300`}
        style={{
          transform: `translateX(${
            swipeDirection === 'left'
              ? '-100%'
              : swipeDirection === 'right'
                ? '100%'
                : '0'
          })`,
        }}
      >
        {pages[currentPage]}
      </div>
    </div>
  );
};

export default SwipeablePages;
