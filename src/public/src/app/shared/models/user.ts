import { Serializable } from '../interfaces';

export class User implements Serializable<User> {

	id?: number;
	email: string;
	first_name: string;
	last_name: string;
	password?: string;
	jobTitle?: string;
	employer?: string;
	location?: string;

	constructor() {}

	deserialize(input: object) {
		var user = new User();

		user.id = input['id'];
		user.email = input['email'];
		user.first_name = input['first_name'];
		user.last_name = input['last_name'];
		user.jobTitle = input['jobTitle'];
		user.employer = input['employer'];
		user.location = input['location'];

		return user;

	}

	serialize(): string {

		var obj = {
			email: this.email,
			first_name: this.first_name,
			last_name: this.last_name,
			password: this.password,
			job_title: this.jobTitle,
			employer: this.employer,
			location: this.location
		};

		return JSON.stringify(obj, null, 2);
	}

}
