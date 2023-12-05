import React from "react"
import Link from "next/link"

const MoviePage = ({
  movieInfo,
  directors,
  mainActors,
  relatedMovies,
  trailerLink,
}) => {
  const {
    title,
    release_date: releaseDate,
    runtime,
    original_language: language,
    vote_average: rating,
    vote_count: votings,
    poster_path: poster,
    overview,
    production_companies,
  } = movieInfo

  const actorsItems = mainActors.map((actor, index) => (
    <div key={index}>
      <Link href={`../actors/${actor.id}`} key={index}>
        <img
          width={"100px"}
          src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
        />
      </Link>
      <p>{actor.name}</p>
    </div>
  ))

  const relatedMoviesItems = relatedMovies.map((movie, index) => (
    <div key={index}>
      <Link href={`../movies/${movie.id}`} key={index}>
        <img
          width={"100px"}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        />
      </Link>
      <p>{movie.title}</p>
    </div>
  ))

  const productionCompany =
    production_companies.length !== 0 ? production_companies[0] : null

  return (
    <div>
      <div className="bg-green-500 flex">
        {!!poster && (
          <img
            src={`https://image.tmdb.org/t/p/original/${poster}`}
            className="w-96 h-1/4 rounded-xl"
          />
        )}
        <div className="flex flex-col justify-end">
          <p>{title}</p>
          <p>released on: {releaseDate}</p>
          <p>duration: {runtime}</p>
          <p>language: {language}</p>
          <p>rating: {rating}</p>
          <p>votings: {votings}</p>
          <p>
            Directed by: {directors.map((director) => director.name).join(", ")}
          </p>
          <p>overview: {overview}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {actorsItems}
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {relatedMoviesItems}
      </div>
      {trailerLink && (
        <iframe src={trailerLink} width={"400px"} height={"250px"}></iframe>
      )}
      {productionCompany && (
        <div>
          produced by:
          {productionCompany.name}
          <img
            width={"200px"}
            src={`https://image.tmdb.org/t/p/original/${productionCompany.logo_path}`}
          />
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const movieId = context.query.movieId
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjcxYTRhY2NkMGUwY2I0NzBmYWZkMjlhMmJjOTZjNiIsInN1YiI6IjY1NjYwODU3YTM0OTExMDExYjU5MTk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd7zqZOCEOyovLHdwMIyHB6BX_EgPzxw6JCCTiLNriQ", // Replace with your actual API key
    },
  }

  const movieInfoResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    options,
  )
  const movieInfo = await movieInfoResponse.json()

  const creditsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options,
  )
  const creditsData = await creditsResponse.json()
  const directors = creditsData.crew.filter(
    (person) => person.job === "Director",
  )
  const mainActors = creditsData.cast.slice(0, 5)

  const similarMoviesResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    options,
  )
  const similarMoviesData = await similarMoviesResponse.json()
  const relatedMovies = similarMoviesData.results.slice(0, 5)

  const trailerResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    options,
  )
  const trailer = await trailerResponse.json()
  const trailerLink =
    trailer.results.length !== 0
      ? `https://www.youtube.com/embed/${
          trailer.results.find((video) => video.type === "Trailer").key
        }`
      : false

  return {
    props: {
      movieInfo,
      directors,
      mainActors,
      relatedMovies,
      trailerLink,
    },
  }
}

export default MoviePage
