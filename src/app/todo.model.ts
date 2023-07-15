export enum Status {
	Incomplete = "Incomplete",
	Complete = "Complete",
}

export class Todo {
	constructor(
		public id: string,
		public title: string,
		public description: string,
		public status: Status
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = status;
	}
}
