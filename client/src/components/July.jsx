import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import journeyService from "../services/journeys";
import JourneyCard from "./JourneyCard";
import ClipLoader from "react-spinners/ClipLoader";
import Search from "./Search";

const July = () => {
  const [journeys, setJourneys] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const limit = 25;
  // Filters
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const fetchData = async () => {
    try {
      const fetchWithDelay = async () => {
        const data = await journeyService.getJuly(limit, offset);
        if (data.length < limit) {
          setHasMore(false);
        }

        setJourneys((prevJourneys) => [...prevJourneys, ...data]);
        setOffset((prevOffset) => prevOffset + limit);
        if (initialLoad) {
          setInitialLoad(false);
        }
      };

      if (initialLoad) {
        fetchWithDelay();
      } else {
        setTimeout(fetchWithDelay, 2000);
      }
    } catch (error) {
      console.error("Error fetching journeys", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("dataLength", journeys.length);

  const filterJourneys = (journeys) => {
    let filteredJourneys =
      distance === ""
        ? journeys
        : journeys.filter((trip) => trip.distance_m <= distance * 1000);

    if (duration === "min-duration") {
      filteredJourneys.sort((a, b) => a.duration_sec - b.duration_sec);
    } else if (duration === "max-duration") {
      filteredJourneys.sort((a, b) => b.duration_sec - a.duration_sec);
    }
    return filteredJourneys;
  };

  console.log(
    "nyt alkaa tapahtuu",
    filterJourneys(journeys).map((trip) => trip)
  );

  return (
    <>
      <Search
        distance={distance}
        onSetDistance={setDistance}
        duration={duration}
        onSetDuration={setDuration}
      />

      <InfiniteScroll
        dataLength={filterJourneys(journeys).length}
        next={fetchData}
        hasMore={hasMore}
        loader={<ClipLoader className="reactspinner" />}
      >
        <div className="journeys-container">
          {filterJourneys(journeys).length > 0
            ? filterJourneys(journeys).map((trip) => (
                <JourneyCard key={trip.id} journeys={trip} />
              ))
            : null}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default July;
