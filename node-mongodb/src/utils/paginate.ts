import { IPaginationQueries } from "../types/custom"

export class Pagination {
	protected data: any

	constructor(data: any) {
		this.data = data
	}

	paginate({
		page = 0,
		offset = 0,
		limit,
		max_limit = 5,
	}: IPaginationQueries) {
		if (!limit || limit > max_limit) {
			limit = max_limit
		}

		if (page <= 0) {
			page = 1
		}

		const result = this.data
			.slice(offset)
			.slice(limit * (page - 1), limit * page)

		return result
	}
}