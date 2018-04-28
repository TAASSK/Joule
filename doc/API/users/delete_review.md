# Delete Reivew

Removes a review of a given review ID for a given user ID.

**URL** : `/api/user/{user_id}/reviews/{review_id}`

**Method** : `DELETE`

**Auth required** : YES

**Headers**

```json
Authorization: Bearer <token>
```

## Success Response

**HTTP Status Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"message": "Successfully deleted review with ID: <review_ID_from_request>"
}
```

## Error Responses

**HTTP Status Code** : `400 Bad Request`

**Condition** : The token fails to be decoded.

**Content example**

```json
{
	"success": false,
	"message": "Given token could not be decoded."
}
```

OR

**HTTP Status Code** : `403 Forbidden`

**Condition** : Attempt to delete a review without proper authorization.

**Content example**

```json
{
	"success": false,
	"message": "Attempted to delete a review without proper authorization."
}
```

OR

**HTTP Status Code** : `500 Internal Server Error`

**Condition** : The server experiences an error when attempting to delete the review.

**Content example**

```json
{
	"success": false,
	"message": "Experienced error when attempting to delete the review."
}
```
