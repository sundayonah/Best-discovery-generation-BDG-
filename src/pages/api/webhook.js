// import express from 'express';
// import { json } from 'body-parser';
// import crypto from 'crypto';

// const appe = express();
// appe.use(json());

// const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// function verify(eventData, signature) {
//   const hmac = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY);
//   const expectedSignature = hmac.update(JSON.stringify(eventData)).digest('hex');
//   const isSignatureValid = expectedSignature === signature;
//   console.log('Is Signature Valid:', isSignatureValid);

//   return isSignatureValid;
// }

// export default async function handler(req, res) {
//   try {
//   const eventData = req.body;
//   console.log(eventData);

//   const { reference, email, items } = req.body;
  
//    console.log(reference)
//    console.log(email)
//    console.log(items)

//     const signature = req.headers['x-paystack-signature'];
//     if (!verify(eventData, signature)) {
//       return res.status(400);
//     }
  
//     if (eventData.event === 'charge.success') {
//       const transactionId = eventData.data.id;
//       // Process the successful transaction to maybe fund wallet and update your WalletModel
//       console.log(`Transaction ${transactionId} was successful`);
//     }
//   } catch (error) {
//     console.error('Error processing webhook:', error);
//     return res.status(500).end();
//   }
// }


import express from 'express';
import { json } from 'body-parser';
import crypto from 'crypto';
import db from '../../../firebase'; // Import your Firebase Firestore instance or database configuration
import * as admin from 'firebase'


const appe = express();
appe.use(json());

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

function verify(eventData, signature) {
  const hmac = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY);
  const expectedSignature = hmac.update(JSON.stringify(eventData)).digest('hex');
  const isSignatureValid = expectedSignature === signature;
  return isSignatureValid;
}

const app = !admin.apps.length
   ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
   })
   : admin.app();


export default async function handler(req, res) {
  try {
    const eventData = req.body;

    const { reference, email, items } = req.body;

    const signature = req.headers['x-paystack-signature'];
    if (verify(eventData, signature)) {
      return res.status(400).end(); 
    }


    if (eventData.reference.status === 'success') { 
      const transactionId = eventData.reference.transaction;
      const userEmail = eventData.email; 

      const images = eventData.items.map((item) => item.image);
    
      const userRef = db.collection('users').doc(userEmail);
      const ordersRef = userRef.collection('orders');
    
      ordersRef
       .doc(transactionId)
       .set({
        reference: eventData.reference.reference,
        amount: eventData.amount / 100,
        images: images,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        items: eventData.items,
      })
      .then(() => {
      })
      .catch((error) => {
        console.error('Error saving order to Firestore:', error);
      });
    
      // Send a response indicating successful processing of the webhook
      return res.status(200).end();
    }

  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).end();
  }
}



// export default async function handler(req, res) {
//   try {
//     const eventData = req.body;
//     console.log('Webhook Data:', eventData);

//     const { reference, email, items } = req.body;

//     console.log(reference);
//     console.log(email);
//     console.log(items);
//     console.log('headers', req.headers)

//     const signature = req.headers['x-paystack-signature'];
//     if (verify(eventData, signature)) {
//       return res.status(400);
//     }

//     if (reference.status === 'success') {
//       const transactionId = eventData.reference.trans; // Get the transaction ID
//       // Process the successful transaction to maybe fund wallet and update your WalletModel
//       console.log(`Transaction ${transactionId} was successful`);
//       // Retrieve the user's orders from your database using the email
//       const userOrdersSnapshot = await db
//         .collection('users')
//         .doc(email)
//         .collection('orders')
//         .orderBy("timestamp", "desc")
//         .get();

//         console.log(userOrdersSnapshot)

//       // Extract and collect all the book details from the user's orders
//       const allPurchasedBooks = [];
//       userOrdersSnapshot.forEach((orderDoc) => {
//         const itemsInOrder = orderDoc.data().items.map((item) => ({
//           id: item.id,
//           title: item.title,
//           image: item.image,
//           // Add other book details as needed
//         }));
//         console.log(itemsInOrder)
//         allPurchasedBooks.push(...itemsInOrder);
//       });

//       // Now, 'allPurchasedBooks' contains an array of book details the user has purchased
//       console.log('All Purchased Books:', allPurchasedBooks);

//       // You can now process or handle the 'allPurchasedBooks' array as needed
//       // For example, you can save this information in a separate collection, send it in an email, etc.

//       // Send a response indicating successful processing of the webhook
//       return res.status(200).end();
//     }
//   } catch (error) {
//     console.error('Error processing webhook:', error);
//     return res.status(500).end();
//   }
// }


//real webhook from sunny


