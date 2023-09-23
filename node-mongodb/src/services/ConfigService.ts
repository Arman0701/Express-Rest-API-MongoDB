import { IConfig } from "../types/custom"
import { config } from "dotenv"
config()

export class ConfigService {
	private config: IConfig
	constructor() {
		this.config = {}
	}

	loadConfig(keyName: string, configs: string[]) {
		this.config[keyName] = configs.reduce(
			(accumulator: any, currentValue: string) => {
				accumulator[currentValue] =
					process.env[currentValue.toUpperCase()]
				return accumulator
			},
			{}
		)
	}

	get(key: string) {
		const pathArray: string[] = key.split(".")
		let currentObject: IConfig = this.config
		for (const pathElement of pathArray) {
			if (!currentObject.hasOwnProperty(pathElement)) {
				return undefined
			}
			currentObject = currentObject[pathElement] as any
		}
		return currentObject
	}
}
