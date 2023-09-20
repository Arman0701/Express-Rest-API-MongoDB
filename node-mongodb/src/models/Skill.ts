import { Schema, model } from "mongoose"

const schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image_url: {
		type: String,
		required: true,
	},
	userID: {
		type: String,
		required: true,
	},
})

export const SkillModel = model("Skill", schema)
