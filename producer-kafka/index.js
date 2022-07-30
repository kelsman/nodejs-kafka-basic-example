import express from "express"
import http from "http"
import morgan from "morgan"
import KafkaConfig from "./kafka-config.js"
import { OrderRouter } from "./route.js"

const app = express()
app.use(express.json({ limit: "50mb" }))
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "tiny"))
app.use("/", OrderRouter)

async function startApp() {
  //connect kafka
  // const kafka = new Kafka({
  //   clientId: "example-producer",
  //   brokers: ["localhost:9092", "localhost:9092"],
  //   logLevel: logLevel.ERROR,
  // })
  // const producer = kafka.producer({
  //   createPartitioner: Partitioners.LegacyPartitioner,
  // })
  // await producer.connect()

  // producer.on("producer.connect", () => {
  //   console.log("producer is ready")
  //   producer.on("producer.error", (err) => {
  //     console.log(err)
  //     process.exit(1)
  //   })
  // })
  // await producer.send({
  //   topic: "sample-topic",
  //   messages: [
  //     {
  //       value: "Hey this is from the producer",
  //     },
  //   ],
  // })

  //listen to server port
  await KafkaConfig.connect()
  const server = http.createServer(app)
  server.listen(4001, async () => {
    console.log("app is listening on port 4001")
  })
}

startApp()
