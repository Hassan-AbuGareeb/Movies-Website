
import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css'; 

const Navbar = () => {
  // State for genres
  const [genres, setGenres] = useState([]);

  // Fetch genres from the Movie Database API
  useEffect(() => {
    const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>Team 7</div>

      {/* Genres Dropdown */}
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>Genres</button>
        <div className={styles.dropdownContent}>
          {genres.map((genre) => (
            <a key={genre.id} href="#">
              {genre.name}
            </a>
          ))}
        </div>
      </div>

      {/* Search Box */}
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search for movies or actors" className={styles.searchInput} />
        <button className={styles.searchButton}>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
