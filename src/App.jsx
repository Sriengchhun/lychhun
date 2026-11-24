import React, { useState, useEffect, useCallback, useMemo, useRef, memo } from 'react';
import { Music, MapPin, Calendar, Heart, Sparkles, Phone } from 'lucide-react';
import WeddingCarousel from './assets/WeddingCarousel';
import './wedding-frame.css';
import guestData  from '../public/assets/names/guests';

// Intersection Observer for lazy animation
const useInView = (ref, options = { threshold: 0.1, rootMargin: '100px' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return isVisible;
};

// Wedding details - customize these
const weddingInfo = {
  bride: "សុបញ្ញា",
  groom: "លីឈុន",
  date: "២៨ កុម្ភៈ ២០២៦",
  time: "០៥:00 ល្ងាច",
  venue: "ភោជនីយដ្ឋាន វិមានពរជ័យ",
  address: "ក្រុងបាត់ដំបង",
  ceremony: "5:00 PM",
  reception: "7:00 PM"
};

// Photo slideshow - replace with your actual photo URLs
const photos = [
  "/assets/DSC023591.jpg",
  "/assets/DSC023761.jpg",
  "/assets/DSC024031.jpg",
  "/assets/DSC024361.jpg",
  "/assets/DSC024571.jpg"
];

  const weddingPhotos = [
    { url: '/assets/iloveimg/IMG1.png', alt: 'Wedding ceremony' },
    { url: '/assets/iloveimg/IMG2.png', alt: 'First dance' },
    { url: '/assets/iloveimg/IMG3.png', alt: 'Exchange of vows' },
    { url: '/assets/iloveimg/IMG4.png', alt: 'Wedding party' },
    { url: '/assets/iloveimg/IMG5.png', alt: 'Reception' },
    { url: '/assets/iloveimg/IMG6.jpg', alt: 'Reception' },
    { url: '/assets/iloveimg/IMG7.jpg', alt: 'Reception' },
    { url: '/assets/iloveimg/IMG8.jpg', alt: 'Reception' },
    { url: '/assets/iloveimg/IMG9.jpg', alt: 'Reception' },
    { url: '/assets/iloveimg/IMG10.jpg', alt: 'Reception' },
    { url: '/assets/iloveimg/IMG11.jpg', alt: 'Reception' },
    { url: '/assets/iloveimg/IMG12.jpg', alt: 'Reception' },
    { url: '/assets/iloveimg/IMG13.jpg', alt: 'Reception' },
    // { url: '/assets/iloveimg/IMG14.jpg', alt: 'Reception' },
    // { url: '/assets/iloveimg/IMG1.png', alt: 'Couple portrait' },
  ];

//   function Firefly() {
//   return <div className="firefly" />;
// }

const Firefly = memo(({ delay, index }) => {
  const posRef = useRef({ x: Math.random() * 100, y: Math.random() * 100 });
  const sizeRef = useRef(Math.random() * 3 + 2.5);
  const animDurationRef = useRef(0.6 + Math.random() * 0.5);

  const size = sizeRef.current;

  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${posRef.current.x}%`,
        top: `${posRef.current.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: 'radial-gradient(circle, rgba(255, 251, 150, 1) 0%, rgba(255, 251, 150, 0.6) 100%)',
        boxShadow: `0 0 ${size * 8}px rgba(255, 251, 150, 0.9), 0 0 ${size * 16}px rgba(255, 200, 50, 0.6), 0 0 ${size * 24}px rgba(255, 150, 0, 0.3)`,
        animation: `twinkle ${animDurationRef.current}s ease-in-out infinite`,
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden',
        filter: 'drop-shadow(0 0 4px rgba(255, 251, 150, 0.8))'
      }}
    />
  );
});
  const flowers = {
    cherry: '/assets/flowers/4.webp',
    blossom: '/assets/flowers/7.webp',
  };

  const Flower = memo(({ type }) => {
    const posRef = useRef({
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360
    });
    const sizeRef = useRef(30 + Math.random() * 30);
    const animDurationRef = useRef(8 + Math.random() * 6);
    const driftDurationRef = useRef(6 + Math.random() * 4);

    const flowerImg = flowers[type] || flowers.cherry;
    const size = sizeRef.current;

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${posRef.current.x}%`,
          top: `${posRef.current.y}%`,
          width: `${size}px`,
          height: `${size}px`,
          transform: `rotate(${posRef.current.rotation}deg)`,
          opacity: 0.65,
          filter: 'brightness(1.2) drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))',
          animation: `drift ${driftDurationRef.current}s ease-in-out infinite`,
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <img 
          src={flowerImg} 
          alt="flower" 
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>
    );
  });

const MagicSparkle = memo(({ delay }) => {
  const leftRef = useRef(`${Math.random() * 100}%`);
  const topRef = useRef(`${Math.random() * 100}%`);
  const sizeRef = useRef(12 + Math.random() * 8);
  const durRef = useRef(1.5 + Math.random() * 1.5);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: leftRef.current,
        top: topRef.current,
        animation: `sparkle ${durRef.current}s ease-in-out ${delay}s infinite`,
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden',
        filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.9))'
      }}
    >
      <Sparkles 
        className="text-transparent" 
        size={sizeRef.current}
        style={{
          filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 8px rgba(200, 100, 255, 0.6))'
        }}
      />
    </div>
  );
});

const PreloadAssets = ({ imageUrls }) => (
  <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
    {imageUrls.map((url, index) => (
      <img
        key={index}
        src={url}
        alt="Preloading asset"
        // Use a high priority for key assets
        loading="eager" 
      />
    ))}
  </div>
);

const PhotoSlideshow = ({ onComplete }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload all images before starting slideshow
  useEffect(() => {
    let loaded = 0;
    
    photos.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === photos.length) {
          setAllLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === photos.length) {
          setAllLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  // Only start timer AFTER all images loaded
  useEffect(() => {
    if (!allLoaded) return;

    const timer = setInterval(() => {
      setCurrentPhoto(prev => {
        if (prev >= photos.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [allLoaded, onComplete]);

  return (
    <div className="fixed inset-0 bg-burgundy z-50 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <Firefly key={`firefly-slide-${i}`} delay={i * 0.2} index={i} />
      ))}
      
      {[...Array(15)].map((_, i) => (
        <MagicSparkle key={`sparkle-slide-${i}`} delay={i * 0.3} />
      ))}
      
      {/* Show loading indicator while images load */}
      {!allLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
          <Heart 
            className="w-16 h-16 mb-4 text-purple-300 animate-pulse" 
            style={{ 
              filter: 'drop-shadow(0 0 20px rgba(216, 180, 254, 0.8))',
              animation: 'float 2s ease-in-out infinite'
            }}
          />
          <p className="text-gold-bright text-xl font-serif mb-4">Loading memories...</p>
          <div className="flex gap-2 mb-4">
            <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-gold-bright text-sm">{loadedCount} / {photos.length} photos loaded</p>
        </div>
      )}
      
      {/* Photo layers with crossfade - only show when loaded */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${allLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-2000 ease-in-out"
            style={{
              opacity: idx === currentPhoto ? 1 : 0,
              transitionDuration: '2000ms'
            }}
          >
            <img 
              src={photo}
              loading="eager"
              alt={`Wedding photo ${idx + 1}`}
              className="w-full h-full object-cover md:object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/30"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InvitationLotus = () => (
  <span className="invitation-envelope__lotus" aria-hidden="true"><span /></span>
);

export default function WeddingInvitation() {
  const [coverPhase, setCoverPhase] = useState('closed');
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [guestName] = useState(() => {
    const search = window.location.search.replace(
      /([?&]to=)([^&]*)/g,
      (_, parameter, encodedName) => parameter + encodedName.replaceAll('-', '+'),
    );
    const queryParams = new URLSearchParams(search);
    const invitee = queryParams.get('to')?.trim();
    const guestId = queryParams.get('id');

    return invitee || (guestId !== null && Object.hasOwn(guestData, guestId) ? guestData[guestId] : '');
  });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showGifts, setShowGifts] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.1; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
      }
      @keyframes drift {
        0%, 100% { transform: translateX(0px) translateY(0px); }
        25% { transform: translateX(30px) translateY(-15px); }
        50% { transform: translateX(0px) translateY(-30px); }
        75% { transform: translateX(-30px) translateY(-15px); }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 15px rgba(168, 85, 247, 0.4); }
        50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.6); }
      }
      @keyframes petalFall {
        0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
      }

    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [audio] = useState(() => {
    const a = new Audio('/assets/song.mp3');
    a.loop = true;
    a.volume = 0;
    return a;
  });

  const fadeIn = useCallback((audio, duration = 3000) => {
    const steps = 50;
    const stepDuration = duration / steps;
    const volumeIncrement = 0.5 / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        audio.volume = 0.5;
      } else {
        audio.volume = Math.min(audio.volume + volumeIncrement, 0.5);
        currentStep++;
      }
    }, stepDuration);
  }, []);

  const fadeOut = useCallback((audio, duration = 1000) => {
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeDecrement = audio.volume / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      if (currentStep >= steps || audio.volume <= 0) {
        clearInterval(fadeInterval);
        audio.volume = 0;
        audio.pause();
      } else {
        audio.volume = Math.max(audio.volume - volumeDecrement, 0);
        currentStep++;
      }
    }, stepDuration);
  }, []);

const toggleMusic = useCallback(() => {
  if (isMusicPlaying) {
    fadeOut(audio);
    setIsMusicPlaying(false);
  } else {
    audio.volume = 0;
    audio.play()
      .then(() => {
        fadeIn(audio);
        setIsMusicPlaying(true);
      })
      .catch(err => console.log('Audio play failed:', err));
  }
}, [isMusicPlaying, audio, fadeIn, fadeOut]);

  const finishOpening = useCallback(() => {
    setCoverPhase('opened');
    setShowSlideshow(true);
  }, []);

  useEffect(() => {
    if (coverPhase !== 'opening') return;

    const timeout = window.setTimeout(finishOpening, 1000);
    return () => window.clearTimeout(timeout);
  }, [coverPhase, finishOpening]);

const handleOpen = useCallback(() => {
  setCoverPhase('opening');
  
  audio.volume = 0;
  audio.play()
    .then(() => {
      setIsMusicPlaying(true);
      fadeIn(audio, 3000);
      console.log('Music playing successfully!');
    })
    .catch(error => {
      console.log('Audio play failed:', error);
    });
}, [audio, fadeIn]);

  const handleSlideshowComplete = useCallback(() => {
    setShowSlideshow(false);
    setShowMainContent(true);
  }, []);

  const handleSkipSlideshow = useCallback(() => {
    setShowSlideshow(false);
    setShowMainContent(true);
  }, []);

  if (coverPhase !== 'opened') {
    const isOpening = coverPhase === 'opening';
    const artwork = '/assets/invitation-envelope-cover.png';
    const guestLanguage = /[\u1780-\u17FF]/.test(guestName) ? 'km' : 'en';

    return (
      <main className="invitation-cover">
        <div className="invitation-envelope">
          <button
            type="button"
            className="invitation-envelope__open"
            aria-label="Open invitation"
            aria-describedby={guestName ? 'invitation-welcome invitation-guest' : 'invitation-welcome'}
            onClick={handleOpen}
            disabled={isOpening}
          >
            <span className="invitation-envelope__artwork" aria-hidden="true">
              <img src={artwork} alt="" width={851} height={1847} />
              {isOpening && (
                <>
                  <span className="invitation-envelope__lining">
                    <span className="invitation-envelope__letter">
                      <Heart size={18} />
                    </span>
                  </span>
                  <img
                    className="invitation-envelope__flap"
                    src={artwork}
                    alt=""
                    width={851}
                    height={1847}
                    onAnimationEnd={finishOpening}
                  />
                </>
              )}
            </span>
          </button>
          <div className="invitation-envelope__guest">
            <h1 id="invitation-welcome" className="khmer-heading" lang="km">សូមគោរពអញ្ជើញ</h1>
            <div className="invitation-envelope__divider" aria-hidden="true"><InvitationLotus /></div>
            {guestName && (
              <>
                <div className="invitation-envelope__guest-frame">
                  <span className="invitation-envelope__frame-flower invitation-envelope__frame-flower--left" aria-hidden="true"><InvitationLotus /></span>
                  <p id="invitation-guest" className={`guest-name-${guestLanguage}`} lang={guestLanguage}>{guestName}</p>
                  <span className="invitation-envelope__frame-flower invitation-envelope__frame-flower--right" aria-hidden="true"><InvitationLotus /></span>
                </div>
                <div className="invitation-envelope__divider invitation-envelope__divider--footer" aria-hidden="true"><InvitationLotus /></div>
              </>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (showSlideshow) {
    return (
      <div className="min-h-screen relative">
        <PhotoSlideshow 
          onComplete={handleSlideshowComplete} 
        />
        <button
          onClick={handleSkipSlideshow}
          className="absolute top-6 right-6 bg-white/90 text-gold px-4 py-2 rounded-full shadow-lg hover:scale-105 transform transition"
          style={{ zIndex: 60 }}
        >
          Skip to invitation
        </button>
      </div>
    );
  }

  if (!showMainContent) {
    return null;
  }

  const flowerTypes = ['cherry', 'blossom'];

  return (
    <div className="min-h-screen bg-burgundy relative overflow-hidden">
      <PreloadAssets imageUrls={photos} />
      {[...Array(15)].map((_, i) => (
        <Firefly key={`firefly-main-${i}`} delay={i * 0.15} index={i} />
      ))}
      
      {[...Array(20)].map((_, i) => (
        <MagicSparkle key={`sparkle-main-${i}`} delay={i * 0.25} />
      ))}
      
      {[...Array(30)].map((_, i) => (
        <Flower 
          key={`flower-${i}`} 
          delay={i * 0.3} 
          type={flowerTypes[Math.floor(Math.random() * flowerTypes.length)]}
        />
      ))}
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full opacity-10 blur-3xl hidden md:block" style={{willChange: 'transform'}}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 rounded-full opacity-10 blur-3xl hidden md:block" style={{willChange: 'transform'}}></div>
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 md:py-12">
        
        <section className="wedding-frame text-center">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-serif mb-2 relative py-2">
            {weddingInfo.bride}
          </h1>
          <p className="text-3xl md:text-4xl my-4">&</p>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 relative py-2">
            {weddingInfo.groom}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-current to-transparent mx-auto my-6 rounded-full"></div>
          <p className="text-2xl font-bold">
            សូមគោរពអញ្ជើញ
          </p>
          <div className="flex justify-center">
            <p className="max-w-prose text-center text-m mt-6 font-medium leading-[2.2] [text-wrap:balance]">
              យើងខ្ញុំនិងក្រុមគ្រួសារមានកិត្តិយសសូមគោរពអញ្ជើញ <br className="hidden md:block" />
              ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្ត <br className="hidden md:block" />
              អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសដើម្បីប្រសិទ្ធពរជ័យ <br className="hidden md:block" />
              សិរីសួស្ដីជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ។
            </p>
          </div>
        </section>

        <WeddingCarousel
          title="កម្រងរូបភាពអាពាហ៍ពិពាហ៍"
          photos={weddingPhotos}
          autoPlayInterval={5000}
        />

        <section className="wedding-frame mt-5">
          <div className="flex items-center justify-center relative">
            <Calendar className="w-8 h-8 mr-3" />
            <h2 className="text-3xl font-serif font-bold text-center relative py-2 leading-relaxed">កាលបរិច្ឆេទ</h2>
          </div>
          <div className="text-center relative">
            <p className="text-3xl font-bold mb-2 py-2">{weddingInfo.date}</p>
            </div>
        </section>

        <section className="wedding-frame mt-5">
          <h2 className="text-3xl font-serif font-bold text-center relative py-2 leading-relaxed">
            កម្មវិធីមង្គលអាពាហ៍ពិពាហ៍
          </h2>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="text-xs">✦</span>
              <span className="text-xl">❀</span>
              <span className="text-xs">✦</span>
            </div>
            <h2 className="text-2xl font-bold leading-relaxed">
              ព្រឹក
            </h2>
            <div className="w-16 h-1 bg-current mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="space-y-4 relative">
            {[
              { time: '០៥:៣០', title: 'ពិធីសំពះពិលា', desc: '' },
              { time: '០៧:០០', title: 'ពិធីហែជំនូន', desc: '' },
              { time: '០៩:០០', title: 'ពិធីលេីកផ្កាស្លា និងបំពាក់ចិញ្ចៀន', desc: '' },
              { time: '១០:០០', title: 'ពិធីកាត់សក់បង្កក់សិរី', desc: '' },
              { time: '១១:០០', title: 'អញ្ជេីញភ្ញៀវពិសារអាហារថ្ងៃត្រង់', desc: '' }
            ].map((event, idx) => (
              <div key={idx} className="flex items-start group">
                <div
                  className="wedding-frame__time rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-semibold mr-3 sm:mr-4 flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-500 ease-out"
                >
                  <span className="text-sm drop-shadow-sm">
                    {event.time}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg py-4">{event.title}</h3>
                  <p>{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="text-xs">✦</span>
              <span className="text-xl">❀</span>
              <span className="text-xs">✦</span>
            </div>
            <h2 className="text-2xl font-bold leading-relaxed">
              រសៀល
            </h2>
            <div className="w-16 h-1 bg-current mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="space-y-4 relative">
            {[
              { time: '០១:០០', title: 'ពិធីសំពះផ្ទឹម សែនចងដៃ បង្វិលពពិល និងព្រះថោងនាងនាគ', desc: '' },
              { time: '០២:០០', title: 'ពិធីសូត្រមន្ដចម្រេីនព្រះបរិត្ត', desc: '' },
              { time: '០៥:០០', title: 'អញ្ជេីញភ្ញៀវពិសារភោជនាហារនៅ ភោជនីយដ្ឋាន វិមានពរជ័យ', desc: '' },
            ].map((event, idx) => (
              <div key={idx} className="flex items-start group">
                <div 
                  className="wedding-frame__time rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-semibold mr-3 sm:mr-4 flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-500 ease-out"
                >
                  <span className="text-sm drop-shadow-sm">
                    {event.time}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg py-2">{event.title}</h3>
                  <p>{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wedding-frame mt-5">
          <div className="flex items-center justify-center mb-4 relative">
            <MapPin className="w-8 h-8 mr-3" />
            <h2 className="text-3xl font-serif font-bold text-center relative py-2 leading-relaxed">ទីតាំង</h2>
          </div>
          <div className="text-center relative">
            <p className="text-2xl font-semibold mb-2">{weddingInfo.venue}</p>
            <p className="mb-4">{weddingInfo.address}</p>
            {!showMap && (
              <div className="mb-6 flex justify-center">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.google.com/maps/search/Vimean+Pochey/@13.083209,103.2096964,15z"
                  alt="Map QR Code"
                  className="w-48 max-w-full aspect-square border-4 border-current rounded-lg shadow-lg bg-white p-2"
                />
              </div>
            )}
            <button
              onClick={() => setShowMap(!showMap)}
              aria-expanded={showMap}
              className="wedding-frame__button px-8 py-3 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {showMap ? 'Hide Map' : 'View Map'}
            </button>
            {showMap && (
              <div className="mt-6 rounded-2xl overflow-hidden border-4 border-current shadow-xl relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.251994908542!2d103.2096964!3d13.083209499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310549a2c47f8917%3A0xc3a428a914f8a68e!2sVimean%20Pochey!5e0!3m2!1sen!2sjp!4v1769324541125!5m2!1sen!2sjp"
                  style={{ border: 0, width: '100%', height: '400px', display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </div>
        </section>

        <section className="wedding-frame mt-5">
          <div className="text-center relative">
            <h2 className="text-3xl font-serif font-bold text-center relative py-2 leading-relaxed">
              ចំណងដៃ
            </h2>
            <button
              onClick={() => setShowGifts(!showGifts)}
              aria-expanded={showGifts}
              className="inline-flex items-center justify-center wedding-frame__button px-4 sm:px-10 py-4 rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
            >
              <span>{showGifts ? 'បិទ' : '💝 បង្ហាញ QR Code'}</span>
            </button>
            
            {showGifts && (
              <div className="mt-10 space-y-8">
                <div className="flex flex-col md:flex-row justify-center gap-8 items-stretch">
                  {/* QR Code 1 */}
                  <div className="flex flex-col items-center">
                    <div className="wedding-frame__qr-card relative max-w-full rounded-2xl p-2 shadow-xl transform hover:scale-105 transition-transform duration-300">
                      <img 
                        src="/assets/dollar.jpg"
                        alt="Payment QR Code 1"
                        className="w-40 max-w-full h-auto rounded-xl"
                      />
                    </div>
                    <p className="font-semibold mt-4 text-sm">
                      ប្រាក់ដុល្លា (USD)
                    </p>
                  </div>
                  
                  {/* Decorative Divider */}
                  <div className="hidden md:flex items-center">
                    <div className="h-48 w-1 bg-gradient-to-b from-transparent via-current to-transparent"></div>
                  </div>
                  
                  {/* QR Code 2 */}
                  <div className="flex flex-col items-center">
                    <div className="wedding-frame__qr-card relative max-w-full rounded-2xl p-2 shadow-xl transform hover:scale-105 transition-transform duration-300">
                      <img 
                        src="/assets/riel.jpg"
                        alt="Payment QR Code 2"
                        className="w-40 max-w-full h-auto rounded-xl"
                      />
                    </div>
                    <p className="font-semibold mt-4 text-sm">
                      ប្រាក់រៀល (KHR)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="wedding-frame mt-5">
          <Heart className="w-16 h-16 mx-auto mb-4 relative" style={{ animation: 'float 2s ease-in-out infinite' }} />
          <div className="max-w-2xl mx-auto text-center space-y-6 mt-6">
            {/* Khmer Text */}
            <p className="text-lg md:text-xl font-medium leading-relaxed px-4">
              យើងខ្ញុំទាំងពីរនាក់ ពិតជារំភើបសប្បាយរីករាយ
              <br />
              នឹងការអញ្ជើញចូលរួមអបអរសាទរ
              <br />
              របស់អ្នកទាំងអស់គ្នាក្នុងថ្ងៃពិសេសរបស់ខ្ញុំទាំងពីរនាក់
              <br />
              យើងខ្ញុំ សូមអរគុណដោយក្ដីគោរពស្រឡាញ់។
            </p>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-current"></div>
              <div className="text-2xl">♥</div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-current"></div>
            </div>

            {/* English Text */}
            <p className="text-base md:text-lg leading-relaxed px-4 italic">
              Thank you from the bottom of our hearts for joining us and for your kind
              congratulations on our wedding day. Your presence made our celebration
              truly unforgettable.
            </p>
          </div>
          <div className="mt-6 relative">
            <p className="text-sm">With love,</p>
            <p className="text-2xl font-serif mt-2">
              {weddingInfo.bride} & {weddingInfo.groom}
            </p>
          </div>
        </section>

        <section className="wedding-frame mt-5">
          <div className="text-center relative">
            <div className="flex items-center justify-center mb-10">
              <Phone className="w-8 h-8 mr-3" />
              <h2 className="text-3xl font-serif font-bold text-center relative py-2 leading-relaxed">
                ទំនាក់ទំនង
              </h2>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="flex justify-center items-center gap-2 sm:gap-8">
                <a 
                  href="tel:+85599940114"
                  className="whitespace-nowrap hover:underline text-sm sm:text-lg font-medium transition-colors duration-300"
                >
                  099 940 114
                </a>
                
                <div className="h-8 w-px shrink-0 bg-current"></div>
                
                <a 
                  href="tel:+85589856764"
                  className="whitespace-nowrap hover:underline text-sm sm:text-lg font-medium transition-colors duration-300"
                >
                  089 856 764
                </a>
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-xl p-4 rounded-full shadow-2xl border border-purple-300 cursor-pointer hover:scale-110 transition-all duration-300 z-50"
          style={{ animation: 'glow 2s ease-in-out infinite' }}
          title={isMusicPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isMusicPlaying ? (
            <Music className="w-6 h-6 text-purple-600 animate-pulse" />
          ) : (
            <Music className="w-6 h-6 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
}
