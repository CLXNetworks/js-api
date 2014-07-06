/*******************
 *** THIS FILE CONTAINS UNIT TESTS FOR ALL WORKING COMPONENTS
 *** OF THIS LIBRARY. EACH COMPONENT IS SECTIONED BY A 'MODULE'.
 ***
 *** THESE UNIT TESTS ARE UTILIZING THE QUNIT LIBRARY.
 *** URL: http://qunitjs.com/
 *******************/
'use strict';

/******
 * BY SETTING THIS TO TRUE YOU CAN RUN THE TEST WITH THE
 * LOCAL DATA PROVIDED. USEFUL IF YOU CURRENTLY DON'T HAVE
 * ACCESS TO THE INTERNET.
 ******/
var testLocal = true;

/**
 * CONSIDERING TESTLOCAL VARIABLE THIS LINE BELOW INITIATES
 * THE CORRECT HTTP() CLASS.
 */
var httpClass = (testLocal) ? new clx.httpTest() : new clx.http();

/******
 * THIS BELOW IS WHAT IS CONSIDERED A VALID CONFIGURATION FOR
 * THE LIBRARY CLASS. SINCE MORE THAN ONE UNIT TEST REQUIRES A
 * VALID CONFIUGRATION IT'S USEFUL TO DEFINE IT HERE TO AVOID
 * HAVING TO REPEAT YOURSELF.
 ******/
var validConfig = {
	'username': 'username',
	'password': 'password',
	'http': httpClass
};

/*************
 * CLX.API CONSTRUCTOR TESTS
 * ***********/
module('Constructor tests');

/**
 * Test the class and make sure it returns a valid class object.
 */
test('clx.api - valid constructor', function() {
	var obj = new clx.api(validConfig);
	equal(obj instanceof clx.api, true);
});

/* ========================================== */
/* =========== END OF CONSTRUCTOR TESTS ===== */
/* ========================================== */

/*************
 * CLX.API CONFIGURATION TESTS
 * ***********/
module('clx.api - config tests');

/**
 * Tests if the class accepts a valid configuration.
 */
test('Valid config - username and password provided', function () {
	var obj = new clx.api(validConfig);
	ok(true);
});

/**
 * Tests if the class throws an error when you try to pass a configuration
 * that only has a username and no password or http() class.
 */
test('Invalid config - username but no password provided', function () {
	throws(function () {
		var config = {
			'username': 'username'
		};

		var obj = new clx.api(config);
	}, /password/);
});

/**
 * Tests if the class throws an error when you try to pass a configuration
 * that only has a password and no username or http() class.
 */
test('Invalid config - password but no username provided', function () {
	throws(function () {
		var config = {
			'password': 'password'
		};

		var obj = new clx.api(config);
	}, /username/);
});

/**
 * Tests if the class throws an error when you try to pass a configuration
 * that has a username but the password is blank and no http() class is injected.
 */
test('Invalid config - password is blankspace', function () {
	throws(function () {
		var config = {
			'username': 'username',
			'password': '    '
		};

		var obj = new clx.api(config);
	}, /password/);
});

/**
 * Tests if the class throws an error when you try to pass a configuration
 * that has a password but the username is blank and no http() class is injected.
 */

test('Invalid config - username is blankspace', function () {
	throws(function () {
		var config = {
			'username': '    ',
			'password': 'password'
		};

		var obj = new clx.api(config);
	}, /username/);
});

/**
 * Tests if the class throws an error when you try to pass a configuration
 * that has an username and a password but no http() class is injected.
 */
test('Invalid config - username and password provided but http omitted', function () {
	throws(function () {
		var config = {
			'username': 'username',
			'password': 'password'
		};

		var obj = new clx.api(config);
	}, /you need to inject a http/i);
});

/**
 * Tests if the class throws an error when you try to pass a configuration
 * that has an username and a password but no the third argument is not a http() class.
 */
test('Invalid config - username and password provided but http is not the correct class.', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new String()
		};

		var obj = new clx.api(config);
	}, /is not an instance of/i);
});

/* ========================================== */
/* =========== END OF CONSTRUCTOR TESTS ===== */
/* ========================================== */

/*************
 * CLX.API OPERATOR REQUESTS TESTS
 * ***********/
module('clx.api - operator request tests');

/**
 * Tests if a request with a valid configuration for retrieving all operators passes.
 */
asyncTest('Valid request - getOperators()', function () {
	// Expect 8 assertions.
	expect(8);

	var obj = new clx.api(validConfig);
	obj.getOperators(function(status, operators) {
		// A valid request starts with the status code being 200.
		equal(status, 200);

		/*
		 * Make sure all the expected properties are set.
		 */
		notEqual(operators[0].id, undefined);
		notEqual(operators[0].name, undefined);
		notEqual(operators[0].network, undefined);
		notEqual(operators[0].uniqueName, undefined);
		notEqual(operators[0].isoCountryCode, undefined);
		notEqual(operators[0].operationalState, undefined);
		notEqual(operators[0].operationalStatDate, undefined);
		
		// Start evaluatating.
		start();
	});
});

/**
 * Tets if a request to retrieve a single operator with a valid configuration
 * and a valid operatorId passes.
 */
asyncTest('Valid request - getOperatorById()', function () {
	// Expect 8 assertions.
	expect(8);

	var obj = new clx.api(validConfig);
	obj.getOperatorById(10, function(status, operator) {
		// A valid request starts with the status code being 200.
		equal(status, 200);

		/*
		 * Make sure all the expected properties are set.
		 */
		notEqual(operator.id, undefined);
		notEqual(operator.name, undefined);
		notEqual(operator.network, undefined);
		notEqual(operator.uniqueName, undefined);
		notEqual(operator.isoCountryCode, undefined);
		notEqual(operator.operationalState, undefined);
		notEqual(operator.operationalStatDate, undefined);
		
		// Start evaluatating.
		start();
	});
});

/**
 * Tests if a request to retrieve a single operator with a valid configuration
 * but with a string passed as operatorId throws an error.
 */
test('Invalid request - getOperatorById(): string passed as operator id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getOperatorById('string', function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single operator with a valid configuration
 * but with null passed as operatorId throws an error.
 */
test('Invalid request - getOperatorById(): null passed as operator id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getOperatorById(null, function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single operator with a valid configuration
 * but with an empty operatorId throws an error.
 */
test('Invalid request - getOperatorById(): operator id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getOperatorById(undefined, function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});

/* ========================================== */
/* ===== END OF OPERATOR REQUEST TESTS ====== */
/* ========================================== */

/*************
 * CLX.API GATEWAY REQUESTS TESTS
 * ***********/
module('clx.api - gateway request tests');

/**
 * Tests if a request with a valid configuration to retrieve all gateways passes.
 */
asyncTest('Valid request - getGateways()', function () {
	// Expect 4 assertions.
	expect(4);

	var obj = new clx.api(validConfig);
	obj.getGateways(function(status, gateways) {
		// A valid request starts with the status code being 200.
		equal(status, 200);

		/*
		 * Make sure all the expected properties are set.
		 */
		notEqual(gateways[0].id, undefined);
		notEqual(gateways[0].name, undefined);
		notEqual(gateways[0].type, undefined);
		
		// Start evaluatating.
		start();
	});
});

/**
 * Tets if a request to retrieve a single operator with a valid configuration
 * and a valid gatewayId passes.
 */
asyncTest('Valid request - getGatewayById()', function () {
	// Expect 4 assertions.
	expect(4);

	var obj = new clx.api(validConfig);
	obj.getGatewayById(2186, function(status, gateway) {
		// A valid request starts with the status code being 200.
		equal(status, 200);

		/*
		 * Make sure all the expected properties are set.
		 */
		notEqual(gateway.id, undefined);
		notEqual(gateway.name, undefined);
		notEqual(gateway.type, undefined);
		
		// Start evaluatating.
		start();
	});
});

/**
 * Tests if a request to retrieve a single operator with a valid configuration
 * but with a string passed as gatewayId throws an error.
 */
test('Invalid request - getGatewayById(): string passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getGatewayById('string', function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single operator with a valid configuration
 * but with null passed as gatewayId throws an error.
 */
test('Invalid request - getGatewayById(): null passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getGatewayById(null, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single operator with a valid configuration
 * but with an empty gatewayId throws an error.
 */
test('Invalid request - getGatewayById(): gateway id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getGatewayById(undefined, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/* ========================================== */
/* ====== END OF GATEWAY REQUEST TESTS ====== */
/* ========================================== */

/*************
 * CLX.API PRICE ENTRY REQUESTS TESTS
 * ***********/
module('clx.api - price entries request tests');

/**
 * Tests if a reuqest to retrieve all price entries belonging to a specific gateway
 * with a valid configuration and a valid gatewayId passes.
 */
asyncTest('Valid request - getPriceEntriesByGatewayId()', function () {
	// Expect 5 assertions.
	expect(5);

	var obj = new clx.api(validConfig);
	obj.getPriceEntriesByGatewayId(2186, function(status, prices) {
		// A valid request starts with the status code being 200.
		equal(status, 200);

		/*
		 * Make sure all the expected properties are set.
		 */
		notEqual(prices[0].price, undefined);
		notEqual(prices[0].gateway, undefined);
		notEqual(prices[0].operator, undefined);
		notEqual(prices[0].expireDate, undefined);
		
		// Start evaluatating.
		start();
	});
});

/**
 * Tests if a request to retrieve all price entries belonging to a specific gateway
 * with a valid configuration but with a string passed as gatewayId throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayId(): string passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayId('string', function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve all price entries belonging to a specific gateway
 * with a valid configuration but with null passed as gatewayId throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayId(): null passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayId(null, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve all price entries belonging to a specific gateway
 * with a valid configuration but with the gatewayId missing throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayId(): gateway id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayId(undefined, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway
 * with a valid configuration and a valid gatewayId and operatorId passes.
 */
asyncTest('Valid request - getPriceEntriesByGatewayIdAndOperatorId()', function () {
	// Expecting 5 assertions.
	expect(5);

	var obj = new clx.api(validConfig);
	obj.getPriceEntriesByGatewayIdAndOperatorId(2186, 10, function(status, price) {
		// A valid request starts with the status code being 200.
		equal(status, 200);
		
		/*
		 * Make sure all the expected properties are set.
		 */
		notEqual(price.price, undefined);
		notEqual(price.gateway, undefined);
		notEqual(price.operator, undefined);
		notEqual(price.expireDate, undefined);
		
		// Start evaluatating.
		start();
	});
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway
 * with a valid configuration and a valid operatorId but with a string passed as gatewayId
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): string passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId('string', 10, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway
 * with a valid configuration and a valid operatorId but with null passed as gatewayId
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): null passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId(null, 10, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway
 * with a valid configuration and a valid operatorId but with the gatewayId missing
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): gateway id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId(undefined, 10, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway
 * with a valid configuration and a valid gatewayId but with a string passed as operatorId
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): string passed as operator id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId(2186, 'string', function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway
 * with a valid configuration and a valid gatewayId but with null passed as operatorId
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): null passed as operator id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId(2186, null, function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway
 * with a valid configuration and a valid gatewayId but with the operatorId missing
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): operator id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId(2186, undefined, function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway, operator and
 * date with a valid configuration and a valid gatewayId and operatorId passes.
 */
asyncTest('Valid request - getPriceEntriesByGatewayIdAndOperatorIdAndDate()', function () {
	// Expect 5 assertions.
	expect(5);

	var obj = new clx.api(validConfig);
	obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate(2186, 10, '2011-05-04', function(status, price) {
		// A valid request starts with the status code being 200.
		equal(status, 200);
		
		/*
		 * Make sure all the expected properties are set.
		 */
		notEqual(price.price, undefined);
		notEqual(price.gateway, undefined);
		notEqual(price.operator, undefined);
		notEqual(price.expireDate, undefined);
		
		// Start evaluatating.
		start();
	});
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway, operator and
 * date with a valid configuration and a valid operatorId and date but with a string passed as gatewayId
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorIdAndDate(): string passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate('string', 10, '2011-05-04', function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway, operator and
 * date with a valid configuration and a valid operatorId and date but with null passed as gatewayId
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorIdAndDate(): null passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate(null, 10, '2011-05-04', function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway, operator and
 * date with a valid configuration and a valid operatorId and date but with the gatewayId missing
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorIdAndDate(): gateway id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate(undefined, 10, '2011-05-04', function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway, operator and
 * date with a valid configuration and a valid gatewayId and date but with a string passed as operatorId
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorIdAndDate(): string passed as operator id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate(2186, 'string', '2011-05-04', function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway, operator and
 * date with a valid configuration and a valid gatewayId and date but with null passed as operatorId
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorIdAndDate(): null passed as operator id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate(2186, null, '2011-05-04', function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway, operator and
 * date with a valid configuration and a valid gatewayId and date but with the operatorId missing
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorIdAndDate(): operator id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate(2186, undefined, '2011-05-04', function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway, operator and
 * date with a valid configuration and a valid gatewayId and operatorId but with an integer passed as
 * date throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorIdAndDate(): integer passed as date', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate(2186, 10, 9999, function () {
			// Empty callback.
		});
	}, /parameter 'date' must be a date in format 'yyyy-mm-dd'/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway, operator and
 * date with a valid configuration and a valid gatewayId and operatorId but the date in the wrong format
 * throws an error.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorIdAndDate(): invalid date format', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate(2186, 10, '2014-04-', function () {
			// Empty callback.
		});
	}, /parameter 'date' must be a date in format 'yyyy-mm-dd'/);
});

/**
 * Tests if a request to retrieve a single price entry belonging to a specific gateway, operator and
 * date with a valid configuration and a valid gatewayId and operatorId but the date is omitted and that
 * an error is thrown.
 */
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorIdAndDate(): date omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': httpClass
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorIdAndDate(2186, 10, undefined, function () {
			// Empty callback.
		});
	}, /parameter 'date' must be a date in format 'yyyy-mm-dd'/);
});


/* ========================================== */
/* == END OF PRICE ENTRY REQUEST TESTS ====== */
/* ========================================== */