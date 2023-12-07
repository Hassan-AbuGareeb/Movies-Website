
import React from "react"
import Link from "next/link"

//TODO :change the number of pages as recieved from the api
const MAX_PAGES = 20

const ActorsPagination = ({  currentPage }) => {
  //calculate the minimum and maximum pages to show in the pagination
  const minPage = +currentPage - 2 < 1 ? 1 : +currentPage - 2
  console.log(minPage)
  const maxPage = +currentPage + 2 > MAX_PAGES ? MAX_PAGES : +currentPage + 2
  console.log(maxPage)
  //fill an array with the pages to show in the pagination
  const pagesNumbers = []
  for (let i = minPage; i <= maxPage; i++) pagesNumbers.push(i)
  console.log(pagesNumbers)
  const pages = pagesNumbers.map((number) => {
    return (
      <div key={number} className={`text-yellow-200 text-2xl w-10 h-10 bg-slate-700 rounded-xl hover:underline ${ +number=== +currentPage?"underline":"no-line"}`} >
        <Link
          href={{
            pathname: "/actors",
            query: { page: [number] },
          }}
        >
          {number}
        </Link>
      </div>
    )
  })

  return (
    <div className="flex justify-around w-[400px] mx-auto py-3 bg-yellow-300 rounded-xl">
      {pages}
    </div>
  )
}

export default ActorsPagination