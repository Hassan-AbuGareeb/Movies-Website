import React, { useEffect, useState } from "react"
import styles from "./Navbar.module.css"
import { getServerSideProps } from "next/dist/build/templates/pages"
import Link from "next/link"

function onSearchChange(event) {
  setSearch(event.target.value)
}

const Navbar = ({ genres }) => {
  const [search, setSearch] = useState("")
  const movieFilters = ["popular", "top_rated", "upcoming", "now_playing"]
  const Navbar = ({ genres }) => {
    const [search, setSearch] = useState("")
    const movieFilters = ["popular", "top_rated", "upcoming", "now_playing"]
    return (
      <nav className={styles.navbar}>
        {/* Logo */}
        <div className={styles.logo}>Team 7</div>

        {/* Genres Dropdown */}
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>Genres</button>
          <div className={styles.dropdownContent}>
            {genres.map((genre) => (
              <Link
                href={{
                  pathname: "../pages/movies",
                  query: { page: 1, genre: [genre.name] },
                }}
              >
                {" "}
                {genre.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Movies Dropdown */}
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>Movies</button>
          <div className={styles.dropdownContent}>
            {movieFilters.map((movie, index) => (
              <Link
                key={index}
                href={{
                  pathname: "../pages/movies",
                  query: { page: 1, filter: [movie] },
                }}
              >
                {movie}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href={{
            pathname: "/actors",
            query: { page: 1 },
          }}
        >
          <div>Actors</div>
        </Link>

        {/* Search Box */}
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search for movies or actors"
            className={styles.searchInput}
            value={search}
            onChange={onSearchChange}
          />
          <Link
            href={{
              pathname: "/search",
              query: { serchValue: [search] },
            }}
          >
            <div className={styles.searchButton}>Search</div>
          </Link>
        </div>
      </nav>
    )
  }
}
