import { Kafka, logLevel, Partitioners } from "kafkajs"

const kafka = new Kafka({
  clientId: "example-producer",
  brokers: ["localhost:9092", "localhost:9092"],
  logLevel: logLevel.ERROR,
})

class KafkaConfig {
  producer

  constructor() {}

  static async connect() {
    this.producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    })
    await this.producer.connect()
    await KafkaConfig.checkSideEffects()
  }

  static async checkSideEffects() {
    this.producer.on("producer.connect", (event) => {
      console.log("producer is ready")
    })
  }

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
}

export default KafkaConfig
