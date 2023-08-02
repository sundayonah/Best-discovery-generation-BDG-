// import { buffer } from "micro"
// import * as admin from "firebase-admin"
// import { request } from "http"

// // Secure a connection to FIREBASE from the backend
// const serviceAccount = require("../../../permissions.json")

// // Establish connection to Stripe
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
// const endpointSecret = process.env.STRIPE_SIGNING_SECRET

// const fulfillOrder = async (session) => {

//    // Create a new order in the DB
   
//    const app = !admin.apps.length 
//    ? admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount)})
//     : admin.app();

//    return app
//       .firestore()
//       .collection("users")
//       .doc(session.metadata.email)
//       .collection("orders")
//       .doc(session.id)
//       .set({
//          amount: session.amount_total / 100,
//          amount_shipping: session.total_details.amount_shipping / 100,
//          images: JSON.parse(session.metadata.images),
//          timestamp: admin.firestore.FieldValue.serverTimestamp(),
//          pdf: pdf,
//          // pdf: session.metadata.pdf,
//       })
//       .then(() => {
//       })
// };

// export default async (req, res) => {
//    if (req.method === "POST") {
//       const requestBuffer = await buffer(req)
//       const payload = requestBuffer.toString()
//       const sig = req.headers["stripe-signature"]

//       let event

//       // Verify that the event posted came from Stripe
//       try {
//          event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
//       } catch (error) {
//          return res.status(404).send(`Webhook error: ${error.message}`)
//       }
//       // Handle the checkout.session.completed event
//       if (event.type === "checkout.session.completed") {
//          const session = event.data.object

//          // Fulfill the order...
//          return fulfillOrder(session)
//             .then(() => res.status(200))
//             .catch((error) =>
//                res.status(400).send(`Webhook Error: ${error.message}`)
//             )
//       }
//    }
// }
// export const config = {
//    api: {
//       bodyParser: false,
//       externalResolver: true,
//    },
// }


// import express from 'express';
// import { json } from 'body-parser';

// const app = express();

// app.use(json());
// const crypto = require('crypto');
// const secret = process.env.PAYSTACK_SECRET_KEY;
// // Using Express

// function verify(eventData, signature) {
//    const hmac = crypto.createHmac('sha512', secret);
//    const expectedSignature = hmac.update(JSON.stringify(eventData))
//    .digest('hex');
//    return expectedSignature === signature;
// }
// app.post('/webkook', (req, res) => {
//    const eventData = req.body;
//    const signature = req.headers['x-paystack-signature'];
 
//    if (!verify(eventData, signature)) {
//      return res.sendStatus(400);
//    }
 
//    if (eventData.event === 'charge.success') {
//      const transactionId = eventData.data.id;
//      // Process the successful transaction to maybe fund wallet and update your WalletModel
//      console.log(`Transaction ${transactionId} was successful`);
//    }
 
//    return res.sendStatus(200);
//  });

//  app.listen(3000, () => {
//    console.log('Webhook server started on port 3000');
//  });

import express from 'express';
import { json } from 'body-parser';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const app = express();
app.use(json());

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;


// Send email with PDF attachment
async function sendEmailWithPDF(email, pdfFilePaths) {

  console.log('Sending email with PDF to:', email);
  console.log('PDF File Paths:', pdfFilePaths);

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'gmail', 'yahoo', etc.
    auth: {
      user: 'sundayonah94@gmail.com',
      pass: process.env.GMAIL_PASSWORD,
    },
    secure: true,
  });

  const attachments = pdfFilePaths.map((pdfFilePath) => {
    const absolutePath = path.join(process.cwd(), 'public', pdfFilePath);
    return {
      filename: path.basename(pdfFilePath),
      path: absolutePath,
    };
  });

  const mailOptions = {
    from: 'sundayonah94@gmail.com',
    to: email,
    subject: 'Purchase Confirmation',
    text: 'Test Test',
    html: '<h1>Thank you for your purchase! Attached are your purchased books.</h1>',
    attachments,
    
    // attachments: pdfFilePaths.map((pdfFilePath) => ({
    //   filename: path.basename(pdfFilePath),
    //   path: path.join(process.cwd(), 'public', pdfFilePath), // Adjust the path to the actual location of the PDFs
    // })),
  };
  console.log(mailOptions)

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


function verify(eventData, signature) {
  const hmac = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY);
  const expectedSignature = hmac.update(JSON.stringify(eventData)).digest('hex');

  console.log('Received Signature:', signature);
  console.log('Expected Signature:', expectedSignature);

  const isSignatureValid = expectedSignature === signature;
  console.log('Is Signature Valid:', isSignatureValid);

  return isSignatureValid;
}

// webhook.js
// ... (other imports and code)

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }

    const signature = req.headers['x-paystack-signature'];

    const eventData = req.body;

    console.log(signature)
    console.log('Received Paystack Event Data:', eventData);
    console.log(req.body)

    if (!verify(eventData, signature)) {
      console.log('Webhook Signature Verification Failed');
      return res.status(400);
    }

    if (eventData.event === 'charge.success') {
      const transactionId = eventData.data.id;
      console.log(`Transaction ${transactionId} was successful`);

      // Extract the required data from metadata
      const { items, email } = eventData.metadata;
      const pdfFilePaths = items.map((item) => item.pdf);

      console.log('Order ID (Reference):', eventData.data.reference);

      console.log('Items:', items);
      console.log('Recipient Email:', email);
      console.log('PDF File Paths:', pdfFilePaths);

      try {
        await sendEmailWithPDF(email, pdfFilePaths);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).end();
      }

      return res.status(200).end();
    } else {
      console.log('Received Paystack Event:', eventData.event);
      return res.status(200).end();
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).end();
  }
}
