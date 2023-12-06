import React, { useEffect, useState } from "react"
import logo from "../../public/watching-a-movie.png"
import Link from "next/link"

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
      className="bg-red-300 absolute bottom-[340px] left-44 z-50
    overflow-y-scroll h-60 w-[125px] rounded-md
     flex flex-col  "
    >
      {genres.map((genre) => (
        <div className="hover:bg-slate-500 pl-2 py-3 text-center">
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
      className="bg-red-300 absolute bottom-[388px] left-[305px] z-50
    w-[115px] rounded-md flex flex-col"
    >
      {movieFilters.map((filter) => (
        <div className="hover:bg-slate-500 px-auto py-3 text-center">
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
    <nav className="text-black bg-slate-200 m-4 px-3 py-2 rounded-full shadow-lg">
      <div className="flex justify-between mx-5">
        <div className="flex justify-around items-center w-[500px]">
          {/* Logo */}
          <Link href={"/"}>
            <img src={logo.src} alt="movie icons" className=" h-12 w-12" />
          </Link>

          {/* Genres Dropdown */}
          <div
            className="text-black hover:cursor-pointer"
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
            className="text-black hover:cursor-pointer"
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
            <div>Actors</div>
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
            <div>Search</div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
