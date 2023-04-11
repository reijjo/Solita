import { useEffect, useState } from "react"
//import { format, parseISO } from "date-fns";

import journeyService from "../services/journeys";
import JourneyCard from "./JourneyCard";

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

		//const kilometers = testTrip ? (testTrip.distance_m / 1000).toFixed(2) : null;
		//const minutes = testTrip ? Math.floor(testTrip.duration_sec / 60) : null;
		//const seconds = testTrip
		//	? String(testTrip.duration_sec % 60).padStart(2, "0")
		//	: null

  return (
    <div className="journeys-container">
    {/*<div className="flex flex-wrap rounded-sm text-cyan-700">*/}
			{journeys ? (
				journeys.map(trip => (
					<JourneyCard key={trip.id} journeys={trip} />
				))
			) : (
				<div>Loading...</div>
			)}
    </div>
  );
};

export default Home
