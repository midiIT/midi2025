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
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

  const goToNextPage = () => {
    if (currentPage < pages.length - 2) {
      setSwipeDirection('left');
      setTimeout(() => {
        setCurrentPage(pages.length - 1);
        setSwipeDirection('right');
      }, 200);
      setTimeout(() => setCurrentPage(currentPage + 1), 360);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setSwipeDirection('right');
      setTimeout(() => {
        setCurrentPage(pages.length - 1);
        setSwipeDirection('left');
      }, 200);
      setTimeout(() => setCurrentPage(currentPage - 1), 360);
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
    const timeout = setTimeout(() => setSwipeDirection(null), 220);
    return () => clearTimeout(timeout);
  }, [swipeDirection]);

  return (
    <div {...handlers} className="relative w-full h-full overflow-hidden">
      <div
        id="transition-element"
        className={`absolute w-full h-full flex items-center justify-center transition-transform duration-150`}
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
