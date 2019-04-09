const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
require('dotenv').config();

const pointsController = require("./controllers/pointsController.js");


app.use(express.static(__dirname + '/public')); // Allow the server to access the public directory
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({extended: true})); // support url encoded bodies

app.get("/getPoints", pointsController.getPoints);

app.put("/alterPoints", pointsController.alterPoints);
app.post("/addSpecialItem", );
app.delete("/deleteSpecialItem", );
app.post("/addClient", pointsController.addClient);

app.listen(port, function() {
    console.log(`Listening on port: ${port}`);
});