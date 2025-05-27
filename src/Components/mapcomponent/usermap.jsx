import { useEffect } from "react";
import { socket } from "../../Api/socket.io"; // Backend ka URL

const sendLiveLocation = (id, role) => {
  console.log("sendLiveLocation called with:", { id, role });

  if ("geolocation" in navigator) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log("Received Position:", position.coords);
        const { latitude, longitude } = position.coords;
        console.log("accuracy ",position.coords.accuracy);
        // ✅ Backend ko real-time location bhejna
        socket.emit("liveLocation", { id, role, latitude, longitude });
        console.log(`📍 ${role} ${id} moved to ${latitude}, ${longitude}`);
      },
      (error) => console.error("Location Error:", error),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );

    return watchId;
  }
  return null; // Agar geolocation available nahi hai to null return karein
};

const LiveTracking = ({ id, role }) => {
  useEffect(() => {
    console.log("LiveTracking useEffect triggered");
    const watchId = sendLiveLocation(id, role); // ✅ Ek hi baar call ho 

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId); // ✅ Cleanup
      }
    };
  }, [id, role]);

  return <h2>User Tracking Started...</h2>;
};

export default LiveTracking;
