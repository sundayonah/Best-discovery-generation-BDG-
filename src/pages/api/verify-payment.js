// 'use server'

// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// // Define your routes
// router.post( async (req, res) => {
//   try {
//     // Generate a unique reference for each payment request
//     const reference = generateUniqueReference();

//     // Make a request to the Paystack API to create a transaction
//     const response = await axios.post('https://api.paystack.co/transaction/initialize', {
//       amount: req.body.amount,
//       email: req.body.email,
//       reference: reference,
//       // Add other required parameters
//     }, {
//       headers: {
//         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//       },
//     });

//     // Return the authorization URL or other relevant details to the frontend
//     res.json({ authorizationUrl: response.data.data.authorization_url });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while initiating the payment' });
//   }
// });

// // Add other routes for handling payment callbacks, verification, etc.

// module.exports = router;
