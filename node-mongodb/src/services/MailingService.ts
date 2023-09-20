import axios from "axios"
import dotenv from "dotenv"
import { EmailOptions } from "../types/custom"
dotenv.config()

export class MailingService {
	private emailOptions: EmailOptions
	constructor(emailOptions: EmailOptions) {
		this.emailOptions = emailOptions
	}

	async refreshAccessToken() {
		const tokenUrl = process.env.TOKEN_URL!

		const tokenRefreshData = {
			grant_type: "refresh_token",
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			refresh_token: process.env.REFRESH_TOKEN,
		}
		try {
			const response = await axios.post(tokenUrl, tokenRefreshData)

			if (response.status !== 200) {
				throw new Error("Token refresh failed")
			}

			const newAccessToken = response.data.access_token
			console.log("New Access Token:", newAccessToken)
			return newAccessToken
		} catch (error) {
			console.error("Token refresh error:")
		}
	}

	sendEmail({ from, to, subject, body }: EmailOptions) {
		const emailMessage = {
			raw: Buffer.from(
				`To: ${to}\r\n` +
					`Subject: ${subject}\r\n` +
					`\r\n` +
					`${body}`,
				"utf-8"
			).toString("base64"),
		}

		axios
			.post(
				`https://www.googleapis.com/gmail/v1/users/${from}/messages/send`,
				emailMessage,
				{
					headers: {
						Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				console.log("Email sent successfully.")
			})
			.catch(async (error) => {
				console.error(
					"Error sending email:",
					error.response ? error.response.data : error.message
				)
				console.log("Trying to refresh access token.")
				const newAccessToken = await this.refreshAccessToken()

				if (newAccessToken) {
					process.env.ACCESS_TOKEN = newAccessToken
					this.sendEmail({ from, to, subject, body })
				}
			})
	}

	userUpdatedMsg() {
		this.sendEmail(this.emailOptions)
	}

	userCreatedMsg() {
		this.sendEmail(this.emailOptions)
	}

	userRemovedMsg() {
		this.sendEmail(this.emailOptions)
	}

	userReadedMsg() {
		this.sendEmail(this.emailOptions)
	}

	allUsersReadedMsg() {
		this.sendEmail(this.emailOptions)
	}
}

const EmailOptions = {
	from: "tadevosyan889@gmail.com",
	to: "tadevosyan889@gmail.com",
	subject: "NodeJS Test API",
	body: "All users was readed.",
}
export const Mailing = new MailingService(EmailOptions)
