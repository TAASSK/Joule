import { Serializable } from '../interfaces';

export class User implements Serializable<User> {

	id: number;
	email: string;
	name: string;

	deserialize(input: object) {
		let user = new User();

		user.id = input['id'];
		user.email = input['email'];
		user.name = input['name'];

		return user;

	}

	serialize(user: User) {
		return JSON.stringify(user);
	}

}
