'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
	host: '0.0.0.0',
    port: 3000,
    routes: { cors: true}
});

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
    method: 'POST',
    path: '/newUser',
    handler: function(request, reply) {
        var username = request.payload.username;
        var password = request.payload.password;
        var first_name = request.payload.first_name;
        var last_name = request.payload.last_name;
        var employee_num = request.payload.employee_num;
        var department_name = request.payload.department_name;
        var position = request.payload.position;
        var email = request.payload.email;
        var employer = request.payload.employer;
        var location = request.payload.location;
        connection.query('INSERT INTO employee(username, password, first_name, last_name, employee_num, department_name, position, email, employer, location) VALUES("' + username + '", "' + password + '", "' + first_name + '", "' + last_name + '","' + employee_num + '","' + department_name + '", "' + position + '", "' + email + '", "' + employer +'", "' + location + '")', function (error, results, fields) {
            if (error)
                throw error;
            reply('Employee Added: ' + first_name + ', '+ last_name);
            console.log(results);
        });
    }
});

//User getting all of their reviews
server.route({
    method: 'GET',
    path: '/getEmployeeRevs/{eid}',
    handler: function (request, reply) {
        console.log('Server processing a /getEmployeeRevs request');
        const eid = request.params.eid;
        connection.query('SELECT hotness, accountability, availability, politeness, efficiency, comments FROM employee_review WHERE employee_num="' + eid + '"', function (error, results, fields) {
            if (error)
                throw error;
            reply(results);
            console.log(results);
        });

    }
});

//SEARCH ROUTES
//search by employee number
server.route({
    method: 'GET',
    path: '/company/{name}',
    handler: function (request, reply) {
        console.log('Server processing a /company/{name} request');
        const name = request.params.name;
        connection.query('SELECT first_name,last_name FROM employee WHERE employer="' + name + '"', function (error, results, fields) {
            if (error)
                throw error;
            reply (results);
            console.log(results);
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

//Deleting a user and all of their reviews
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