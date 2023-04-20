import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import journeyService from "../../services/journeys";
import JourneyCard from "./JourneyCard";
import ClipLoader from "react-spinners/ClipLoader";
import Search from "./Search";

const June = () => {
  const [journeys, setJourneys] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  // Filters
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [depStation, setDepStation] = useState("");
  const [retStation, setRetStation] = useState("");

  const limit = 40;

  const fetchData = async () => {
    try {
      const fetchWithDelay = async () => {
        const data = await journeyService.getJune(limit, offset);
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
    let filteredJourneys = journeys;

    if (depStation !== "" && depStation.length > 2) {
      filteredJourneys = filteredJourneys.filter((trip) =>
        trip.departure_station_name
          .toLowerCase()
          .includes(depStation.toLowerCase())
      );
    }

    if (retStation !== "" && retStation.length > 2) {
      filteredJourneys = filteredJourneys.filter((trip) =>
        trip.return_station_name
          .toLowerCase()
          .includes(retStation.toLowerCase())
      );
    }

    if (distance !== "") {
      filteredJourneys = filteredJourneys.filter(
        (trip) => trip.distance_m < distance * 1000
      );
    }

    if (duration === "min-duration") {
      filteredJourneys.sort((a, b) => a.duration_sec - b.duration_sec);
    } else if (duration === "max-duration") {
      filteredJourneys.sort((a, b) => b.duration_sec - a.duration_sec);
    }
    return filteredJourneys;
  };

  return (
    <>
      <Search
        depStation={depStation}
        onSetDepStation={setDepStation}
        retStation={retStation}
        onSetRetStation={setRetStation}
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

export default June;
