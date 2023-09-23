import { RabbitMQ } from "../services/RabbitMQ"
import { configure } from "../utils/configureApp"

const host = configure.get("broker_service.amqp_host")
export const rabbitmqInstance = new RabbitMQ(
	"messages",
	host ? String(host) : ""
)
