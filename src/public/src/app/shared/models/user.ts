import { Serializable } from '../interfaces';

export class User implements Serializable<User> {

	id?: number;
	email: string;
	firstName: string;
	lastName: string;
	password?: string;
	jobTitle?: string;
	employer?: string;
	location?: string;

	constructor() {}

	deserialize(input: object) {
		var user = new User();

		user.id = input['id'];
		user.email = input['email'];
		user.firstName = input['firstName'];
		user.lastName = input['lastName'];
		user.jobTitle = input['jobTitle'];
		user.employer = input['employer'];
		user.location = input['location'];

		return user;

	}

	serialize(): string {

		var obj = {
			email: this.email,
			first_name: this.firstName,
			last_name: this.lastName,
			password: this.password,
			job_title: this.jobTitle,
			employer: this.employer,
			location: this.location
		};

		return JSON.stringify(obj, null, 2);
	}

}
