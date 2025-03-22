"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
interface DeliveryManLocation {
  lat: number;
  lng: number;
}

export default function TrackGoogleMap() {
  const [location, setLocation] = useState<DeliveryManLocation>({
    lat: 30.0444,
    lng: 31.2357,
  }); // Cairo, Egypt
  const defaultCenter = { lat: location?.lat, lng: location.lng };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ?? "",
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setLocation((prev) => ({
        lat: prev.lat + 0.0001,
        lng: prev.lng + 0.0001,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return isLoaded ? (
    <GoogleMap
      center={location}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "500px" }}
    >
      <Marker position={defaultCenter} />
    </GoogleMap>
  ) : (
    <></>
  );
}
