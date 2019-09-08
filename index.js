'use strict';

function callAjax(url, callback, headers, abort) {
  var xmlhttp;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.responseType = 'blob';
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      callback(xmlhttp.response);
    }
  }
  xmlhttp.open("GET", url, true);
  for (const h of headers) {
    xmlhttp.setRequestHeader(h.header, h.value)
  }
  if (abort) {
    var sub = abort.then(() => {
      xmlhttp.abort();
    });
  }
  xmlhttp.send();
}

L.TileLayer.WMSHeader = L.TileLayer.WMS.extend({
  initialize: function (url, options, headers, abort) {
    L.TileLayer.WMS.prototype.initialize.call(this, url, options);
    this.headers = headers;
    this.abort = abort;
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
      this.headers,
      this.abort
    )
    return img;
  }
});

L.tileLayer.wmsHeader = function (url, options, headers, abort) {
  return new L.TileLayer.WMSHeader(url, options, headers, abort);
}
