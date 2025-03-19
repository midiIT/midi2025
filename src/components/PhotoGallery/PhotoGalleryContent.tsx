import { useState, useEffect } from 'react';
import doggyImage from '@/images/PhotoGallery/doggy.jpeg';

const galleryPhotos = [
  {
    src: doggyImage,
    alt: 'ciucikas juokingas',
    caption: 'Ciucikas<3',
  },
  {
    src: doggyImage,
    alt: 'ciucikas juokingas',
    caption: 'Ciucikas<3',
  },
  {
    src: doggyImage,
    alt: 'ciucikas juokingas',
    caption: 'Ciucikas<3',
  },
];

const PhotoGalleryContent: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
  const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsPhotoLoading(true);
    const img = new Image();
    img.src = galleryPhotos[selectedPhoto].src;
    img.onload = () => setIsPhotoLoading(false);
    img.onerror = () => {
      console.error('Failed to load image:', galleryPhotos[selectedPhoto].src);
      setIsPhotoLoading(false);
    };
  }, [selectedPhoto]);

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

  return (
    <div className="h-full w-full flex flex-col p-4 bg-gray-800 bg-opacity-70 text-green-400 overflow-hidden">
      <div className="relative flex-grow flex items-center justify-center overflow-hidden">
        {isPhotoLoading ? (
          <p className="text-center">Nuotrauka kraunama...</p>
        ) : (
          <img
            src={galleryPhotos[selectedPhoto].src}
            alt={galleryPhotos[selectedPhoto].alt}
            className="max-h-full max-w-full object-contain"
          />
        )}

        <button
          onClick={handlePrevious}
          className="absolute left-2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 focus:outline-none"
          aria-label="Previous photo"
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 focus:outline-none"
          aria-label="Next photo"
        >
          &#10095;
        </button>

        <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-70 p-2 text-center">
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
