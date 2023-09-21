export interface IHandler {}

class Handler {
	private message: string = ""

	constructor() {}

	User(): Handler {
		this.message = ""
		this.message += "User instance error."
		return this
	}
	Project(): Handler {
		this.message = ""
		this.message += "Project instance error."
		return this
	}
	Skill(): Handler {
		this.message = ""
		this.message += "Project instance error"
		return this
	}
	iD404(): Handler {
		this.message = ""
		this.message += "'id' is undefined."
		return this
	}
	username404(): Handler {
		this.message = ""
		this.message += "'username' is undefined."
		return this
	}
	email404(): Handler {
		this.message = ""
		this.message += "'email' is undefined."
		return this
	}
	userID404(): Handler {
		this.message = ""
		this.message +=
			"'userID' is undefined. User with given id doesn't exist."
		return this
	}
	body404(): Handler {
		this.message = ""
		this.message += "'body' is undefined."
		return this
	}
	name404(): Handler {
		this.message = ""
		this.message += "'name' is undefined."
		return this
	}
	imageURL404(): Handler {
		this.message = ""
		this.message += "'image_url' is undefined."
		return this
	}
	description404(): Handler {
		this.message = ""
		this.message += "'description' is undefined."
		return this
	}
}

export const Error = new Handler()
