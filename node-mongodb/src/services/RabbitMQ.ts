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
}
