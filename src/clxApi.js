// ----- Namespace declaration ------
var clx = clx || {};

// =============================================== //
// ==== Wrapper class to more easily use the  ==== //
// ==== CLX API for SMS. ========================= //
// =============================================== //
clx.api = function (config) {

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
	 * needed to use this class we can set it up.
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
	// Make sure there's a username provided.
	if (typeof(config.username) === 'undefined' || config.username.trim().length < 1) {
		throw Error('You need to provide a username.');
	}

	// Make sure there's a password provided.
	if (typeof(config.password) === 'undefined' || config.password.trim().length < 1) {
		throw Error('You need to provide a password.');
	}

	// Make sure there's a http() provided.
	if (typeof(config.http) === 'undefined') {
		throw Error('You need to inject a http() class.');
	}

	// If one is provided we still need to make that it's an
	// instance of the class we need as to avoid crashing later on.
	else {
		if (!(config.http instanceof clx.http)) {
			throw Error('config.http is not an instance of http().');
		}
	}

	// Set the required fields.
	http = config.http;
	http.auth.username = config.username;
	http.auth.password = config.password;

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
		http.setURL('/operator/');

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
		if (!isNaN(operatorId) && parseInt(Number(operatorId)) == operatorId) {
			// Set URL.
			http.setURL('/operator/' + operatorId);

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
	 * Object containing username and password
	 * for basic authentication.
	 * @type {Object}
	 */
	this.auth;

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

		// Set appropriate basic authencation headers.
		this.xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(this.auth.username + ':' + this.auth.password));

		// Setup the callback function.
		this.xhr.onreadystatechange = function () {
			// readyState == 4 means that we only do a check when the
			// request has finished.
			if (that.xhr.readyState === 4) {
				// Parse response.
				var json = responseParser(that.xhr);

				// Send it along to the callback.
				if (typeof(cb) === 'function') {
					cb(json);
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
	function responseParser(response)  {
		try {
			var json = JSON.parse(response.responseText);
			return json;
		}

		catch (e) {
			return {
				'Status code': response.status,
				'Status text': response.statusText
			};
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

// ======== Basic cross-browser solution for ========== //
// ======== encoding and decoding Base64 strings. ===== //
// ======== Credit: Nicholas Ceriminara, ============== //
//
// http://scotch.io/quick-tips/js/how-to-encode-and-decode-strings-with-base64-in-javascript
// 
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}