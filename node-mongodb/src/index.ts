import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import { makeConn } from "./config/database"
import { useContainer, useExpressServer } from "routing-controllers"
import Container from "typedi"
import { config } from "dotenv"
import { configure, configureApp } from "./utils/configureApp"
config()
configureApp()


const PORT = configure.get("server.port")
useContainer(Container)

const app = express()
app.use(express.json())

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err)
	res.status(500).send("Server crashed.")
})

useExpressServer(app, {
	controllers: [__dirname + "/controllers/*{.ts,.js}"],
})

async function start() {
	try {
		makeConn()
		app.listen(PORT, () => {
			console.log(`Server has been started on port ${PORT}...`)
		})
	} catch (e) {
		console.log(e)
	}
}
start()
