import Banner from "@/componenrs/Banner"
import Header from "@/componenrs/Header"
import Head from "next/head"
import BooksFeed from "@/componenrs/BooksFeed"

export default function Home({ books }) {
  return (
    <div className="bg-gray-200 ">
      <Head>
        <title>E-ccomerce</title>
      </Head>

      {/* HEADER */}
      <Header />

      <main className="max-w-screen-2xl mx-auto my-12">
        {/* Banner */}
        <Banner />
        {/* ProductsFeed */}
        <BooksFeed books={books} />
      </main>
    </div>
  )
}

export async function getServerSideProps(content) {
  const books = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  )
  // .then((json) => console.log(json))
  // console.log(books)
  return {
    props: {
      books,
    },
  }
}

// Get >>> https://fakestoreapi.com/products
