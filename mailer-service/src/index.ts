import express from "express"
import { rabbitmqInstance } from "./config/rabbitmq.config"
import { config } from "dotenv"
import { configure, configureApp } from "./utils/configureApp"
config()
configureApp()


const app = express()
const port = configure.get("server.port")

app.get("/", (req, res) => {
	res.send("Hello world from NodeJS!")
})

app.listen(port, () => {
	rabbitmqInstance.receiver()
	console.log(`Server has been started on port ${port}...`)
})
