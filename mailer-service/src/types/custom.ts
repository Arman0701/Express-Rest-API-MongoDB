export interface EmailOptions {
	to: string
	from: string
	subject: string
	body: string
}

export interface IConfig {
	[key: string]: string
}
