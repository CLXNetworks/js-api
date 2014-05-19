'use strict';

module('Constructor tests');
test('clx.api - valid constructor', function() {
	var obj = new clx.api();
	equal(obj instanceof clx.api, true);
});

module('clx.api - config tests');
test('Valid config - username and password provided', function () {
	var config = {
		'username': 'username',
		'password': 'password'
	};

	var obj = new clx.api();
	obj.init(config);

	ok(true);
});
test('Invalid config - username but no password provided', function () {
	throws(function() {
		var config = {
			'username': 'username'
		};

		var obj = new clx.api();
		obj.init(config);
	}, /password/);
});
test('Invalid config - password but no username provided', function () {
	throws(function() {
		var config = {
			'password': 'password'
		};

		var obj = new clx.api();
		obj.init(config);
	}, /username/);
});
test('Invalid config - password is blankspace', function () {
	throws(function() {
		var config = {
			'username': 'username',
			'password': '    '
		};

		var obj = new clx.api();
		obj.init(config);
	}, /password/);
});
test('Invalid config - username is blankspace', function () {
	throws(function() {
		var config = {
			'username': '    ',
			'password': 'password'
		};

		var obj = new clx.api();
		obj.init(config);
	}, /username/);
});

// ==========================
// ========== WIP ===========
// ==== TODO: ===============
// ==== 1. use clx.http =====
// ==========================
module('clx.http - request tests');
asyncTest('200 OK on a valid API call', function() {
	expect(1);

	var config = {
		'username': 'username',
		'password': 'password'
	};
	var obj = new clx.api();
	obj.init(config);

	obj.getOperators(function() {
		equal(200, obj.getStatusCode());
		start();
	});
});
asyncTest('404 Not Found on an invalid API call', function() {
	expect(1);

	throws(function() {
		var config = {
			'username': 'username',
			'password': 'password',
			'baseURL': 'src/'
		};
		var obj = new clx.api();
		obj.init(config);

		obj.getOperators();
	}, /HTTP request failed/);
});