import React, { useEffect, useState } from "react"
import logo from "../../public/watching-a-movie.png"
import Link from "next/link"

  // State for handling search input and dropdown visibility
const Navbar = () => {
  function onSearchChange(event) {
    setSearch(event.target.value)
  }
  const [search, setSearch] = useState("")
  const [genres, setGenres] = useState([])

  // const [showList, setShowList] = useState(false)
  const [showGenreList, setShowGenreList] = useState(false)
  const [showFiltersList, setShowFiltersList] = useState(false)
  const movieFilters = ["popular", "top_rated", "upcoming", "now_playing"]

    // Fetch genres data from API using useEffect
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjcxYTRhY2NkMGUwY2I0NzBmYWZkMjlhMmJjOTZjNiIsInN1YiI6IjY1NjYwODU3YTM0OTExMDExYjU5MTk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd7zqZOCEOyovLHdwMIyHB6BX_EgPzxw6JCCTiLNriQ",
      },
    }

    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((genresResponse) => genresResponse.json())
      .then((genresData) => setGenres([...genresData.genres]))
      .catch((err) => console.error(err))
  }, [])

  const genresList = (
    <div
      className="bg-gradient-to-r from-yellow-300 to-slate-700 absolute bottom-[320px] left-40 z-50 
    overflow-y-scroll h-60 w-[150px] rounded-md
     flex flex-col "
    >
      {genres.map((genre) => (
        <div className="hover:bg-slate-500 hover:rounded-md px-2 py-3 text-center font-mono">
          <Link 
            href={{
              pathname: "/movies",
              query: { page: 1, genre: genre.name, id: genre.id },
            }}
          >
            {genre.name}
          </Link>
        </div>
      ))}
    </div>
  )

  //create filters List
  const movieFiltersList = (
    <div 
      className="bg-gradient-to-r from-yellow-300 to-slate-700 absolute bottom-[325px] left-[300px] z-50 
    w-[115px] rounded-md flex flex-col"
    >
      {movieFilters.map((filter) => (
        <div className="hover:bg-slate-500 hover:rounded-md  px-2 py-3 text-center ">
          <Link 
            href={{
              pathname: "/movies",
              query: { page: 1, filter: filter },
            }}
          >
            {filter
              .split("_")
              .map((movie) => movie.at(0).toUpperCase() + movie.slice(1))
              .join(" ")}
          </Link>
        </div>
      ))}
    </div>
  )

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 p-5">
      <div className="text-black bg-gradient-to-r from-yellow-300 via-slate-600 to-yellow-300  px-3 py-4 rounded-full shadow-lg">
      <div className="flex justify-between mx-5">
        <div className="flex justify-around items-center w-[500px]">
          {/* Logo */}
          <Link href={"/"}>
            <img src={logo.src} alt="movie icons" className=" h-14 w-14" />
          </Link>

          {/* Genres Dropdown */}
          <div
            className="text-black hover:cursor-pointer text-xl font-semibold"
            onClick={() => {
              setShowGenreList((prev) => !prev)
              setShowFiltersList(false)
            }}
          >
            Genres
            {showGenreList && genresList}
          </div>

          {/* Movies Dropdown */}
          <div
            className="text-black hover:cursor-pointer text-xl font-semibold" 
            onClick={() => {
              setShowFiltersList((prev) => !prev)
              setShowGenreList(false)
            }}
          >
            Movies
            {showFiltersList && movieFiltersList}
          </div>

          {/* actors button */}
          <Link
            href={{
              pathname: "/actors",
              query: { page: 1 },
            }}
          >
            <div class ="text-xl font-semibold">Actors</div>
          </Link>
        </div>

        {/* Search Box */}
        <div className="flex items-center w-[300px] justify-around mr-5">
          <input
            type="text"
            placeholder="Search for movies or actors"
            value={search}
            onChange={onSearchChange}
            className="rounded-full w-[225px] px-2 h-6"
          />
          <Link
            href={{
              pathname: "/search",
              query: { page: 1, searchValue: search },
            }}
            onClick={() => setSearch("")}
          >
            <div class ="text-lg font-semibold"> Search</div>
          </Link>
        </div>
      </div>
      </div>
    </nav>
  )
}

export default Navbar
