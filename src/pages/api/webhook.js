import { buffer } from "buffer"
import * as admin from "firebase-admin"
import { request } from "http"

//secure a connection to FIREBASE from the backend
const serviceAccount = require("../../../permissions.json")
const app = !admin.apps.lenght
   ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
     })
   : admin.app()

//Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const endppointSecret = process.env.STRIPE_SIGNING_SECRET

const fulfillOrder = async (session) => {
   // console.log('Fulfilling order', session)

   return app
      .firestore()
      .collection("users")
      .doc(session.matadata.email)
      .collection("orders")
      .doc(session.id)
      .set({
         amount: session.amount_total / 100,
         //  amount_shipping: session.total_details.amount_shipping / 100,
         images: JSON.parse(session.metadata.images),
         timestamp: admin.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
         console.log(`SUCCESS: Order ${session.id} had been added to the DB`)
      })
}

export default async (req, res) => {
   if (req.methd === "POST") {
      const requestBuffer = await buffer(req)
      const payload = requestBuffer.toString()
      const sig = (reg.headers = ["stripe-signature"])

      let event

      //veryfy that EVENT posted came from stripe
      try {
         event = stripe.webhook.constructEvent(payload, sig, serviceAccount)
      } catch (error) {
         console.log("ERROR", err.message)
         return res.status(404).send(`Webhook error: ${err.message}`)
      }

      //Handle the checkout.session.completed event
      if (event.type === "checkout.session.completed") {
         const session = event.date.object

         //Fullfil the order...
         return fulfillOrder(session)
            .then(() => res.status(200))
            .catch((err) => res.status(400).send(`Webhook Error ${err.mesage}`))
      }
   }
}

export const config = {
   api: {
      bodyParser: false,
      externalResolver: true
   },
}
