// It was the same with me. You have the create-checkout-session.js
// file that creates the checkout session. The data structure in there is not
// suitable for the new Stripe API version. Read the documentation he is showing in the video.
// When you read (slowly)  you will see that for example you can not have a payment_method_types property
// in that object. Once you create the expected data structure it is not throwing that error.

// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

//THIS SNIPPET IS WORKING BUT ONLY FETCH ONE ITEM FROM THE CART
// Import Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Create a function to create a checkout session
const createCheckoutSession = async (req, res) => {
   // Get the items and email from the request body
   const { items, email } = req.body

   const price = parseFloat(items[0].price)
   // Validate the items and price
   if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid items or price" })
   }
   console.log(items)
   console.log(email)

   // Convert the price to a number

   // Validate the price
   if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Invalid price" })
   }
   console.log(price)

   // Create a line item for each item
   const lineItems = items.map((item) => ({
      quantity: 1,
      price_data: {
         currency: "usd",
         unit_amount: item.price * 100,
         product_data: {
            name: item.title,
            images: [item.image],
            description: item.description,
         },
      },
   }))

   // Create the checkout session
   try {
      const session = await stripe.checkout.sessions.create({
         line_items: lineItems,
         mode: "payment",
         success_url: `${process.env.NEXTAUTH_URL}/success`,
         cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
         metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.image)),
         },
      })

      // Return the session ID
      res.status(200).json({ id: session.id })
   } catch (error) {
      console.error(error)

      // Return an error message
      res.status(500).json({ error: "Failed to create checkout session" })
   }
}

// Export the function
export default createCheckoutSession
