import { Kafka, logLevel } from "kafkajs"

const kafka = new Kafka({
  clientId: "receiver-app",
  brokers: ["localhost:9092", "localhost:9092"],
  logLevel: logLevel.ERROR,
})

class KafkaConsumerConfig {
  consumer

  constructor() {}

  static async connect() {
    this.consumer = kafka.consumer({
      groupId: "example-group",
    })
    await this.consumer.connect()
    console.log("consumer is ready")
  }
  //   async checkSideEffects() {
  //     this.consumer.on("producer.connect", (event) => {
  //       console.log("producer is ready")
  //     })
  //   }

  static async send(topic, message) {
    await this.producer.send({
      topic: topic,
      messages: [
        {
          value: message,
        },
      ],
    })
  }

  static async subscribtions() {
    await this.consumer.subscribe({
      topic: "order.created",
      fromBeginning: true,
    })
    await this.consumer.subscribe({
      topic: "order.updated",
      fromBeginning: true,
    })

    this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (topic === "order.created") {
          console.log("order.created")
          console.log(message.value.toString())
        }
        if (topic === "order.updated") {
          console.log("order.updated")
          console.log(message.value)
        }
      },
    })
  }
}

export default KafkaConsumerConfig
