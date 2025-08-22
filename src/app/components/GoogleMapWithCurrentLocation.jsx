import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader, MapPin } from 'lucide-react';

// Global variable to track if script is being loaded
let isLoadingScript = false;

// This is a Google Maps component that shows the current location
export default function GoogleMapWithCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  
  // Replace with your actual Google Maps API key when implementing
  const GOOGLE_MAPS_API_KEY = "AIzaSyBiWb3mV7jIS_-Ue1tGGUm7wg38RnORC20";
  
  // Load Google Maps script only once
  useEffect(() => {
    // Check if Google Maps is already available
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }
    
    // Check if there's an existing script element
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    
    if (existingScript) {
      // If script exists but still loading, wait for it
      if (!window.google || !window.google.maps) {
        const checkGoogleMaps = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkGoogleMaps);
            setMapLoaded(true);
          }
        }, 100);
        
        return () => clearInterval(checkGoogleMaps);
      } else {
        // Script exists and loaded
        setMapLoaded(true);
        return;
      }
    }
    
    // Prevent multiple script loading attempts
    if (isLoadingScript) {
      const checkGoogleMaps = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkGoogleMaps);
          setMapLoaded(true);
        }
      }, 100);
      
      return () => clearInterval(checkGoogleMaps);
    }
    
    // Load script if not already loading
    isLoadingScript = true;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.id = "google-maps-script";
    
    script.onload = () => {
      isLoadingScript = false;
      setMapLoaded(true);
    };
    
    script.onerror = () => {
      isLoadingScript = false;
      console.error("Error loading Google Maps API");
    };
    
    document.head.appendChild(script);
    
    return () => {
      // Don't remove the script on component unmount
      // This allows other instances to use the already loaded script
    };
  }, []);
  
  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to a fallback location if geolocation fails
          setCurrentLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco as fallback
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser");
      setCurrentLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco as fallback
      setLoading(false);
    }
  }, []);
  
  // Initialize map with unique ID
  useEffect(() => {
    if (mapLoaded && currentLocation && !map) {
      // Create a unique ID for each map instance
      const mapContainerId = `map-container-${Math.random().toString(36).substring(2, 9)}`;
      
      // Find the container element
      const mapContainer = document.getElementById("map-container");
      if (mapContainer) {
        mapContainer.id = mapContainerId;
        
        const mapInstance = new window.google.maps.Map(document.getElementById(mapContainerId), {
          center: currentLocation,
          zoom: 15,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });
        
        // Rest of your map initialization code...
        const markerInstance = new window.google.maps.Marker({
          position: currentLocation,
          map: mapInstance,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "#22c55e",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 8
          },
          title: "Current Location"
        });
        
        // Add animation to marker
        markerInstance.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          if (markerInstance) {
            markerInstance.setAnimation(null);
          }
        }, 2000);
        
        setMap(mapInstance);
        setMarker(markerInstance);
        
        // Sample pickup points nearby (for demonstration)
        const samplePickups = [
          { position: { lat: currentLocation.lat + 0.003, lng: currentLocation.lng + 0.002 }, title: "123 Green St" },
          { position: { lat: currentLocation.lat - 0.002, lng: currentLocation.lng + 0.004 }, title: "456 Recycle Ave" },
          { position: { lat: currentLocation.lat + 0.001, lng: currentLocation.lng - 0.003 }, title: "789 Sustainable Rd" },
          { position: { lat: currentLocation.lat + 0.004, lng: currentLocation.lng - 0.002 }, title: "789 Sustainable Rd" },
          { position: { lat: currentLocation.lat + 0.005, lng: currentLocation.lng - 0.001 }, title: "789 Sustainable Rd" },
          { position: { lat: currentLocation.lat + 0.006, lng: currentLocation.lng - 0.007 }, title: "789 Sustainable Rd" },
          { position: { lat: currentLocation.lat + 0.007, lng: currentLocation.lng + 0.002 }, title: "123 Green St" },
          { position: { lat: currentLocation.lat - 0.009, lng: currentLocation.lng + 0.001 }, title: "456 Recycle Ave" },
          { position: { lat: currentLocation.lat + 0.015, lng: currentLocation.lng - 0.010 }, title: "789 Sustainable Rd" },
          { position: { lat: currentLocation.lat + 0.009, lng: currentLocation.lng - 0.012 }, title: "789 Sustainable Rd" }
        ];
        
        // Add pickup markers
        samplePickups.forEach(pickup => {
          new window.google.maps.Marker({
            position: pickup.position,
            map: mapInstance,
            icon: {
              path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              fillColor: "#22c55e",
              fillOpacity: 0.8,
              strokeColor: "#ffffff",
              strokeWeight: 1,
              scale: 5
            },
            title: pickup.title
          });
        });
        
        // Draw route path (simplified for demo)
        // Only use valid pickup points that exist in the array
        const validPickups = samplePickups.filter(pickup => pickup && pickup.position);
        
        // Start with current location
        const pathCoordinates = [currentLocation];
        
        // Add only valid pickup positions
        validPickups.forEach(pickup => {
          pathCoordinates.push(pickup.position);
        });
        
        const routePath = new window.google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: "#22c55e",
          strokeOpacity: 0.8,
          strokeWeight: 3
        });
        
        routePath.setMap(mapInstance);
      }
    }
  }, [mapLoaded, currentLocation, map]);
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  if (loading) {
    return (
      <motion.div 
        variants={itemVariants}
        className="bg-gray-200 rounded-lg h-64 flex items-center justify-center"
      >
        <div className="text-center">
          <Loader size={32} className="mx-auto mb-2 text-green-500 animate-spin" />
          <p className="text-gray-500">Getting your current location...</p>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      variants={itemVariants}
      className="rounded-lg h-64 w-full overflow-hidden shadow-sm border border-gray-200"
    >
      <div id="map-container" className="w-full h-full"></div>
      
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <Loader size={32} className="mx-auto mb-2 text-green-500 animate-spin" />
            <p className="text-gray-500">Loading Google Maps...</p>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-3 left-3 z-10">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white shadow-md p-2 rounded-full"
          onClick={() => {
            if (map && currentLocation) {
              map.panTo(currentLocation);
              map.setZoom(15);
            }
          }}
        >
          <MapPin size={18} className="text-green-600" />
        </motion.button>
      </div>
    </motion.div>
  );
}