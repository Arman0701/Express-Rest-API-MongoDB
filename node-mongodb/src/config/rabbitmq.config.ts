import { RabbitMQ } from "../services/RabbitMQ"
import { configure, configureApp } from "../utils/configureApp"
configureApp()

const host = configure.get("service_broker.amqp_host")
export const rabbitmqInstance = new RabbitMQ("messages", String(host))
