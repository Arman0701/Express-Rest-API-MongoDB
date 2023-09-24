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

	userUpdatedMsg() {
		const emailOptions = {
			from: "tadevosyan889@gmail.com",
			to: "tadevosyan889@gmail.com",
			subject: "NodeJS Test API",
			body: "User was updated successfully.",
		}

		this.sendEmail(emailOptions)
	}

	userCreatedMsg() {
		const emailOptions = {
			from: "tadevosyan889@gmail.com",
			to: "tadevosyan889@gmail.com",
			subject: "NodeJS Test API",
			body: "User was created successfully.",
		}

		this.sendEmail(emailOptions)
	}

	userRemovedMsg() {
		const emailOptions = {
			from: "tadevosyan889@gmail.com",
			to: "tadevosyan889@gmail.com",
			subject: "NodeJS Test API",
			body: "User was removed successfully.",
		}

		this.sendEmail(emailOptions)
	}

	userReadedMsg() {
		const emailOptions = {
			from: "tadevosyan889@gmail.com",
			to: "tadevosyan889@gmail.com",
			subject: "NodeJS Test API",
			body: "User was readed successfully.",
		}

		this.sendEmail(emailOptions)
	}

	allUsersReadedMsg() {
		const emailOptions = {
			from: "tadevosyan889@gmail.com",
			to: "tadevosyan889@gmail.com",
			subject: "NodeJS Test API. | /user route",
			body: "All users was readed.",
		}

		this.sendEmail(emailOptions)
	}
}

export const Mailing = new MailingService()
