# Search

Returns a list of users based on a given search term, either by a user's name OR by a user's company name.

**_N.B._** For the moment, this route only returns results based on exact search terms.

**URL** : `/api/search`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
	"search_term": "[user's name | user's company name]"
}
```

**Data examples**

Search by name:

```json
{
	"search_term": "James Joule"
}
```

Search by company:

```json
{
	"search_term": "Joule Brewery"
}
```

## Success Response

**HTTP Status Code** : `200 OK`

**Content example**

```json
{
	"users": [
		{
			"id": 101,
			"email": "jp.joule18@gojoule.me",
			"first_name": "James",
			"last_name": "Joule"
		},
		{
			"id": 535,
			"email": "jjoule@kelvin.com",
			"first_name": "James",
			"last_name": "Joule"
		},
		{
			"id": 27,
			"email": "electricityluver@aol.com",
			"first_name": "James",
			"last_name": "Joule"
		}
	]
}
```

\* it is possible for the list of users to be an empty list

## Error Response

**HTTP Status Code** : `500 Internal Server Error`

**Condition** : The server experiences an error when attempting to search for the given search term.

**Content example**

```json
{
	"success": true,
	"message": "Experienced error when attempting to search for: <repeat search term here>"
}
```
