import dotenv from "dotenv"
import { EmailOptions } from "../types/custom"
import { mailingApi } from "./MailingAPIService"
dotenv.config()

export class MailingService {
	async sendEmail({ from, to, subject, body }: EmailOptions) {
		try {
			await mailingApi.sendMessage({
				from,
				to,
				subject,
				body,
			})
		} catch (e) {
			console.error("Error in sendMail | MailingService", e)
		}
	}
}

export const Mailing = new MailingService()
