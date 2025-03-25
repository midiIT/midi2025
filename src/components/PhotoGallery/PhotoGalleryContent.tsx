import { useState, useEffect } from 'react';

// Import the gallery photos
import galerijosNuotrauka0 from '@/images/PhotoGallery/galerijosNuotrauka0.webp';
import galerijosNuotrauka1 from '@/images/PhotoGallery/galerijosNuotrauka1.webp';
import galerijosNuotrauka2 from '@/images/PhotoGallery/galerijosNuotrauka2.webp';
import galerijosNuotrauka3 from '@/images/PhotoGallery/galerijosNuotrauka3.webp';
import galerijosNuotrauka4 from '@/images/PhotoGallery/galerijosNuotrauka4.webp';
import galerijosNuotrauka5 from '@/images/PhotoGallery/galerijosNuotrauka5.webp';
import galerijosNuotrauka6 from '@/images/PhotoGallery/galerijosNuotrauka6.webp';
import galerijosNuotrauka7 from '@/images/PhotoGallery/galerijosNuotrauka7.webp';
import galerijosNuotrauka8 from '@/images/PhotoGallery/galerijosNuotrauka8.webp';
import galerijosNuotrauka9 from '@/images/PhotoGallery/galerijosNuotrauka9.webp';
import galerijosNuotrauka10 from '@/images/PhotoGallery/galerijosNuotrauka10.webp';
import galerijosNuotrauka11 from '@/images/PhotoGallery/galerijosNuotrauka11.webp';
import galerijosNuotrauka12 from '@/images/PhotoGallery/galerijosNuotrauka12.webp';
import galerijosNuotrauka13 from '@/images/PhotoGallery/galerijosNuotrauka13.webp';
import galerijosNuotrauka14 from '@/images/PhotoGallery/galerijosNuotrauka14.webp';

const galleryPhotos = [
  {
    src: galerijosNuotrauka0,
    alt: 'Galerijos nuotrauka 0',
    caption: 'Uždarymo vakaras',
  },
  {
    src: galerijosNuotrauka1,
    alt: 'Galerijos nuotrauka 1',
    caption: 'Tinklinio turnyras',
  },
  {
    src: galerijosNuotrauka2,
    alt: 'Galerijos nuotrauka 2',
    caption: 'Krepšinio turnyras',
  },
  {
    src: galerijosNuotrauka3,
    alt: 'Galerijos nuotrauka 3',
    caption: 'Šachmatų turnyras',
  },
  {
    src: galerijosNuotrauka4,
    alt: 'Galerijos nuotrauka 4',
    caption: 'Sportinio pokerio turnyras',
  },
  {
    src: galerijosNuotrauka5,
    alt: 'Galerijos nuotrauka 5',
    caption: 'Įmonių mugė',
  },
  {
    src: galerijosNuotrauka6,
    alt: 'Galerijos nuotrauka 6',
    caption: 'LAN party',
  },
  {
    src: galerijosNuotrauka7,
    alt: 'Galerijos nuotrauka 7',
    caption: 'Uždarymo vakaras',
  },
  {
    src: galerijosNuotrauka8,
    alt: 'Galerijos nuotrauka 8',
    caption: 'Protmūšis',
  },
  {
    src: galerijosNuotrauka9,
    alt: 'Galerijos nuotrauka 9',
    caption: 'Futbolo turnyras',
  },
  {
    src: galerijosNuotrauka10,
    alt: 'Galerijos nuotrauka 10',
    caption: 'Roko Opera',
  },
  {
    src: galerijosNuotrauka11,
    alt: 'Galerijos nuotrauka 11',
    caption: 'Roko Opera',
  },
  {
    src: galerijosNuotrauka12,
    alt: 'Galerijos nuotrauka 12',
    caption: 'Protmūšis',
  },
  {
    src: galerijosNuotrauka13,
    alt: 'Galerijos nuotrauka 13',
    caption: 'Uždarymo vakaras',
  },
  {
    src: galerijosNuotrauka14,
    alt: 'Galerijos nuotrauka 14',
    caption: 'Uždarymo vakaras',
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
