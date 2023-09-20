import { Schema, model } from "mongoose"

const schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	userID: {
		type: String,
		required: true,
	},
})

export const ProjectModel = model("Project", schema)
