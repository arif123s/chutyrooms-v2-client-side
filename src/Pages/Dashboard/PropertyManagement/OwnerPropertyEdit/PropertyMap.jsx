import { GoogleMap, Marker, Rectangle } from "@react-google-maps/api";
import { useEffect } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "230px",
  borderRadius: "8px",
};

const PropertyMap = ({
  rectangleBounds,
  mapCenter,
  selectedLocation,
  handleMapClick,
  onRectangleLoad,
  onMapLoad,
  mapLoaded,
}) => {
    useEffect(()=>{
        mapCenter
    },[mapCenter])

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={mapCenter}
        onClick={handleMapClick}
        onLoad={onMapLoad}
      >
        {rectangleBounds && (
          <Rectangle bounds={rectangleBounds} onLoad={onRectangleLoad} />
        )}
        {/* Display marker for center */}
        {console.log("mapCenter:", mapCenter)}
        {mapCenter && (
          <Marker
            position={mapCenter}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}
        {/* Additional marker at the search location */}
        {selectedLocation && (
          <Marker
            position={selectedLocation}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default PropertyMap;
