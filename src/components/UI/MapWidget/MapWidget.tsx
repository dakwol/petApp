import React, {FC} from 'react';
import {Dimensions, Image, View} from "react-native";
import styles from "../../MapComponent/styles";
import MapView from "react-native-map-clustering";
import {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {markerImage} from "../../../constants/images";

const MapWidget:FC = () => {

    const [region, setRegion] = React.useState({
        latitude: 55.75583,
        longitude: 37.6177,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    });

    return (
        <View>
            <MapView
                radius={20}
                region={region}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                paddingAdjustmentBehavior={'automatic'}>

            </MapView>
        </View>
    );
};

export default MapWidget;
