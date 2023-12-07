import React from "react"
import Link from "next/link"
import Pagination from "@/util/Pagination"
const SearchResults = ({
  movieResults,
  actorResults,
  currentPage,
  numberOfPages,
  searchValue, 
}) => {
  const movieCards = movieResults.map((movie) => {
    return (
      <div
      class="
      md:max-xl:flex
      min-w-[230px]
      mt-6 mb-6 mx-3
      rounded-lg 
      w-[230px]
      pt-6 pr-4 pb-2 pl-2 px-8 py-12
      transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
      >
        <Link href={`../movies/${movie.id}`}>
          <img
            class="rounded-lg 
            w-130
            h-80"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
  
          />
        </Link>
        <br />
        <p
          class=" 
          text-lg 
          font-semibold
          max-w-[180px] mx-auto"
        >
          {movie.title}
        </p>
      </div>
    )
  })

  const actorCards = actorResults.map((actor, index) => {
    return (
      <div
        key={index}
        class="
        md:max-xl:flex
        min-w-[230px]
        mt-6 mb-6 mx-3
        rounded-lg 
        w-[230px]
        pt-6 pr-4 pb-2 pl-2 px-8 py-12
        transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
      >
        <Link href={`../actors/${actor.id}`}>
          <img
            class="rounded-lg 
            w-130
            h-80"
            src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
           
          />
        </Link>
        <br />
        <p
           class=" 
           text-lg 
           font-semibold
           max-w-[150px] mx-auto"
        >
          {actor.name}
        </p>
      </div>
    )
  })

  return (
    <div className="text-center text-slate-100
    bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 text-5xl   tracking-wider font-semibold ">
    <div
      class="
      md:max-xl:flex
      mx-5
      bg-wihte-200
      rounded-lg 
      w-50 
      pt-6  pb-2 px-8 py-12"
    >
      <span>Search results:</span>
      {/* movies results */}
      <p className="pt-6">Movies</p>
      <div class="flex flex-none flex-wrap flex-intial justify-center py-10">
        {"loading..." && movieCards}
      </div>
      <br />
      <hr />
      {/* actors results */}
      <p className="pt-6">Actors</p>
      <div class="flex flex-none flex-wrap flex-intial justify-center py-10">
        {"loading..." && actorCards}
      </div>
      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        destinationPage="search"
        searchValue={searchValue}
      />
    </div>
    </div>
  )
}

export default SearchResults

export async function getServerSideProps({ query }) {
  const searchValue = query.searchValue
  const currentPage = query.page
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjcxYTRhY2NkMGUwY2I0NzBmYWZkMjlhMmJjOTZjNiIsInN1YiI6IjY1NjYwODU3YTM0OTExMDExYjU5MTk2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bd7zqZOCEOyovLHdwMIyHB6BX_EgPzxw6JCCTiLNriQ",
    },
  }
  //get the movies search results
  const movieResultsResponse = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=${currentPage}`,
    options,
  )
  const movieResultsData = await movieResultsResponse.json()
  const movieResults = [...movieResultsData.results]

  //get the actors search results
  const actorResultsResponse = await fetch(
    `https://api.themoviedb.org/3/search/person?query=${searchValue}&include_adult=false&language=en-US&page=${currentPage}`,
    options,
  )
  const actorResultsData = await actorResultsResponse.json()
  const actorResults = [...actorResultsData.results]

  const numberOfPages = Math.min(
    movieResultsData.total_pages,
    actorResultsData.total_pages,
  )

  return {
    props: {
      movieResults,
      actorResults,
      currentPage,
      numberOfPages,
      searchValue,
    },
  }
}
