// =============================================== //
// ==== Abstraction class of the built-in XHR ==== //
// ==== method which is used in this wrapper. ==== //
// ==== This particular version is used to ======= //
// ==== test data locally with the provided ====== //
// ==== data. ==================================== //
// =============================================== //
clx.httpTest = function () {
	var self = this;

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
	this.auth = {};

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
			// Firstly check if there is a query string and if there is we
			// need to remove it to properly test it locally.
			if (url.indexOf('?') !== -1) {
				url = url.substring(0, url.lastIndexOf('?'));
			}

			// If the URL ends with a '/' we need to remove it.
			if (url.substring(url.length - 1) === '/') {
				url = url.substring(0, url.length - 1);
			}

			requestURL = 'data' + url + '.txt';
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
	 * @param  {Function} callback
	 * @return {Void}
	 */
	this.get = function (callback) {
		var that = this;

		// Get the appropriate http object.
		this.xhr = getHttpObject();

		// Authenticate.
		autenticate();

		// Setup the callback function.
		this.xhr.onreadystatechange = function () {
			// readyState == 4 means that we only do a check when the
			// request has finished.
			if (that.xhr.readyState === 4) {
				// Parse response.
				var json = responseParser(that.xhr);

				// Send it along to the callback.
				if (typeof(callback) === 'function') {
					callback(that.xhr.status, json);
				}
			}
		};

		// Perform the request.
		this.xhr.open('GET', requestURL);

		// Execute.
		this.xhr.send();
	}

	/**
	 * For extendability this very basic functionality is in it's own function.
	 * @return {Void}
	 */
	function autenticate() {
		if (typeof self.xhr !== undefined) {
			// Make sure username and password are set.
			if (self.auth.username === undefined || self.auth.username.length < 1) {
				throw Error('You need to provide a username.');
			}

			if (self.auth.password === undefined || self.auth.password.length < 1) {
				throw Error('You need to provide a password.');
			}

			// Base64 encode the username and password.
			var authString = Base64.encode(self.auth.username + ':' + self.auth.password);

			// Authenticate by simply checking the provided auth data with
			// the some hardcoded ones which will do for local testing.
			var username = 'username';
			var password = 'password';

			if (self.auth.username !== username || self.auth.password !== password) {
				throw Error('The username and password doesn\'t match.');
			}
		}
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

clx.httpTest.prototype = Object.create(clx.http.prototype);

// ======== Basic cross-browser solution for ========== //
// ======== encoding and decoding Base64 strings. ===== //
// ======== Credit: Nicholas Ceriminara, ============== //
//
// http://scotch.io/quick-tips/js/how-to-encode-and-decode-strings-with-base64-in-javascript
// 
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}