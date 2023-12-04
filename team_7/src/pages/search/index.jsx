import React from "react"

const SearchResults = ([movies, actors]) => {
  const movieCards = movies.map((movie, index) => {
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

  const actorCards = actors.map((actor, index) => {
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
              src={`https://image.tmdb.org/t/p/original/${actor.poster_path}`}
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
    </div>
  )
}

export default SearchResults

export async function getServerSideProps({ query }) {
  const serchValue = query.serchValue

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
    `https://api.themoviedb.org/3/search/movie?query=${serchValue}&include_adult=false&language=en-US&page=1`,
    options,
  )
  const movieResultsData = await movieResultsResponse.json()
  const movieResults = [...movieResultsData.results]
  //get the actors search results
  const actorResultsResponse = await fetch(
    `https://api.themoviedb.org/3/search/person?query=${serchValue}&include_adult=false&language=en-US&page=1`,
    options,
  )
  const actorResultsData = await movieResultsResponse.json()
  const actorResults = [...actorResultsData.results]

  return {
    props: {
      movieResults: movies,
      actorResults: actors,
    },
  }
}
