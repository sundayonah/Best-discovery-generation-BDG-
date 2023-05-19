import Header from "@/componenrs/Header"
import Image from "next/image"
import checkOutBanner from "../images/book6.jpg"
import { useSelector } from "react-redux"
import { selectItems } from "@/slices/basketSlice"
import CheckoutBook from "@/componenrs/CheckoutBook"
import Currency from "react-currency-formatter"
import { useSession } from "next-auth/react"

function Checkout() {
  const items = useSelector(selectItems)
  const session = useSession()

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
            <h1 className="text-3xl border-b pb-4">
              {items.length == 0
                ? "Your Basket is empty"
                : "Your Shopping Basket"}
            </h1>
            {items.map(
              ({ id, title, price, description, category, image, rating }) => (
                <CheckoutBook
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  rating={rating}
                />
              )
            )}
          </div>
        </div>

        {/* Right */}
        <div>
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items:)
                <span className="font-bold">
                  {/* <Currency quantity={total} currency="NGN" /> */}
                </span>
              </h2>
              <button>
                {!session ? "Sign in to checkout" : "Proceed to Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
export default Checkout
