# Get Reviews

Returns all reviews for a user of a given ID.

**URL** : `/api/users/{user_id}/reviews`

**Method** : `GET`

**Auth required** : NO

## Success Response

**HTTP Status Code** : `200 OK`

**Content example**

```json
{
	"reviews": [
		{
			"review_id": 489,
			"reviewer_id": 101,
			"quality_rating": 78,
			"recommend_rating": 84,
			"comment": "Shows up to work.",
			"datestamp": "2018-04-28T01:55:51.834Z",
			"is_anonymous": false,
			"is_edited": false,
			"edit_datestamp": null
		},
		
		...

		{
			"review_id": 3194,
			"reviewer_id": 27,
			"quality_rating": 50,
			"recommend_rating": 50,
			"comment": "Pretty good, I guess.",
			"datestamp": "2018-04-28T02:09:09.724Z",
			"is_anonymous": true,
			"is_edited": false,
			"edit_datestamp": null
		}
	]
}
```

\* it is possible for the list of reviews to be an empty list

## Error Responses

**HTTP Status Code** : `404 Not Found`

**Condition** : The user does not exist.

**Content example**

```json
{
	"success": false,
	"message": "The user with ID <user_id_from_request> does not exist."
}
```

OR

**HTTP Status Code** : `500 Internal Server Error`

**Condition** : The server experiences an error when attempting to retrieve the reviews for the user.

**Content example**

```json
{
	"success": true,
	"message": "Experienced error when attempting to retrieve reviews for the user."
}
```
