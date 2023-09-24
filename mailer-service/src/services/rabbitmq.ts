import amqp from "amqplib"
import { config } from "dotenv"
import { Mailing } from "./MailingService"
config()

export class RabbitMQ {
	private queue: string
	private host: string

	constructor(queue: string, host: string) {
		this.queue = queue
		this.host = host
	}

	async receiver() {
		const queue = this.queue

		try {
			const connection = await amqp.connect(this.host)
			const channel = await connection.createChannel()

			process.once("SIGINT", async () => {
				await channel.close()
				await connection.close()
			})

			await channel.assertQueue(queue, { durable: false })
			await channel.consume(
				queue,
				(message) => {
					if (message) {
						Mailing.sendEmail(
							JSON.parse(message.content.toString())
						)
					}
				},
				{ noAck: true }
			)

			console.log(" [*] Waiting for messages. To exit press CTRL+C")
		} catch (err) {
			console.warn(err)
		}
	}
}
