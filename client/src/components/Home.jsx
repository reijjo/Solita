import { useEffect, useState } from "react"
import { format, parseISO } from "date-fns";

import journeyService from "../services/journeys";

const Home = () => {
  const [journeys, setJourneys] = useState([]);

  //useEffect(() => {
  //	journeyService.getAll()
  //	.then((response) => {
  //		setJourneys(response)
  //	})
  //}, [])

  useEffect(() => {
    const response = async () => {
      try {
        const data = await journeyService.getAll();
        setJourneys(data);
      } catch (error) {
        console.error("Error fetching journeys", error);
      }
    };
    response();
  }, []);

  console.log(
    "nyt alkaa tapahtuu",
    journeys.map((trip) => trip)
  );

  const testTrip = journeys[0];

  console.log(testTrip);
  const kilometers = testTrip ? (testTrip.distance_m / 1000).toFixed(2) : null;
  const minutes = testTrip ? Math.floor(testTrip.duration_sec / 60) : null;
  const seconds = testTrip
    ? String(testTrip.duration_sec % 60).padStart(2, "0")
    : null;

  return (
    <div className="flex rounded-sm text-cyan-700">
      <div className="m-8 rounded-2xl bg-white p-8">
        {testTrip ? (
          <>
            <div>
              Departure Station: {testTrip.departure_station_name} <br />
              Leaving time:{" "}
              {format(
                parseISO(testTrip.departure_time),
                "kk:m:ss MMMM d, yyyy"
              )}
            </div>{" "}
            <hr />
            <div>
              Return Station: {testTrip.return_station_name} <br />
              Returning time:{" "}
              {format(parseISO(testTrip.return_time), "kk:m:ss MMMM d, yyyy")}
            </div>
            <hr />
            <div>Covered Distance: {kilometers} km</div>
            <div>
              Duration: {minutes}:{seconds} minutes
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      {/* <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{journeys.map((trip) => (
					<li key={trip.id} className="border border-gray-300 rounded-md p-4 shadow-lg">
						{trip.departure}
					</li>
				))}
			</ul> */}
    </div>
  );
};

export default Home
