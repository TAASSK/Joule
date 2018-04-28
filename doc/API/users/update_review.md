# Update Review for User

Edits a review of a given ID for a user with a given ID.

**URL** : `/api/users/{user_id}/reviews/{review_id}`

**Method** : `PUT`

**Auth required** : YES

**Headers**

```json
Authorization: Bearer <token>
```

**Data constraints**

* `review_id` - review ID
* `quality_rating` - updated rating for overall quality; must be integer between 0 and 100, inclusive
* `recommend_rating` - updated rating for "would recommend"; must be integer between 0 and 100, inclusive
* `comment` - simple text string containing comment body
* `is_anonymous` - boolean flag to indicate an anonymous review
* `is_edited` - boolean flag to indicate whether a review has been edited; will always be true on this endpoint
* `edit_datestamp` - ISO 8601 date string (ex. `"2018-04-28T01:55:51.834Z"`) representing date and time of edit

```json
{
	"quality_rating": <integer>,
	"recommend_rating": <integer>,
	"comment": "[comment body]",
	"is_anonymous": <boolean>,
	"is_edited": <boolean = true>,
	"edit_datestamp": "[ISO 8601 date string]"
}
```

**Data example**

```json
{
	"quality_rating": 95,
	"recommend_rating": 93,
	"comment": "Must hire.",
	"is_anonymous": false,
	"is_edited": true,
	"edit_datestamp": "2018-04-28T02:36:57.272Z"
}
```

\* some or all of the `quality_rating`, `recommend_rating`, `comment`, fields may be null, in which case the original value will remain

## Success Response

**HTTP Status Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"message": "Successfully updated review."
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

**Condition** : Attempt to update a review without being logged in.

**Content example**

```json
{
	"success": false,
	"message": "Attempted to update a review without being logged in."
}
```

OR

**HTTP Status Code** : `500 Internal Server Error`

**Condition** : The server experiences an error when attempting to update a review for a user.

**Content example**

```json
{
	"success": true,
	"message": "Experienced error when attempting to update a review for a user."
}
```
