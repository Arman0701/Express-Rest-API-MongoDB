import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const makeConn = async () => {
	try {
		await mongoose.connect(process.env.MDB_URI!)
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
