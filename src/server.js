'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
	host: '0.0.0.0',
	port: 3000
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

server.route({
	method: 'GET',
	path: '/dummy',
	handler: function (request, reply) {
		console.log('Server processing a / request');
		reply('Hello, world!');
	}
});

//Getting all employee info
server.route({
	method: 'GET',
	path: '/getEmployees',
	handler: function (request, reply) {
		console.log('Server processing a /getEmployees request');

		connection.query('SELECT * FROM employees', function (error, results, fields) {
			if (error)
				throw error;
			reply ('The first employee\'s name is : ' + results[0].first_name);

			console.log(results);
		});

	}
});

//search by employee number
server.route({
	method: 'GET',
	path: '/getEmployee',
	handler: function (request, reply) {
		console.log('Server processing a /getEmployee request');

		connection.query('SELECT first_name AS name FROM employees WHERE employee_num=1112', function (error, results, fields) {
			if (error)
				throw error;
			reply ('Employee name where employee_num is 1112: ' + results[0].name);
			console.log(results);
		});
	}
});

//Getting all employer info
server.route({
	method: 'GET',
	path: '/getEmployer',
	handler: function (request, reply) {
		console.log('Server processing a /getEmployer request');

		connection.query('SELECT * FROM employer', function (error, results, fields) {
			if (error)
				throw error;
			reply ('The first employer\'s company_num is : ' + results[0].company_num);

			console.log(results);
		});

	}
});

//adding a new employer
server.route({
	method: 'POST',
	path: '/newEmployer',
	handler: function(request, reply) {
		var company_num = request.payload.company_num;
		var department_num = request.payload.department_num;
		connection.query('INSERT INTO employer(company_num, department_num) VALUES("' + company_num + '", "' + department_num + '")', function (error, results, fields) {
			if (error)
				throw error;
            //for exemplar purposes, stores the returned value in a variable to be
            //printed to log
            //var solution = results[0].solution;
            reply('Employer Added: ' + company_num + ', '+ department_num);
            console.log(results);
        });
	}
});


//adding a new employer history
server.route({
	method: 'POST',
	path: '/newEmployerHist',
	handler: function(request, reply) {
		var employer_num = request.payload.employer_num;
		var company_num = request.payload.company_num;
		var dateS = request.payload.dateS;
		var dateE = request.payload.dateE;
		connection.query('INSERT INTO employer_history(employer_num, company_num, dateS, dateE) VALUES("' + employer_num + '", "' + company_num + '", "' + dateS + '", "' + dateE+ '")', function (error, results, fields) {
			if (error)
				throw error;
            //for exemplar purposes, stores the returned value in a variable to be
            //printed to log
            //var solution = results[0].solution;
            reply('History Added for: ' + employer_num + ', '+ company_num);
            console.log(results);
        });
	}
});

//adding a new user
server.route({
	method: 'POST',
	path: '/newUser',
	handler: function(request, reply) {
		var username = request.payload.username;
		var password = request.payload.password;
		var first_name = request.payload.first_name;
		var last_name = request.payload.last_name;
		var employee_num = request.payload.employee_num;
		var department_num = request.payload.department_num;
		var position = request.payload.position;
		var email = request.payload.email;
		connection.query('INSERT INTO employees(username, password, first_name, last_name, employee_num, department_num, position, email) VALUES("' + username + '", "' + password + '", "' + first_name + '", "' + last_name + '","' + employee_num + '","' + department_num + '", "' + position + '", "' + email + '")', function (error, results, fields) {
			if (error)
				throw error;
            //for exemplar purposes, stores the returned value in a variable to be
            //printed to log
            //var solution = results[0].solution;
            reply('Employee Added: ' + first_name + ', '+ last_name);
            console.log(results);
        });
	}
});
//Getting all company review info
server.route({
	method: 'GET',
	path: '/getCompanyRevs',
	handler: function (request, reply) {
		console.log('Server processing a /getCompanyRevs request');

		connection.query('SELECT * FROM company_rev', function (error, results, fields) {
			if (error)
				throw error;
			reply ('The first company\'s company_num is : ' + results[0].company_num);

			console.log(results);
		});

	}
});

//Search company by first name
server.route({
	method: 'GET',
	path: '/findEmployees',
	handler: function (request, reply) {
		   console.log('Server processing a /findEmployees request');

		   connection.query('SELECT first_name = (fName) FROM employer WHERE company.name = (company_name) VALUES("' + fName + '", "' + company_name + '")', function (error, results, fields) {
			    if (error)
				        throw error;
			    reply ('The first employer\'s company_num is : ' + results[0].company_num);

			    console.log(results);
		 });

	  }
});

//Getting all employee reviews
server.route({
	method: 'GET',
	path: '/getEmployeeRevs',
	handler: function (request, reply) {
		console.log('Server processing a /getEmployeeRevs request');

		connection.query('SELECT * FROM employee_reviews', function (error, results, fields) {
			if (error)
				throw error;
			reply ('The first employee\'s employee_num is : ' + results[0].employee_num);

			console.log(results);
		});

	}
});

//Getting all employer history 
server.route({
	method: 'GET',
	path: '/getEmployerHistory',
	handler: function (request, reply) {
		console.log('Server processing a /getEmployerHistory request');

		connection.query('SELECT * FROM employer_history', function (error, results, fields) {
			if (error)
				throw error;
			reply ('The first employer\'s employee_num is : ' + results[0].employer_num);

			console.log(results);
		});

	}
});

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
		     connection.query('INSERT INTO employee_reviews(employee_num, hotness, accountability, availability, politeness, efficiency, comments) VALUES("' + employee_num + '", "' + hotness + '", "' + accountability + '", "' + availability + '","' + politeness + '","' + efficiency + '", "' + comments + '")', function (error, results, fields) {
			       if (error)
				         throw error;
			      reply ('Review added to employee: ' + employee_num + '. Hotness: ' + hotness + '.');
			      console.log(results);
		    });
	  }
});

server.route({
	method: 'GET',
	path: '/{name}',
	handler: function (request, reply) {
		console.log('Server processing /name request');
		reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
});

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});
