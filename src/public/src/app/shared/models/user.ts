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

	deserialize(input: object): User {
		var user = new User();

		user.id = input['id'];
		user.email = input['email'];
		user.firstName = input['first_name'];
		user.lastName = input['last_name'];
		user.jobTitle = input['job_title'];
		user.employer = input['employer'];
		user.location = input['location'];

		return user;
	}

	// define the `obj` parameter to fit the fields
	// necessary for the endpoint to which you're
	// sending data
	//
	// e.g. `obj` parameter for the "Create User" route
	// would look like:
	//
	//	var obj = {
	//		email: email,
	//		first_name: firstName,
	//		last_name: lastName,
	//		password: password
	//	}
	serialize(obj: object): string {
		return JSON.stringify(obj);
	}

}
