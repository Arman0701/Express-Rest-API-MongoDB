import express from "express"
import { rabbitmqInstance } from "./config/rabbitmq.config"
import { config } from "dotenv"
config()

const app = express()
const port = process.env.PORT

app.get("/", (req, res) => {
	res.send("Hello world from NodeJS!")
})

app.listen(port, () => {
	rabbitmqInstance.receiver()
	console.log(`Server has been started on port ${port}...`)
})
