# Get User

Returns a user of a given ID.

**URL** : `/api/users/{user_id}`

**Method** : `GET`

**Auth required** : NO

## Success Response

**HTTP Status Code** : `200 OK`

**Content example**

```json
{
	"id": 101,
	"email": "jp.joule18@gojoule.me",
	"first_name": "James",
	"last_name": "Joule"
}
```

## Error Responses

**HTTP Status Code** : `400 Bad Request`

**Condition** : The request body had missing or malformed fields.

**Content example**

```json
{
	"success": false,
	"message": "Request body had missing or malformed fields."
}
```

OR

**HTTP Status Code** : `409 Conflict`

**Condition** : An account already exists with the given email address.

**Content example**

```json
{
	"success": false,
	"message": "Account already exists for user with given email address."
}
```

OR

**HTTP Status Code** : `500 Internal Server Error`

**Condition** : The server experiences an error when attempting to retrieve the user.

**Content example**

```json
{
	"success": true,
	"message": "Experienced error when attempting to retrieve the user."
}
```
