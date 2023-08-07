import { getSession, useSession } from "next-auth/react"
import db from "../../firebase"
import moment from "moment"
import Order from "@/componenrs/Order"
import Header from "@/componenrs/Header"
import { useEffect, useState } from "react"
// import fs from 'fs';

function Orders({ orders }) {
   const { data: session } = useSession()

   const [purchasedBooks, setPurchasedBooks] = useState([]);
   //sample
   useEffect(() => {
      if (session) {
        // Fetch the user's orders from Firestore using the user's email
        const userRef = db.collection('users').doc(session.user.email);
        const ordersRef = userRef.collection('orders');
  
        // Listen for changes to the user's orders in Firestore
        const unsubscribe = ordersRef.onSnapshot((snapshot) => {
          const ordersData = [];
          snapshot.forEach((doc) => {
            ordersData.push({ id: doc.id, ...doc.data() });
          });
          setPurchasedBooks(ordersData);
        });
  
        return () => unsubscribe();
      }
    }, [session]);
 
   return (
      <div>
         <Header />
         <main className="max-w-screen-lg mx-auto p-10">
            <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
               Your Orders
            </h1>
            {session ? (
               <h2>{purchasedBooks.length} Orders</h2>
            ) : (
               <h2>Please sign in to see your orders</h2>
            )}
            <div className="mt-5 space-y-4">
               {purchasedBooks?.map(
                  ({id, amount, amountShipping, items, timestamp, images}) => (
                  <Order
                     key={id}
                     id={id}
                     amount={amount} //convert to the appropriate currency format.
                     // amountShipping={amountShipping / 100} //convert to the appropriate currency format.
                     items={items}
                     timestamp={timestamp}
                     images={images}
                  />
               ))}
            </div>
         </main>
      </div>
   )    
}

// export async function getServerSideProps(context) {
//    // Fetch the user's orders from Firestore here using the user's email
//    // For example:
//    const session = await getSession(context);
//    const userEmail = session?.user?.email;
//    const userRef = db.collection('users').doc(userEmail);
//    const ordersRef = userRef.collection('orders');
//    const snapshot = await ordersRef.get();
//    const ordersData = snapshot.docs.map((doc) => doc.data());
//    const orders = ordersData.map((data) => ({
//      id: data?.transactionId,
//      amount: data.amount,
//      amountShipping: data.amountShipping,
//      items: data.items,
//      timestamp: data.timestamp,
//      images: data.images,
//    }));
   
//    return {
//      props: {
//        orders,
//      },
//    };
//  }
 
 

// export async function getServerSideProps(context) {
//    const paystack = require("react-paystack")(process.env.PAYSTACK_SECRET_KEY)

//    // Get the user's logged-in credentials
//    const session = await getSession(context)

//    if (!session) {
//       return {
//          props: {
//             orders: [],
//          },
//       }
//    }

//    console.log(session)
//    console.log(paystack)

//    // Retrieve orders from Firebase DB
//    const firebaseOrders = await db
//       .collection("users")
//       .doc(session.user.email)
//       .collection("orders")
//       .orderBy("timestamp", "desc")
//       .get()

//       console.log(firebaseOrders)

//    // Process orders
//    const orders = await Promise.all(
//       firebaseOrders.docs.map(async (order) => {
//          const patstackOrder = await paystack.checkout.sessions.retrieve(order.id, {
//             expand: ["line_items"],
//          })

//          console.log(orders)

//          // const pdf = patstackOrder.metadata.pdf || null; // Set pdf to null if not available
              
//          return {
//             id: order.id,
//             amount: patstackOrder.amount_total,
//             amountShipping: patstackOrder.total_details.amount_shipping,
//             images: JSON.parse(patstackOrder.metadata.images),
//             timestamp: order.data().timestamp.toDate().getTime(), // Convert Firebase Timestamp to Unix timestamp
//             items: patstackOrder.line_items.data,
//          }
//       })
//       )

//    return {
//       props: {
//          orders,
//       },
//    }
// }
export default Orders
