function ActorPage({ actorData }) {

  // JSX structure for actor information
  const actorInfo = (
    <div className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 flex p-5 gap-6 text-slate-200">
      <img
        className="w-[300px] h-[400] rounded-2xl"
        src={`https://image.tmdb.org/t/p/original/${actorData.profile_path}`}
      />
      <div className="flex flex-col justify-evenly">
        <p className="text-4xl ">{actorData.name}</p>

        <p className="text-2xl">{actorData.gender === 2 ? "male" : "female"}</p>
        <p className="text-2xl ">
          Popularity: {Math.round(actorData.popularity * 10) / 10}
        </p>
        <p className="text-2xl">Birth Date: {actorData.birthday}</p>
        <p className="text-1xl">
          <span className="text-2xl font-semibold">Biography:</span>
          <br />
          <br />
          {actorData.biography}
        </p>
      </div>
    </div>
  )
  return <div className="bg-slate-600">{actorInfo}</div>
}

export default ActorPage
export async function getServerSideProps({ query }) {
  const actorId = query.actorId
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjYzMzQyZGNlMGVkZjJlNzQ3ZTU0Zjg3MmMxNjljYSIsInN1YiI6IjY1NjczYWE0ODlkOTdmMDBlMTczOTA2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3xKy-ugm4T15l16ie7v8j1UKC0xP9Zz-xWVAN37EAvU",
    },
  }

  const actorResponse = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}`,
    options,
  )
  const actor = await actorResponse.json()
  const actorData = actor

  return { props: { actorData } }
}
