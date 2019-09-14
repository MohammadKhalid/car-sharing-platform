export class filters {

	constructor(
		private area: string = "",
		private city: string = "",
		private maxMileage: number = Number.MAX_SAFE_INTEGER,
		private maxModelNo: number = Number.MAX_SAFE_INTEGER,
		private maxPrice: number = Number.MAX_SAFE_INTEGER,
		private minMileage: number = 0,
		private minModelNo: number = 1900,
		private minPrice: number = 0,
		private model: string = "",
		private search: string = "",
		private transmission: string = ""
	) { }
}