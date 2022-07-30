import crypto from "crypto"
import express from "express"
import KafkaConfig from "./kafka-config.js"
const router = express.Router()

const pending = "pending"
const orders = [
  {
    id: 1,
    name: "Order 1",
    status: "pending",
  },
  {
    id: 2,
    name: "Order 2",
    status: "pending",
  },
]

router.post("/create-order", (request, response) => {
  const id = crypto.randomBytes("10").toString("hex")
  const order = {
    id,
    name: request.body.name,
    status: pending,
  }
  orders.push(order)
  KafkaConfig.send("order.created", JSON.stringify(order))
  return response.json({
    message: "Order created successfully",
    order,
  })
})

export { router as OrderRouter }
