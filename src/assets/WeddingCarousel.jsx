import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

import './WeddingCarousel.css';

const thumbnailPositions = [10.93, 22.4, 33.87, 45.53, 57, 68.66, 80.13];

const WeddingCarousel = ({ title, photos = [], autoPlayInterval = 4000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Default photos if none provided
  const defaultPhotos = [
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', alt: 'Wedding ceremony' },
    { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800', alt: 'First dance' },
    { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800', alt: 'Exchange of vows' },
    { url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800', alt: 'Wedding party' },
  ];

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % displayPhotos.length);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [isPlaying, isPaused, displayPhotos.length, autoPlayInterval, currentSlide]);

  const pageSize = thumbnailPositions.length;
  const pageCount = Math.ceil(displayPhotos.length / pageSize);
  const page = Math.floor(currentSlide / pageSize);
  const thumbnailStart = Math.min(page * pageSize, Math.max(0, displayPhotos.length - pageSize));
  const thumbnails = displayPhotos.slice(thumbnailStart, thumbnailStart + pageSize);

  const moveSlide = (direction) => {
    setCurrentSlide((prev) => (prev + direction + displayPhotos.length) % displayPhotos.length);
  };

  const moveThumbnailPage = (direction) => {
    setCurrentSlide(((page + direction + pageCount) % pageCount) * pageSize);
  };

  return (
    <section className="wedding-gallery">
      <h2 className="wedding-gallery__title font-normal text-center">{title}</h2>

      <div
        className="wedding-gallery__photo"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={displayPhotos[currentSlide].url}
          alt={displayPhotos[currentSlide].alt}
          className="w-full h-full object-contain"
        />
        <button
          type="button"
          onClick={() => moveSlide(-1)}
          className="wedding-gallery__control absolute left-[3%] top-1/2 -translate-y-1/2"
          aria-label="Previous photo"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => moveSlide(1)}
          className="wedding-gallery__control absolute right-[3%] top-1/2 -translate-y-1/2"
          aria-label="Next photo"
        >
          <ChevronRight size={24} />
        </button>
        <button
          type="button"
          onClick={() => setIsPlaying((playing) => !playing)}
          className="wedding-gallery__control absolute right-[3%] top-[3%]"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentSlide + 1} / {displayPhotos.length}
        </div>

        {isPlaying && !isPaused && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-black/40">
            <div
              key={currentSlide}
              className="wedding-gallery__progress"
              style={{ animationDuration: `${autoPlayInterval}ms` }}
            />
          </div>
        )}
      </div>

      {thumbnails.map((photo, slot) => {
        const index = thumbnailStart + slot;

        return (
          <button
            key={slot}
            type="button"
            className="wedding-gallery__thumbnail"
            style={{ left: `${thumbnailPositions[slot]}%` }}
            onClick={() => setCurrentSlide(index)}
            aria-current={currentSlide === index ? 'true' : undefined}
            aria-label={`Go to photo ${index + 1}`}
          >
            <img src={photo.url} alt="" className="w-full h-full object-cover" />
          </button>
        );
      })}

      {pageCount > 1 && (
        <div className="absolute inset-x-0 top-[91.5%] -translate-y-1/2 flex items-center justify-center gap-3">
          <button
            type="button"
            className="wedding-gallery__control"
            onClick={() => moveThumbnailPage(-1)}
            aria-label="Previous thumbnail page"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm tabular-nums text-[#D4AF37]">{page + 1} / {pageCount}</span>
          <button
            type="button"
            className="wedding-gallery__control"
            onClick={() => moveThumbnailPage(1)}
            aria-label="Next thumbnail page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
};

export default WeddingCarousel;
