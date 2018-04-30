# Create Review for User

Adds a review for a user with a given ID.

**URL** : `/api/users/{user_id}/reviews`

**Method** : `POST`

**Auth required** : YES

**Headers**

```json
Authorization: Bearer <token>
```

**Data constraints**

* `hotness_rating` - a rating for hotness; must be integer between 0 and 100, inclusive
* `accountability_rating` - a rating for accountability; must be integer between 0 and 100, inclusive
* `availability_rating` - a rating for availability; must be integer between 0 and 100, inclusive
* `politeness_rating` - a rating for politeness; must be integer between 0 and 100, inclusive
* `efficiency_rating` - a rating for efficiency; must be integer between 0 and 100, inclusive
* `comment` - simple text string containing comment body
* `datestamp` - ISO 8601 date string (ex. `"2018-04-28T01:55:51.834Z"`) representing date and time of posting of original review

```json
{
	"job_title": "[job title]",
	"employer": "[employer name]",
	"hotness_rating": <integer>,
	"accountability_rating": <integer>,
	"availability_rating": <integer>,
	"politeness_rating": <integer>,
	"efficiency_rating": <integer>,
	"comment": "[comment body]",
	"datestamp": "[ISO 8601 date string]",
}
```

**Data example**

```json
{
	"job_title": "Brewer",
	"employer": "Self Employed",
	"hotness_rating": 78,
	"accountability_rating": 43,
	"availability_rating": 95,
	"politeness_rating": 94,
	"efficiency_rating": 93,
	"comment": "Hard worker.",
	"datestamp": "2018-04-28T01:55:51.834Z"
}
```

## Success Response

**HTTP Status Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"message": "Successfully created review."
}
```

## Error Responses

**HTTP Status Code** : `400 Bad Request`

**Condition** : The request body has missing or malformed fields.

**Content example**

```json
{
	"success": false,
	"message": "Request body had missing or malformed fields."
}
```

OR

**HTTP Status Code** : `403 Forbidden`

**Condition** : Attempt to add a review without being logged in.

**Content example**

```json
{
	"success": false,
	"message": "Attempted to add a review without being logged in."
}
```

OR

**HTTP Status Code** : `500 Internal Server Error`

**Condition** : The server experiences an error when attempting to create a review for a user.

**Content example**

```json
{
	"success": true,
	"message": "Experienced error when attempting to create a review for a user."
}
```
