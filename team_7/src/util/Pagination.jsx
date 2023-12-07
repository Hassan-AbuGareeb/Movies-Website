import React from "react"
import Link from "next/link"

const Pagination = ({
  filter = null,
  searchValue = null,
  genre = null,
  id = null,
  currentPage,
  numberOfPages,
  destinationPage,
}) => {
  //calculate the minimum and maximum pages to show in the pagination
  const minPage = +currentPage - 2 < 1 ? 1 : +currentPage - 2
  const maxPage =
    +currentPage + 2 > numberOfPages ? numberOfPages : +currentPage + 2

  //fill an array with the pages to show in the pagination
  const pagesNumbers = []
  for (let i = minPage; i <= maxPage; i++) pagesNumbers.push(i)
  const pages = pagesNumbers.map((number) => {
    return (
      <div key={number} className={`text-yellow-200 text-2xl w-10 h-10 bg-slate-700 rounded-xl hover:underline ${ +number=== +currentPage?"underline":"no-line"}`}>
        <Link
          href={{
            pathname: `/${destinationPage}`,
            query: {
              page: number,
              filter: filter,
              searchValue: searchValue,
              id: id,
              genre: genre,
            },
          }}
        >
          <span >{number}</span>
        </Link>
      </div>
    )
  })

  return (
    <div className="flex justify-around w-[450px] mx-auto py-4 bg-yellow-300 rounded-xl" >
      {pages}
    </div>
  )
}

export default Pagination
