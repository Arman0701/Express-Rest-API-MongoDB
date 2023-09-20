import { Service } from "typedi"
import { ProjectModel } from "../models/Project"
import { IBody, IProject, UProjectReturnType } from "../types/models"
import { Error } from "../utils/throwError"

@Service()
export class ProjectsService {
	async getAll(): UProjectReturnType {
		return ProjectModel.find({})
	}

	async getOneById(id: string): UProjectReturnType {
		if (!id) return Error.Project().iD404()

		return ProjectModel.findOne({ _id: id })
	}

	async getByUserId(userId: string): UProjectReturnType {
		if (!userId) return Error.Project().iD404()

		return ProjectModel.find({ userID: userId })
	}

	async create({ name, description, userID }: IProject): UProjectReturnType {
		if (!userID) return Error.Project().userID404()
		if (!description) return Error.Project().description404()
		if (!name) return Error.Project().name404()

		const newProject = new ProjectModel({ name, description, userID })

		return newProject.save()
	}

	async updateById(body: IBody, id: string): UProjectReturnType {
		const validBody = Object.values(body).every((value) => Boolean(value))
		if (!body || !validBody) return Error.Project().body404()
		if (!id) return Error.Project().iD404()

		await ProjectModel.updateOne({ _id: id }, body)

		// optional fuunctionality
		return ProjectModel.findOne({ _id: id })
	}

	async removeById(id: string): UProjectReturnType {
		if (!id) return Error.Project().iD404()

		return ProjectModel.findByIdAndRemove({ _id: id })
	}
}

export const ProjectsInstance = new ProjectsService()
