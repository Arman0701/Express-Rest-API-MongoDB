import { RabbitMQ } from "../services/RabbitMQ"
import { config } from "dotenv"
config()

export const rabbitmqInstance = new RabbitMQ("messages", process.env.AMQP_HOST!)
