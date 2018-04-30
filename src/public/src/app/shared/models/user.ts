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

	constructor(
		id: number = 0,
		email: string,
		firstName: string,
		lastName: string,
		password: string = '',
		jobTitle: string = '',
		employer: string = '',
		location: string = ''
	) {

		this.id = id;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.jobTitle = jobTitle;
		this.employer = employer;
		this.location = location;

	}

	deserialize(input: object) {
		let user = new User(
			input['id'],
			input['email'],
			input['first_name'],
			input['last_name'],
			input['job_title'],
			input['employer'],
			input['location']
		);

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
