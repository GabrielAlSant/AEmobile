import {
  LocationObject
} from "expo-location";
import MapView, { Marker } from "react-native-maps";


import { styles } from "../styles/styles";

interface MarkerType {
  latitude: number;
  longitude: number;
  criticidade: number;
}

interface MapsProps {
  markers: MarkerType[];
  location: LocationObject | null;
  mapRef: any
}


export default function Maps({ markers, location, mapRef }: MapsProps) {
  return (
    <>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você está aqui"
          />

          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={`Buraco ${index + 1}`}
              description="Buraco Reportado"
              image={
                (marker.criticidade === 3 &&
                  require("../assets/Prioridades/Prioridade Alta.png")) ||
                (marker.criticidade === 2 &&
                  require("../assets/Prioridades/Prioridade Media.png")) ||
                (marker.criticidade === 1 &&
                  require("../assets/Prioridades/Prioridade Baixa.png")) ||
                undefined
              }
            />
          ))}
        </MapView>
      )}
    </>
  );
}
