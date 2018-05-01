import { Serializable } from '../interfaces';

export class Review implements Serializable<Review> {

	id?: number;
	jobTitle: string;
	employer: string;
	hotnessRating: number;
	accountabilityRating: number;
	availabilityRating: number;
	politenessRating: number;
	efficiencyRating: number;
	comment: string;
	datestamp: Date;

	constructor() {}

	deserialize(input: object): Review {
		var review = new Review();
		
		review.id = input['review_id'];
		review.jobTitle = input['job_title'];
		review.employer = input['employer'];
		review.hotnessRating = input['hotness_rating'];
		review.accountabilityRating = input['accountability_rating'];
		review.availabilityRating = input['availability_rating'];
		review.politenessRating = input['politeness_rating'];
		review.efficiencyRating = input['efficiency_rating'];
		review.comment = input['comment'];
		review.datestamp = new Date(input['datestamp']);

		return review;

	}

	// define the `obj` parameter to fit the fields
	// necessary for the endpoint to which you're
	// sending data
	//
	// e.g. `obj` parameter for the "Create Review for User" route 
	// would look like:
	//
	//	var obj = {
	//		job_title: jobTitle,
	//		employer: employer,
	//		hotness_rating: hotnessRating,
	//		accountability_rating: accountabilityRating,
	//		availability_rating: availabilityRating,
	//		politeness_rating: politenessRating,
	//		efficiency_rating: efficiencyRating,
	//		comment: comment,
	//		datestamp: datestamp
	//	}
	serialize(): string {
		return JSON.stringify(obj,null,2);
	}

}
