import Link from "next/link"
export default function Home({ latestMovies }) {
  //create movie cards array
  const moviesCards = latestMovies.map((movie, index) => {
    return (
      <div
        key={index}
        class="
        md:max-xl:flex
        mt-6 mb-6 mx-3
        bg-wihte-200
        rounded-lg 
        w-50 
        pt-6 pr-4 pb-2 pl-2 px-8 py-12
        transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110"
      >
        {/* move to the movie page */}
        <Link href={`./movies/${movie.id}`}>
          <img
            class="
            rounded-lg 
            w-130
            h-80"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
        </Link>
        
          <p
            class=" 
            text-lg 
            font-semibold
            line-clamp-3 hover:line-clamp-4
            max-w-[150px] mx-auto"
          >
            {movie.title}
          </p>
        
      </div>
    )
  })
  return (
    <div className="text-center text-slate-100
    bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
      <h1 className="text-5xl pt-8  tracking-wider font-semibold ">Latest Movies</h1>
      <div class="flex flex-none flex-wrap flex-intial justify-center py-6">
        {"loading..." && moviesCards}
      </div>
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
