'use strict';

const Hapi = require('hapi');
var bcrypt = require('bcrypt');
var id = Math.floor((Math.random()*800) + 120);
//var jwt = require('jsonwebtoken');

// bring your own validation function
/*const validate = async function (decoded, request) {
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return { isValid: false };
    }
    else {
      return { isValid: true };
    }
};*/

const server = new Hapi.Server();
server.connection({
	host: '0.0.0.0',
    port: 3000,
    routes: { cors: true}
});
//await server.register(require('hapi-auth-jwt2'));

/*server.auth.strategy('jwt', 'jwt',
  { key: 'DonaldTrump\'sLeftNut',          // Never Share your secret key
    validate: validate,            // validate function defined above
    verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
  });
server.auth.default('jwt');*/

// adds global URI path prefix to incoming requests
// e.g. <domain>/api/dummy will get routed to /dummy
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


//REVIEW ROUTES
//adding a new review
server.route({
        method: 'POST',
        path: '/addReview',
        handler: function(request, reply) {
          var employee_num = request.payload.employee_num;
          var hotness = request.payload.hotness;
          var accountability = request.payload.accountability;
          var availability = request.payload.availability;
          var politeness = request.payload.politeness;
          var efficiency = request.payload.efficiency;
          var comments = request.payload.comments;
          connection.query('INSERT INTO employee_review(employee_num, hotness, accountability, availability, politeness, efficiency, comments) VALUES("' + employee_num + '", "' + hotness + '", "' + accountability + '", "' + availability + '","' + politeness + '","' + efficiency + '", "' + comments + '")', function (error, results, fields) {
           if (error)
             throw error;
          reply ('Review added to employee: ' + employee_num + '. Hotness: ' + hotness + '.');
          console.log(results);
        });
      }
});

//USER ACCOUNT ROUTES
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

        connection.query('SELECT first_name FROM employee WHERE email= ?',[email], function (error, results, fields) { 
            if (error)
                throw error;
            if(results.length > 0)
               reply("Account already exists for user with given email address.");//.code(409);
            else
                return;
        });
        if(password===undefined||first_name===undefined||last_name===undefined||email===undefined)
            console.log("Request body had missing or malformed fields.").code(400);
        else{
            var newPass;
            bcrypt.hash(password, 10, function(err, hash) {
                newPass = hash;
                console.log(password)
                console.log(first_name)
                console.log(last_name)
                console.log(email)

                // connection.query('INSERT INTO employee(username,password_hashes,first_name,last_name,employee_num,department_name,position,email,employer,location) VALUES(username = ?,password_hashes = ?,first_name = ?,last_name = ?,employee_num = employee_num,department_name = ?,position = ?,email = ?,employer = ?,location = ?)',[null,newPass,first_name,last_name,employee_num,null,null,email,null,null], function (error, results, fields) {
                
                var queryString = `INSERT INTO employee (
                    password_hashes,
                    first_name,
                    last_name,
                    email)
                    VALUES 
                    (
                        password_hashes,
                        first_name,
                        last_name,
                        email
                    ) 
                    `;
                connection.query(
                    queryString,
                    [
                        newPass,
                        first_name,
                        last_name,
                        email
                    ],
                    function (error, results, fields) {
                        if(error) {
                            throw error;
                        }
                        
                        if(results != []) {
                            reply('Successfully created account').code(200);
                        }
                        //else
                        //  reply("Experienced error when attempting to create the user.").code(500);
                        console.log(results);
                });
            });
        }
    }
});

//login route (NOT PROTECTED)
server.route({
        method: 'POST',
        path: '/login',
        handler: function(request, reply) {
          var email = request.payload.email;
          var password = request.payload.password;
          connection.query('SELECT password_hashes FROM employee WHERE email="' + email + '"', function (error, results, fields) { 
              if (error)
                  throw error;
              console.log(results[0].password_hashes);
              var hash = results[0].password_hashes;
              /*const response = {data: "token goes here", statusCode: 200,
                                success: false, message: "unable to login with provided credentials.", statusCode : 400} */
              //return response;
              bcrypt.compare(password, hash, function(err, res) {
                  console.log(res);
                  if(res==true)
                    reply("token goes here").code(200);//reply("login successful");
                  else if(res==false) 
                    reply("unable to login with given credentials.").code(400);
                  else
                    reply("Experienced error when attempting to verify the credentials.").code(500);
              });
        });
      }
});

//User getting all of their reviews (PROTECTED)
server.route({
    method: 'GET',
    path: '/getEmployeeRevs/{eid}',
    handler: function (request, reply) {
        console.log('Server processing a /getEmployeeRevs request');
        const eid = request.params.eid;
        var sql = 'SELECT hotness, accountability, availability, politeness, efficiency, comments FROM employee_review WHERE employee_num= ' + connection.escape(eid);
        connection.query(sql, function (error, results, fields) {
            if (error)
                throw error;
            reply(results);
            console.log(results);
        });

    }
});

//SEARCH ROUTES
//search by company name or by name, using "first_name last_name" format (PROTECTED)
server.route({
    method: 'GET',
    path: '/company/{name}',
    handler: function (request, reply) {
        console.log('Server processing a /company/{name} request');
        var name = request.params.name;
        connection.escapeId(console.log(name));
        connection.query('SELECT first_name,last_name FROM employee WHERE employer="' + name + '"', function (error1, results1, fields1) {
            //if (error)
                //throw error;
            var isEmpty = (results1 || []).length === 0;
            if (isEmpty) {
                var nameArr = name.split(" ");
                connection.query('SELECT first_name,last_name FROM employee WHERE first_name="' +nameArr[0] + '" AND last_name= "' + nameArr[1] + '"', function (error, results, fields) {
                    reply (results);
                    console.log(results);
                });
            }
            else {
                reply (results1);
                console.log(results1);
            }
        });
    }
});

//Getting all employee info 
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

//updating a user account
server.route({
    method: 'PUT',
    path: '/updateUser',
    handler: function (request, reply) {
        console.log('Server is updating a user profile...');
        var first_name = request.payload.first_name;
        var last_name = request.payload.last_name;
        var email = request.payload.email;
        var company = request.payload.company;
        var password = request.payload.password;
        var current_emp_no = request.payload.current_emp_no;
        connection.query('UPDATE employee SET first_name = "' + first_name + '", last_name = "' + last_name + '", email = "' + email + '", employer = "' + company + '", password = "' + password + '" WHERE employee_num = "' + current_emp_no + '";', function (error, results, fields) {
            reply('Information updated for employee number: ' + current_emp_no);
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
        connection.query('DELETE FROM employee WHERE employee_num="' + eid + '"' , function (error, results, fields) {
            if (error)
                throw error;
            reply ('Account deleted for employee with id: ' + eid);
            console.log(results);
        });
        connection.query('DELETE FROM employee_review WHERE employee_num="' + eid + '"' , function (error, results, fields) {
            if (error)
                throw error;
            console.log(results);
        });
    }
});

//Getting all employee info
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