'use client'
import { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';

export default function PickupRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    pinCode: '',
    city: '',
    locality: '',
    landmark: '',
    address: '',
    propertyType: '',
    alternateMobile: '',
    items: '',
    pickupDate: '',
    preferredTime: '',
    exceptionalDay: '',
    latitude: null,
    longitude: null,
    exactAddress: ''
  });
  
  const [showMap, setShowMap] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const googleMapRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show map after form submission
    setShowMap(true);
    
    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAKMQpoZiapC0cIJwtdB5y250VXY6tJUOw&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else if (!mapLoaded) {
      initMap();
    }
  };

  const initMap = () => {
    setMapLoaded(true);
    
    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Create map centered at user's location
          const mapOptions = {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true
          };
          
          const map = new window.google.maps.Map(mapRef.current, mapOptions);
          googleMapRef.current = map;
          
          // Add a marker at the center position
          const marker = new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            draggable: true,
            animation: window.google.maps.Animation.DROP,
            title: "Drag to adjust pickup location"
          });
          markerRef.current = marker;
          
          // Update form data with initial location
          updateLocationData(latitude, longitude);
          
          // Add listener for marker drag end
          marker.addListener('dragend', () => {
            const position = marker.getPosition();
            updateLocationData(position.lat(), position.lng());
          });
          
          // Add search box
          const input = document.getElementById('map-search-input');
          const searchBox = new window.google.maps.places.SearchBox(input);
          
          map.addListener('bounds_changed', () => {
            searchBox.setBounds(map.getBounds());
          });
          
          searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces();
            
            if (places.length === 0) return;
            
            const place = places[0];
            
            if (!place.geometry || !place.geometry.location) return;
            
            // Set marker to the selected place
            marker.setPosition(place.geometry.location);
            
            // Center map on the selected place
            map.setCenter(place.geometry.location);
            
            // Update form data
            updateLocationData(
              place.geometry.location.lat(),
              place.geometry.location.lng(),
              place.formatted_address
            );
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Default to a location if user location is not available
          initMapWithDefaultLocation();
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      initMapWithDefaultLocation();
    }
  };
  
  const initMapWithDefaultLocation = () => {
    // Default location (e.g., city center based on selected city)
    const defaultLocations = {
      'delhi': { lat: 28.6139, lng: 77.2090 },
      'mumbai': { lat: 19.0760, lng: 72.8777 },
      'bangalore': { lat: 12.9716, lng: 77.5946 },
      'hyderabad': { lat: 17.3850, lng: 78.4867 }
    };
    
    const cityLocation = defaultLocations[formData.city] || { lat: 20.5937, lng: 78.9629 }; // India default
    
    const map = new window.google.maps.Map(mapRef.current, {
      center: cityLocation,
      zoom: 12
    });
    googleMapRef.current = map;
    
    const marker = new window.google.maps.Marker({
      position: cityLocation,
      map: map,
      draggable: true,
      animation: window.google.maps.Animation.DROP
    });
    markerRef.current = marker;
    
    updateLocationData(cityLocation.lat, cityLocation.lng);
    
    marker.addListener('dragend', () => {
      const position = marker.getPosition();
      updateLocationData(position.lat(), position.lng());
    });
  };
  
  const updateLocationData = (lat, lng, address = null) => {
    setFormData(prevState => ({
      ...prevState,
      latitude: lat,
      longitude: lng
    }));
    
    // If address is not provided, reverse geocode to get address
    if (!address && window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setFormData(prevState => ({
            ...prevState,
            exactAddress: results[0].formatted_address
          }));
        }
      });
    } else if (address) {
      setFormData(prevState => ({
        ...prevState,
        exactAddress: address
      }));
    }
  };
  
  const finalSubmit = () => {
    // Final submission with location data
    console.log("Final form data with location:", formData);
    
    // Here you would typically send this data to your backend
    // Example: sendToBackend(formData);
    
    // Reset the form and hide map after successful submission
    alert("Pickup request submitted successfully!");
    setShowMap(false);
    setFormData({
      name: '',
      pinCode: '',
      city: '',
      locality: '',
      landmark: '',
      address: '',
      propertyType: '',
      alternateMobile: '',
      items: '',
      pickupDate: '',
      preferredTime: '',
      exceptionalDay: '',
      latitude: null,
      longitude: null,
      exactAddress: ''
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-sm text-black">
      {!showMap ? (
        <>
          <div className="bg-green-500 text-white p-4 -mx-6 -mt-6 mb-6 flex items-center">
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">New Pickup Request</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <div className="bg-green-500 text-white p-3 flex items-center justify-center">
                <FaMapMarkerAlt />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Please enter name"
                className="flex-grow p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex mb-4">
              <div className="bg-green-500 text-white p-3 flex items-center justify-center">
                <FaMapMarkerAlt />
              </div>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                placeholder="Area Pin Code"
                className="flex-grow p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Address</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 mb-3 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              >
                <option value="">City</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
                <option value="hyderabad">Hyderabad</option>
              </select>

              <select
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 mb-3 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              >
                <option value="">Locality</option>
                <option value="locality1">Locality 1</option>
                <option value="locality2">Locality 2</option>
                <option value="locality3">Locality 3</option>
              </select>

              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="Landmark"
                className="w-full p-2 border border-gray-300 mb-3 focus:outline-none focus:ring-1 focus:ring-green-500"
              />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="address"
                className="w-full p-2 border border-gray-300 mb-3 focus:outline-none focus:ring-1 focus:ring-green-500"
                rows="2"
                required
              ></textarea>

              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 mb-3 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              >
                <option value="">--Select--</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="office">Office</option>
                <option value="other">Other</option>
              </select>

              <input
                type="tel"
                name="alternateMobile"
                value={formData.alternateMobile}
                onChange={handleChange}
                placeholder="Enter alternate mobile"
                className="w-full p-2 border border-gray-300 mb-3 focus:outline-none focus:ring-1 focus:ring-green-500"
              />

              <textarea
                name="items"
                value={formData.items}
                onChange={handleChange}
                placeholder="What are items you have??"
                className="w-full p-2 border border-gray-300 mb-3 focus:outline-none focus:ring-1 focus:ring-green-500"
                rows="2"
                required
              ></textarea>

              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                placeholder="Please select the pickupdate"
                className="w-full p-2 border border-gray-300 mb-3 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />

              {/* Additional Field: Preferred Time */}
              <div className="flex mb-3">
                <div className="bg-green-500 text-white p-3 flex items-center justify-center">
                  <FaClock />
                </div>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="flex-grow p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                >
                  <option value="">Select Preferred Time</option>
                  <option value="morning">Morning (8 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                  <option value="evening">Evening (4 PM - 8 PM)</option>
                </select>
              </div>

              {/* Additional Field: Exceptional Day (not required) */}
              <div className="flex mb-3">
                <div className="bg-green-500 text-white p-3 flex items-center justify-center">
                  <FaCalendarAlt />
                </div>
                <select
                  name="exceptionalDay"
                  value={formData.exceptionalDay}
                  onChange={handleChange}
                  className="flex-grow p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select Unavailable Day (Optional)</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full text-lg font-medium transition-colors"
              >
                Request Pickup
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="map-container">
          <div className="bg-green-500 text-white p-4 -mx-6 -mt-6 mb-6 flex items-center">
            <div className="mr-4">
              <FaMapMarkerAlt />
            </div>
            <h2 className="text-xl font-semibold">Pin Your Exact Location</h2>
          </div>
          
          <div className="mb-4">
            <input
              id="map-search-input"
              type="text"
              placeholder="Search for locations"
              className="w-full p-2 border border-gray-300 mb-3 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          
          <div 
            ref={mapRef} 
            style={{ height: "400px", width: "100%" }} 
            className="mb-4 border border-gray-300 rounded"
          ></div>
          
          {formData.exactAddress && (
            <div className="bg-gray-100 p-3 mb-4 rounded">
              <h3 className="font-bold mb-1">Selected Location:</h3>
              <p>{formData.exactAddress}</p>
            </div>
          )}
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowMap(false)}
              className="flex-grow bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded"
            >
              Back to Form
            </button>
            <button
              onClick={finalSubmit}
              className="flex-grow bg-green-500 hover:bg-green-600 text-white py-2 rounded font-medium"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
}