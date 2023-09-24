import { RabbitMQ } from "../services/rabbitmq"
import { config } from "dotenv"
import { configure, configureApp } from "../utils/configureApp"
config()
configureApp()

const host = configure.get("service_broker.amqp_host")
export const rabbitmqInstance = new RabbitMQ("messages", String(host))
