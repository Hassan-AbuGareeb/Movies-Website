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
          <Link href={`../movies/${movie.id}`}>
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

  const actorCards = actorResults.map((actor, index) => {
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
          <Link href={`../actors/${actor.id}`}>
            <img
              width={"100px"}
              src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
            />
          </Link>
          <br />
          {actor.name}
        </li>
      </div>
    )
  })

  return (
    <div style={{ textAlign: "center" }}>
      search results
      <br />
      <p>movies</p>
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
          {"loading..." && movieCards}
        </ul>
      </div>
      <br />
      <hr />
      <p>actors</p>
      <br />
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
          {"loading..." && actorCards}
        </ul>
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
