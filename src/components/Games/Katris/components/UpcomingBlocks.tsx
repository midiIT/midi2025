import { Block, SHAPES } from '../type_katris';

interface Props {
  upcomingBlocks: Block[];
}

function UpcomingBlocks({ upcomingBlocks }: Props) {
  return (
    <div className="upcoming">
      {upcomingBlocks.slice(0, 1).map((block, blockIndex) => {
        // shows just one upcoming block
        const shape = SHAPES[block].shape.filter(row => row.some(cell => cell));
        return (
          <div key={blockIndex}>
            {shape.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="row">
                  {row.map((isSet, cellIndex) => {
                    const cellClass = isSet ? block : 'hidden';
                    return (
                      <div
                        key={`${blockIndex}-${rowIndex}-${cellIndex}`}
                        className={`cell ${cellClass}`}
                      ></div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default UpcomingBlocks;
