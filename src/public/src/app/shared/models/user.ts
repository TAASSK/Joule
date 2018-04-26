import { Serializable } from '../interfaces';

export class User implements Serializable<User> {

	id?: number;
	email?: string;
	first_name?: string;
	last_name?: string;
	password?: string;

	deserialize(input: object) {
		let user = new User();

		user.id = input['id'];
		user.email = input['email'];
		user.first_name = input['first_name'];
		user.last_name = input['last_name']; 
		user.password = input['password'];

		return user;

	}

	serialize(user: User) {
		return JSON.stringify(user);
	}

}
