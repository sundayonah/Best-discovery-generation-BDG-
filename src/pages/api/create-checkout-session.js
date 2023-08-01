// // // Import Stripe
// // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
// // // Create a function to create a checkout session
// // const createCheckoutSession = async (req, res) => {
// //    // Get the items and email from the request body
// //    const { items, email } = req.body
// //    // Convert the price to a number
// //    const price = parseFloat(items[0].price)

// //    // Validate the items and price
// //    if (!Array.isArray(items) || items.length === 0) {
// //       return res.status(400).json({ error: "Invalid items or price" })
// //    }
   
// //    // Validate the price
// //    if (isNaN(price) || price <= 0) {
// //       return res.status(400).json({ error: "Invalid price" })
// //    }

// //    // Create a line item for each item
// //    const lineItems = items.map((item) => ({
// //       quantity: 1,
// //       price_data: {
// //          currency: "ngn",
// //          unit_amount: item.price * 100,
// //          product_data: {
// //             name: item.title,
// //             images: [item.image],
// //             description: item.description,
// //          },
// //       },
// //    }))

// //    // Create the checkout session
// //    try {
// //       const session = await stripe.checkout.sessions.create({
// //          line_items: lineItems,
// //          mode: "payment",
// //          success_url: `${process.env.NEXTAUTH_URL}/success`,
// //          cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
// //          metadata: {
// //             email,
// //             // address,
// //             images: JSON.stringify(items.map((item) => item.image)),
// //             pdf: JSON.stringify(items.map((item) => item.pdf)),
// //          },
// //       })
      
// //       // Return the session ID
// //       res.status(200).json({ id: session.id })
// //    } catch (error) {
// //       console.error(error)

// //       // Return an error message
// //       res.status(500).json({ error: "Failed to create checkout session" })
// //    }
// // }
// // module.exports = createCheckoutSession;





// // server/api/create-payment-intent.js

// // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// // const createCheckoutSession = async (req, res) => {
// //    const { items, email } = req.body;
// //    const price = parseFloat(items[0].price);

// //    if (!Array.isArray(items) || items.length === 0) {
// //       return res.status(400).json({ error: "Invalid items or price" });
// //    }

// //    if (isNaN(price) || price <= 0) {
// //       return res.status(400).json({ error: "Invalid price" });
// //    }

// //    const lineItems = items.map((item) => ({
// //       quantity: 1,
// //       price_data: {
// //          currency: "ngn",
// //          unit_amount: item.price * 100,
// //          product_data: {
// //             name: item.title,
// //             images: [item.image],
// //             description: item.description,
// //          },
// //       },
// //    }));

// //    try {
// //       const customer = await stripe.customers.create();
// //       const session = await stripe.checkout.sessions.create({
// //         line_items: lineItems,
// //         payment_method_types: ["customer_balance"],
// //         mode: "payment",
// //         success_url: `${process.env.NEXTAUTH_URL}/success`,
// //         cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
// //         customer: customer.id,
// //         payment_method_options: {
// //           customer_balance: {
// //             funding_type: "bank_transfer",
// //             bank_transfer: {
// //               type: "ng_bank_transfer",
// //             },
// //           },
// //         },
// //         metadata: {
// //           email,
// //           images: JSON.stringify(items.map((item) => item.image)),
// //           pdf: JSON.stringify(items.map((item) => item.pdf)),
// //         },
// //       });

// //       res.status(200).json({ id: session.id });
// //    } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ error: "Failed to create checkout session" });
// //    }
// // };

// // module.exports = createCheckoutSession;

// // const paymentForm = document.getElementById('paymentForm');
// // paymentForm.addEventListener('submit', payWithPaystack, false);

// // function payWithPaystack() {
// //   const handler = PaystackPop.setup({
// //     key: 'YOUR_PUBLIC_KEY', // Replace with your public key
// //     email: document.getElementById('email-address').value,
// //     amount: document.getElementById('amount').value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
// //     currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
// //     ref: 'YOUR_REFERENCE', // Replace with a reference you generated
// //     callback: function(response) {
// //       // this happens after the payment is completed successfully
// //       const reference = response.reference;
// //       alert('Payment complete! Reference: ' + reference);
// //       // Make an AJAX call to your server with the reference to verify the transaction
// //     },
// //     onClose: function() {
// //       alert('Transaction was not completed, window closed.');
// //     },
// //   });

// //   handler.openIframe();
// // }

// 'use server'


// import axios from 'axios';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).end();
//   }

//   try {
//     const { reference } = req.body;

//     // Make an HTTP request to the Paystack Verify Transaction API
//     const response = await axios.get(
//       `https://api.paystack.co/transaction/verify/${encodeURIComponent(
//         reference
//       )}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Replace with your Paystack secret key
//         },
//       }
//     );

//     // Check if the payment was successful
//     if (response.data.status === 'success') {
//       // Perform any additional actions for successful payments (e.g., update order status, send confirmation email, etc.)

//       // Return a success response to the client
//       return res.status(200).json({ status: 'success' });
//     } else {
//       // Handle failed or pending payments

//       // Return a failure response to the client
//       return res.status(200).json({ status: 'failed' });
//     }
//   } catch (error) {
//     console.error(error);
//     // Handle any errors that occur during payment verification

//     // Return an error response to the client
//     return res.status(500).json({ error: 'Failed to verify payment' });
//   }
// }
