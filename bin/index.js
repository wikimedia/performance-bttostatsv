#!/usr/bin/env node

/**
 * @fileoverview The bin file to run.
 * @author Peter Hedenskog
 * @copyright (c) 2017, Peter Hedenskog <peter@wikimedia.org>.
 * Released under the Apache 2.0 License.
 */

'use strict';
const fs = require( 'fs' );
const getMetrics = require( '../lib/pickMetrics' ).get;
const send = require( '../lib/send' ).send;

const args = process.argv.slice( 2 );

if ( args.length !== 3 ) {
	console.error(
		'Usage: bttostatsv my/browsertime.json graphite.name.space https://my.statsv.endpoint'
	);
} else {
	const browsertime = JSON.parse( fs.readFileSync( args[ 0 ], 'utf8' ) );
	const namespace = args[ 1 ];
	const endpoint = args[ 2 ];
	const metricsToSend = getMetrics( browsertime, namespace );
	send( metricsToSend, endpoint );
}
