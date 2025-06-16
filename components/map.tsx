import { LocationObject } from "expo-location";
import MapView, { Marker, UrlTile } from "react-native-maps";

// 👇 PASSO 1: Importe a imagem para uma constante aqui no topo do arquivo.
const markerIcon = require("../assets/Prioridades/Prioridade Alta.png");

interface MarkerType {
  latitude: number;
  longitude: number;
}

interface MapsProps {
  markers: MarkerType[];
  location: LocationObject | null;
  mapRef: any;
  styles: any;
}

export default function Maps({ markers, location, mapRef, styles }: MapsProps) {
  return (
    <>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <UrlTile
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />
          
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Você está aqui"
          />

          {markers && markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={`Buraco ${index + 1}`}
              description="Buraco Reportado"
              // 👇 PASSO 2: Use a constante com a imagem aqui.
              image={markerIcon}
            />
          ))}
        </MapView>
      )}
    </>
  );
}