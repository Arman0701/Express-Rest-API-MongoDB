export interface EmailOptions {
	to: string
	from: string
	subject: string
	body: string
}

export interface IConfig {
	[key: string]: string
}

export type TCode = string | number
export interface MailingErrHandlerCodes {
	[key: TCode]: Function
}

export interface MailingAPIAuth {
	Authorization: string
	"Content-Type": string
}
