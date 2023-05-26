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
            <title>E-ccomerce</title>
         </Head>

         {/* HEADER */}
         <Header books={books} onSearch={handleSearch} />

         <main className="max-w-screen-2xl mx-auto ">
            {/* Banner */}
            <Banner />
            {/* ProductsFeed */}
            <BooksFeed books={filteredBooks} />
         </main>
      </div>
   )
}

export async function getServerSideProps(content) {
   const session = await getSession(content)

   //Fetch the books from the API
   const books = await fetch("https://fakestoreapi.com/products").then((res) =>
      res.json()
   )
   // .then((json) => console.log(json))
   // console.log(books)
   return {
      props: {
         books,
         session,
      },
   }
}

// Get >>> https://fakestoreapi.com/products
