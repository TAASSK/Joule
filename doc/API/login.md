# Log In

Returns a JSON Web Token for a registered user.

**URL** : `/api/login`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
	"email": "[valid email address]",
	"password": "[password in plain text]"
}
```

**Data example**

```json
{
	"email": "jp.joule18@gojoule.me",
	"password": "hunter2"
}
```

## Success Response

**HTTP Status Code** : `200 OK`

**Content example**

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

## Error Response

**HTTP Status Code** : `400 Bad Request`

**Condition** : The supplied username and password combo could not be verified.

**Content example**

```json
{
	"error_message": "Unable to log in with provided credentials."
}
```

## Notes

Joule uses JSON Web Tokens (JWT) for authorization. To log out, one would need to invalidate a given JWT. However, there is no good way of doing this without compromising the benefits of using JWT. Therefore, logging out shall be provided by outright deleting the token.

Continued use of the application will be provided by refreshing (i.e. extending the expiration of) a given token. This will be provided by the [Refresh Token](refresh_token.md) route.