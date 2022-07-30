import fs from "fs"

export class ConsumerService {
  constructor() {}

  static writeMessageToFile(message) {
    if (message !== null || message !== undefined) {
      fs.appendFileSync("message.txt", message, (err) => {
        if (err) {
          console.log("error writing to file", err)
        }
      })
    }
  }
}
