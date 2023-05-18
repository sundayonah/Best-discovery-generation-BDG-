import Banner from "@/componenrs/Banner"
import Header from "@/componenrs/Header"
import Head from "next/head"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      {/* HEADER */}
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* ProductsFeed */}
      </main>
    </div>
  )
}
