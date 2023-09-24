import { Schema, model } from "mongoose"
import { UserModel } from "./User"

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
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		validate: {
			validator: async function (v: string) {
				const user = await UserModel.findById(v)
				return user !== null
			},
			message: "Invalid user ID",
		},
	},
})

export const SkillModel = model("Skill", schema)
