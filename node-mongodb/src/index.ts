import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express"
import { makeConn } from "./config/database"
import { createExpressServer, useContainer } from "routing-controllers"
import Container from "typedi"

const PORT = process.env.PORT
useContainer(Container)

const app = createExpressServer({
	controllers: [__dirname + "/controllers/*{.ts,.js}"],
})

app.use(express.json())

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err)
	res.status(500).send("Server crashed.")
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
