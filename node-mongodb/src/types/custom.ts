export interface IPaginationQueries {
	page?: number
	offset?: number
	limit?: number | undefined
	max_limit?: number
}

export interface EmailOptions {
	to: string
	from: string
	subject: string
	body: string
}

export interface IConfig {
	[key: string]: string
}
