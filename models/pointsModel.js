const { Pool } = require("pg");

const db_url = process.env.DATABASE_URL;

const pool = new Pool({connectionString: db_url});

function getAllCompanies(callback) {
	console.log("Searching the DB");

	var sql = "SELECT DISTINCT c.name, p.points FROM tarCustomer as c JOIN pppCruisePoints as p on c.id = p.CustKey WHERE c.eligible = 'eligible' ORDER BY p.points DESC";

	pool.query(sql, function(err, db_results) {

		if (err) {
			throw err;
		} else {

			var results = {
					list:db_results.rows
				};

			callback(null, results);			
		}

	});

}

function alterPoints(custName, custPoints) {
	console.log(custName);
	console.log(custPoints);

    var sql = "UPDATE pppCruisePoints SET points = points + '" + custPoints + "' FROM tarCustomer WHERE pppCruisePoints.CustKey = tarCustomer.id AND tarCustomer.name = '" + custName + "'";
	pool.query(sql, function(err, db_results) {

		if (err) {
			throw err;
		} else {
			console.log("Table has been updated.")			
		}
	});
}

function addClient(name, eligible, callback) {
	console.log("adding clients");

	var sql = "INSERT INTO tarCustomer (name, eligible) VALUES ('" + name + "', '" + eligible + "')";
	pool.query(sql, function(err, db_results) {

		if (err) {
			throw err;
		} else {

			console.log("New client has been inserted.")			
		}
			var sql = "INSERT INTO pppCruisePoints (points, CustKey) select 0 , id FROM tarCustomer WHERE name = '" + name + "'";
			pool.query(sql, function(err, db_results) {

				if (err) {
					throw err;
				} else {

					console.log("Added points to the new client.")
					var results = {
						success:true,
					};	
				}

			});
	});
}

module.exports = {
	getAllCompanies:getAllCompanies,
	alterPoints:alterPoints,
	addClient:addClient
};