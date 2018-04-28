# Joule API


## Unauthenticated Routes

* [Login](doc/API/login.md) : `POST /api/login`
* [Search](doc/API/search.md) : `POST /api/search`

### Users

* [Create User](doc/API/users/create_user.md) : `POST /api/users`
* [Get User](doc/API/users/get_user.md) : `GET /api/users/{user_id}`
* [Get Reviews](doc/API/users/get_reviews.md) : `GET /api/users/{user_id}/reviews`


## Authenticated Routes

* [Refresh Token](doc/API/refresh_token.md) : `GET /api/refreshToken`

### Users

* [Create Review for User](doc/API/users/create_review.md) : `POST /api/users/{user_id}/reviews`
* [Update Review](doc/API/users/update_review.md) : `PUT /api/users/{user_id}/reviews/{review_id}`
* [Update User](doc/API/users/update_user.md) : `PUT /api/users/{user_id}`
* [Delete Review](doc/API/users/delete_review.md) : `DELETE /api/users/{user_id}/reviews/{review_id}`
* [Delete User](doc/API/users/delete_user.md) : `DELETE /api/users/{user_id}`