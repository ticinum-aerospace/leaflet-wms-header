# leaflet-wms-header
Custom headers on Leaflet TileLayer WMS.
It's an easy plugin that allow to set custom header for WMS interface.

Based on https://github.com/Leaflet/Leaflet/issues/2091#issuecomment-302706529.

### Installation
```sh
$ npm install leaflet-wms-header --save
```

### JS Usage
```
var wmsLayer = L.TileLayer.wmsHeader(
    'https://demo.boundlessgeo.com/geoserver/ows?',
    {
        layers: 'ne:ne',
        format: 'image/png',
        transparent: true,
    },
    [
        { header: 'Authorization', value: 'JWT ' + MYAUTHTOKEN },
        { header: 'content-type', value: 'text/plain'},
    ]
).addTo(map);
```

### Typescript Usage
```
let wmsLayer: L.TileLayer.WMSHeader = L.TileLayer.wmsHeader(
    'https://demo.boundlessgeo.com/geoserver/ows?',
    {
        layers: layers,
        format: 'image/png',
        transparent: true,
    }, [
        { header: 'Authorization', value: 'JWT ' + MYAUTHTOKEN },
        { header: 'content-type', value: 'text/plain'},
    ]
).addTo(map);
```
