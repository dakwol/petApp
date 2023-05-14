import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      marker: {
        resizeMode: 'contain',
        // opacity: 0.8,
        height: 40,
        width: 40,
      },
    
      markerFixed: {
        position: 'absolute',
      },
});

export default styles;
