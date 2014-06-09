'use strict';

module('Constructor tests');
test('clx.api - valid constructor', function() {
	var config = {
		'username': 'username',
		'password': 'password',
		'http': new clx.httpTest()
	};

	var obj = new clx.api(config);
	equal(obj instanceof clx.api, true);
});

module('clx.api - config tests');
test('Valid config - username and password provided', function () {
	var config = {
		'username': 'username',
		'password': 'password',
		'http': new clx.httpTest()
	};

	var obj = new clx.api(config);

	ok(true);
});
test('Invalid config - username but no password provided', function () {
	throws(function () {
		var config = {
			'username': 'username'
		};

		var obj = new clx.api(config);
	}, /password/);
});
test('Invalid config - password but no username provided', function () {
	throws(function () {
		var config = {
			'password': 'password'
		};

		var obj = new clx.api(config);
	}, /username/);
});
test('Invalid config - password is blankspace', function () {
	throws(function () {
		var config = {
			'username': 'username',
			'password': '    '
		};

		var obj = new clx.api(config);
	}, /password/);
});
test('Invalid config - username is blankspace', function () {
	throws(function () {
		var config = {
			'username': '    ',
			'password': 'password'
		};

		var obj = new clx.api(config);
	}, /username/);
});
test('Invalid config - username and password provided but http omitted', function () {
	throws(function () {
		var config = {
			'username': 'username',
			'password': 'password'
		};

		var obj = new clx.api(config);
	}, /you need to inject a http/i);
});
test('Invalid config - username and password provided but http is not the correct class.', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new String()
		};

		var obj = new clx.api(config);
	}, /is not an instance of/i);
})

module('clx.api - operator request tests');
asyncTest('Valid request - getOperators()', function () {
	expect(1);

	var config = {
		'username': ' rest_api',
		'password': ' rest_api',
		'http': new clx.httpTest()
	};
	var obj = new clx.api(config);

	obj.getOperators(function() {
		equal(obj.getStatusCode(), 200);
		start();
	});
});
asyncTest('Valid request - getOperatorById()', function () {
	expect(1)

	var config = {
		'username': ' rest_api',
		'password': ' rest_api',
		'http': new clx.httpTest()
	};
	var obj = new clx.api(config);

	obj.getOperatorById(10, function() {
		equal(obj.getStatusCode(), 200);
		start();
	});
});
test('Invalid request - getOperatorById(): string passed as operator id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getOperatorById('string');
	}, /parameter 'operatorId' must be an integer/);
});
test('Invalid request - getOperatorById(): operator id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getOperatorById();
	}, /parameter 'operatorId' must be an integer/);
});

module('clx.api - gateway request tests');
asyncTest('Valid request - getGateways()', function () {
	expect(1);

	var config = {
		'username': ' rest_api',
		'password': ' rest_api',
		'http': new clx.httpTest()
	};
	var obj = new clx.api(config);

	obj.getGateways(function() {
		equal(obj.getStatusCode(), 200);
		start();
	});
});
asyncTest('Valid request - getGatewayById()', function () {
	expect(1)

	var config = {
		'username': ' rest_api',
		'password': ' rest_api',
		'http': new clx.httpTest()
	};
	var obj = new clx.api(config);

	obj.getGatewayById(2186, function() {
		equal(obj.getStatusCode(), 200);
		start();
	});
});
test('Invalid request - getGatewayById(): string passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getGatewayById('string');
	}, /parameter 'gatewayId' must be an integer/);
});
test('Invalid request - getGatewayById(): null passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getGatewayById(null, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});
test('Invalid request - getGatewayById(): gateway id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getGatewayById();
	}, /parameter 'gatewayId' must be an integer/);
});

module('clx.api - price entries request tests');
asyncTest('Valid request - getPriceEntriesByGatewayId()', function () {
	expect(1)

	var config = {
		'username': ' rest_api',
		'password': ' rest_api',
		'http': new clx.httpTest()
	};
	var obj = new clx.api(config);

	obj.getGatewayById(2186, function() {
		equal(obj.getStatusCode(), 200);
		start();
	});
});
test('Invalid request - getPriceEntriesByGatewayId(): string passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getGatewayById('string', function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});
test('Invalid request - getPriceEntriesByGatewayId(): null passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getGatewayById(null, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});
test('Invalid request - getPriceEntriesByGatewayId(): null passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getGatewayById(null);
	}, /parameter 'gatewayId' must be an integer/);
});
test('Invalid request - getPriceEntriesByGatewayId(): gateway id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getGatewayById();
	}, /parameter 'gatewayId' must be an integer/);
});
asyncTest('Valid request - getPriceEntriesByGatewayIdAndOperatorId()', function () {
	expect(1)

	var config = {
		'username': ' rest_api',
		'password': ' rest_api',
		'http': new clx.httpTest()
	};
	var obj = new clx.api(config);

	obj.getPriceEntriesByGatewayIdAndOperatorId(2186, 10, function() {
		equal(obj.getStatusCode(), 200);
		start();
	});
});
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): string passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId('string', 10, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): null passed as gateway id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId(null, 10, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): gateway id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId(undefined, 10, function () {
			// Empty callback.
		});
	}, /parameter 'gatewayId' must be an integer/);
});
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): string passed as operator id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId(2186, 'string', function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): null passed as operator id', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId(2186, null, function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});
test('Invalid request - getPriceEntriesByGatewayIdAndOperatorId(): operator id omitted', function () {
	throws(function () {
		var config = {
			'username': 'test',
			'password': 'test',
			'http': new clx.httpTest()
		};
		var obj = new clx.api(config);

		obj.getPriceEntriesByGatewayIdAndOperatorId(2186, undefined, function () {
			// Empty callback.
		});
	}, /parameter 'operatorId' must be an integer/);
});