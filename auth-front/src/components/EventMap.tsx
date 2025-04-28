import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';;

interface MapProps {
  latitude: number;
  longitude: number;
  zoomLevel?: number;
  title: string;
}

const EventMap: React.FC<MapProps> = ({ latitude, longitude, zoomLevel = 13, title }) => {

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (map) {
        map.setView([latitude, longitude], zoomLevel);
      }
    }, [latitude, longitude, zoomLevel, map]);
    return null;
  };

  return (
    <MapContainer
      center={[latitude, longitude]} // Coordenadas iniciales
      zoom={zoomLevel}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapUpdater />

      {/* Marcador */}
      <Marker position={[latitude, longitude]}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default EventMap;