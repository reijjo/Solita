import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import config from "../../../server/utils/config";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({ lat, lng, zoom }) => {
  const center = {
    lat: lat,
    lng: lng,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyASIBRs2S0DQ27zssG0wU5eTfbxuIDbNq0">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
