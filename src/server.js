'use strict';

const Hapi = require('hapi');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var id;
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
connection.query('SELECT COUNT (*) AS count FROM employee' , function (error, results){
    if(error)
        throw error;
    id = results[0].count;

    //login route (PROTECTED)
    server.route({
        method: 'POST',
        path: '/login',
        handler: function(request, reply) {
        var email = request.payload['email'];
        var password = request.payload['password'];
        var post1 ={email:email} 
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
            else{
                var email = results[0].email;
                var hash = results[0].password_hashes;
                bcrypt.compare(password, hash, function(err, res) {
                    //if the passwords match
                    if(res==true) {
                        //creates a token with an expiration of 10 minutes
                        var response = {
                            "token": jwt.sign({"employee_num": results[0].employee_num, exp: Math.floor(Date.now() / 1000) + (60 * 10)}, secretkey)
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
    //REVIEW ROUTES
    //adding a new review (PROTECTED)
    server.route({
            method: 'POST',
            path: '/addReview',
            handler: function(request, reply) {
            var user_payload = request.payload;
            var employee_num = user_payload['employee_num'];
            var hotness = user_payload['hotness'];
            var accountability = user_payload['accountability'];
            var availability = user_payload['availability'];
            var politeness = user_payload['politeness'];
            var efficiency = user_payload['efficiency'];
            var comments = user_payload['comments'];
            var employer = user_payload['employer'];
            var position = user_payload['position'];
            var review_time = user_payload['review_time'];
            var post = { employee_num:employee_num, hotness:hotness, accountability:accountability, availability:availability, politeness:politeness, efficiency:efficiency, employer:employer, position:position, comments:comments, review_time: review_time};
            connection.query('INSERT INTO employee_review SET ?',post, function (error, results, fields) {
            if (error)
                throw error;
            reply ('Review added to employee: ' + employee_num + '. Hotness: ' + hotness + '.');
            console.log(results);
            });
        }
    });

    //USER ACCOUNT ROUTES (PROTECTED)
    //adding a new user -> making an account
    server.route({
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        method: 'POST',
        path: '/newUser',
        handler: function(request, reply) {
            var user_payload = request.payload;
            var password = user_payload['password'];
            var first_name = user_payload['first_name'];
            var last_name = user_payload['last_name'];
            var email = user_payload['email'];

            if(password===undefined||first_name===undefined||last_name===undefined||email===undefined) {
                var response = {
                    "success": false,
                    "message": "Request body had missing or malformed fields."
                };
                reply(JSON.stringify(response)).code(400);
            }
            else
            {
                connection.query('SELECT first_name FROM employee WHERE email= ?',[email], function (error, results, fields) { 
                    if (error)
                        throw error;
                    if(results.length > 0)
                        reply("Account already exists for user with given email address.");//.code(409);
                    else{
                        var newPass;
                        bcrypt.hash(password, 10, function(err, hash) 
                        {
                            newPass = hash;
                            console.log(password)
                            console.log(first_name)
                            console.log(last_name)
                            console.log(email)
                            id += 1;
                        
                            var post = {password_hashes : newPass, first_name : first_name, last_name : last_name, email : email, employee_num: id};
                            connection.query('INSERT INTO employee SET ?', post, function (error, results, fields) 
                                {
                                    if(error) {
                                        throw error;
                                }
                                
                                if(results != []) {
                                    reply('Successfully created account').code(200);
                                }
                                else
                                { 
                                    reply("Experienced error when attempting to create the user.").code(500);
                                }    
                                console.log(results);
                                });
                        });
                    }
                });
            }
        }
    });

    //User getting all of their reviews (PROTECTED)
    server.route({
        method: 'GET',
        path: '/getEmployeeRevs/{eid}',
        handler: function (request, reply) {
            console.log('Server processing a /getEmployeeRevs request');
            const employee_num = request.params.eid;
            connection.query('SELECT hotness, accountability, availability, politeness, efficiency, comments FROM employee_review WHERE employee_num = ?', employee_num, function (error, results, fields) { 
                if (error)
                    throw error;
                reply(results);
                console.log(results);
            });

        }
    });

    //SEARCH ROUTES (PROTECTED)
    //search by company name or by name, using "first_name last_name" format (PROTECTED)
    server.route({
        method: 'GET',
        path: '/company/{name}',
        handler: function (request, reply) {
            console.log('Server processing a /company/{name} request');
            var name = request.params.name;
            console.log(name);
            connection.query('SELECT first_name,last_name FROM employee WHERE employer = ?',name, function (error1, results1, fields1) {
            //var isEmpty = (results1 || []).length === 0;
            // if (isEmpty) 
            // {
            //     console.log("hi");
            //     var nameArr = name.split("_");
            //     var post1 = {first_name:nameArr[0]}
            //     var post2 = {last_name:nameArr[1]}
            //     connection.query('SELECT first_name,last_name FROM employee WHERE first_name=? AND last_name=?"',[post1,post2], function (error, results, fields) {
            //         reply (results);
            //         console.log(results);
            //     });
            // }
            // else 
            // {
                reply (results1);
                console.log(results1);
            // }
            });
        }
    });

    //Getting all employee info (DOESNT NEED PROTECTION) 
    server.route({
        method: 'GET',
        path: '/getEmployees',
        handler: function (request, reply) {
            console.log('Server processing a /getEmployees request');
            connection.query('SELECT * FROM employee', function (error, results, fields) {
                if (error)
                    throw error;
                reply (results);
                console.log(results);
            });

        }
    });

    //updating a user account (NOT PROTECTED)
    server.route({
        method: 'PUT',
        path: '/updateUser',
        handler: function (request, reply) {
            console.log('Server is updating a user profile...');
            var first_name = request.payload['first_name'];
            var last_name = request.payload['last_name'];
            var email = request.payload['email'];
            var password = request.payload['password'];
            var employer = request.payload['employer'];
            var location = request.payload['location'];
            var post = {first_name:first_name}//,last_name:last_name,email:email,password:password, employer:employer, location:location};
            connection.query('UPDATE employee SET  ? WHERE email = ?',[post, email],function (error, results, fields){
                if(error)
                    throw error;
            // connection.query('UPDATE employee WHERE employee_num = ?',post, function (error, results, fields) {
                reply("things happen");

            });
        }
    });

    //Deleting a user and all of their reviews (PROTECTED)
    server.route({
        method: 'DELETE',
        path: '/deleteUser/{eid}',
        handler: function (request, reply) {
            console.log('Server processing a /deleteUser request');
            const eid = request.params.eid;
            var post = {employee_num : eid};
            connection.query('DELETE FROM employee WHERE employee_num = ?',eid, function (error, results, fields) {
                if (error)
                    throw error;
                reply ('Account deleted for employee with id: ' + eid);
                console.log(results);
            });
            // connection.query('DELETE FROM employee_review WHERE employee_num= ?',post, function (error, results, fields) {
            //     if (error)
            //         throw error;
            //     console.log(results);
            // });
        }
    });

    //Getting all employee info (DOESNT NEED PROTECTION)
    server.route({
        method: 'GET',
        path: '/getReviews',
        handler: function (request, reply) {
            console.log('Server processing a /getReviews request');
            connection.query('SELECT * FROM employee_review', function (error, results, fields) {
                if (error)
                    throw error;
                reply (results);
                console.log(results);
            });
        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    });
});