# IndoorAtlas Venue API example using MapBox

## Requirements

* Node (npm)
* Browser
* IndoorAtlas developer account 
* Added location in the IndoorAtlas developer console (https://app.indooratlas.com)
* MapBox access token (https://www.mapbox.com/account/)

## Usage

* Create new API key in the IndoorAtlas developer console and enable the "Positioning API" scope when creating
* Run `npm install` in the root directory
* Create `mapbox-token.js` javascript file in the root of the directory with the following content

```javascript
mapboxgl.accessToken = 'your-mapbox-token';
```


* Run the dummy backend proxy with `IA_API_KEY=<your-indooratlas-apikey> node venue-proxy.js ` setting `<your-indooratlas-apikey>`. For example

```bash
IA_API_KEY=111111-2222-3333-4444-555555555 node venue-proxy.js
```


* Navigate to http://localhost:3000 with your browser and input the ID of the Location you wish to observe
	

