var braintree = require("braintree");
var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: "hhymk4sg6yvm4wws",
	publicKey: "g8yb47tkwq24cth9",
	privateKey: "7d1bf77bb220ea7423e7733f8178e2d1"
});

var express = require("express");
var bodyParser = require("body-parser");
var serveStatic = require("serve-static");
var app = express();
app.use(bodyParser());
app.use(serveStatic(__dirname + "/client"));
app.post("/pay", function (req, res) {
	var payment = req.body;
	console.log(payment);
	gateway.transaction.sale(payment, function (err, suc) {
		if (err) {
			res.json({status: "error", details: err});
		} else {
			res.json({status: "success", details: suc});
		}
	});
});
app.listen(8080);
