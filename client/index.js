var bt = angular.module("braintree.demo", ["ngRoute"])

.value("BtApiKey", "MIIBCgKCAQEA1cXNX6zSvsUJ58ujlhU1stgpoVV3/NvobIvAR41bGwFzOJEsZwyou9ji3RFCjaPgV0/3+TA6djogLTmiaGdgthbMpofitR9mAAboG6aoZqGBrA0GPKNmV04CBFMJHsNKCFw9ZPe9TrpImq7kEq+ZXm9dgNYY1pwhLEdwY/kL75ix1aYSO+Wlj9/UiRzxsWyXvLERz34xOWqji3g3rTKstOLB6kbLw1drVFRKx0W24xhkLSwbd8mrfhRWwkGmiLkO+dPuqRVh5OewDlY52Xntpusjt999AgGdxuEz2o14XiId4EJTNMygpDZQs6mAWeg6oFxePaow8MZApqsg4Nyo+QIDAQAB")

.config(function ($routeProvider) {
	$routeProvider.
		when("/importo", {
			templateUrl: "partials/amount.html",
		}).
		when("/carta", {
			templateUrl: "partials/card.html",
		}).
		when("/conferma", {
			templateUrl: "partials/confirm.html",
		}).
		when("/grazie", {
			templateUrl: "partials/thanks.html",
		}).
		otherwise({
			redirectTo: "/importo"
		});
})

.controller("PaymentController", function ($scope, $http, BtApiKey) {
	$scope.payment = {
		cc: {}
	};
	$scope.payment.pay = function () {
		var braintree = Braintree.create(BtApiKey);
		var payment = {};
		payment.amount						= $scope.payment.amount;
		payment.creditCard					= {};
		payment.creditCard.cardholderName	= $scope.payment.cc.holder;
		payment.creditCard.number			= braintree.encrypt($scope.payment.cc.number);
		payment.creditCard.cvv				= braintree.encrypt($scope.payment.cc.cvv);
		payment.creditCard.expirationMonth	= $scope.payment.cc.month;
		payment.creditCard.expirationYear	= $scope.payment.cc.year;
		payment.creditCard.expirationDate	= $scope.payment.cc.month + "/" + $scope.payment.cc.year;
		payment.options						= {};
		payment.options.submitForSettlement	= true;
		$http.post("/pay", payment).success(function (res) {
			console.log(res);
		});
	};
});
