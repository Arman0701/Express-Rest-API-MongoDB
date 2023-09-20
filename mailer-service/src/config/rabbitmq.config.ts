import { RabbitMQ } from "../services/rabbitmq"
import { config } from "dotenv"
config()

export const rabbitmqInstance = new RabbitMQ("messages", process.env.AMQP_HOST!)
