# CLX Networks RESTful API - JS Library

This repository is home to the JavaScript wrapper library which goal is to enclose some of the functionality of the RESTful API that CLX Networks provides. By downloading and using this library 
you, as a developer, can jumpstart your development process by skipping over some of the tedious work that goes in to interacting with an API.

## Available methods

The methods listed below are the ones that are currently implemented. More should follow in the future. The required arguments are specified but every methods listed also accepts a callback function.

The purpose of this function is to handle the data that is being fetched by the wrapper. This function should accept two parameters. The first one will be a integer value of the status code that the 
request generated and the second one will be the data. By checking that the status code is a 200 OK in your code you should be safe from any unexpected data. In order to also protect your end user 
from any uncaught exceptions you should also wrap your function calls in a try-catch. Things that throw an exception in this wrapper is mostly incorrect arguments. Eg. passing a string as a integer etc.

1. getOperators()
2. getOperatorById(operatorId)
3. getGateways()
4. getGatewaysById(gatewayId)
5. getPriceEntriesByGatewayId(gatewayId)
6. getPriceEntriesByGatewayIdAndOperatorId(gatewayId, operatorId)
7. getPriceEntriesByGatewayIdAndOperatorIdAndDate(gatewayId, operatorId, 'yyyy-mm-dd')

## Getting started

Start with cloning this entire repository to your desktop or by simply downloading the necessary files. Then it's simply a matter of creating a configuration object and instanisiate a class object 
and you should be all set to start making requests!

```
var config = {
	'username': 'your-username',
	'password': 'your-password',
	'http': new clx.http()
}

var clx = new clx.api(config);

try {
	clx.getOperators(function (status, function () {
		if (status === 200) {
			// Do something with the operators.
		}

		else {
			// The request was successful but no operators were found!
		}
	});
}

catch (e) {
	// Something went wrong with the request.	
}
```

## Unit tests

The unit tests have been implemented by using QUnit (http://qunitjs.com/) and can be found in the tests folder of this repository. To run the tests simply open up the **index.html** file in your 
prefered browser and the tests should run (granted you haven't disabled JavaScript).

If you would like to review the tests and how they work feel free to look around in **tests.js**. The file should be documented and by using the QUnits documentation aswell as looking through the 
**ClxApi.js** file in the *src* folder you should be able to figure out how everyone works pretty well.

## Licence

Licence information to come later.