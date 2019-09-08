import * as L from 'leaflet';


declare module 'leaflet' {
    namespace TileLayer {
        export class WMSHeader extends WMS {
            constructor(
                baseUrl: string,
                options: WMSOptions,
                header: {header: string, value: string}[],
                abort: Promise<void>
            );
        }
    }
    namespace tileLayer {
        export function wmsHeader(
            baseUrl: string,
            options: WMSOptions,
            header: {header: string, value: string}[],
            abort: Promise<void>
        ): WMSHeader;
    }
}
