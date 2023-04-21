const extraRouter = require("express").Router();
const { pool } = require("../utils/dbConnection");

extraRouter.post("/addStation", async (req, res) => {
  const station = req.body;

  if (station.osoite.includes("+")) {
    return res.json({ message: "You can't add station there." });
  }

  const myId = await pool.query(`SELECT MAX(id) FROM bike_stations`);
  const myFid = await pool.query(`SELECT MAX(fid) FROM bike_stations`);

  console.log(myId.rows);
  console.log("FIDI", myFid.rows[0].max);

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

module.exports = extraRouter;
