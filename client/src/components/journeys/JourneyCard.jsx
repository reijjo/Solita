import { Button } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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

    return {
			time: `${hours}:${minutes}:${seconds}`,
			date: `${day}/${month}/${year} `
		}
  };

  return (
    <div className="journey-card m-6 rounded-2xl bg-white p-6">
      id: {journeys.id}
      <div className="grid-container">
        <strong>Departure Station:</strong>{" "}
        <div>
          <Link
            key={journeys.departure_station_id}
            to={`/stations/info/${journeys.departure_station_id}`}
          >
            {journeys.departure_station_name}
          </Link>
        </div>
        <strong>Return Station:</strong>{" "}
        <div>
          <Link
            key={journeys.return_station_id}
            to={`/stations/info/${journeys.return_station_id}`}
          >
            {journeys.return_station_name}
          </Link>
        </div>
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
          <div className="grid grid-cols-2 gap-x-1">
            <div>{formatDate(journeys.departure_time).time}</div>
            <div>{formatDate(journeys.departure_time).date}</div>
          </div>
          <strong>Returning at:</strong>
          <div className="grid grid-cols-2 gap-x-2">
            <div>{formatDate(journeys.return_time).time}</div>
            <div>{formatDate(journeys.return_time).date}</div>
          </div>
        </div>
      )}
      <div className="mb-2 mt-2">
        <Button size="xs" onClick={toggleDates} color="gray" className="w-auto">
          {showExtra ? "Show Less" : "Show More"}
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
