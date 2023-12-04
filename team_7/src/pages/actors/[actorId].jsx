function ActorPage({ actorData }) {
  const actorInfo = (
    <div>
      <img
        width={"100px"}
        src={`https://image.tmdb.org/t/p/original/${actorData.profile_path}`}
      />
      <p>{actorData.name}</p>

      <p>{actorData.gender === 2 ? "male" : "female"}</p>
      <p>{actorData.popularity}</p>
      <p>{actorData.birthday}</p>
      <p>{actorData.biography}</p>
    </div>
  )
  return <div>{actorInfo}</div>
}

export default ActorPage
export async function getServerSideProps({ query }) {
  //https://api.themoviedb.org/3/person/{person_id}

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
