import { useState } from "react";
import ExtraMap from "./ExtraMap";
import { Button } from "flowbite-react";
import extraService from "../services/extra";

const Extra = () => {
  const [markerPos, setMarkerPos] = useState({ lat: 60.1699, lng: 24.9384 });
  const [address, setAddress] = useState("");
  const [nimi, setNimi] = useState("");
  const [osoite, setOsoite] = useState("");
  const [kaupunki, setKaupunki] = useState("");
  const [message, setMessage] = useState(null);

  const handleDragEnd = async (event) => {
    const newPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setMarkerPos(newPosition);
    await getAddressFromLatLng(newPosition);
  };

  const getAddressFromLatLng = async (position) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      setAddress(data.results);
      setNimi(data.results[0].address_components[1].long_name);
      setOsoite(data.results[0].address_components[0].long_name);
      setKaupunki(data.results[0].address_components[2].long_name);
    } else {
      setAddress("Address not found");
    }
  };

  // console.log("Marker", markerPos);
  // console.log("address", address);
  // console.log("nimi", nimi);
  // console.log("osoite", osoite);
  // console.log("kaupunki", kaupunki);

  const addStation = async () => {
    const station = {
      nimi: nimi,
      osoite: `${nimi} ${osoite}`,
      kaupunki: kaupunki,
      x: markerPos.lat,
      y: markerPos.lng,
    };
    console.log("STATIOOON", station);

    const result = await extraService.addStation(station);
    setMessage(result.message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-4 flex min-h-screen w-2/3 justify-center rounded-md bg-white p-6 shadow">
        <div className="m-2 flex w-2/3 flex-col">
          <div className="aspect-w-1 aspect-h-1 h-72 w-full border border-gray-400">
            <ExtraMap
              lat={markerPos.lat}
              lng={markerPos.lng}
              zoom={15}
              draggable={true}
              onDragEnd={handleDragEnd}
            />
          </div>
          <div className="text-xl font-bold">Add your own station</div>
          <table>
            <tbody>
              <tr>
                <td>Nimi:</td>
                <td>{nimi}</td>
              </tr>
              <tr>
                <td>Osoite:</td>
                <td>
                  {nimi} {osoite}
                </td>
              </tr>
              <tr>
                <td>Kaupunki:</td>
                <td>{kaupunki}</td>
              </tr>
            </tbody>
          </table>
          {message ? (
            <div className="m-2 rounded-xl border border-orange-300 p-4">
              {message}
            </div>
          ) : null}
          <Button classname="w-1/3" onClick={addStation}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Extra;
