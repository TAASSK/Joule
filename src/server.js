'use strict';

const Hapi = require('hapi');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secretkey = 'whatifwearealllivinginasimulation';

const server = new Hapi.Server();
server.connection({
	host: '0.0.0.0',
    port: 3000,
    routes: { cors: true }
});

// adds global URI path prefix to incoming requests
server.realm.modifiers.route.prefix = '/api';

//Initialize the mysql variable and create the connection object with necessary values
//Uses the https://www.npmjs.com/package/mysql package.
var mysql = require('mysql');
var connection = mysql.createConnection({
	//host will be the name of the service from the docker-compose file.
	host: 'database',
	port: 3306,
	database: process.env.MYSQL_DATABASE,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
});

//ROUTES ARE ORDERED BASED ON THE DOCUMENTATION
//START UNAUTHENTICATED ROUTES

//Login
//DONE :)
server.route({
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'POST',
    path: '/login',
    handler: function(request, reply) {
        var email = request.payload['email'];
        var password = request.payload['password'];
        var post1 = {email:email};
        connection.query('SELECT email, password_hashes, employee_num FROM employee WHERE email = ?',email, function (error, results, fields) {
            if(error) {
                var response = {
                    "success": false,
                    "message": "Experienced error when attempting to verify the credentials."
                };
                reply(JSON.stringify(response)).code(500);
            }
            //if the email doesn't match any in the table
            if (results.length == 0) {
                var response = {
                    "success": false,
                    "message": "Unable to log in with provided credentials."
                };
                reply(JSON.stringify(response)).code(400);
            }
            else {
                var email = results[0].email;
                var hash = results[0].password_hashes;
                bcrypt.compare(password, hash, function(err, res) {
                    //if the passwords match
                    if(res==true) {
                        //creates a token with an expiration of 10 minutes
                        var now = new Date();
                        var expiresAt = new Date(now.getTime() + 10*60000);
                        var response = {
                            "token": jwt.sign({"employee_num": results[0].employee_num, exp: expiresAt.getTime() / 1000}, secretkey),
                            "expires_at": expiresAt
                        };
                        reply(JSON.stringify(response)).code(200);
                    }
                    //if the emails match but the passwords don't
                    else {
                        var response = {
                            "success": false,
                            "message": "Unable to log in with provided credentials."
                        }
                        reply(JSON.stringify(response)).code(400);
                    }
                });
            }
        });
    }
});

//Search
//DONE :)
server.route({
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'POST',
    path: '/search',
    handler: function (request, reply) {
        var search_term = request.payload["search_term"];
        connection.query('SELECT employee_num, first_name,last_name, position, employer FROM employee WHERE employer = ?',search_term, function (error1, results1, fields1) {
            if (error1) {
                var response = {
                    "success": false,
                    "message": "Experienced error when attempting to search for: " + search_term
                };
                reply(JSON.stringify(response)).code(500);
            }
            var isEmpty = (results1 || []).length === 0;
            if (isEmpty) {
                var nameArr = search_term.split(" ");
                connection.query('SELECT employee_num, first_name,last_name, position, employer FROM employee WHERE first_name="' + nameArr[0] + '" AND last_name= "' + nameArr[1] + '"', function (error, results, fields) {
                    if (error) {
                        var response = {
                            "success": false,
                            "message": "Experienced error when attempting to search for: " + search_term
                        };
                        reply(JSON.stringify(response)).code(500);
                    }
                    else {
                        var formattedResults = results.map( (elem) => {
                            return {
                                id: elem.employee_num,
                                first_name: elem.first_name,
                                last_name: elem.last_name,
                                job_title: elem.position,
                                employer: elem.employer
                            };
                        });
                        //whether reviews exist for that user or not
                        var response = {
                            "users": formattedResults            
                        }
                        reply(JSON.stringify(response)).code(200);
                    }
                });
            }
            else {
                var formattedResults = results1.map( (elem) => {
                    return {
                        id: elem.employee_num,
                        first_name: elem.first_name,
                        last_name: elem.last_name,
                        job_title: elem.position,
                        employer: elem.employer
                    };
                });
                //whether reviews exist for that user or not
                var response = {
                    "users": formattedResults            
                }
                reply(JSON.stringify(response)).code(200);
            }
        });
    }
});

//Create User
//Done :)
server.route({
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'POST',
    path: '/users',
    handler: function(request, reply) {
        var email = request.payload["email"];
        var password = request.payload["password"];
        var first_name = request.payload["first_name"];
        var last_name = request.payload["last_name"];
        //if any data is missing
        if(password===undefined||first_name===undefined||last_name===undefined||email===undefined) {
            var response = {
                "success": false,
                "message": "Request body had missing or malformed fields."
            };
            reply(JSON.stringify(response)).code(400);
        }
        //if data is present
        else {
            connection.query('SELECT email FROM employee WHERE email= ?',email, function (error, results, fields) {
                //if a user already exists for that email
                if (results.length>0) {
                    var response = {
                        "success": false,
                        "message": "Account already exists for user with given email address."
                    }
                    reply(JSON.stringify(response)).code(409);
                }
                else {
                    var newPass;
                    bcrypt.hash(password, 10, function(err, hash) {
                        newPass = hash;
                        //if all is good, insert the user into the table
                        var post = {password_hashes : newPass, first_name : first_name, last_name : last_name, email : email};
                        connection.query('INSERT INTO employee SET ?', post, function (error, results, fields) {
                            if (error) {
                                var response = {
                                    "success": false,
                                    "message": "Experienced error when attempting to create the user."
                                };
                                reply(JSON.stringify(response)).code(500);
                            }
                            else {
                                var response = {
                                    "success": true,
                                    "message": "Successfully created account."
                                };
                                reply(JSON.stringify(response)).code(200);
                            }
                        });
                    }); 
                }
            });
        }
    }
});

//Get User
//DONE :)
server.route({
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'GET',
    path: '/users/{user_id}',
    handler: function(request, reply) {
        var user_id = request.params["user_id"];
        //if the parameters are missing
        if (user_id===undefined) {
            var response = {
                "success": false,
                "message": "Request body had missing or malformed fields."
            };
            reply(JSON.stringify(response)).code(400);
        }
        //if the parameters are defined
        else {
            connection.query('SELECT employee_num, email, first_name, last_name, position, employer, location FROM employee WHERE employee_num = ? ', user_id, function (error, results, fields) {                
                if (error) {
                    var response = {
                        "success" : false,
                        "message": "Experienced error when attempting to retrieve the user."
                    };
                    reply(JSON.stringify(response)).code(500);
                }
                else if (results.length==0) {
                    var response = {
                        "success" : false,
                        "message" : "The user with ID " +  user_id + " does not exist."
                    }
                    reply(JSON.stringify(response)).code(404);
                }
                else {
                    var response = {
                        id: results[0].employee_num,
                        email: results[0].employee_num,
                        first_name: results[0].first_name,
                        last_name: results[0].last_name,
                        job_title: results[0].position,
                        employer: results[0].employer,
                        location: results[0].location
                    };
                    reply(JSON.stringify(response)).code(200);
                }
            });
        }
    }
});

//Get reviews
//Done :)
server.route({
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'GET',
    path: '/users/{user_id}/reviews',
    handler: function (request, reply) {
        const user_id = request.params["user_id"];
        //first, checks to see if the user with given id exists
        connection.query('SELECT * FROM employee WHERE employee_num= ? ', user_id , function(error, results, fields) {
            if (error) {
                var response = {
                    "success" : false,
                    "message": "Experienced error when attempting to retrieve reviews for the user."
                };
                reply(JSON.stringify(response)).code(500);
            }
            //if the user does not exist
            else if (results.length==0) {
                var response = {
                    "success" : false,
                    "message" : "The user with ID " +  user_id + " does not exist."
                };
                reply(JSON.stringify(response)).code(404);
            }
            //if the user exists
            else {
                connection.query('SELECT * FROM employee_review WHERE employee_num = ? ', user_id , function (error, results, fields) {
                    if (error) {
                        var response = {
                            "success" : false,
                            "message": "Experienced error when attempting to retrieve reviews for the user."
                        };
                        reply(JSON.stringify(response)).code(500);
                    }
                    else {
                        var formattedResults = results.map( (elem) => {
                            return {
                                review_id: elem.review_id,
                                job_title: elem.position,
                                employer: elem.employer,
                                hotness_rating: elem.hotness,
                                availability_rating: elem.availability,
                                accountability_rating: elem.accountability,
                                politeness_rating: elem.politeness,
                                efficiency_rating: elem.efficiency,
                                comment: elem.comments,
                                datestamp: new Date(elem.review_time)
                            }
                        });
                        //whether reviews exist for that user or not
                        var response = {
                            "reviews": formattedResults            
                        }
                        reply(JSON.stringify(response)).code(200);
                    }
                });
            }
        });
    }
});

//END UNAUTHENTICATED ROUTES
//START AUTHENTICATED ROUTES

//Refresh token
//DONE :)
server.route({
    config: {
        cors: {
            headers: ['Authorization'],
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'GET',
    path: '/refreshToken',
    handler: function(request, reply) {
        var token = request.headers.authorization.split(' ')[1];
        if (token===undefined) {
            var response =  {
                "success": false,
                "message": "Request body has missing fields."
            };
            reply(JSON.stringify(response)).code(400);
        }
        else {
            try {
                var verified = jwt.verify(token, secretkey);
                var now = new Date();
                var expiresAt = new Date(now.getTime() + 10*60000);
                var response = {
                        "token": jwt.sign({"employee_num": verified.employee_num, exp: expiresAt.getTime() / 1000}, secretkey),
                        "expires_at": expiresAt
                };
                reply(JSON.stringify(response)).code(200);
            } catch (error) {
                var response = {
                    "success": false,
                    "message": "Unable to refresh the given token."
                };
                reply(JSON.stringify(response)).code(400);
            }
        }
    }
});

//Creating review for user
//Done :)
server.route({
    config: {
        cors: {
            headers: ['Authorization'],
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'POST',
    path: '/users/{user_id}/reviews',
    handler: function(request, reply) {
        var receiver = request.params["user_id"];
        var token = request.headers.authorization.split(' ')[1];
        var job_title = request.payload["job_title"];
        var employer = request.payload["employer"];
        var hotness = request.payload["hotness_rating"];
        var accountability = request.payload["accountability_rating"];
        var availability = request.payload["availability_rating"];
        var politeness = request.payload["politeness_rating"];
        var efficiency = request.payload["efficiency_rating"];
        var comment = request.payload["comment"];
        var datestamp = request.payload["datestamp"].split('T');
        //if any of the fields are missing
        if (token===undefined || receiver === undefined || job_title===undefined || employer === undefined || hotness===undefined || accountability === undefined
            || availability===undefined || politeness=== undefined || efficiency===undefined || comment === undefined || datestamp===undefined) {
            var response =  {
                "success": false,
                "message": "Request body had missing or malformed fields."
            };
            reply(JSON.stringify(response)).code(400);
        }
        //if the fields are there, check if the user is logged in
        else {
            //do that  here
            try {
                var decoded = jwt.decode(token, secretkey);
                connection.query('SELECT * FROM employee WHERE employee_num = ? ', decoded.employee_num, function (error, results, fields) {
                    if (error) {
                        var response = {
                            "success": false,
                            "message": "Experienced error when attempting to create a review for a user."
                        };
                        reply(JSON.stringify(response)).code(500);
                    }
                    else {
                        if (results.length==0) {
                            var response = {
                                "success": false,
                                "message": "Attempted to add a review without being logged in."
                            };
                            reply(JSON.stringify(response)).code(403);
                        }
                        //now we know that that token was valid
                        else {
                            connection.query('SELECT * FROM employee WHERE employee_num = ? ', receiver, function (error, results, fields) {
                                if (error) {
                                    var response = {
                                        "success": false,
                                        "message": "Experienced error when attempting to create a review for a user."
                                    };
                                    reply(JSON.stringify(response)).code(500);
                                }
                                else if (results.length==0) {
                                    var response = {
                                        "sucess": false,
                                        "message": "No user exists for user id: " + receiver
                                    };
                                    reply(JSON.stringify(response)).code(400);
                                }
                                else {
                                    var post = { employee_num:receiver, hotness:hotness, accountability:accountability, availability:availability, politeness:politeness, efficiency:efficiency, employer:employer, position:job_title, comments:comment, review_time: datestamp[0] + datestamp[1].substring(0, -1)};
                                    connection.query('INSERT INTO employee_review SET ?',post, function (error, results, fields) {
                                        if (error) {
                                            var response = {
                                             "success": false,
                                                "message": "Experienced error when attempting to create a review for a user."
                                            };
                                            reply(JSON.stringify(response)).code(500);
                                        }
                                        else {
                                            var response = {
                                                "success": true,
                                                "message": "Successfully created review."
                                            };
                                            reply(JSON.stringify(response)).code(200);
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            } catch(err) {
                var response = {
                    "success": false,
                    "message": "Experienced error when attempting to create a review for a user."
                };
                reply(JSON.stringify(response)).code(500);
            }
        }
    }
});

//updating a user account
//Done :)
server.route({
    config: {
        cors: {
            headers: ['Authorization'],
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'PUT',
    path: '/users/{user_id}',
    handler: function (request, reply) {
        var token = request.headers.authorization.split(' ')[1];
        var first_name = request.payload["first_name"];
        var last_name = request.payload["last_name"];
        var email = request.payload["email"];
        var employer = request.payload["employer"];
        var password = request.payload["password"];
        var job_title = request.payload["job_title"];
        var location = request.payload["location"];
        var user_id = request.params["user_id"];
        var newPass;
        var flag = true;
        try {
            var decoded = jwt.decode(token, secretkey);
            console.log(decoded.employee_num);
            connection.query('SELECT * FROM employee WHERE employee_num= ?', decoded.employee_num, function (error, results, fields) {
                if (error) {
                    var response = {
                        "success": false,
                        "message": "Experienced error when attempting to update the user."
                    };
                    reply(JSON.stringify(response)).code(500);
                }
                else {
                    //if there are no users that match that token
                    if (results.length==0) {
                        var response = {
                            "success": false,
                            "message": "Attempted to update a user without being logged in."
                        };
                        reply(JSON.stringify(response)).code(403);
                    }
                    else if (decoded.employee_num!=user_id) {
                        var response = {
                            "success": false,
                            "message": "Attempted to update a user without proper access."
                        };
                        reply(JSON.stringify(response)).code(400);
                    }
                    else{
                        if (first_name!==null) {
                            var post = {first_name:first_name};
                            connection.query('UPDATE employee SET ? WHERE employee_num = ?',[post,decoded.employee_num], function (error, results, fields) {
                                if (error) {
                                    flag = false;
                                    var response = {
                                        "success": false,
                                        "message": "Experienced error when attempting to update the user."
                                    };
                                    reply(JSON.stringify(response)).code(500);
                                }
                            });
                        }
                        if (last_name!==null) {
                            var post = {last_name:last_name};
                            connection.query('UPDATE employee SET ? WHERE employee_num = ? ', [post ,decoded.employee_num], function (error, results, fields) {
                                if (error) {
                                    flag = false;
                                    var response = {
                                        "success": false,
                                        "message": "Experienced error when attempting to update the user."
                                    };
                                    reply(JSON.stringify(response)).code(500);
                                }
                            });
                        }
                        if (email!==null) {
                            var post = {email:email};
                            connection.query('UPDATE employee SET ? WHERE employee_num = ? ', [post, decoded.employee_num], function (error, results, fields) {
                                if (error) {
                                    flag = false;
                                    var response = {
                                        "success": false,
                                        "message": "Experienced error when attempting to update the user."
                                    };
                                    reply(JSON.stringify(response)).code(500);
                                }
                            });
                        }
                        if (employer!==null) {
                            var post = {employer:employer};
                            connection.query('UPDATE employee SET ? WHERE employee_num = ? ', [post, decoded.employee_num], function (error, results, fields) {
                                if (error) {
                                    flag = false;
                                    var response = {
                                        "success": false,
                                        "message": "Experienced error when attempting to update the user."
                                    };
                                    reply(JSON.stringify(response)).code(500);
                                }
                            });
                        }
                        if (password!==null) {
                            bcrypt.hash(password, 10, function(err, hash) {
                                if (err) {
                                    var response = {
                                        "HERE": "HERE"
                                    };
                                    reply(response);
                                }
                                newPass = hash;
                                console.log(newPass)
                                var post = {password_hashes: newPass};
                                connection.query('UPDATE employee SET ? WHERE employee_num = ? ', [post, decoded.employee_num], function (error, results, fields) {
                                    if (error) {
                                        flag = false;
                                        var response = {
                                            "success": false,
                                            "message": "Experienced error when attempting to update the user."
                                        };
                                        reply(JSON.stringify(response)).code(500);
                                    }
                                    console.log(results);
                                });
                            });
                        }
                        if (job_title!==null) {
                            var post = {position: job_title};
                            connection.query('UPDATE employee SET ? WHERE employee_num = ? ', [post, decoded.employee_num], function (error, results, fields) {                                
                                if (error) {
                                    flag = false;
                                    var response = {
                                        "success": false,
                                        "message": "Experienced error when attempting to update the user."
                                    };
                                    reply(JSON.stringify(response)).code(500);
                                }
                            });
                        }
                        if (location!==null) {
                            var post = {location: location};
                            connection.query('UPDATE employee SET ? WHERE employee_num = ? ', [post, decoded.employee_num], function (error, results, fields) {  
                                if (error) {
                                    flag = false;
                                    var response = {
                                        "success": false,
                                        "message": "Experienced error when attempting to update the user."
                                    };
                                    reply(JSON.stringify(response)).code(500);
                                }
                            });
                        }
                    }
                } 
            });
        } catch (err) {
            flag = false;
            var response = {
                "success": false,
                "message": "Experienced error when attempting to update the user."
            };
            reply(JSON.stringify(response)).code(500);
        } 
        if (flag==true) {
            var response = {
                "success": true,
                "message": "Successfully updated account."
            };
           reply(JSON.stringify(response)).code(200);
        }
    }  
});

//Deleting a user and all of their reviews
//Done :)
server.route({
    config: {
        cors: {
            headers: ['Authorization'],
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'DELETE',
    path: '/user/{user_id}',
    handler: function (request, reply) {
        var user_id = request.params["user_id"];
        var token = request.headers.authorization.split(' ')[1];
        try {
            var decoded = jwt.decode(token, secretkey);
            connection.query('SELECT * FROM employee WHERE employee_num = ? ', decoded.employee_num, function (error, results, fields) {
                if (error) {
                    var response = {
                        "success": false,
                        "message": "Experienced error when attempting to delete the user."
                    };
                    reply(JSON.stringify(response)).code(500);
                }
                else if (results.length==0) {
                    var response = {
                        "success": false,
                        "message": "Attempted to delete a user without proper authorization."
                    };
                    reply(JSON.stringify(response)).code(403);
                }
                else {
                    if (user_id==decoded.employee_num) {
                        connection.query('DELETE FROM employee WHERE employee_num= ? ', user_id, function (error, results, fields) {
                            if (error) {
                                var response = {
                                    "success": false,
                                    "message": "Experienced error when attempting to delete the user."
                                };
                                reply(JSON.stringify(response)).code(500);
                            }
                            else {
                                connection.query('DELETE FROM employee_review WHERE employee_num= ? ', user_id , function (error, results, fields) {
                                    if (error) {
                                        var response = {
                                            "success": false,
                                            "message": "Experienced error when attempting to delete the user."
                                        };
                                        reply(JSON.stringify(response)).code(500);
                                    }
                                    else {
                                        var response = {
                                            "success": true,
                                            "message": "Successfully deleted user with ID: " + user_id
                                        };
                                        reply(JSON.stringify(response)).code(200);
                                    }
                                });
                            }
                        });
                    }
                    else {
                        var response = {
                            "sucess": false,
                            "message": "User with id: " + decoded.employee_num + " does not have access to delete user " + user_id
                        }
                        reply(JSON.stringify(response)).code(403);
                    }
                }
            });
        } catch (err) {
            var response = {
                "success": false,
                "message": "Given token could not be decoded."
            };
            reply (JSON.stringify(response)).code(400);
        }
    }
});

//END AUTHENTICATED ROUTES

//Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});