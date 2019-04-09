function getCustomers() {

	$("#ulCustomers").empty();

	$.get("/getPoints", function(data) {

		for (var i = 0; i < data.list.length; i++) {
			var customers = data.list[i];

			$("#ulCustomers").append("<li>" + "<strong> Client Name: </strong>" + customers.name + " " + "<strong> Client Point Total: </strong>" + customers.points + "</li>");
		}
	})
}

function alterPoints(fields) {
	var name = document.getElementById('custname').value;
	var points = document.getElementById('custpoints').value;
	fields.form.reset();

	$.ajax({
		url: "/alterPoints", 
		type: "PUT",
		data: {name:name, points:points},
		success: function(data) {
			console.log("Updating point total...");
		}
	});
}

function addClient(fields) {
	var name = document.getElementById('name').value;
	var eligible = document.getElementsByName('eligible');

	for (var i = 0, length = eligible.length; i < length; i++)
	{
		if (eligible[i].checked)
		{
			eligible = eligible[i].value;
			break;
		}
	}

	console.log(name);
	console.log(eligible);

	fields.form.reset();

	$.ajax({
		url: "/addClient", 
		type: "POST",
		data: ({name:name, eligible:eligible}),
	}).then(
    function success() {
        getCustomers();
    };

	
}