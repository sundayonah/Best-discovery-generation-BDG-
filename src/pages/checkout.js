import Header from "@/componenrs/Header"
// import checkOutBanner from "../images/book6.jpg"
import { useSelector } from "react-redux"
import { selectItems, selectTotal } from "@/slices/basketSlice"
import CheckoutBook from "@/componenrs/CheckoutBook"

// import Currency from "react-currency-formatter"
import { useSession } from "next-auth/react"
import axios from "axios"
import Image from "next/image"
// import { loadStripe } from "@stripe/stripe-js"
import { FormattedNumber, IntlProvider } from "react-intl"
import { usePaystackPayment } from "react-paystack"
// import Paystack from 'paystack';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

// const paystack = Paystack.init({ key: process.env.PAYSTACK_PUBLIC_KEY }); // Replace 'YOUR_PUBLIC_KEY' with your actual Paystack public key

const PAYSTACK_PUBLIC_KEY = 'pk_test_c3069b65a59ba71ee47844e2797739257cf877c6'


function Checkout() {
   const items = useSelector(selectItems)

   console.log(items)

   console.log(PAYSTACK_PUBLIC_KEY)

   const { data: session } = useSession()
   const total = useSelector(selectTotal)
   
   // const [paystackKey, setPaystackKey] = useState(""); // Set your Paystack public key here

 // Properly include the PDF file path in each item
//  const itemsWithPdf = items.map((item) => ({
//    ...item,
//    pdf: `/pdf/${item.pdf}`, // Assuming the 'pdf' field in each item already includes the file name and extension
// }));
// console.log(itemsWithPdf)

   const config = {
      reference: (new Date()).getTime().toString(),
      email: session?.user.email,
      amount: total * 100,
      publicKey: 'pk_test_c3069b65a59ba71ee47844e2797739257cf877c6',
      metadata: {
         // itemsWithPdf
         items: items,
         email: session?.user.email, 
      },
  };
//   console.log(config)

const onSuccess = (reference) => {
  // Send the payment data to the backend here after successful payment
  axios
    .post('/api/webhook', config)
    .then((response) => {
      console.log('Payment data sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending payment data:', error);
      // Handle errors as needed (e.g., show an error message)
    });
};
  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

   const initializePayment = usePaystackPayment(config);

   return (
      <div className="bg-gray-200">
         <Header />
         <main className="lg:flex max-w-screen-2xl mx-auto">
            {/* LEFT */}
            <div className="flex-grow m-5 shadow-sm">
               <div className="flex flex-col p-5 space-y-10 bg-white">
                  <h1 className="text-3xl border-b pb-4">
                     { items.length == 0
                        ? "Your Basket is empty"
                        : "Your Shopping Basket" }
                  </h1>
                  {items.map(
                     ({
                        id,
                        title,
                        price,
                        description,
                        category,
                        image,
                        rating,
                     }) => (
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
                           <IntlProvider locale="en-US">
                              <div>
                                 <FormattedNumber
                                    value={total}
                                    style="currency"
                                    currency="NGN"
                                 />
                              </div>
                           </IntlProvider>
                           {/* <Currency quantity={total} currency="NGN" /> */}
                        </span>
                     </h2>

                      <button
                        role="link"
                        onClick={() => initializePayment(onSuccess, onClose)} // Connect the initiatePayment function to the button
                        disabled={!session}
                        className={`button mt-2 ${
                           !session &&
                           "from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed"
                        }`}
                     >
                        {!session
                           ? "Sign in to checkout"
                           : "Proceed to Checkout"}
                     </button> 
                       
                     {/* <PaystackHookExample /> */}


                  </>
               )}
            </div>
         </main>
      </div>
   )
}
export default Checkout

