// =============================================== //
// ==== Abstraction class of the built-in XHR ==== //
// ==== method which is used in this wrapper. ==== //
// ==== This particular version is used to ======= //
// ==== test data locally with the provided ====== //
// ==== data. ==================================== //
// =============================================== //
clx.httpTest = function () {
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
			// If the URL ends with a '/' we need to remove it.
			if (url.substring(url.length - 1) === '/') {
				url = url.substring(0, url.length - 1);
			}

			requestURL = 'data/' + url + '.txt';
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

clx.httpTest.prototype = Object.create(clx.http.prototype);