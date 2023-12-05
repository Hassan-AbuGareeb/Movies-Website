import styles from "@/styles/Home.module.css"
import Link from "next/link"
import Pagination from "@/util/Pagination"

export default function Home({
  latestMovies,
  filter = null,
  currentPage,
  numberOfPages,
  // genre = null,
}) {
  const movies = latestMovies.map((movie, index) => {
    return (
      <div
        key={index}
        style={{
          backgroundColor: "#999",
          width: "150px",
          margin: "10px auto",
          padding: "2px",
        }}
      >
        <li
          style={{
            margin: "10px",
          }}
        >
          <Link href={`./movies/${movie.id}`}>
            <img
              width={"100px"}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
          </Link>
          <br />
          {movie.title}
        </li>
      </div>
    )
  })
  return (
    <div style={{ textAlign: "center" }}>
      {filter /*|| genre*/
        .split("_")
        .map((movie) => movie.at(0).toUpperCase() + movie.slice(1))
        .join(" ")}
      <div style={{ margin: "30px auto" }}>
        <ul
          style={{
            margin: "10px",
            listStyle: "none",
            padding: "0",
            margin: "10px auto",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {"loading..." && movies}
        </ul>
        <Pagination
          currentPage={currentPage}
          filter={filter}
          // genre={genre}
          numberOfPages={numberOfPages}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  console.log(query)
  const filter = query.filter
  const currentPage = query.page
  const genre = null
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjcxYTRhY2NkMGUwY2I0NzBmYWZkMjlhMmJjOTZjNiIsInN1YiI6IjY1NjYwODU3YTM0OTExMDExYjU5MTk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd7zqZOCEOyovLHdwMIyHB6BX_EgPzxw6JCCTiLNriQ",
    },
  }

  const filteredMovies = await fetch(
    !!filter
      ? `https://api.themoviedb.org/3/movie/${filter}?language=en-US&page=${currentPage}`
      : `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
    options,
  )
  const filteredMoviesData = await filteredMovies.json()
  const numberOfPages = filteredMoviesData.total_pages
  const latestMovies = [...filteredMoviesData.results]

  return {
    props: {
      latestMovies,
      filter,
      currentPage,
      numberOfPages,
      // genre,
    },
  }
}
