import { useEffect, useState } from "react"
// import InfiniteScroll from "react-infinite-scroll-component";
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

  console.log("dataLength", journeys.length);

  return (
    <div className="journeys-container">
      {journeys ? (
        journeys.map((trip) => <JourneyCard key={trip.id} journeys={trip} />)
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Home
