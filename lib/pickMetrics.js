'use strict';

/**
 * @fileoverview Pick the metrics to send from Browsertime
 * @author Peter Hedenskog
 * @copyright (c) 2017, Peter Hedenskog <peter@wikimedia.org>.
 * Released under the Apache 2.0 License.
 */

const get = require( 'lodash.get' );
module.exports = {
	/**
	 * Get the metrics we want from Browsertime.
	 * @param {Object} browsertimeJSON The raw Browsertime JSON.
	 * @param {String} namespace The graphite namespace pre-pend to all keys.
	 * @return {Array} An array of Strings with the complete metric and value in statsv format.
	 */
	get: function ( browsertimeJSON, namespace ) {
		const myMetrics = [];
		const types = [ 'min', 'median', 'mdev' ];
		const metricsToCollect = [
			'visualMetrics.FirstVisualChange',
			'visualMetrics.SpeedIndex',
			'visualMetrics.VisualComplete85',
			'visualMetrics.VisualComplete95',
			'visualMetrics.VisualComplete99',
			'visualMetrics.LastVisualChange',
			'visualMetrics.PerceptualSpeedIndex',
			'visualMetrics.LargestImage',
			'visualMetrics.Logo',
			'visualMetrics.Heading',
			'visualMetrics.CentralNotice',
			'cpu.categories.Rendering',
			'cpu.categories.Scripting',
			'cpu.categories.Loading',
			'cpu.categories.Painting'
		];
		for ( const metric of metricsToCollect ) {
			for ( const type of types ) {
				const value = get( browsertimeJSON, `statistics.${metric}.${type}` );
				if ( value ) {
					myMetrics.push(
						`${namespace}.${metric}.${type}=${value.toFixed( 0 )}ms`
					);
				}
			}
		}

		return myMetrics;
	}
};
