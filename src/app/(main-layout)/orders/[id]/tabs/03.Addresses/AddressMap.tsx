"use client";

import { Icon, LeafletMouseEvent } from "leaflet";
import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import markerImg from "@/assets/images/map-marker.png";

const customIcon = new Icon({
  iconUrl: markerImg.src,
  iconSize: [25, 25],
});

interface DeliveryManLocation {
  lat: number;
  lng: number;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  const map = useMapEvents({
    click: (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      const position: [number, number] = [lat, lng];
      onMapClick(position);
    },
  });

  return null;
};

function AddressMap(props: PropsType) {
  const { markerPosition, setMarkerPosition } = props;
  const [location, setLocation] = useState<DeliveryManLocation>({
    lat: 30.0444,
    lng: 31.2357,
  });

  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler
        onMapClick={(position) => {
          setMarkerPosition(position);
        }}
      />
      <Marker
        position={[markerPosition[0], markerPosition[1]]}
        icon={customIcon}
      />
    </MapContainer>
  );
}

interface MapClickHandlerProps {
  onMapClick: (position: [number, number]) => void;
}

export default AddressMap;

type PropsType = {
  markerPosition: [number, number];
  setMarkerPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
};
