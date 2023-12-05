import styles from "@/styles/Home.module.css"
import Link from "next/link"

export default function Home({ latestMovies }) {
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
        <Link href={`./movies/${movie.id}`}>
          <img
            width={"100px"}
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
        </Link>
        <br />
        <p> {movie.title}</p>
      </div>
    )
  })
  return (
    <div style={{ textAlign: "center" }}>
      <Link
        href={{
          pathname: "./movies",
          query: { page: 1, filter: "upcoming" },
        }}
      >
        <p class="text-7xl font-bold underline">Latest Movies</p>
      </Link>
      <div class="bg-red-500">{"loading..." && movies}</div>
    </div>
  )
}

export async function getServerSideProps({}) {
  //fetch options
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjcxYTRhY2NkMGUwY2I0NzBmYWZkMjlhMmJjOTZjNiIsInN1YiI6IjY1NjYwODU3YTM0OTExMDExYjU5MTk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd7zqZOCEOyovLHdwMIyHB6BX_EgPzxw6JCCTiLNriQ",
    },
  }

  //get the latest movies
  const resp = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options,
  )
  const data = await resp.json()
  const latestMovies = [...data.results]

  const genresp = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options,
  )
  return {
    props: {
      latestMovies,
    },
  }
}
