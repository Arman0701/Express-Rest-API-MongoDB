import dotenv from "dotenv"
import { EmailMessageType, EmailOptions } from "../types/custom"
import { mailingApi } from "./MailingAPIService"
dotenv.config()

export class MailingService {
	private messages: {
		[key: string]: Function
	}
	constructor() {
		this.messages = {
			html: this.sendHtmlEmail,
			markdown: this.sendMarkdownEmail,
			text: this.sendTextEmail,
		}
	}

	async sendEmail({ from, to, subject, body, pattern }: EmailMessageType) {
		const typedBody = this.messages[pattern](body)

		try {
			await mailingApi.sendMessage({
				from,
				to,
				subject,
				body: typedBody,
			})
		} catch (e) {
			console.error("Error in sendMail | MailingService", e)
		}
	}

	sendTextEmail() {}

	sendHtmlEmail(htmlBody: string) {
		return `Content-Type: text/html; charset=utf-8\r\n\r\n${htmlBody}`
	}

	sendMarkdownEmail(markdownBody: string) {
		return `Content-Type: text/markdown; charset=utf-8\r\n\r\n${markdownBody}`
	}

	// async sendHtmlEmail(to, subject, htmlBody) {
	// 	const body = `Content-Type: text/html; charset=utf-8\r\n\r\n${htmlBody}`

	// 	const response = await sendEmail(to, subject, body)

	// 	return response
	// }

	// async sendMarkdownEmail(to, subject, markdownBody) {
	// 	const body = `Content-Type: text/markdown; charset=utf-8\r\n\r\n${markdownBody}`

	// 	const response = await sendEmail(to, subject, body)

	// 	return response
	// }
}

export const Mailing = new MailingService()
