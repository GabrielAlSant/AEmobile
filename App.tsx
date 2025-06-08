import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles/styles'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [markers, setMarkers] = useState<{ latitude: number; longitude: number }[]>([]);

  const mapRef = useRef<MapView>(null);

  async function requestLocationPermition() {
    const { status } = await requestForegroundPermissionsAsync();

    if (status) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermition()
  }, [])

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      console.log(response)
      setLocation(response)
      mapRef.current?.animateCamera({
        pitch: 90,
        center: response.coords
      })
    })
  }, [])

  async function handleLongPress(event: any) {
    const currentPosition = await getCurrentPositionAsync();
    setMarkers((prev) => [...prev, { 
      latitude: currentPosition.coords.latitude,
      longitude: currentPosition.coords.longitude,
     }]);
  }

  return (
    <View style={styles.container}>
      {location &&
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005
          }}>
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
             title="Você está aqui"
             >
          </Marker>

          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              title={`Árvore ${index + 1}`}
              description="Buraco Reportado"
              image={require('./assets/Prioridades/Prioridade Alta.png')} 
            />
          ))}

        </MapView>
      }

      <Button title="Marcar Localização" onPress={handleLongPress}/>
    </View>
  );
}

