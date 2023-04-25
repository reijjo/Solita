import { Button } from "flowbite-react";
import { useState } from "react";
import extraService from "../services/extra";
import stationService from "../services/stations";

const Surprise = () => {
  const [searchDepQuery, setSearchDepQuery] = useState("");
  const [searchDepResult, setSearchDepResult] = useState([]);
  const [depStation, setDepStation] = useState(null);
  const [searchRetQuery, setSearchRetQuery] = useState("");
  const [searchRetResult, setSearchRetResult] = useState([]);
  const [retStation, setRetStation] = useState(null);
  const [message, setMessage] = useState(null);

  const searchDepStations = async (query) => {
    try {
      const results = await stationService.searchAll(query);
      console.log("searchresult", searchDepResult);
      setSearchDepResult(results);
    } catch (error) {
      console.error("Error searching stations");
    }
  };

  const searchRetStations = async (query) => {
    try {
      const results = await stationService.searchAll(query);
      console.log("searchRETresult", searchRetResult);
      setSearchRetResult(results);
    } catch (error) {
      console.error("Error searching stations");
    }
  };

  const handleDepSearch = (event) => {
    const query = event.target.value;
    setSearchDepQuery(query);
    setDepStation(null);

    if (query.length > 1) {
      searchDepStations(query);
    } else {
      setSearchDepResult([]);
    }
  };

  const handleRetSearch = (event) => {
    const query = event.target.value;
    setSearchRetQuery(query);
    setRetStation(null);

    if (query.length > 1) {
      searchRetStations(query);
    } else {
      setSearchRetResult([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchDepQuery(suggestion.nimi);
    setSearchDepResult([]);
    setDepStation(suggestion);
  };

  const handleSuggestionRetClick = (suggestion) => {
    setSearchRetQuery(suggestion.nimi);
    setSearchRetResult([]);
    setRetStation(suggestion);
  };

  const addJourney = async () => {
    const journey = {
      depStation: depStation,
      retStation: retStation,
    };
    const result = await extraService.addJourney(journey);
    setMessage(result.message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-4 flex min-h-screen w-2/3 justify-center rounded-md bg-white p-6 shadow">
        <div className="m-2 flex w-2/3 flex-col">
          <table>
            <tbody>
              <tr>
                <td>Departure Station:</td>
                <td>
                  <input
                    className="my-2 rounded-md border border-blue-400 p-2"
                    type="text"
                    placeholder="departure station..."
                    value={searchDepQuery}
                    onChange={handleDepSearch}
                  />
                  {searchDepResult.length > 0 && (
                    <ul className="mt-1 w-auto rounded-md border bg-white shadow-md">
                      {searchDepResult.map((station) => (
                        <li
                          key={station.id}
                          className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                          onClick={() => handleSuggestionClick(station)}
                        >
                          {station.nimi}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
              <tr>
                <td>Nimi:</td>
                <td>
                  {depStation?.nimi || "-"}, {depStation?.namn || "-"}
                </td>
              </tr>
              <tr>
                <td>Osoite:</td>
                <td>{depStation?.osoite || "-"}</td>
              </tr>
              <tr>
                <td>Kaupunki:</td>
                <td>
                  {depStation?.kaupunki || "-"}, {depStation?.stad || "-"}
                </td>
              </tr>
              <tr>
                <td>Return Station:</td>
                <td>
                  <input
                    className="my-2 rounded-md border border-blue-400 p-2"
                    type="text"
                    placeholder="return station..."
                    value={searchRetQuery}
                    onChange={handleRetSearch}
                  />
                  {searchRetResult.length > 0 && (
                    <ul className="mt-1 w-auto rounded-md border bg-white shadow-md">
                      {searchRetResult.map((station) => (
                        <li
                          key={station.id}
                          className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                          onClick={() => handleSuggestionRetClick(station)}
                        >
                          {station.nimi}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
              <tr>
                <td>Nimi:</td>
                <td>
                  {retStation?.nimi || "-"}, {retStation?.namn || "-"}
                </td>
              </tr>
              <tr>
                <td>Osoite:</td>
                <td>{retStation?.osoite || "-"}</td>
              </tr>
              <tr>
                <td>Kaupunki:</td>
                <td>
                  {retStation?.kaupunki || "-"}, {retStation?.stad || "-"}
                </td>
              </tr>
              <tr>
                <td>
                  <Button onClick={addJourney}>Add Journey!</Button>
                </td>
                <td>
                  {message ? (
                    <div className="m-2 rounded-xl border border-orange-300 p-4">
                      {message}
                    </div>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Surprise;
