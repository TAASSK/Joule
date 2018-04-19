Roughly sketching out what the routes do - will edit and go more into detail when I have more time

localhost:8080/api/addReview
This adds a review to the database given the 7 parameters.

localhost:8080/api/newUser
This adds a review to the database given the 10 parameters.

localhost:8080/api/getEmployeeRevs/{someid}
This searches the reviews for a specific employee, given the id number.

localhost:8080/api/company/{company}
This is a search by company name - so it return a list of all of the employees
in the given company.

localhost:8080/api/getEmployees
Debugging route in a sense - used to see a list of the employees.

localhost:8080/api/deleteUser/{eid}
This deletes an account for a specific user and all of their reviews -
given the employee id.

localhost:8080/api/getReviews
Debugging route in a sense - used to see a list of the employees.
