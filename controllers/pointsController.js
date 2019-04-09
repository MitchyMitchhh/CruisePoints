

const pointsModel = require("../models/pointsModel.js");

function getPoints(req, res) {

	pointsModel.getAllCompanies(function(error, results) {
		res.json(results);
	});
}

function alterPoints(req, res) {
	var name = req.body.name;
	var points = req.body.points;
	console.log(name);
	console.log(points);

	pointsModel.alterPoints(name, points);

}

function addClient(req, res) {
	var name = req.body.name;
	var eligible = req.body.eligible;
	console.log(name);
	console.log(eligible);

	pointsModel.addClient(name, eligible);

}

module.exports = {
	getPoints: getPoints,
	alterPoints: alterPoints,
	addClient: addClient
}