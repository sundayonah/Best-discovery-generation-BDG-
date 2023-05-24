import { getSession, useSession } from "next-auth/react"
import db from "../../firebase"
import moment from "moment"
import Order from "@/componenrs/Order"
import Header from "@/componenrs/Header"

function Orders({ orders }) {
   const { data: session } = useSession()

   // console.log(orders)

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
               {orders?.map((order) => (
                  <Order
                     key={order.id}
                     id={order.id}
                     amount={order.amount}
                     amountShipping={order.amountShipping}
                     items={order.items}
                     timestamp={order.timestamp}
                     images={order.images}
                  />
               ))}
            </div>
         </main>
      </div>
   )
}

export async function getServerSideProps(context) {
   const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

   // Get the user's logged-in credentials
   const session = await getSession(context)

   if (!session) {
      return {
         props: {
            orders: [],
         },
      }
   }

   // Retrieve orders from Firebase DB
   const firebaseOrders = await db
      .collection("users")
      .doc(session.user.email)
      .collection("orders")
      .orderBy("timestamp", "desc")
      .get()

   // Process orders
   const orders = await Promise.all(
      firebaseOrders.docs.map(async (order) => {
         const stripeOrder = await stripe.checkout.sessions.retrieve(order.id, {
            expand: ["line_items"],
         })
         // console.log(stripe)

         return {
            id: order.id,
            amount: stripeOrder.amount_total,
            amountShipping: stripeOrder.total_details.amount_shipping,
            images: JSON.parse(stripeOrder.metadata.images),
            timestamp: moment(stripeOrder.created * 1000).unix(),
            items: stripeOrder.line_items.data,
         }
      })
   )

   return {
      props: {
         orders,
      },
   }
}

export default Orders
