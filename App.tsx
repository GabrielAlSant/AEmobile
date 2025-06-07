import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {styles}  from './styles/styles'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
const [location, setLocation] = useState<LocationObject | null>(null);

const mapRef = useRef<MapView>(null);

  async function requestLocationPermition(){
    const { status } = await requestForegroundPermissionsAsync();

    if (status){
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

useEffect(()=>{
  requestLocationPermition()
},[])  

useEffect(()=>{
  watchPositionAsync({
    accuracy: LocationAccuracy.Highest,
    timeInterval: 1000,
    distanceInterval: 1
  },(response)=>{
   console.log(response)
   setLocation(response)
   mapRef.current?.animateCamera({
    pitch:90,
    center: response.coords
   })
  })
},[])  



  return (
    <View style={styles.container}>
     { location &&

<MapView
ref={mapRef}
style={styles.map}
initialRegion={{
latitude: location. coords. latitude,
longitude: location. coords.longitude,
latitudeDelta: 0.0005,
longitudeDelta: 0.0005
}}> 
<Marker
coordinate={{
latitude: location. coords. latitude,
longitude: location. coords.longitude,}}>
  </Marker>
  </MapView>
}
    </View>
  );
}

