# Examples

Below are 'hands-on' examples on how to use each and every one of the wrappers available methods.

## getGatewayById
```
// Create a configuration object.
// The required fields are the ones below.
var config = {
	'username': 'username',
	'password': 'password',
	'http': new clx.httpTest()
};

try {
	// Initiate an instance of the wrapper class.
	var obj = new clx.api(config);

	// The function call takes a callback and your requested data
	// gets injected as an argument.
	obj.getGatewayById(2186, function (status, gateway) {
		if (status === 200) {
			// Handle data.

			// Properties of gateway:
			// 1. id
			// 2. name
			// 3. type
		}

		else {
			// The request was successful but no content was found.
		}
	});
}

catch (e) {
	// Something went wrong with the request!
}
```

## getGateways

```
// Create a configuration object.
// The required fields are the ones below.
var config = {
	'username': 'username',
	'password': 'password',
	'http': new clx.httpTest()
};

try {
	// Initiate an instance of the wrapper class.
	var obj = new clx.api(config);

	// The function call takes a callback and your requested data
	// gets injected as an argument.
	obj.getGateways(function (status, gateways) {
		if (status === 200) {
			// Handle the data. An array of gateways.

			// Properties of each gateway:
			// 1. id
			// 2. name
			// 3. type
		}

		else {
			// The request was successful but no content was found.
		}
	});
}

catch (e) {
	// Something went wrong with the request!
}
```

## getOperatorById
```
// Create a configuration object.
// The required fields are the ones below.
var config = {
	'username': 'username',
	'password': 'password',
	'http': new clx.httpTest()
};

try {
	// Initiate an instance of the wrapper class.
	var obj = new clx.api(config);

	// The function call takes a callback and your requested data
	// gets injected as an argument.
	obj.getOperatorById(10, function (status, operator) {
		if (status === 200) {
			// Handle the data.

			// Properties of operator:
			// 1. id
			// 2. name
			// 3. network
			// 4. uniqueName
			// 5. isoCountryCode
			// 6. operationalState
			// 7. operationalStatDate
			// 8. numberOfSubscribers
		}

		else {
			// The request was successful but no content was found.
		}
	});
}

catch (e) {
	// Something went wrong with the request!
}
```

## getOperators

```
// Create a configuration object.
// The required fields are the ones below.
var config = {
	'username': 'username',
	'password': 'password',
	'http': new clx.httpTest()
};

try {
	// Initiate an instance of the wrapper class.
	var obj = new clx.api(config);

	// The function call takes a callback and your requested data
	// gets injected as an argument.
	obj.getOperators(function (status, operators) {
		if (status === 200) {
			// Handle the data. An array of operators.

			// Properties of each operator:
			// 1. id
			// 2. name
			// 3. network
			// 4. uniqueName
			// 5. isoCountryCode
			// 6. operationalState
			// 7. operationalStatDate
			// 8. numberOfSubscribers
		}

		else {
			// The request was successful but no content was found.
		}
	});
}

catch (e) {
	// Something went wrong with the request!
}
```

## getPriceEntriesByGatewayId

```
// Create a configuration object.
// The required fields are the ones below.
var config = {
	'username': 'username',
	'password': 'password',
	'http': new clx.httpTest()
};

try {
	// Initiate an instance of the wrapper class.
	var obj = new clx.api(config);

	// The function call takes a callback and your requested data
	// gets injected as an argument.
	obj.getPriceEntriesByGatewayId(2186, function (status, priceEntries) {
		if (status === 200) {
			// Handle the data. An array of price entries.

			// Properties of each price entry:
			// 1. id
			// 2. name
			// 3. type
		}

		else {
			// The request was successful but no content was found.
		}
	});
}

catch (e) {
	// Something went wrong with the request!
}
```

## getPriceEntriesByGatewayIdAndOperatorId

```
// Create a configuration object.
// The required fields are the ones below.
var config = {
	'username': 'username',
	'password': 'password',
	'http': new clx.httpTest()
};

try {
	// Initiate an instance of the wrapper class.
	var obj = new clx.api(config);

	// The function call takes a callback and your requested data
	// gets injected as an argument.
	obj.getPriceEntriesByGatewayIdAndOperatorId(2186, 10, function (status, priceEntries) {
		if (status === 200) {
			// Handle the data. An array of price entries.

			// Properties of each price entry:
			// 1. id
			// 2. name
			// 3. type
		}

		else {
			// The request was successful but no content was found.
		}
	});
}

catch (e) {
	// Something went wrong with the request!
}
```

## getPriceEntriesByGatewayIdAndOperatorIdAndDate

```
// Create a configuration object.
// The required fields are the ones below.
var config = {
	'username': 'username',
	'password': 'password',
	'http': new clx.httpTest()
};

try {
	// Initiate an instance of the wrapper class.
	var obj = new clx.api(config);

	// The function call takes a callback and your requested data
	// gets injected as an argument.
	obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate(2186, 10, '2011-04-04', function (status, priceEntries) {
		if (status === 200) {
			// Handle the data. An array of price entries.

			// Properties of each price entry:
			// 1. id
			// 2. name
			// 3. type
		}

		else {
			// The request was successful but no content was found.
		}
	});
}

catch (e) {
	// Something went wrong with the request!
}
```