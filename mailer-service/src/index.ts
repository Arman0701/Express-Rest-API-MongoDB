console.log("==================================================")
import express from "express"
import { rabbitmqInstance } from "./config/rabbitmq.config"
import { config } from "dotenv"
config()

const app = express()
const port = process.env.PORT

app.get("/", (req, res) => {
	res.send(`
	<a href="/receiver">Receiver</a>
	`)
})

app.get("/receiver", (req, res) => {
	rabbitmqInstance.receiver()
	res.send(`
	<a href="/receiver">Receiver</a>
	`)
})

app.listen(port, () => {
	console.log(`Server has been started on port ${port}...`)
})
