import Header from "@/componenrs/Header"
import { useSelector } from "react-redux"
import { selectItems, selectTotal } from "@/slices/basketSlice"
import CheckoutBook from "@/componenrs/CheckoutBook"

import { useSession } from "next-auth/react"
import axios from "axios"
import Image from "next/image"
import { FormattedNumber, IntlProvider } from "react-intl"
import { usePaystackPayment } from "react-paystack"
import { useEffect } from "react"
import db from "../../firebase"
import { useRouter } from "next/router";


const PAYSTACK_PUBLIC_KEY = 'pk_test_c3069b65a59ba71ee47844e2797739257cf877c6'


function Checkout() {
   
   const items = useSelector(selectItems)
   const { data: session } = useSession()
   const total = useSelector(selectTotal)
   const router = useRouter();

const config = {
   reference: (new Date()).getTime().toString(),
   email: session?.user.email,
   amount: total * 100,
   publicKey: PAYSTACK_PUBLIC_KEY,
   metadata: {
     items: items.map((item) => ({
       ...item,
       pdf: `/pdf/${item.pdf}`, // Assuming the 'pdf' field in each item already includes the file name and extension
     })),
     email: session?.user.email,
   },
 };

const onSuccess = (reference) => {
   // Send the payment data to the backend here after successful payment
   const paymentData = {
     reference: reference,
     email: session?.user.email,
     amount: total * 100,
     items: items,
   };

   axios
   .post('/api/webhook', paymentData)
   .then((response) => {
      router.push('/success')
   }) 
   .catch((error) => {
      console.error('Error sending payment data:', error);
      // Handle errors as needed (e.g., show an error message)
   });
   // If payment data is sent successfully, send the email
   axios
   .post('/api/sendMail', paymentData) // Call the email API route
   .then((res) => {
   })
   .catch((err) => {
     console.error('Error sending email:', err);
     // Handle email sending errors here
   });


// //sample
// db.collection('users')
//     .doc(session?.user.email)
//     .collection('orders')
//     .doc(reference) // Use the payment reference as the document ID
//     .set({
//       amount: total,
//       items: items,
//       timestamp: firebase.firestore.Timestamp.fromDate(new Date()), // Add the current timestamp
//     })
//     .then(() => {
//       console.log('Order data saved to Firebase.');
//     })
//     .catch((error) => {
//       console.error('Error saving order data:', error);
//       // Handle errors as needed
//     });
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

