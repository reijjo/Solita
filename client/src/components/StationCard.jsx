import { useState } from "react";
import { Button } from "flowbite-react";

const StationCard = ({ stations }) => {
  const [showExtra, setShowExtra] = useState(false);

  const toggleMore = () => {
    setShowExtra(!showExtra);
  };

  return (
    <div className="journey-card m-6 rounded-2xl bg-white p-6">
      id: {stations.fid}
      <div className="flex items-center justify-center p-2 text-xl font-extrabold">
        {stations.nimi}
      </div>
      <div className="grid-container">
        <strong>På svenska:</strong>
        <div>{stations.namn}</div>
        <strong>In English:</strong>
        <div>{stations.name_eng}</div>
        <strong>Station Address:</strong>
        <div>{stations.osoite}</div>
        <br />
        <div>{stations.adress}</div>
        <strong>Total starts:</strong>
        <div>Lahot</div>
        <strong>Total returns:</strong>
        <div>palautukset</div>
      </div>
      <hr />
      {showExtra && (
        <>
          <div className="grid-container">
            <strong>Average distance from here:</strong>
            <div>keskiarvoooo km</div>
          </div>
          <strong>Top 5 return stations from here:</strong>
          <div className="grid-container">
            <div>Sornainen</div>
            <div>4356 returns.</div>
            <div>Kamppi</div>
            <div>43 returns.</div>
            <div>Kapyla</div>
            <div>777 returns.</div>
            <div>JOkumesta</div>
            <div>989 returns.</div>
            <div>Sornainen</div>
            <div>4356 returns.</div>
          </div>
          <strong>Top 5 departure stations ending this station:</strong>
          <div className="grid-container">
            <div>Sornainen</div>
            <div>4356 ending here.</div>
            <div>Kamppi</div>
            <div>43 ending here.</div>
            <div>Kapyla</div>
            <div>777 ending here.</div>
            <div>JOkumesta</div>
            <div>989 ending here.</div>
            <div>Sornainen</div>
            <div>4356 ending here.</div>
          </div>
        </>
      )}
      <div className="mb-2 mt-2">
        <Button size="xs" onClick={toggleMore} color="grey" className="w-auto">
          {showExtra ? "Show Less" : " Show More"}
        </Button>
      </div>
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
