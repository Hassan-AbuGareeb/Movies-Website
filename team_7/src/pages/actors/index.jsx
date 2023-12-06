import Link from "next/link"
import ActorsPagination from "@/util/ActorsPagination"
function ActorsPage(props) {
  console.log(props.actorsData)
  const actorsItem = props.actorsData.map((actor, index) => {
    return (
      <div
        class=" 
  mt-6 mr-6 mb-6 ml-3
  bg-wihte-200
  rounded-lg 
  w-55 
  pt-6 pr-4 pb-2 pl-2
  px-8 py-8"
      >
        <Link href={`./actors/${actor.id}`}>
          <img
            class="rounded-lg 
      hover:bg-sky-700
      w-130
      h-80
      hover:file:bg-violet-100"
            src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
          />
        </Link>
        {
          <p
            class="   mt-6 mr-6 mb-6 ml-3       
      text-ellipsis overflow-hidden
       text-base 
      font-bold
      line-clamp-3 hover:line-clamp-4"
          >
            {" "}
            {actor.name}{" "}
          </p>
        }
      </div>
    )
  })
  return (
    <div>
      <div class="mb-6 lg:mb-0 flex flex-none flex-wrap flex-intial justify-center py-10">
        {/* <ul style = {{margin: "10px",
            listStyle: "none",
            padding: "0",
            margin: "10plexWrap: "wx auto",
            display: "flex",
            frap",}}>  */}
        {actorsItem}
        {/* </ul> */}
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
  const actors = await actorsResponse.json()
  const actorsData = [...actors.results]
  return { props: { actorsData, currentPage } }
}
