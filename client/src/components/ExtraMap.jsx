import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const ExtraMap = ({ lat, lng, zoom, draggable, onDragEnd }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS;
  const center = {
    lat: lat,
    lng: lng,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        <Marker position={center} draggable={draggable} onDragEnd={onDragEnd} />
      </GoogleMap>
    </LoadScript>
  );
};

export default ExtraMap;
