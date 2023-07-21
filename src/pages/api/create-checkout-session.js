// // Import Stripe
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
// // Create a function to create a checkout session

// const createCheckoutSession = async (req, res) => {
//    // Get the items and email from the request body
//    const { items, email } = req.body
//    // Convert the price to a number
//    const price = parseFloat(items[0].price)

//    // Validate the items and price
//    if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ error: "Invalid items or price" })
//    }
   
//    // Validate the price
//    if (isNaN(price) || price <= 0) {
//       return res.status(400).json({ error: "Invalid price" })
//    }

//    // Create a line item for each item
//    const lineItems = items.map((item) => ({
//       quantity: 1,
//       price_data: {
//          currency: "ngn",
//          unit_amount: item.price * 100,
//          product_data: {
//             name: item.title,
//             images: [item.image],
//             description: item.description,
//          },
//       },
//    }))

//    // Create the checkout session
//    try {
//       const session = await stripe.checkout.sessions.create({
//          line_items: lineItems,
//          mode: "payment",
//          success_url: `${process.env.NEXTAUTH_URL}/success`,
//          cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
//          metadata: {
//             email,
//             // address,
//             images: JSON.stringify(items.map((item) => item.image)),
//             pdf: JSON.stringify(items.map((item) => item.pdf)),
//          },
//       })
      
//       // Return the session ID
//       res.status(200).json({ id: session.id })
//    } catch (error) {
//       console.error(error)

//       // Return an error message
//       res.status(500).json({ error: "Failed to create checkout session" })
//    }
// }
// module.exports = createCheckoutSession;



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async (req, res) => {
   // Existing code...

   // Create the line items for each item, including ACH payment method
   const lineItems = items.map((item) => ({
      // Existing code for price_data...
   }));

   // Add ACH payment method to the line items
   lineItems.push({
      price_data: {
         currency: 'usd',
         product_data: {
            name: "ACH Payment Method",
         },
      },
      quantity: 1,
      payment_method_types: ['ach_credit_transfer'],
   });

   // Create the checkout session with ACH payment method
   try {
      const session = await stripe.checkout.sessions.create({
         line_items: lineItems,
         mode: "payment",
         success_url: `${process.env.NEXTAUTH_URL}/success`,
         cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
         metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.image)),
            pdf: JSON.stringify(items.map((item) => item.pdf)),
         },
      });

      res.status(200).json({ id: session.id });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create checkout session" });
   }
};
module.exports = createCheckoutSession;
