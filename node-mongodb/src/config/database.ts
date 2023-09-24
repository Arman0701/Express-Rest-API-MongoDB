import mongoose from "mongoose"
import dotenv from "dotenv"
import { configure, configureApp } from "../utils/configureApp"
dotenv.config()
configureApp()

export const makeConn = async () => {
	try {
		const uri = configure.get("db.mdb_uri")
		if (uri) {
			await mongoose.connect(String(uri))
		}
	} catch (e) {
		console.log(e)
	}
}

makeConn()
export const db = mongoose.connection

db.on("error", (err) => {
	console.error("MongoDB connection error:", err)
})

db.once("open", () => {
	console.log("Connected to MongoDB")
})
