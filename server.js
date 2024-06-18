const express = require('express')
const app = express()
const path = require("path")
const corsOptions = require("./config/corsOptions")
const cors = require('cors')
require('dotenv').config({ path: path.join(__dirname, '..', ".env") })
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 3400;
app.use(express.json())
app.use(cors(corsOptions))

app.get("/hello", (req,res) => {
  res.json("Hello")
})

app.post("/create-stripe-session", async(req,res) => {

  const {products,currency} = req.body

  const lineItems = products.map((eachProduct) => ({
    price_data : {
      currency : currency,
      product_data : {
        name : eachProduct.productName,
        images : [`https://ecomxpress.vercel.app${eachProduct.productImage}`]
      },
      unit_amount : Math.round(eachProduct.price * 100)
    },
    quantity: eachProduct.productQuantity
  }))


  const session = await stripe.checkout.sessions.create({
    payment_method_types : ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://ecomxpress.vercel.app/pages/paymentSuccess",
    cancel_url: "https://ecomxpress.vercel.app/pages/paymentCancel"
  })

  res.json({id : session.id})


})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})




