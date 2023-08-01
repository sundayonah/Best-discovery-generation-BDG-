import Banner from "@/componenrs/Banner"
import Header from "@/componenrs/Header"
import Head from "next/head"
import BooksFeed from "@/componenrs/BooksFeed"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Home({ books }) {
   const [filteredBooks, setFilteredBooks] = useState(books)

   const handleSearch = (searchQuery) => {
      const filteredResults = books.filter((book) =>
         book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredBooks(filteredResults)
   }

   const [booksApi, setBooksApi] = useState([])

   useEffect(() => {
      const fetchBooks = async () => {
         try {
            const response = await fetch("/api/books")
            const data = await response.json()
            setBooksApi(data)
         } catch (error) {
            console.error("Error fetching books:", error)
         }
      }

      fetchBooks()
   }, [])

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

// export async function getServerSideProps(content) {
//    const session = await getSession(content)

//    //Fetch the books from the API
//    const books = await fetch("https://fakestoreapi.com/products").then((res) =>
//       res.json()
//    )
//    // .then((json) => console.log(json))
//    return {
//       props: {
//          books,
//          session,
//       },
//    }
// }




   // //  checkout.js
   // //connect this to checkout button
   // const createCheckoutSession = async () => {
   //    const stripe = await stripePromise

   //    //call the backend ro create a checkout session...
   //    const checkoutSession = await axios.post("api/create-checkout-session", {
   //       items: items,
   //       email: session.user.email,
   //    });

   //    //Redirect user/customer to Stripe Checkout
   //    const result = await stripe.redirectToCheckout({
   //       sessionId: checkoutSession.data.id,
   //    })
   //    if (result.error) alert(result.error.message)
   // }

   // const createCheckoutSession = async () => {
   //    const stripe = await stripePromise;
   //    console.log(stripe)
  
   //    // Call the backend to create a checkout session...
   //    const response = await axios.post("api/create-checkout-session", {
   //      items: items,
   //      email: session.user.email,
   //      payment_method_types: ['ach_credit_transfer'],
   //    });
  
   //    // Extract the session ID from the backend response
   //    const sessionId = response.data.id;
  
   //    // Redirect user/customer to Stripe Checkout
   //    const result = await stripe.redirectToCheckout({
   //      sessionId: sessionId,
   //    });
  
   //    if (result.error) {
   //      alert(result.error.message);
   //    }
   //  };



   // ...

