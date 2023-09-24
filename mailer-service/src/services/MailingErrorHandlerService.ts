import axios from "axios"
import { MailingErrHandlerCodes, TCode } from "../types/custom"
import { configure, configureApp } from "../utils/configureApp"
import { config } from "dotenv"
config()
configureApp()
configureApp()
configureApp()
configureApp()
configureApp()
configureApp()

export class MailingErrorHandler {
	private codes: MailingErrHandlerCodes
	private grant_type: string
	private client_id: string
	private client_secret: string
	private refresh_token: string

	constructor() {
		this.grant_type = "refresh_token"
		this.client_id = String(configure.get("mailer.client_id"))
		this.client_secret = String(configure.get("mailer.client_secret"))
		this.refresh_token = String(configure.get("mailer.refresh_token"))

		this.codes = {
			401: this.refreshAccessToken,
		}
	}

	async refreshAccessToken() {
		const tokenUrl = String(configure.get("mailer.token_url"))

		const tokenRefreshData = {
			grant_type: this.grant_type,
			client_id: this.client_id,
			client_secret: this.client_secret,
			refresh_token: this.refresh_token,
		}
		try {
			const response = await axios.post(tokenUrl, tokenRefreshData)

			if (response.status !== 200) {
				throw new Error("Token refresh failed")
			}

			const newAccessToken = response.data.access_token
			return newAccessToken
		} catch (error) {
			console.error("  [x] > Token refresh error:")
		}
	}

	async exec(code: TCode, cb: Function) {
		if (Object.keys(this.codes).includes(String(code))) {
			const value = await this.codes[code]()
			cb(value)
		}
	}
}

export const mailingErrors = new MailingErrorHandler()
