import { Button } from "flowbite-react";
import { useState } from "react";

const JourneyCard = ({ journeys }) => {
  const [showExtra, setShowExtra] = useState(false);

  const toggleDates = () => {
    setShowExtra(!showExtra);
  };

  const kilometers = (journeys.distance_m / 1000).toFixed(2);
  const minutes = Math.floor(journeys.duration_sec / 60);
  const seconds = String(journeys.duration_sec % 60).padStart(2, "0");

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const year = dateObj.getUTCFullYear();

    const hours = String(dateObj.getUTCHours()).padStart(2, "0");
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year} `;
  };

  return (
    <div className="journey-card m-6 rounded-2xl bg-white p-6">
      id: {journeys.id}
      <div className="grid-container">
        <strong>Departure Station:</strong>{" "}
        <div>{journeys.departure_station_name} </div>
        <strong>Return Station:</strong>{" "}
        <div>{journeys.return_station_name}</div>
      </div>
      <hr />
      <div className="grid-container">
        <strong>Covered Distance:</strong>
        <div>{kilometers} km</div>
        <strong>Duration:</strong>
        <div>
          {minutes}:{seconds} minutes
        </div>
      </div>
      <hr />
      {showExtra && (
        <div className="grid-container">
          <strong>Leaving at:</strong>
          <div>{formatDate(journeys.departure_time)}</div>
          <strong>Returning at:</strong>
          <div>{formatDate(journeys.return_time)}</div>
        </div>
      )}
      <div className="mb-2 mt-2">
        <Button size="xs" onClick={toggleDates} color="gray" className="w-auto">
          {showExtra ? "Hide Time" : "Show Time"}
        </Button>
      </div>
      <div className="flex justify-end">
        <div>
          <Button size="xs" onClick={() => (window.location.href = "#top")}>
            Back on top of the page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JourneyCard;
