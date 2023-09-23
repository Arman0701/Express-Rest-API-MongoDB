import { ConfigService } from "../services/ConfigService"

export const configure = new ConfigService()

export const configureApp = () => {
	configure.loadConfig("db", ["mdb_uri"])
	configure.loadConfig("server", ["port"])
	configure.loadConfig("service_broker", ["amqp_host"])
}
