import Banner from "@/componenrs/Banner"
import Header from "@/componenrs/Header"
import Head from "next/head"
import BooksFeed from "@/componenrs/BooksFeed"
import { getSession } from "next-auth/react"
import { useState } from "react"

export default function Home({ books }) {
   const [filteredBooks, setFilteredBooks] = useState(books)

   const handleSearch = (searchQuery) => {
      const filteredResults = books.filter((book) =>
         book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredBooks(filteredResults)
   }

   return (
      <div className="bg-gray-200 ">
         <Head>
            <title>Books</title>
         </Head>

         {/* HEADER */}
         <Header books={books} onSearch={handleSearch} />

         <main className="max-w-screen-2xl mx-auto ">
            {/* Banner */}
            <Banner />
            {/* ProductsFeed */}
            <BooksFeed books={filteredBooks} />
         </main>

         <p className="flex justify-center m-4">FOOTER</p>
      </div>
   )
}

export async function getServerSideProps(content) {
   const session = await getSession(content)

   //    //Fetch the books from the API

   const books = await fetch("http://localhost:3000/api/books").then((res) =>
      res.json()
   )

   // const data = await response.json()
   // setBooks(data)
   console.error("Error fetching books:", books)

   console.log(books.length)

   //    const books = await fetch("https://fakestoreapi.com/products").then((res) =>
   //       res.json()
   //    )
   //    // .then((json) => console.log(json))
   return {
      props: {
         books,
         session,
      },
   }
}
