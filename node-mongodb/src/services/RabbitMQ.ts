import amqp from "amqplib"
import { config } from "dotenv"
import { EmailOptions } from "../types/custom"
config()

export class RabbitMQ {
	private queue: string
	private host: string

	constructor(queue: string, host: string) {
		this.queue = queue
		this.host = host
	}

	async sender(EmailOptions: EmailOptions) {
		let queue = this.queue
		let connection
		try {
			connection = await amqp.connect(this.host)
			const channel = await connection.createChannel()

			await channel.assertQueue(queue, { durable: false })
			channel.sendToQueue(
				queue,
				Buffer.from(JSON.stringify(EmailOptions))
			)
			await channel.close()
		} catch (err) {
			console.warn(err)
		} finally {
			if (connection) await connection.close()
		}
	}

	// async receiver() {
	// 	const queue = this.queue

	// 	try {
	// 		const connection = await amqp.connect("amqp://localhost")
	// 		const channel = await connection.createChannel()

	// 		process.once("SIGINT", async () => {
	// 			await channel.close()
	// 			await connection.close()
	// 		})

	// 		await channel.assertQueue(queue, { durable: false })
	// 		await channel.consume(
	// 			queue,
	// 			(message) => {
	// 				if (message) {
	// 					console.log(
	// 						" [x] Received '%s'",
	// 						JSON.parse(message.content.toString())
	// 					)
	// 				}
	// 			},
	// 			{ noAck: true }
	// 		)

	// 		console.log(" [*] Waiting for messages. To exit press CTRL+C")
	// 	} catch (err) {
	// 		console.warn(err)
	// 	}
	// }
}

// export const rabbitInstance = new RabbitMQ("messages")
