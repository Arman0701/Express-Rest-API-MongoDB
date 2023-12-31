import { IHandler } from "../utils/throwError"

export interface IBody {
	[key: string]: string | number
}

export interface IProject {
	id?: number
	name: string
	description: string
	userID: number
}

export interface ISkill {
	id?: number
	name: string
	image_url: string
	userID: number
}

export interface IUser {
	id?: number
	username: string
	email: string
}

export type UProjectReturnType = Promise<IProject | IHandler | null>
export type USkillReturnType = Promise<ISkill | IHandler | null>
export type UUserReturnType = Promise<IUser | IHandler | null>
