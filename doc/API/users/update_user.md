# Update User

Edits the personal information for a user with a given ID.

**URL** : `/api/users/{user_id}`

**Method** : `PUT`

**Auth required** : YES

**Headers**

```json
Authorization: Bearer <token>
```

**Data constraints**

```json
{
	"email": "[valid email address]",
	"first_name" : "[first name]",
	"last_name": "[last name]",
	"password": "[password in plain text]",
	"job_title": "[job title]",
	"employer": "[employer]"
}
```

**Data example**

Updating employment information:

```json
{
	"email": null,
	"first_name" : null,
	"last_name": null,
	"password": null,
	"job_title": "Brewer, Science Hobbyist",
	"employer": "Self Employed"
}
```

Changing password:

```json
{
	"email": null,
	"first_name" : null,
	"last_name": null,
	"password": pa$$w0rd,
	"job_title": null,
	"employer": null
}
```

## Success Response

**HTTP Status Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"message": "Successfully updated account."
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

**Condition** : Attempt to update a user without being logged in.

**Content example**

```json
{
	"success": false,
	"message": "Attempted to update a user without being logged in."
}
```

OR

**HTTP Status Code** : `500 Internal Server Error`

**Condition** : The server experiences an error when attempting to update the user.

**Content example**

```json
{
	"success": true,
	"message": "Experienced error when attempting to update the user."
}
```
