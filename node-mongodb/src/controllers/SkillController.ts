import {
	Controller,
	Param,
	Get,
	Post,
	Patch,
	Delete,
} from "routing-controllers"
import { IBody, ISkill, USkillReturnType } from "../types/models"
import { Inject, Service } from "typedi"
import { SkillsService } from "../services/SkillsService"

@Controller("/skill", {
	transformResponse: false,
})
@Service()
export class SkillController {
	constructor(private skillsService: SkillsService) {}

	@Get("/")
	async getAll(): Promise<USkillReturnType> {
		return this.skillsService.getAll()
	}

	@Get("/:id")
	async getOneById(@Param("id") id: string): USkillReturnType {
		return this.skillsService.getOneById(id)
	}

	async getByUserId(@Param("id") userId: string): USkillReturnType {
		return this.skillsService.getByUserId(userId)
	}

	@Post("/")
	async create({ name, image_url, userID }: ISkill): USkillReturnType {
		return this.skillsService.create({
			name,
			image_url,
			userID,
		})
	}

	@Patch("/:id")
	async updateById(body: IBody, id: string): USkillReturnType {
		return this.skillsService.updateById(body, id)
	}

	@Delete("/:id")
	async removeById(@Param("id") id: string): USkillReturnType {
		return this.skillsService.removeById(id)
	}
}
