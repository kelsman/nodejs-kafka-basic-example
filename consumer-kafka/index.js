import cors from "cors"
import express from "express"
import http from "http"
import morgan from "morgan"
import KafkaConsumerConfig from "./kafkaconfig.js"

const app = express()
app.use(express.json({ limit: "50mb" }))
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "tiny"))
app.use(cors())
// const kafka = new Kafka({
//   clientId: "example-producer",
//   brokers: ["localhost:9092", "localhost:9092"],
//   logLevel: logLevel.ERROR,
// })

// const consumer = kafka.consumer({
//   groupId: "example-group",
// })

app.use("/my", (req, res) => {})

async function runconsumer() {
  // await consumer.connect()
  // consumer.on("consumer.connect", () => {
  //   console.log("consumer is ready")
  // })
  // await consumer.subscribe({ topic: "sample-topic", fromBeginning: true })
  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log("message bytes", message.value)
  //     ConsumerService.writeMessageToFile(message.value.toString())
  //   },
  // })
  await KafkaConsumerConfig.connect()
  await KafkaConsumerConfig.subscribtions()
}

await runconsumer()

const server = http.createServer(app)
server.listen(4000, async () => {
  console.log("app is listening on port 4000")
})
