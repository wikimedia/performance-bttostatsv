/**
 * @fileoverview Report the metrics to statsv.
 * @author Peter Hedenskog
 * @copyright (c) 2017, Peter Hedenskog <peter@wikimedia.org>.
 * Released under the Apache 2.0 License.
 */

'use strict';
const request = require( 'request' );

const STATSV_MAX_LENGTH = 1800;

function sendMetrics( url ) {
	request( url, function ( error, response, body ) {
		if ( !error ) {
			console.log( 'Succesfully sent metrics' );
		} else {
			console.error( error );
		}
	} );
}

module.exports = {
	/**
     * Report the metrics by sending them to statsv.
     * @param {Array} metrics An array with metrics keys and values.
     * @param {String} endpoint The endpoint of where to send the metrics.
     */
	send: function ( metrics, endpoint ) {
		let url = `${endpoint}?`;
		let newUrl;

		for ( const metric of metrics ) {
			newUrl = `${url}${metric}&`;
			// If the new length is larger that the limit, send what we have
			if ( newUrl.length >= STATSV_MAX_LENGTH ) {
				url = url.slice( 0, -1 );
				sendMetrics( url, endpoint );
				// Reset base url and add the new one
				url = `${endpoint}?${metric}&`;
			} else {
				url = newUrl;
			}
		}
		// send the last batch of metrics
		url = url.slice( 0, -1 );
		sendMetrics( url, endpoint );
	}
};
