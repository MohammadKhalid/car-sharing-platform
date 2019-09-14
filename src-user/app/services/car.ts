export class Car {
	_id: number;
	images: Array<string>;
	title: string;
	modelNo: string;
	city: string;
	area: string;
	regCity: string;
	mileage: number;
	color: string;
	price: number;
	description: string;
	engineType: string;
	engineCapacity: number;
	transmission: string;
	assembly: string;
	features: Array<string>;
	uploadedBy: string;
	constructor(){
		this._id = 0;
		this.images = [];
		this.title = null;
		this.modelNo = null;
		this.city = null;
		this.area = null;
		this.regCity = null;
		this.mileage = null;
		this.color = null;
		this.price = null;
		this.description = null;
		this.engineType = null;
		this.engineCapacity = null;
		this.transmission = null;
		this.assembly = null;
		this.features = null;
		this.uploadedBy = null;
	}
}
