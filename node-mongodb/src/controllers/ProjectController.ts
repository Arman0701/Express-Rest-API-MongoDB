import {
	Controller,
	Param,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Patch,
} from "routing-controllers"
import { IBody, IProject, UProjectReturnType } from "../types/models"
import { ProjectsService } from "../services/ProjectsService"
import { Service } from "typedi"

@Controller("/project", {
	transformResponse: false,
})
@Service()
export class ProjectController {
	constructor(private projectsService: ProjectsService) {}

	@Get("/")
	async getAll(): UProjectReturnType {
		return this.projectsService.getAll()
	}

	@Get("/:id")
	async getOneById(@Param("id") id: string): UProjectReturnType {
		return this.projectsService.getOneById(id)
	}

	async getByUserId(@Param("id") userId: string): UProjectReturnType {
		return this.projectsService.getByUserId(userId)
	}

	@Post("/")
	async create(
		@Body() { name, description, userID }: IProject
	): UProjectReturnType {
		return this.projectsService.create({
			name,
			description,
			userID,
		})
	}

	@Patch("/:id")
	async updateById(
		@Body() body: IBody,
		@Param("id") id: string
	): UProjectReturnType {
		return this.projectsService.updateById(body, id)
	}

	@Delete("/:id")
	async removeById(@Param("id") id: string): UProjectReturnType {
		return this.projectsService.removeById(id)
	}
}
