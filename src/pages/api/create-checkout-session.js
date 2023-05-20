const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY)

export default async (req, res) => {
  const { items, email } = req.body

  const transformedItems = await items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "ngn",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1N9lGvL68U84PkXH01NgOAZq"],
    shipping_address_collection: {
      allowed_coutries: ["NG", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  })
  res.status(200).json({ id: session.id })
}
