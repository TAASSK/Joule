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

* `reviewer_id` - user ID of user ***giving*** review
* `quality_rating` - a rating for overall quality; must be integer between 0 and 100, inclusive
* `recommend_rating` - a rating for "would recommend"; must be integer between 0 and 100, inclusive
* `comment` - simple text string containing comment body
* `datestamp` - ISO 8601 date string (ex. `"2018-04-28T01:55:51.834Z"`) representing date and time of posting of original review
* `is_anonymous` - boolean flag to indicate an anonymous review
* `is_edited` - boolean flag to indicate whether a review has been edited; will always be false on this endpoint
* `edit_datestamp` - ISO 8601 date string (ex. `"2018-04-28T01:55:51.834Z"`) representing date and time of edit

```json
{
	"reviewer_id": <integer>,
	"quality_rating": <integer>,
	"recommend_rating": <integer>,
	"comment": "[comment body]",
	"datestamp": "[ISO 8601 date string]",
	"is_anonymous": <boolean>,
	"is_edited": <boolean = false>,
	"edit_datestamp": "[ISO 8601 date string]"
}
```

**Data example**

```json
{
	"reviewer_id": 101,
	"quality_rating": 78,
	"recommend_rating": 84,
	"comment": "Hard worker.",
	"datestamp": "2018-04-28T01:55:51.834Z",
	"is_anonymous": false,
	"is_edited": false,
	"edit_datestamp": null
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
