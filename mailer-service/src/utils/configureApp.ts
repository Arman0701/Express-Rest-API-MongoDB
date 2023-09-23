import { ConfigService } from "../services/ConfigService"

export const configure = new ConfigService()

export const configureApp = () => {
	configure.loadConfig("server", ["port"])
	configure.loadConfig("service_broker", ["amqp_host"])
	configure.loadConfig("mailer", ["client_id"])
	configure.loadConfig("mailer", ["client_secret"])
	configure.loadConfig("mailer", ["redirect_uri"])
	configure.loadConfig("mailer", ["token_url"])
	configure.loadConfig("mailer", ["refresh_token"])
	configure.loadConfig("mailer", ["access_token"])
}
