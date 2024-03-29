import Header from "@/componenrs/Header"
import { CheckCircleIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"

function success() {
   const router = useRouter()
   return (
      <div className="bg-gray-200 h-screen">
         <Header />

         <main className="max-w-screen-lg mx-auto">
            <div className="flex flex-col p-10 bg-white">
               <div className="flex items-center space-x-2 mb-5">
                  <CheckCircleIcon className="text-green-500 h-10" />
                  <h1 className="text-3xl">
                     Thank you, Your order has been confirmed!
                  </h1>
               </div>

               <p>
                  Thank you for shopping with us. We have send pdf of the books you purchase to your email, if you would like to check the
                  status of your order(s) please press the link below
               </p>
               <button
                  onClick={() => router.push("/orders")}
                  className="button mt-8 font-bold"
               >
                  Go to my orders
               </button>
            </div>
         </main>
      </div>
   )
}
export default success
