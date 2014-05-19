// ----- Namespace declaration ------
var clx = clx || {};

// =============================================== //
// ==== Wrapper class to more easily use the  ==== //
// ==== CLX API for SMS. ========================= //
// =============================================== //
clx.api = function () {

	/**
	 * Default values for the fields that are considered optional.
	 * @type {Object}
	 */
	var DEFAULTS = {
		baseURL: '',
		logging: true
	};

	/**
	 * Username for the API.
	 * @type {String}
	 */
	var username;

	/**
	 * Password for the API.
	 * @type {String}
	 */
	var password;

	/**
	 * Base URL to the CLX API.
	 * @type {String}
	 */
	var baseURL;

	/**
	 * Boolean for logging.
	 * @type {Boolean}
	 */
	var logging;

	/**
	 * Performs all HTTP requests that needs to be made.
	 * @type {http}
	 */
	var http;

	/**
	 * By recieving an object containing all the configurations
	 * needed to use this class.
	 * 
	 * Required fields:
	 * 1. Username
	 * 2. Password
	 *
	 * Optional fields:
	 * 1. baseURL.
	 * 2. Logging.
	 * 
	 * @param  {Object} config
	 * @return {Void}
	 */
	this.init = function (config) {
		// Check for a provided username.
		if (typeof(config.username) === 'undefined' || config.username.trim().length < 1) {
			throw Error('You need to provide a username.');
		}

		// Check for a provided password.
		if (typeof(config.password) === 'undefined' || config.password.trim().length < 1) {
			throw Error('You need to provide a password.');
		}

		// Set the required fields.
		username = config.username;
		password = config.password;

		// Check for optionals.
		if (typeof(config.baseURL) != 'undefined' ||
			typeof(config.logging) != 'undefined') {
			baseURL = config.baseURL;
		}

		// If they are not set we set the default values.
		else {
			baseURL = DEFAULTS.baseURL;
			logging = DEFAULTS.logging;
		}

		// Initialize http.
		http = new clx.http();
	}

	/**
	 * Returns the status code from the latest request made.
	 * @return {Integer} HTTP status code
	 */
	this.getStatusCode = function () {
		if (http.xhr.status) {
			return http.xhr.status;
		}

		else {
			throw Error('No HTTP request has been made yet.');
		}
	}

	/**
	 * Retrieves all operators found and performs the callback sent
	 * along with the function call.
	 * @return {Void}
	 */
	this.getOperators = function (callback) {
		// Set the URL.
		http.setURL(baseURL + 'data/testdata.txt');

		// Perform the get operation.
		http.get(callback);
	}

	/**
	 * Returns one operator based on the id provided.
	 * @param  {Integer} operatorId
	 * @return {Operator}
	 */
	this.getOperatorById = function (operatorId, callback) {
		// Verify that the argument provided is an integer.
		if (!isNaN(operatorId) && parseInt(operatorId) == getOperatorById) {
			// Set URL.
			http.setURL(baseURL + '/operator/' + operatorId);

			// Perform the get operation.
			http.get(callback);
		}

		else {
			throw Error('The parameter \'operatorId\' must be an integer.');
		}
	}

}

// =============================================== //
// ==== Abstraction class of the built-in XHR ==== //
// ==== method which is used in this wrapper. ==== //
// =============================================== //
clx.http = function () {
	/**
	 * The URL we want to query.
	 * @type {String}
	 */
	var requestURL;

	/**
	 * XMLHttpRequestObject.
	 * @type {XMLHttpRequest}
	 */
	this.xhr;

	/**
	 * Public method for setting the URL.
	 * Verifies type and length before.
	 * @param {String} url
	 */
	this.setURL = function (url) {
		// Check that the parameter provided is a string and
		// that it's longer than 0.
		if ((typeof url == 'string' || url instanceof String) && url.length > 0) {
			requestURL = url;
		}

		else {
			throw Error('The parameter \'url\' must be a string.');
		}
	}

	/**
	 * Performs a GET request to the set URL and by first making sure that
	 * the data we recieved is correct we can then send it along to the
	 * callback function we take as an argument and then let the user process
	 * the data however they please.
	 * @param  {Function} cb
	 * @return {Void}
	 */
	this.get = function (cb) {
		var that = this;

		// Get the appropriate http object.
		this.xhr = getHttpObject();

		// Setup the callback function.
		this.xhr.onreadystatechange = function () {
			// readyState == 4 means that we only do a check when the
			// request has finished.
			if (that.xhr.readyState === 4) {
				// Handle the response.
				if (that.xhr.status === 200) {
					// Parse response.
					var json = responseParser(that.xhr.responseText);

					// Send it along to the callback.
					if (typeof(cb) === 'function') {
						cb(json);
					}
				}

				// If for some reason the request responded with some other
				// status other than a 200 OK we need to assume something went
				// wrong and throw.
				else {
					throw Error('The HTTP request failed with the status code: ' + that.xhr.status);
				}
			}
		};

		// Perform the request.
		this.xhr.open('GET', requestURL);
		this.xhr.send();
	}

	/**
	 * Takes a string from a HTTP requests and tries to verify that it's valid JSON.
	 * @param  {String} responseText JSON
	 * @return {JSON}
	 */
	function responseParser(responseText)  {
		try {
			var json = JSON.parse(responseText);
			return json;
		}

		catch (e) {
			throw Error('The response could not be parsed as JSON.');
		}
	}

	/**
	 * Returns a HttpRequest object based on what the
	 * user's browser supports.
	 * @return {HttpRequestObject}
	 */
	function getHttpObject() {
		try {return new XMLHttpRequest();}
		catch (error) {}

		try {return new ActiveXObject("Msxml2.XMLHTTP");}
		catch (error) {}

		try {return new ActiveXObject("Microsoft.XMLHTTP");}
		catch (error) {}

		throw new Error("Could not create HTTP request object.");
	}
}