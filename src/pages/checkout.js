import Header from "@/componenrs/Header"
import checkOutBanner from "../images/book6.jpg"
import { useSelector } from "react-redux"
import { selectItems, selectTotal } from "@/slices/basketSlice"
import CheckoutBook from "@/componenrs/CheckoutBook"
import Currency from "react-currency-formatter"
import { useSession } from "next-auth/react"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import Image from "next/image"

const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
  const items = useSelector(selectItems)
  const { data: session } = useSession()
  const total = useSelector(selectTotal)

  const createChechoutSession = async () => {
    const stripe = await stripePromise

    //call the backend ro create a checkout session...
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    })

    //Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    })
    // console.log(result)

    if (result.error) alert(result.error.message)
  }

  return (
    <div className="bg-gray-200">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* LEFT */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={200}
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
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items:){" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="NGN" />
                </span>
              </h2>
              <button
                role="link"
                onClick={createChechoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed"
                }`}
              >
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
