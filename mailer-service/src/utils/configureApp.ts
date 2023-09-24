import { ConfigService } from "../services/ConfigService"

export const configure = new ConfigService()

export const configureApp = () => {
	configure.loadConfig("server", ["port"])
	configure.loadConfig("service_broker", ["amqp_host"])
	configure.loadConfig("mailer", [
		"client_id",
		"client_secret",
		"redirect_uri",
		"token_url",
		"refresh_token",
		"access_token",
	])
}
