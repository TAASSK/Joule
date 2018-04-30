import { Serializable } from '../interfaces';

export class Review implements Serializable<Review> {

	id?: number;
	jobTitle: string;
	employer: string;
	accountabilityRating: number;
	availabilityRating: number;
	politenessRating: number;
	efficiencyRating: number;
	comment: string;
	datestamp: Date;

	constructor(
		id: number = 0,
		jobTitle: string,
		employer: string,
		accountabilityRating: number,
		availabilityRating: number,
		politenessRating: number,
		efficiencyRating: number,
		comment: string,
		datestamp: Date = new Date()
	) {}

	deserialize(input: object): Review {
		let review = new Review(
			input['review_id'],
			input['job_title'],
			input['employer'],
			input['accountability_rating'],
			input['availability_rating'],
			input['politeness_rating'],
			input['efficiency_rating'],
			input['comment'],
			new Date(input['datestamp'])
		);

		return review;

	}

	serialize(): string {

		var obj = {
			job_title: this.jobTitle,
			employer: this.employer,
			accountability_rating: this.accountabilityRating,
			availability_rating: this.availabilityRating,
			politeness_rating: this.politenessRating,
			efficiency_rating: this.efficiencyRating,
			comment: this.comment,
			datestamp: this.datestamp
		};

		return JSON.stringify(obj,null,2);
	}

}
