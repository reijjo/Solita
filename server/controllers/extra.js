const extraRouter = require("express").Router();
const { pool } = require("../utils/dbConnection");

extraRouter.post("/addStation", async (req, res) => {
  const station = req.body;

  if (station.osoite.includes("+")) {
    return res.json({ message: "You can't add station there." });
  }

  if (
    !station.nimi ||
    !station.osoite ||
    !station.kaupunki ||
    !station.x ||
    !station.y
  ) {
    return res.json({ message: "Invalid station." });
  }

  const myId = await pool.query(`SELECT MAX(id) FROM bike_stations`);
  const myFid = await pool.query(`SELECT MAX(fid) FROM bike_stations`);
  const existingStation = await pool.query(
    `SELECT * FROM bike_stations WHERE nimi = $1`,
    [station.nimi]
  );

  if (existingStation.rows.length > 0) {
    return res.json({ message: "Station already exists!" });
  }

  try {
    const adding = await pool.query(
      `INSERT INTO bike_stations (id, nimi, namn, name_eng, osoite, adress, kaupunki, stad, operaattori, kapasiteetti, x, y, fid)
  		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        myId.rows[0].max + 1,
        station.nimi,
        station.nimi,
        station.nimi,
        station.osoite,
        station.osoite,
        station.kaupunki,
        station.kaupunki,
        "Mun Fillarit Oy",
        "1",
        station.y,
        station.x,
        myFid.rows[0].max + 1,
      ]
    );
    console.log("MUN ID", myId.rows[0].max + 1);

    console.log(station);
    res.json({
      message: `Station (${station.nimi}) added succesfully.`,
      adding,
    });
  } catch (error) {
    console.error("Error adding station", error);
  }
});

extraRouter.post("/addJourney", async (req, res) => {
  const journey = req.body;

  if (!journey.depStation || !journey.retStation) {
    return res.json({ message: "Invalid Journey!" });
  }

  const myId = await pool.query(`SELECT MAX(id) FROM journey_data`);
  const depStation = journey.depStation;
  const retStation = journey.retStation;

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371000; // in meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };

  const distance_m = Math.floor(
    getDistanceFromLatLonInMeters(
      depStation.y,
      depStation.x,
      retStation.y,
      retStation.x
    )
  );

  const departure_time = new Date().toUTCString();
  const return_time = new Date(Date.now() + 15 * 60000).toUTCString();

  console.log(departure_time, return_time);

  try {
    const addJourney = await pool.query(
      `
  		INSERT INTO journey_data (
  			id, departure_time, return_time, departure_station_id, departure_station_name,
  			return_station_id, return_station_name, distance_m, duration_sec) VALUES (
  			$1, $2, $3, $4, $5, $6, $7, $8, $9)
  	`,
      [
        myId.rows[0].max + 1,
        departure_time,
        return_time,
        depStation.id,
        depStation.nimi,
        retStation.id,
        retStation.nimi,
        distance_m,
        60 * 15,
      ]
    );
    res.json({ message: `Journey added succesfully.`, addJourney });
  } catch (error) {
    console.error("Error adding journey!");
  }
});

module.exports = extraRouter;
