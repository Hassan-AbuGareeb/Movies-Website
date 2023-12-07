import Link from "next/link"
import ActorsPagination from "@/util/ActorsPagination"
function ActorsPage(props) {
  const actorsItem = props.actors.map((actor, index) => {
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
      key={index}
      >
        <Link href={`./actors/${actor.id}`}>
          <img
            class="rounded-lg 
            w-130
            h-80"
            src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
          />
        </Link>
        {
          <p
          class=" 
          text-lg 
          font-semibold
          max-w-[180px] mx-auto"
          >
            {actor.name}
          </p>
        }
      </div>
    )
  })
  return (
    // page container
    <div className="text-center text-slate-100
    bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
      <h1 className="text-5xl pt-8  tracking-wider font-semibold ">Popular Actors</h1>
      {/* actors cards container */}
      <div class="
            mb-6 lg:mb-0 flex flex-none flex-wrap flex-intial justify-center py-10">
        {actorsItem}
      </div>
      <ActorsPagination currentPage={props.currentPage} />
    </div>
  )
}

export default ActorsPage

export async function getServerSideProps({ query }) {
  const currentPage = query.page
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjYzMzQyZGNlMGVkZjJlNzQ3ZTU0Zjg3MmMxNjljYSIsInN1YiI6IjY1NjczYWE0ODlkOTdmMDBlMTczOTA2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3xKy-ugm4T15l16ie7v8j1UKC0xP9Zz-xWVAN37EAvU",
    },
  }

  const actorsResponse = await fetch(
    `https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`,
    options,
  )
  const actorsData = await actorsResponse.json()
  const actors = [...actorsData.results]
  return { props: { actors, currentPage } }
}
