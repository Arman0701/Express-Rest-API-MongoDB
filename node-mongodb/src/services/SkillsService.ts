import { Service } from "typedi"
import { SkillModel } from "../models/Skill"
import { IBody, ISkill, USkillReturnType } from "../types/models"
import { Error } from "../utils/throwError"

@Service()
export class SkillsService {
	async getAll(): Promise<USkillReturnType> {
		return SkillModel.find({})
	}

	async getOneById(id: string): USkillReturnType {
		if (!id) return Error.Skill().iD404()

		return SkillModel.findOne({ _id: id })
	}

	async getByUserId(userId: string): USkillReturnType {
		if (!userId) return Error.Skill().iD404()

		return SkillModel.find({ userID: userId })
	}

	async create({ name, image_url, userID }: ISkill): USkillReturnType {
		if (!userID) return Error.Skill().userID404()
		if (!image_url) return Error.Skill().imageURL404()
		if (!name) return Error.Skill().name404()

		const newSkill = new SkillModel({
			name, 
			image_url,
			userID,
		})

		return newSkill.save()
	}

	async updateById(body: IBody, id: string): USkillReturnType {
		const validBody = Object.values(body).every((value) => Boolean(value))
		if (!body || !validBody) return Error.Skill().body404()
		if (!id) return Error.Skill().iD404()

		await SkillModel.updateOne({ _id: id }, body)

		// optional fuunctionality
		return SkillModel.findOne({ _id: id })
	}

	async removeById(id: string): USkillReturnType {
		if (!id) return Error.Skill().iD404()

		return SkillModel.findByIdAndRemove({ _id: id })
	}
}

export const SkillsInstance = new SkillsService()
