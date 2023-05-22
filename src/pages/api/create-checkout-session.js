// require("dotenv").config()
// const Stripe = require("stripe")

// const stripe = Stripe(process.env.STRIPE_SECRETE_KEY)

// export default async (req, res) => {
// const { items, email } = req.body

// console.log(items, email)
// const transformedItems = items.map((item) => ({
//   description: item.description,
//   quantity: 1,
//   price_data: {
//     currency: "usd",
//     unit_amount: item.price * 100,
//     product_data: {
//       name: item.title,
//       images: [item.image],
//     },
//   },
// }))

//   const session = await stripe.checkout.sessions.create({
//     line_items: transformedItems,
//     mode: "payment",
//     success_url: `${process.env.NEXTAUTH_URL}/success`,
//     cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
//     metadata: {
//       email,
//       images: JSON.stringify(items.map((item) => item.image)),
//     },
//   })

//   res.status(200).json({ id: session.id })
// }
// It was the same with me. You have the create-checkout-session.js
// file that creates the checkout session. The data structure in there is not
// suitable for the new Stripe API version. Read the documentation he is showing in the video.
// When you read (slowly)  you will see that for example you can not have a payment_method_types property
// in that object. Once you create the expected data structure it is not throwing that error.

// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require("express")
const app = express()
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY)

export default async (req, res) => {
  const { items, email } = req.body
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: items.title,
            images: [items.image],
          },
          unit_amount: items.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  })
  res.status(200).json({ id: session.id })
}

app.listen(3000, () => console.log(`Listening on port ${3000}!`))
