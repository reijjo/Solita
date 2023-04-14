import { Dropdown, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Search = ({
  depStation, onSetDepStation, retStation, onSetRetStation,
  distance, onSetDistance, duration, onSetDuration
}) => {

  const handleDepStationChange = (event) => {
    onSetDepStation(event.target.value)
  }

  const handleRetStationChange = (event) => {
    onSetRetStation(event.target.value)
  }

  const handleDistanceChange = (event) => {
    const value = event.target.value;
    onSetDistance(value);
  };

  const handleDurationChange = (event) => {
    onSetDuration(event.target.value);
  };

  const clearAll = () => {
    onSetDepStation('')
    onSetRetStation('')
    onSetDistance('')
    onSetDuration('')
  }


  return (
    <div className="flex justify-end p-6">
      <div>
        <Dropdown label="Search By:">
          <table>
            <tbody>
              {/* Departure Station */}
              <tr>
                <td className="p-2">Departure Station:</td>
                <td className="p-2">
                  <input
                    className="rounded-md"
                    type="text"
                    name='dep_station'
                    id='dep_station'
                    value={depStation}
                    onChange={handleDepStationChange}
                  />
                </td>
              </tr>
              {/* Return Station */}
              <tr>
                <td className="p-2">Return Station:</td>
                <td className="p-2">
                  <input
                    className="rounded-md"
                    type="text"
                    name="ret_station"
                    id="ret_station"
                    value={retStation}
                    onChange={handleRetStationChange}
                  />
                </td>
              </tr>
              {/* Distance */}
              <tr>
                <td className="p-2">Distance:</td>
                <td className="p-2">
                  <div className="flex items-center">
                    <label htmlFor="distance"></label>
                    <input
                      className="rounded-md"
                      type="range"
                      id="distance"
                      name="distance"
                      min="0"
                      max="10"
                      step="0.5"
                      value={distance}
                      onChange={handleDistanceChange}
                    />
                    <span className="ml-2">
                      {`< ${distance}`} km{" "}
                      <Button size="xs" onClick={() => onSetDistance("")}>
                        Clear
                      </Button>
                    </span>
                  </div>
                </td>
              </tr>
              {/* Duration */}
              <tr>
                <td className="p-2">Duration:</td>
                <td className="p-2">
                  <input
                    type="radio"
                    id="min_duration"
                    name="duration"
                    value="min-duration"
                    className="mr-1"
                    onChange={handleDurationChange}
                  />
                  <label htmlFor="min_duration" className="mr-4">
                    Min
                  </label>
                  <input
                    type="radio"
                    id="max_duration"
                    name="duration"
                    value="max-duration"
                    className="mr-1"
                    onChange={handleDurationChange}
                  />
                  <label htmlFor="max_duration" className="mr-4">
                    Max
                  </label>
                  <input
                    type="radio"
                    id="default_duration"
                    name="duration"
                    value="default-duration"
                    className="mr-1"
                    onChange={handleDurationChange}
                  />
                  <label htmlFor="default_duration">Default</label>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-center">
            <Button size='xs' onClick={clearAll}>Clear All Filters</Button>
          </div>
        </Dropdown>
      </div>
      <div className="ml-6">
        <Dropdown label="Filter By Month:" dismissOnClick={false}>
          <Link to="/may">
            <Dropdown.Item>May</Dropdown.Item>
          </Link>
          <Link to="/june">
            <Dropdown.Item>June</Dropdown.Item>
          </Link>
          <Link to="/july">
            <Dropdown.Item>July</Dropdown.Item>
          </Link>
          <Link to="/">
            <Dropdown.Item>All</Dropdown.Item>
          </Link>
        </Dropdown>
      </div>
    </div>
  );
};

export default Search;
