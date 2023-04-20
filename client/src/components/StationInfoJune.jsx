import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import stationService from "../services/stations";

const StationInfoJune = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [departures, setDepartures] = useState("");
  const [returns, setReturns] = useState("");
  const [top5returns, setTop5returns] = useState([]);
  const [top5depart, setTop5depart] = useState([]);

  useEffect(() => {
    async function fetchData(id) {
      const result = await stationService.getStation(id);
      if (result.id) {
        setInfo(result);
        const result2 = await stationService.getAllDepartures(id);
        setDepartures(result2);
        const result3 = await stationService.getJuneReturns(id);
        setReturns(result3);
        const result4 = await stationService.getAllTopReturns(id);
        setTop5returns(result4);
        const result5 = await stationService.getAllTopDepart(id);
        setTop5depart(result5);
      } else {
        window.location.replace("/");
      }
    }
    fetchData(id);
  }, [id]);

  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  console.log("INFO", info);
  console.log("Dep", departures);
  console.log("Ret", returns);
  console.log("top5returns", top5returns);
  console.log("top5depart", top5depart);
  return (
    <>
      <div className="journey-container flex flex-col items-center justify-center">
        <div className="m-4 flex min-h-screen justify-start rounded-md bg-white p-6 shadow">
          <div>
            <div className="text-xl">
              {/* <div className="text-sm">Station id {info.id} </div> */}
              <strong>{info.nimi}</strong>
              <div>{info.namn}</div>
              <div>{info.name_eng}</div>
              <div className="aspect-w-1 aspect-h-1 h-36 w-full border border-gray-400"></div>
              <div>
                {info.osoite}, {info.kaupunki}
              </div>
              <div>
                {info.adress}, {info.stad}
              </div>
              <hr className="m-2" />
            </div>
            <div className="m-2 flex justify-between">
              <Link to={`/stations/info/${info.id}`}>
                <div>All</div>
              </Link>
              <Link to={`/stations/info/may/${info.id}`}>
                <div>May</div>
              </Link>
              <Link
                to={`/stations/info/june/${info.id}`}
                className={
                  isActiveLink(`/stations/info/june/${info.id}`)
                    ? "font-bold text-blue-600"
                    : "text-gray-600"
                }
              >
                <div>June</div>
              </Link>
              <Link to={`/stations/info/july/${info.id}`}>
                <div>July</div>
              </Link>
            </div>
            <hr />
            <div className="flex">
              Total Journeys Starting From Here: {departures} kpl
            </div>
            <div className="flex">
              Total Journeys Ending Here: {returns} kpl
            </div>
            <div className="flex font-bold">
              Top-5 return stations from here:{" "}
            </div>
            <div className="pl-4">
              {top5returns?.map((station, index) => (
                <div key={index}>
                  {index + 1}.{" "}
                  <Link to={`/stations/info/${station?.return_station_id}`}>
                    {station?.return_station_name} {station?.num_returns} kpl
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex font-bold">Top-5 stations to end here:</div>
            <div className="pl-4">
              {top5depart?.map((station, index) => (
                <div key={index}>
                  {index + 1}.{" "}
                  <Link to={`/stations/info/${station?.departure_station_id}`}>
                    {station?.departure_station_name} {station?.num_returns} kpl
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StationInfoJune;
