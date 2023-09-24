import express from "express"
import { rabbitmqInstance } from "./config/rabbitmq.config"
import { config } from "dotenv"
import { configure, configureApp } from "./utils/configureApp"
import { mailingErrors } from "./services/MailingErrorHandlerService"
import { mailingApi } from "./services/MailingAPIService"
config()
configureApp()

const app = express()
const port = configure.get("server.port")

app.get("/", (req, res) => {
	res.send("Hello world from NodeJS!")
})

app.listen(port, async () => {
	const token = await mailingErrors.refreshAccessToken()
	mailingApi.access_token = token
	
	rabbitmqInstance.receiver()
	console.log(`Server has been started on port ${port}...`)
})
