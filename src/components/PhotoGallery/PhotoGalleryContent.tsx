import { useState, useEffect } from 'react';
import doggyImage from '@/images/PhotoGallery/doggy.jpeg';

interface PhotoGalleryContentProps {
  windowTitle?: string;
  isFocused?: boolean;
}

const galleryPhotos = [
  {
    id: 1,
    src: doggyImage,
    alt: 'ciucikas juokingas',
    caption: 'Ciucikas<3',
  },
  {
    id: 2,
    src: doggyImage,
    alt: 'ciucikas juokingas',
    caption: 'Ciucikas<3',
  },
  {
    id: 3,
    src: doggyImage,
    alt: 'ciucikas juokingas',
    caption: 'Ciucikas<3',
  },
];

const PhotoGalleryContent: React.FC<PhotoGalleryContentProps> = ({
  windowTitle = 'Photo Gallery',
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const promises = galleryPhotos.map(photo => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = photo.src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(promises);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  const handleNext = () => {
    setSelectedPhoto(prev => (prev + 1) % galleryPhotos.length);
  };

  const handlePrevious = () => {
    setSelectedPhoto(
      prev => (prev - 1 + galleryPhotos.length) % galleryPhotos.length,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-black text-green-400">
        <p>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col p-4 bg-black text-green-400 overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">{windowTitle}</h2>

      <div className="relative flex-grow flex items-center justify-center overflow-hidden">
        <img
          src={galleryPhotos[selectedPhoto].src}
          alt={galleryPhotos[selectedPhoto].alt}
          className="max-h-full max-w-full object-contain"
        />

        <button
          onClick={handlePrevious}
          className="absolute left-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
          aria-label="Previous photo"
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
          aria-label="Next photo"
        >
          &#10095;
        </button>

        <div className="absolute bottom-0 w-full bg-black bg-opacity-70 p-2 text-center">
          <p>{galleryPhotos[selectedPhoto].caption}</p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p>
          {selectedPhoto + 1} / {galleryPhotos.length}
        </p>
      </div>
    </div>
  );
};

export default PhotoGalleryContent;
