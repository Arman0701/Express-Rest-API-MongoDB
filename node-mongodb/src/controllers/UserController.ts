import {
	Controller,
	Param,
	Get,
	Post,
	Patch,
	Delete,
	Body,
} from "routing-controllers"
import { IBody, IUser, UUserReturnType } from "../types/models"
import { Service } from "typedi"
import { UserService } from "../services/UserService"

@Controller("/user", {
	transformResponse: false,
})
@Service()
export class UserController {
	constructor(private userService: UserService) {}

	@Get("/")
	getAll(): UUserReturnType {
		return this.userService.getAll()
	}

	@Get("/:id")
	async getOneById(@Param("id") id: string): UUserReturnType {
		return this.userService.getOneById(id)
	}

	@Get("/:id/projects")
	async getProjectsByUserId(@Param("id") id: string): UUserReturnType {
		return this.userService.getProjectsByUserId(id)
	}

	@Get("/:id/skills")
	async getSkillsByUserId(@Param("id") id: string): UUserReturnType {
		return this.userService.getSkillsByUserId(id)
	}

	@Post("/")
	async create(@Body() { username, email }: IUser): UUserReturnType {
		return this.userService.create({
			username,
			email,
		})
	}

	@Patch("/:id")
	async updateById(
		@Body() body: IBody,
		@Param("id") id: string
	): UUserReturnType {
		return this.userService.updateById(body, id)
	}

	@Delete("/:id")
	async removeById(@Param("id") id: string): UUserReturnType {
		return this.userService.removeById(id)
	}
}
