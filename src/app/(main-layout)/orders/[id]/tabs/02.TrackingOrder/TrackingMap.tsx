"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";

import markerImg from "@/assets/images/car-marker.jpg";

interface DeliveryManLocation {
  lat: number;
  lng: number;
}

const customIcon = new Icon({
  iconUrl: markerImg.src,
  iconSize: [25, 25],
});

const TrackingDeliveryMap: React.FC = () => {
  const [location, setLocation] = useState<DeliveryManLocation>({
    lat: 30.0444,
    lng: 31.2357,
  }); // Cairo, Egypt


  useEffect(() => {
    const interval = setInterval(() => {
      setLocation((prev) => ({
        lat: prev.lat + 0.0001,
        lng: prev.lng + 0.0001,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location.lat, location.lng]} icon={customIcon} />
    </MapContainer>
  );
};

export default TrackingDeliveryMap;
