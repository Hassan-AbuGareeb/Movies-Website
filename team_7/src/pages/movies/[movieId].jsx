import React from "react"
import Link from "next/link"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
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
    <div
      //   class=" md:max-xl:flex
      // mt-6 mb-6 mx-4
      // bg-wihte-200
      // rounded-lg
      // w-50
      // pt-6 pr-4 pb-2 pl-2 px-8 py-12
      // transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
      // class="grid gap-8 sm:max-xl:bg:blue-50 sm:max-xl:p-9 md:grid-cols-2 md:items-center md:text-left"
      // key={index}
      class="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 text-center max-w-lg"
    >
      <Link href={`../actors/${actor.id}`} key={index}>
        <img
          className="h-56 w-40 rounded-lg shadow-xl  "
          src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
        />
        <span className=" text-slate-300 font-semibold break-normal">
          {actor.name}
        </span>
      </Link>
    </div>
  ))

  const relatedMoviesItems = relatedMovies.map((movie, index) => (
    <div
      key={index}
      className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 text-center max-w-[160px]"
    >
      <Link href={`/movies/${movie.id}`} key={index} passHref>
        <img
          className="h-56 w-40 rounded-lg shadow-xl  "
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        />
      </Link>
      <span className=" text-slate-300 font-semibold break-normal">
        {movie.title}
      </span>
    </div>
  ))
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const productionCompany =
    production_companies.length !== 0 ? production_companies[0] : null

  return (
    <div className="bg-slate-600 ">
      <div className="bg-slate-600 flex p-5 my-16 gap-6 text-slate-200">
        {!!poster && (
          <img
            src={`https://image.tmdb.org/t/p/original/${poster}`}
            className="w-[300px] h-[400] rounded-2xl"
          />
        )}
        <div className="flex flex-col justify-evenly ">
          <p className="text-4xl ">{title}</p>
          <p className="text-2xl">release in: {releaseDate.slice(0, 4)}</p>
          <p className="text-2xl">
            duration: {hours}
            <span className="text-lg ">h </span>
            {minutes}
            <span className="text-lg ">m</span>
          </p>
          <p className="text-2xl">language: {language}</p>
          <p className="text-2xl">
            rating:{" "}
            <b>
              <CircularProgressbar
                value={Math.round(rating * 10) / 10}
                text={`${Math.round(rating * 10) / 10}`}
                minValue={0}
                maxValue={10}
                background
                backgroundPadding={5}
                className="h-12 w-12 inline max-w-[80px]"
                styles={buildStyles({ textSize: "40px" })}
              />
            </b>
          </p>
          <p className="text-2xl">votings: {votings}</p>
          <p className="text-2xl">
            Directed by: {directors.map((director) => director.name).join(", ")}
          </p>
          <p className="text-xl max-w-l">
            <span className="text-2xl font-semibold">overview:</span>
            <br /> {overview}
          </p>
        </div>
      </div>
      <div className="flex flex-col mx-20 gap-10 my-16">
        <p className="text-slate-100 text-4xl font-bold">Cast</p>
        <div className="flex gap-9 justify-around ">{actorsItems}</div>
      </div>
      <div className="flex flex-col mx-20 gap-10 my-16">
        <p className="text-slate-100 text-4xl font-bold">Similar movies</p>
        <div className="flex gap-9 justify-around ">{relatedMoviesItems}</div>
      </div>

      <div className="mx-20 mb-16 ">
        <p className=" text-slate-100 text-4xl font-bold mb-8">Trailer</p>

        {trailerLink && (
          <iframe
            src={trailerLink}
            className=" mx-auto rounded-xl w-[700px] h-[400px]"
          ></iframe>
        )}
      </div>
      {productionCompany && (
        <div className="flex mx-20 pb-10 text-slate-100 font-semibold text-2xl ">
          <span className="mt-auto">produced by:</span>
          <img
            src={`https://image.tmdb.org/t/p/original/${productionCompany.logo_path}`}
            alt={productionCompany.name}
            className="w-auto h-20 ml-10"
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
  const mainActors = creditsData.cast.slice(0, 6)

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
