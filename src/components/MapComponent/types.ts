export interface IMapCenterPoint {
    latitude: any,
    longitude: any,
    latitudeDelta: any,
    longitudeDelta: any,
}

export interface IMapComponentProps {
    flex?: number;
    eventMarkers?: any[];
    clusterEnable?: boolean,
    onPressEvent?: (id:number) => void,
    forceCenter?: boolean;
    MapCenterPoint?: IMapCenterPoint;
    onRegionChangeComplete?: (region:any, details?:any) => void | undefined,
    showCenter?: boolean
    regionForSet?: IMapCenterPoint
    mapRef?: any
    onReady?: any
    fitToCenter?:boolean
    fitToMarkers?:boolean
}
