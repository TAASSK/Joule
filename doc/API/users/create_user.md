# Create User

Registers a user.

**URL** : `/api/users`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
	"email": "[valid email address]",
	"first_name" : "[first name]",
	"last_name": "[last name]",
	"password": "[password in plain text]"
}
```

**Data example**

```json
{
	"email": "jp.joule18@gojoule.me",
	"first_name" : "James",
	"last_name": "Joule",
	"password": "hunter2"
}
```

## Success Response

**HTTP Status Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"message": "Successfully created account."
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

**Condition** : The server experiences an error when attempting to create the user.

**Content example**

```json
{
	"success": true,
	"message": "Experienced error when attempting to create the user."
}
```
