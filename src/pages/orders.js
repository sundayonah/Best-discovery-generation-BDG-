import { getSession, useSession } from "next-auth/react"
import db from "../../firebase"
import moment from "moment"
import Order from "@/componenrs/Order"
import Header from "@/componenrs/Header"
// import fs from 'fs';

function Orders({ orders }) {
   const { data: session } = useSession()
   return (
      <div>
         <Header />
         <main className="max-w-screen-lg mx-auto p-10">
            <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
               Your Orders
            </h1>
            {session ? (
               <h2>{orders.length} Orders</h2>
            ) : (
               <h2>Please sign in to see your orders</h2>
            )}
            <div className="mt-5 space-y-4">
               {orders?.map(
                  ({id, amount, amountShipping, items, timestamp, images, pdf}) => (
                  <Order
                     key={id}
                     id={id}
                     amount={amount / 100} //convert to the appropriate currency format.
                     amountShipping={amountShipping / 100} //convert to the appropriate currency format.
                     items={items}
                     timestamp={timestamp}
                     images={images}
                     pdf={pdf}
                  />
               ))}
            </div>
         </main>
      </div>
   )    
}
export async function getServerSideProps(context) {
//    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

//    // Get the user's logged-in credentials
//    const session = await getSession(context)

//    if (!session) {
//       return {
//          props: {
//             orders: [],
//          },
//       }
//    }
//    // Retrieve orders from Firebase DB
//    const firebaseOrders = await db
//       .collection("users")
//       .doc(session.user.email)
//       .collection("orders")
//       .orderBy("timestamp", "desc")
//       .get()

//    // Process orders
//    const orders = await Promise.all(
//       firebaseOrders.docs.map(async (order) => {
//          const stripeOrder = await stripe.checkout.sessions.retrieve(order.id, {
//             expand: ["line_items"],
//          })

//          // const pdf = stripeOrder.metadata.pdf || null; // Set pdf to null if not available
              
//          return {
//             id: order.id,
//             amount: stripeOrder.amount_total,
//             amountShipping: stripeOrder.total_details.amount_shipping,
//             images: JSON.parse(stripeOrder.metadata.images),
//             timestamp: order.data().timestamp.toDate().getTime(), // Convert Firebase Timestamp to Unix timestamp
//             items: stripeOrder.line_items.data,
//             pdf: stripeOrder.metadata.pdf || null,
//          }
//       })
//       )

//    return {
//       props: {
//          orders,
//       },
//    }
}
export default Orders
