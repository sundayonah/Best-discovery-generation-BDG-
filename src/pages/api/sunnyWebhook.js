import { buffer } from "micro"
import * as admin from 'firebase'
import { application, request } from "express";

const serviceAccount = require('../../../permissions.json')


//secure a coonection to FIREBASE from backend
const app = !admin.apps.length
   ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
   })
   : admin.app();

   const paystack = require('stripe')(process.env.PAYSTACK)

   const endpointSecret = process.env.PAYSTACK

   const fullfillOrder = async (session) => {

    return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
        amoount: session.amount_total / 100,
        amount_shipping: session.total_details.amoount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
        console.log(`SUCCESS: Order ${session.id} had been added to the DB`)
    })
   }

    
export default async ( req, res) =>{
  if(req.method === 'POST'){

    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;

    //verify that the EVENT posted came from stripe

    try {
        event = stripe.webhook.constructEvent(payload, sig, endpointSecret);

    } catch (error) {
        console.log('ERROR', err.message)
        return res.this.staus(400).send(`webhook error; ${err.message}`);
        
    }

    //Handle the checkout session completed

    if(event.type === 'checkout.session.completed'){

        //fulfill the order...
   return fullfillOrder(session)
   .then(() => res.status(200))
   .catch((err) => res.status(400).send(`webhook Error: ${err.message}`))
    }
  }
}


export const config = {
    api: {
        bordyParser: false,
        externalResolver: true
    }
}