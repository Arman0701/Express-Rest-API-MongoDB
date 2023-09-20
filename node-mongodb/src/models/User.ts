import { model, Schema } from "mongoose"

const schema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
})

export const UserModel = model("User", schema)
