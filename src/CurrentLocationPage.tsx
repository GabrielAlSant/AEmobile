import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { styles } from "../styles/styles";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import { useEffect, useState, useRef } from "react";
import MapView from "react-native-maps";
import Maps from '../components/map';
import { recuperarCodigo } from "../lib/TabRouter";

export default function CurrentLocationPage() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [markers, setMarkers] = useState<
    {idDispositivo: string, latitude: number; longitude: number; criticidade: number }[]
  >([]);
  

  const mapRef = useRef<MapView>(null);

  async function requestLocationPermition() {
    const { status } = await requestForegroundPermissionsAsync();

    if (status) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermition();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          pitch: 90,
          center: response.coords,
        });
      }
    );
  }, []);

  async function handleLongPress(event: any) {
    const currentPosition = await getCurrentPositionAsync();
    const codigo = await recuperarCodigo()
    setMarkers((prev) => [
      ...prev,
      {
        idDispositivo: codigo as string,
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        criticidade: 2,
      },
    ]);
  }

  return (
    <View style={styles.container}>
     <Maps markers={markers} location={location} mapRef={mapRef} />
      <Button title="Marcar Localização" onPress={handleLongPress} />
    </View>
  );
}
