import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const StationCard = ({ stations }) => {
  return (
    <div className="station-card m-6 rounded-xl bg-white p-6">
      {/* id {stations.id}  */}
      {stations.kaupunki}
      <Link key={stations.fid} to={`/stations/info/${stations.id}`}>
        <div className="flex items-center justify-center p-2 py-4 text-xl font-extrabold">
          {stations.nimi}
        </div>
      </Link>
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

export default StationCard;
