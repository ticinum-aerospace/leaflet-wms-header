'use strict';

function callAjax(url, callback, headers) {
  var xmlhttp;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.responseType = 'blob';
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      callback(xmlhttp.response);
    }
  }
  xmlhttp.open("GET", url, true);
  for (const h of headers) {
    xmlhttp.setRequestHeader(h.header, h.value)
  }
  xmlhttp.send();
}

L.TileLayer.WMSHeader = L.TileLayer.WMS.extend({
  initialize: function (url, options, headers) {
    L.TileLayer.WMS.prototype.initialize.call(this, url, options);
    this.headers = headers;
  },
  createTile(coords, done) {
    const url = this.getTileUrl(coords);
    const img = document.createElement('img');
    callAjax(
      url,
      (response) => {
        img.src = URL.createObjectURL(response);
        done(null, img);
      },
      this.headers
    )
    return img;
  }
});

L.TileLayer.wmsHeader = function (url, options, headers) {
  return new L.TileLayer.WMSHeader(url, options, headers);
}