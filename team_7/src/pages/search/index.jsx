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
  const movieCards = movieResults.map((movie, index) => {
    return (
      <div
        key={index}
        class=" md:max-xl:flex
        min-w-[213px]
      mt-6 mb-6 mx-3
      bg-wihte-200
      rounded-lg 
      w-[213px]
      pt-6 pr-4 pb-2 pl-2 px-8 py-12
      transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
      >
        <Link href={`../movies/${movie.id}`}>
          <img
            class="rounded-lg 
            hover:bg-sky-700
            w-130
            h-80"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
        </Link>
        <br />
        <p
          class="  text-base 
            font-bold
            line-clamp-3 hover:line-clamp-4
            max-w-[150px] mx-auto"
        >
          {movie.title}
        </p>
        {/* </li> */}
      </div>
    )
  })

  const actorCards = actorResults.map((actor, index) => {
    return (
      <div
        key={index}
        class=" md:max-xl:flex
        min-w-[213px]
        mt-6 mb-6 mx-3
        bg-wihte-200
        rounded-lg 
        w-[213px] 
        pt-6 pr-4 pb-2 pl-2 px-8 py-12
        transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
      >
        <Link href={`../actors/${actor.id}`}>
          <img
            class="rounded-lg 
            hover:bg-sky-700
            w-130
            h-80"
            src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
          />
        </Link>
        <br />
        <p
          class="  text-base 
            font-bold
            line-clamp-3 hover:line-clamp-4
            max-w-[150px] mx-auto"
        >
          {actor.name}
        </p>
        {/* </li> */}
      </div>
    )
  })

  return (
    <div
      class=" md:max-xl:flex
    mt-6 mb-6 mx-5
    bg-wihte-200
    rounded-lg 
    w-50 
    pt-6  pb-2 px-8 py-12"
      style={{ textAlign: "center" }}
    >
      search results
      {/* <br /> */}
      <p>movies</p>
      <div class="flex flex-none flex-wrap flex-intial justify-center py-10">
        {"loading..." && movieCards}
      </div>
      <br />
      <hr />
      <p
        class="  text-base 
            font-bold
            line-clamp-3 hover:line-clamp-4
            max-w-[150px] mx-auto"
      >
        actors
      </p>
      <br />
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
