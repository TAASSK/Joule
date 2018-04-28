# Joule API


## Unauthenticated Routes

* [Login](login.md) : `POST /api/login`
* [Search](search.md) : `POST /api/search`

### Users

* [Create User](users/create_user.md) : `POST /api/users`
* [Get User](users/get_user.md) : `GET /api/users/{user_id}`
* [Get Reviews](users/get_reviews.md) : `GET /api/users/{user_id}/reviews`


## Authenticated Routes

* [Refresh Token](refresh_token.md) : `GET /api/refreshToken`

### Users

* [Create Review for User](users/create_review.md) : `POST /api/users/{user_id}/reviews`
* [Update Review](users/update_review.md) : `PUT /api/users/{user_id}/reviews/{review_id}`
* [Update User](users/update_user.md) : `PUT /api/users/{user_id}`
* [Delete Review](users/delete_review.md) : `DELETE /api/users/{user_id}/reviews/{review_id}`
* [Delete User](users/delete_user.md) : `DELETE /api/users/{user_id}`