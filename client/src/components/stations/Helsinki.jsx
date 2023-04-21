import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ClipLoader from "react-spinners/ClipLoader";
import stationService from "../../services/stations";
import StationCard from "./StationCard";

const Helsinki = () => {
  const [stations, setStations] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const limit = 100;

  const fetchData = async () => {
    try {
      const fetchWithDelay = async () => {
        const data = await stationService.getHelsinki(limit, offset);
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

  const searchStations = async (query) => {
    try {
      const results = await stationService.searchHelsinki(query);
      console.log("searchRESULT", searchResult);
      setSearchResult(results);
    } catch (error) {
      console.error("Error searching stations", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      searchStations(query);
    } else {
      setSearchResult([]);
    }
  };

  return (
    <>
      <div className="m-2 flex flex-wrap items-center justify-center p-2">
        <Navbar
          fluid={true}
          //rounded={true}
          // className="nav-custom-bg"
        >
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Button className="my-2 p-2 transition-colors duration-200 hover:text-green-500">
              <Link to="/stations">All</Link>
            </Button>
            <Button className="my-2 p-2 transition-colors duration-200 hover:text-green-500">
              <Link to="/stations/espoo">Espoo</Link>
            </Button>
            <Button className="my-2 p-2 transition-colors duration-200 hover:text-green-500">
              <Link to="/stations/helsinki">Helsinki</Link>
            </Button>
            <input
              className="my-2 rounded-xl p-2"
              type="text"
              placeholder="Search station..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </Navbar.Collapse>
        </Navbar>
      </div>
      <InfiniteScroll
        dataLength={
          searchQuery.length > 2 ? searchResult.length : stations.length
        }
        next={fetchData}
        hasMore={hasMore}
        loader={<ClipLoader className="reactspinner" />}
      >
        <div className="journeys-container">
          {searchQuery.length > 2
            ? searchResult.map((station) => (
                <StationCard key={station.fid} stations={station} />
              ))
            : stations.length > 0
            ? stations.map((station) => (
                <StationCard key={station.fid} stations={station} />
              ))
            : null}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Helsinki;
