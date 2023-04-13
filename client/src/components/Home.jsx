import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import journeyService from "../services/journeys";
import JourneyCard from "./JourneyCard";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const [journeys, setJourneys] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 25;

  const fetchData = async () => {
    try {
      setTimeout(async () => {
        const data = await journeyService.getAll(limit, offset);
        if (data.length < limit) {
          setHasMore(false);
        }

        setJourneys((prevJourneys) => [...prevJourneys, ...data]);
        setOffset((prevOffset) => prevOffset + limit);
      }, 2000);
    } catch (error) {
      console.error("Error fetching journeys", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(
    "nyt alkaa tapahtuu",
    journeys.map((trip) => trip)
  );

  console.log("dataLength", journeys.length);

  return (
    <>
      <InfiniteScroll
        dataLength={journeys.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<ClipLoader className="reactspinner" />}
        // loader={<h4>Loading data...</h4>}
      >
        <div className="journeys-container">
          {journeys ? (
            journeys.map((trip) => (
              <JourneyCard key={trip.id} journeys={trip} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Home
