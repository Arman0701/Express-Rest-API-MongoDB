import { Inject, Service } from "typedi"
import { UserModel } from "../models/User"
import { IBody, IUser, UUserReturnType } from "../types/models"
import { Error } from "../utils/throwError"
import { ProjectsInstance, ProjectsService } from "./ProjectsService"
import { SkillsInstance, SkillsService } from "./SkillsService"
import { rabbitmqInstance } from "../config/rabbitmq.config"
import { SkillModel } from "../models/Skill"
import { ProjectModel } from "../models/Project"
import { EmailOptions } from "../types/custom"

@Service()
export class UserService {
	constructor(
		@Inject()
		readonly skills: SkillsService,
		readonly projects: ProjectsService
	) {
		this.skills = skills
		this.projects = projects
	}

	getAll(): UUserReturnType {
		const emailOptions: EmailOptions = {
			from: "tadevosyan889@gmail.com",
			to: "tadevosyan889@gmail.com",
			subject: "NodeJS Test API",
			body: "<h1>All users was readed successfully.</h1>",
			pattern: "html",
		}
		rabbitmqInstance.sender(emailOptions)
		return UserModel.find({})
	}

	async getOneById(id: string): UUserReturnType {
		if (!id) {
			return Error.User().iD404()
		}

		const user = UserModel.findOne({ _id: id })
		const emailOptions: EmailOptions = {
			from: "tadevosyan889@gmail.com",
			to: "tadevosyan889@gmail.com",
			subject: "NodeJS Test API",
			body: `
## Subject: This is a Markdown email
This is a Markdown email. Markdown is a lightweight markup language that allows you to create formatted text using a plain text editor.
### Markdown Syntax
Markdown uses a variety of special characters to indicate formatting. For example, to bold text, you can enclose it in two asterisks (\`**\`). To italicize text, you can enclose it in one asterisk (\`*\`). And to create a heading, you can start the line with one or more hash symbols (\`#\`).
### Example Markdown
Here is an example of Markdown code:
			`,
			pattern: "markdown",
		}
		rabbitmqInstance.sender(emailOptions)
		return user
	}

	async getProjectsByUserId(id: string): UUserReturnType {
		if (!id) return Error.User().iD404()

		const users = this.projects.getByUserId(id)
		return users
	}

	async getSkillsByUserId(id: string): UUserReturnType {
		if (!id) return Error.User().iD404()

		return this.skills.getByUserId(id)
	}

	async create({ username, email }: IUser): UUserReturnType {
		if (!email) {
			return Error.User().email404()
		}
		if (!username) {
			return Error.User().username404()
		}
		const newUser = new UserModel({
			username,
			email,
		})
		const emailOptions: EmailOptions = {
			from: "tadevosyan889@gmail.com",
			to: "tadevosyan889@gmail.com",
			subject: "NodeJS Test API",
			body: "User was created successfully.",
			pattern: "html",
		}
		rabbitmqInstance.sender(emailOptions)
		return newUser.save()
	}

	async updateById(body: IBody, id: string): UUserReturnType {
		const validBody = Object.values(body).every((value) => Boolean(value))
		if (!body || !validBody) return Error.User().body404()
		if (!id) return Error.User().iD404()

		await UserModel.updateOne({ _id: id }, body)
		const emailOptions: EmailOptions = {
			from: "tadevosyan889@gmail.com",
			to: "tadevosyan889@gmail.com",
			subject: "NodeJS Test API",
			body: "User was updated successfully.",
			pattern: "html",
		}
		rabbitmqInstance.sender(emailOptions)

		// optional fuunctionality
		return UserModel.findOne({ _id: id })
	}

	async removeById(id: string): UUserReturnType {
		if (!id) {
			return Error.User().iD404()
		}
		const emailOptions: EmailOptions = {
			from: "tadevosyan889@gmail.com",
			to: "tadevosyan889@gmail.com",
			subject: "NodeJS Test API",
			body: "User was removed successfully.",
			pattern: "html",
		}
		await SkillModel.deleteMany({ userID: id })
		await ProjectModel.deleteMany({ userID: id })

		rabbitmqInstance.sender(emailOptions)
		return UserModel.findByIdAndRemove({ _id: id })
	}
}

export const UserInstance = new UserService(SkillsInstance, ProjectsInstance)
