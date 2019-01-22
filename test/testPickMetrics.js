const fs = require( 'fs' );
const test = require( 'ava' );
const path = require( 'path' );
const getMetrics = require( '../lib/pickMetrics' ).get;

const browsertimeJSON = JSON.parse(
	fs.readFileSync( path.join( __dirname, 'browsertimeObamaTimeline.json' ), 'utf8' )
);

const keyStart = 'this.is.my.key';
test( 'Pick right metrics from Browsertime JSON', t => {
	const metrics = getMetrics( browsertimeJSON, keyStart );
	const facit = [
		'this.is.my.key.visualMetrics.FirstVisualChange.min=567ms',
		'this.is.my.key.visualMetrics.FirstVisualChange.median=967ms',
		'this.is.my.key.visualMetrics.FirstVisualChange.mdev=144ms',
		'this.is.my.key.visualMetrics.SpeedIndex.min=711ms',
		'this.is.my.key.visualMetrics.SpeedIndex.median=1079ms',
		'this.is.my.key.visualMetrics.SpeedIndex.mdev=124ms',
		'this.is.my.key.visualMetrics.VisualComplete85.min=800ms',
		'this.is.my.key.visualMetrics.VisualComplete85.median=1167ms',
		'this.is.my.key.visualMetrics.VisualComplete85.mdev=116ms',
		'this.is.my.key.visualMetrics.VisualComplete95.min=800ms',
		'this.is.my.key.visualMetrics.VisualComplete95.median=1167ms',
		'this.is.my.key.visualMetrics.VisualComplete95.mdev=116ms',
		'this.is.my.key.visualMetrics.VisualComplete99.min=2300ms',
		'this.is.my.key.visualMetrics.VisualComplete99.median=2500ms',
		'this.is.my.key.visualMetrics.VisualComplete99.mdev=144ms',
		'this.is.my.key.visualMetrics.LastVisualChange.min=2300ms',
		'this.is.my.key.visualMetrics.LastVisualChange.median=2500ms',
		'this.is.my.key.visualMetrics.LastVisualChange.mdev=153ms',
		'this.is.my.key.visualMetrics.PerceptualSpeedIndex.min=800ms',
		'this.is.my.key.visualMetrics.PerceptualSpeedIndex.median=1138ms',
		'this.is.my.key.visualMetrics.PerceptualSpeedIndex.mdev=114ms',
		'this.is.my.key.cpu.categories.Rendering.min=1590ms',
		'this.is.my.key.cpu.categories.Rendering.median=1675ms',
		'this.is.my.key.cpu.categories.Rendering.mdev=27ms',
		'this.is.my.key.cpu.categories.Scripting.min=1498ms',
		'this.is.my.key.cpu.categories.Scripting.median=1504ms',
		'this.is.my.key.cpu.categories.Scripting.mdev=28ms',
		'this.is.my.key.cpu.categories.Loading.min=184ms',
		'this.is.my.key.cpu.categories.Loading.median=190ms',
		'this.is.my.key.cpu.categories.Loading.mdev=6ms',
		'this.is.my.key.cpu.categories.Painting.min=75ms',
		'this.is.my.key.cpu.categories.Painting.median=81ms',
		'this.is.my.key.cpu.categories.Painting.mdev=11ms'
	];
	t.deepEqual( metrics, facit );
} );
