import { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import stationService from "../services/stations";
import StationCard from "./StationCard";

const Stations = () => {
  const [stations, setStations] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const limit = 100;

  const fetchData = async () => {
    try {
      const fetchWithDelay = async () => {
        const data = await stationService.getAll(limit, offset);
        if (data.length < limit) {
          setHasMore(false);
        }

        setStations((prevStations) => [...prevStations, ...data]);
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
      console.error("Error fetching stations", error);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("STATIONS", stations);
  return (
    <>
      <InfiniteScroll
        dataLength={stations.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<ClipLoader className="reactspinner" />}
      >
        <div className="journeys-container">
          {stations.length > 0
            ? stations.map((station) => (
                <StationCard key={station.fid} stations={station} />
              ))
            : null}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Stations;
