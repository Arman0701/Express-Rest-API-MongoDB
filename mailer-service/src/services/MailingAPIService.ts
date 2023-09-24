import axios from "axios"
import { EmailOptions, MailingAPIAuth } from "../types/custom"
import { configure, configureApp } from "../utils/configureApp"
import { config } from "dotenv"
import { mailingErrors } from "./MailingErrorHandlerService"
config()
configureApp()

export class MailingAPIService {
	private auth: MailingAPIAuth
	access_token: string

	constructor() {
		this.access_token = String(configure.get("mailer.access_token"))
		this.auth = {
			Authorization: `Bearer ${this.access_token}`,
			"Content-Type": "application/json",
		}
	}

	async sendMessage({ from, to, subject, body }: EmailOptions) {
		const emailMessage = {
			raw: Buffer.from(
				`To: ${to}\r\n` +
					`Subject: ${subject}\r\n` +
					`\r\n` +
					`${body}`,
				"utf-8"
			).toString("base64"),
		}

		try {
			const response = await axios.post(
				`https://www.googleapis.com/gmail/v1/users/${from}/messages/send`,
				emailMessage,
				{
					headers: {
						Authorization: `Bearer ${this.access_token}`,
						"Content-Type": "application/json",
					},
				}
			)
			console.log("  [x] > Email sended.")
			return response
		} catch (e: any) {
			const code = e.response.status

			mailingErrors.exec(code, (token: string) => {
				if (token) {
					console.log("token ::: ", token)

					this.access_token = token
					this.sendMessage({
						from,
						to,
						subject,
						body,
					})
				}
			})
		}
	}
}

export const mailingApi = new MailingAPIService()
