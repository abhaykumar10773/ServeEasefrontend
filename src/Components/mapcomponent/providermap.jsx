import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import { socket } from "../../Api/socket.io";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ✅ Fix Default Marker Icons
const userIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// ✅ Custom Red Icon for Provider
const providerIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg", // 🔴 Red Dot Marker
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// ✅ Auto-center map when new locations arrive
const AutoCenterMap = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (Object.keys(locations).length > 0) {
      const allLocations = Object.values(locations).map(loc => [loc.latitude, loc.longitude]);
      const bounds = L.latLngBounds(allLocations);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

// 📍 Haversine Formula for Distance Calculation
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371; // 🌍 Radius of Earth in KM
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); // 🔢 Return distance in KM
};

const DashboardMap = () => {
  const [locations, setLocations] = useState({});
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    socket.on("userLocation", ({ id, role, latitude, longitude }) => {
      console.log("📌 Received Location:", { id, role, latitude, longitude });

      setLocations((prev) => {
        const updatedLocations = {
          ...prev,
          [id]: { role, latitude, longitude },
        };

        // 🔄 Calculate distances between Users & Providers
        const newDistances = [];
        const users = Object.entries(updatedLocations).filter(([_, loc]) => loc.role === "User");
        const providers = Object.entries(updatedLocations).filter(([_, loc]) => loc.role === "Provider");

        users.forEach(([userId, userLoc]) => {
          providers.forEach(([providerId, providerLoc]) => {
            const distance = getDistance(userLoc.latitude, userLoc.longitude, providerLoc.latitude, providerLoc.longitude);
            newDistances.push({ userId, providerId, distance });
          });
        });

        setDistances(newDistances);
        return updatedLocations;
      });
    });

    return () => {
      socket.off("userLocation");
    };
  }, []);

  return (
    <MapContainer
      center={[25.4358, 81.8463]} // Default center (updates dynamically)
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      {/* ✅ OpenStreetMap Layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🔄 Auto-adjust map bounds */}
      <AutoCenterMap locations={locations} />

      {/* 📌 Show Markers for Users & Providers */}
      {Object.entries(locations).map(([id, loc]) => (
        <Marker
          key={id}
          position={[loc.latitude, loc.longitude]}
          icon={loc.role === "Provider" ? providerIcon : userIcon} // ✅ Fix Invisible Marker Issue
        >
          <Popup>
            {loc.role === "Provider" ? `👷🏻‍♂️ Provider ID: ${id}` : `🏠 User ID: ${id}`}
          </Popup>
        </Marker>
      ))}

      {/* 🔗 Show Distance Lines */}
      {distances.map(({ userId, providerId, distance }, index) => {
        const userLoc = locations[userId];
        const providerLoc = locations[providerId];

        if (!userLoc || !providerLoc) return null;

        return (
          <Polyline
            key={index}
            positions={[
              [userLoc.latitude, userLoc.longitude],
              [providerLoc.latitude, providerLoc.longitude]
            ]}
            color="blue"
          >
            <Popup>📏 Distance: {distance} KM</Popup>
          </Polyline>
        );
      })}
    </MapContainer>
  );
};

export default DashboardMap;
