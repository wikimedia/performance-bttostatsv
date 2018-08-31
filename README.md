# Send  Browsertime metrics to statsv

We use this library at the [Wikimedia Foundation](https://wikimediafoundation.org/) to send cherry picked metrics from [Browsertime](https://github.com/sitespeedio/browsertime) to [statsv](https://wikitech.wikimedia.org/wiki/Graphite#statsv) in our [WebPageReplay/Browsertime](https://wikitech.wikimedia.org/wiki/Performance/WebPageReplay) setup.

## Can you use it?
There's no real use case for you if you are outside of the Foundation since statsv is something we use internally to collect metrics and send it to Graphite. But if you need to check cherry picked metrics from Browsertime, the [source code](https://github.com/wikimedia/performance-bttostatsv) may help.


## How to use it
<code>bttostatsv browsertime.json the.graphite.path.to.your.metrics https://STATSV_ENDPOINT</code>

Note: The individual metric key will be added to all graphite metric path.
