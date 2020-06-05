import * as L from 'leaflet';
import {Observable} from 'rxjs';

declare module 'leaflet' {
  namespace TileLayer {
    export class WMSHeader extends WMS {
      constructor(
        baseUrl: string,
        options: WMSOptions,
        header: { header: string; value: string }[],
        abort?: Observable<any>
      );
    }
    export function wmsHeader(
      baseUrl: string,
      options: WMSOptions,
      header: { header: string; value: string }[],
      abort?: Observable<any>
    ): L.TileLayer.WMSHeader;
  }
}
