import Link from "next/link"
import ActorsPagination from "@/util/ActorsPagination"
function ActorsPage(props) {
    console.log(props.actorsData)
   const actorsItem = props.actorsData.map ((actor,index)=>{
 

return (<div
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
           <Link href={`./actors/${actor.id}`}> 
            <img
              width={"100px"}
              src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
            />
          </Link> 
          <br />
          {actor.name}
        </li>
      </div>)
   })
   console.log(actorsItem)
    return (
        <div>
            <ul style = {{margin: "10px",
            listStyle: "none",
            padding: "0",
            margin: "10px auto",
            display: "flex",
            flexWrap: "wrap",}}> 
           {actorsItem} 
           </ul>
           <ActorsPagination currentPage={props.currentPage}/>
        
        </div>
    )
}

export default ActorsPage

export async function getServerSideProps({query}) {
    const currentPage = query.page
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjYzMzQyZGNlMGVkZjJlNzQ3ZTU0Zjg3MmMxNjljYSIsInN1YiI6IjY1NjczYWE0ODlkOTdmMDBlMTczOTA2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3xKy-ugm4T15l16ie7v8j1UKC0xP9Zz-xWVAN37EAvU'
        }
      };
      
     const actorsResponse = await fetch(`https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`, options)
       const actors = await actorsResponse.json() 
       const actorsData = [...actors.results]
       return{props:{actorsData , currentPage}}


}



