import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as movieApi from '../api/movieApi';
import { Play, ChevronRight, ChevronLeft } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await movieApi.getMovies({ limit: 12 });
        setMovies(data.movies);
      } catch (error) {
        console.error("Failed to load movies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const heroMovies = movies.slice(0, 4);

  useEffect(() => {
    if (heroMovies.length === 0) return;
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroMovies.length]);

  if (loading) return <div className="loading-screen">Loading...</div>;
  
  // We want to show the movies in the trending section, allowing horizontal scroll
  const trendingMovies = movies.filter(m => !heroMovies.some(hero => hero._id === m._id));

  return (
    <div className="moov-home-container">
      {/* Hero Section */}
      {heroMovies.length > 0 && (
        <section className="moov-hero">
          {heroMovies.map((movie, index) => (
            <div 
              key={movie._id} 
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img 
                src={movie.banner || movie.backdrop} 
                alt={movie.title} 
                className="hero-img" 
              />
              <div className="hero-gradient-overlay"></div>
              
              <div className="hero-content split-hero">
                <div className="hero-poster-wrapper">
                  <img src={movie.poster} alt={movie.title} className="hero-poster-img" />
                </div>
                
                <div className="hero-text-wrapper">
                  <h1 className="hero-title">{movie.title}</h1>
                  <p className="hero-desc">{movie.description}</p>
                  
                  <div className="hero-buttons">
                    <Link to={`/book/${movie._id}`} className="moov-btn moov-btn-primary pill-btn">
                      <span>BUY NOW !</span>
                      <div className="play-icon-wrapper">
                        <Play fill="currentColor" size={16} className="btn-icon" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          {heroMovies.length > 1 && (
            <>
              <button 
                className="slider-arrow slider-arrow-left" 
                onClick={() => setCurrentSlide(prev => (prev === 0 ? heroMovies.length - 1 : prev - 1))}
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                className="slider-arrow slider-arrow-right" 
                onClick={() => setCurrentSlide(prev => (prev + 1) % heroMovies.length)}
              >
                <ChevronRight size={32} />
              </button>

              <div className="slider-dots">
                {heroMovies.map((_, index) => (
                  <button
                    key={index}
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      )}

      <div className="moov-main-content">
        
        {/* Trending Movies */}
        <section className="moov-section">
          <h2 className="section-title">Trending Movies</h2>
          <div className="marquee-container">
            <div className="marquee-content">
              {trendingMovies.map((movie, idx) => (
                <Link to={`/book/${movie._id}`} key={`trend-orig-${idx}`} className="poster-card">
                  <img src={movie.poster} alt={movie.title} />
                </Link>
              ))}
              {/* Duplicate for seamless infinite scrolling loop */}
              {trendingMovies.map((movie, idx) => (
                <Link to={`/book/${movie._id}`} key={`trend-dup-${idx}`} className="poster-card" aria-hidden="true">
                  <img src={movie.poster} alt={movie.title} />
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
