import { Serializable } from '../interfaces';

export class Review implements Serializable<Review> {

	id?: number;
	jobTitle: string;
	employer: string;
	qualityRating: number;
	recommendRating: number;
	comment: string;
	datestamp: Date;

	constructor() {}

	deserialize(input: object): Review {
		let review = new Review();

		review.id = input['review_id'];
		review.jobTitle = input['job_title'];
		review.employer = input['employer'];
		review.qualityRating = input['quality_rating'];
		review.recommendRating = input['recommend_rating'];
		review.comment = input['comment'];
		review.datestamp = new Date(input['datestamp']);

		return review;

	}

	serialize(): string {

		var obj = {
			job_title: this.jobTitle,
			employer: this.employer,
			quality_rating: this.qualityRating,
			recommend_rating: this.recommendRating,
			comment: this.comment,
			datestamp: this.datestamp
		};

		return JSON.stringify(obj,null,2);
	}

}
