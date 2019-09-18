// import L from "leaflet";
'use strict';

async function fetchImage(url, callback, headers) {
  let _headers = {};
  headers.forEach(h => {
    _headers[h.header] = h.value;
  });
  const f = await fetch(url, {
    method: "GET",
    headers: _headers,
    mode: "cors"
  });
  const blob = await f.blob();
  callback(blob);
}

L.TileLayer.WMSHeader = L.TileLayer.WMS.extend({
  initialize: function (url, options, headers) {
    L.TileLayer.WMS.prototype.initialize.call(this, url, options);
    this.headers = headers;
  },
  createTile(coords, done) {
    const url = this.getTileUrl(coords);
    const img = document.createElement("img");
    img.setAttribute("role", "presentation");

    fetchImage(
      url,
      resp => {
        const reader = new FileReader();
        reader.onload = () => {
          img.src = reader.result;
        };
        reader.readAsDataURL(resp);
        done(null, img);
      },
      this.headers
    );
    return img;
  }
});

L.TileLayer.wmsHeader = function (url, options, headers, abort) {
  return new L.TileLayer.WMSHeader(url, options, headers, abort);
};
