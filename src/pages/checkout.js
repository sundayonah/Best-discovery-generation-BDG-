import Header from "@/componenrs/Header"
import Image from "next/image"
import checkOutBanner from "../images/book6.jpg"

function Checkout() {
  return (
    <div className="bg-gray-100 my-12">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* LEFT */}
        <div className="flex-grow m-5 shadow-sm">
          <img
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">Your Shopping Basket</h1>
          </div>
        </div>

        {/* Right */}
        <div>
          <h1>Right</h1>
        </div>
      </main>
    </div>
  )
}
export default Checkout
