import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as movieApi from '../api/movieApi';
import { Play, ChevronRight } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="loading-screen">Loading...</div>;

  let heroMovie = movies.length > 0 ? movies[0] : null;
  
  // We want to show the movies in the trending section, allowing horizontal scroll
  const trendingMovies = heroMovie ? movies.filter(m => m._id !== heroMovie._id) : movies;

  return (
    <div className="moov-home-container">
      {/* Hero Section */}
      {heroMovie && (
        <section className="moov-hero">
          <img 
            src={heroMovie.backdrop} 
            alt={heroMovie.title} 
            className="hero-img" 
          />
          <div className="hero-gradient-overlay"></div>
          
          <div className="hero-content">
            <h1 className="hero-title">{heroMovie.title}</h1>
            <p className="hero-desc">{heroMovie.description}</p>
            
            <div className="hero-buttons">
              <Link to={`/book/${heroMovie._id}`} className="moov-btn moov-btn-primary">
                <span>Buy Now !</span>
                <Play fill="currentColor" size={16} className="btn-icon" />
              </Link>
              <Link to={`/book/${heroMovie._id}`} className="moov-btn moov-btn-secondary">
                <span>Details</span>
                <ChevronRight size={16} className="btn-icon" />
              </Link>
            </div>
          </div>
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
