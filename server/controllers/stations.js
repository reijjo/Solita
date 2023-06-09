const stationRouter = require("express").Router();
const { pool } = require("../utils/dbConnection");

stationRouter.get("/all", async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM bike_stations ORDER BY id LIMIT $1 OFFSET $2`,
      [Number(limit), Number(offset)]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stations:", error);
  }
});

stationRouter.get("/espoo", async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM bike_stations WHERE kaupunki = $1 ORDER BY id LIMIT $2 OFFSET $3`,
      ["Espoo", Number(limit), Number(offset)]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stations:", error);
  }
});

stationRouter.get("/helsinki", async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM bike_stations WHERE kaupunki = $1 ORDER BY id LIMIT $2 OFFSET $3`,
      ["Helsinki", Number(limit), Number(offset)]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stations:", error);
  }
});

stationRouter.get("/info/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM bike_stations WHERE id = $1`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching station", error);
  }
});

// DEPARTURES
stationRouter.get("/info/departures/all/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM journey_data WHERE departure_station_id = $1`,
      [id]
    );
    res.json(result.rows[0].count);
  } catch (error) {
    console.error("Error fetching departure count", error);
  }
});

stationRouter.get("/info/departures/may/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM may_journey_data WHERE departure_station_id = $1`,
      [id]
    );
    res.json(result.rows[0].count);
  } catch (error) {
    console.error("Error fetching departure count", error);
  }
});

stationRouter.get("/info/departures/june/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM june_journey_data WHERE departure_station_id = $1`,
      [id]
    );
    res.json(result.rows[0].count);
  } catch (error) {
    console.error("Error fetching departure count", error);
  }
});

stationRouter.get("/info/departures/july/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM july_journey_data WHERE departure_station_id = $1`,
      [id]
    );
    res.json(result.rows[0].count);
  } catch (error) {
    console.error("Error fetching departure count", error);
  }
});

stationRouter.get("/info/departures/all/top/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
			SELECT departure_station_name, departure_station_id, COUNT(*) as num_returns FROM journey_data
			WHERE return_station_id = $1 GROUP BY departure_station_id, departure_station_name
			ORDER BY num_returns DESC LIMIT 5
		`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top 5 ends", error);
  }
});

stationRouter.get("/info/departures/may/top/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
			SELECT departure_station_name, departure_station_id, COUNT(*) as num_returns FROM may_journey_data
			WHERE return_station_id = $1 GROUP BY departure_station_id, departure_station_name
			ORDER BY num_returns DESC LIMIT 5
		`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top 5 ends", error);
  }
});

stationRouter.get("/info/departures/june/top/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
			SELECT departure_station_name, departure_station_id, COUNT(*) as num_returns FROM june_journey_data
			WHERE return_station_id = $1 GROUP BY departure_station_id, departure_station_name
			ORDER BY num_returns DESC LIMIT 5
		`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top 5 ends", error);
  }
});

stationRouter.get("/info/departures/july/top/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
			SELECT departure_station_name, departure_station_id, COUNT(*) as num_returns FROM july_journey_data
			WHERE return_station_id = $1 GROUP BY departure_station_id, departure_station_name
			ORDER BY num_returns DESC LIMIT 5
		`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top 5 ends", error);
  }
});

// RETURNS

stationRouter.get("/info/returns/all/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM journey_data WHERE return_station_id = $1`,
      [id]
    );
    res.json(result.rows[0].count);
  } catch (error) {
    console.error("Error fetching departure count", error);
  }
});

stationRouter.get("/info/returns/may/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM may_journey_data WHERE return_station_id = $1`,
      [id]
    );
    res.json(result.rows[0].count);
  } catch (error) {
    console.error("Error fetching departure count", error);
  }
});

stationRouter.get("/info/returns/june/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM june_journey_data WHERE return_station_id = $1`,
      [id]
    );
    res.json(result.rows[0].count);
  } catch (error) {
    console.error("Error fetching departure count", error);
  }
});

stationRouter.get("/info/returns/july/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM july_journey_data WHERE return_station_id = $1`,
      [id]
    );
    res.json(result.rows[0].count);
  } catch (error) {
    console.error("Error fetching departure count", error);
  }
});

stationRouter.get("/info/returns/all/top/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT return_station_name, return_station_id, COUNT(*) as num_returns FROM journey_data
			WHERE departure_station_id = $1 GROUP BY return_station_id, return_station_name
			ORDER BY num_returns DESC LIMIT 5`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top 5 returns", error);
  }
});

stationRouter.get("/info/returns/may/top/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT return_station_name, return_station_id, COUNT(*) as num_returns FROM may_journey_data
			WHERE departure_station_id = $1 GROUP BY return_station_id, return_station_name
			ORDER BY num_returns DESC LIMIT 5`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top 5 returns", error);
  }
});

stationRouter.get("/info/returns/june/top/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT return_station_name, return_station_id, COUNT(*) as num_returns FROM june_journey_data
			WHERE departure_station_id = $1 GROUP BY return_station_id, return_station_name
			ORDER BY num_returns DESC LIMIT 5`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top 5 returns", error);
  }
});

stationRouter.get("/info/returns/july/top/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT return_station_name, return_station_id, COUNT(*) as num_returns FROM july_journey_data
			WHERE departure_station_id = $1 GROUP BY return_station_id, return_station_name
			ORDER BY num_returns DESC LIMIT 5`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching top 5 returns", error);
  }
});

// SEARCH STATIONS

stationRouter.get("/search/all", async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const result = await pool.query(
      `
			SELECT * FROM bike_stations WHERE (Nimi ILIKE $1 OR Namn ILIKE $1 OR Name_eng ILIKE $1)
		`,
      [`%${searchQuery}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error searching stations", error);
  }
});

stationRouter.get("/search/espoo", async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const result = await pool.query(
      `
			SELECT * FROM bike_stations WHERE (Nimi ILIKE $1 OR Namn ILIKE $1 OR Name_eng ILIKE $1) AND Kaupunki = $2
		`,
      [`%${searchQuery}%`, "Espoo"]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error searching stations", error);
  }
});

stationRouter.get("/search/helsinki", async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const result = await pool.query(
      `
			SELECT * FROM bike_stations WHERE (Nimi ILIKE $1 OR Namn ILIKE $1 OR Name_eng ILIKE $1) AND Kaupunki = $2
		`,
      [`%${searchQuery}%`, "Helsinki"]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error searching stations", error);
  }
});

// AVERAGE DISTANCE

stationRouter.get('/info/departures/all/avg/:id', async (req, res) => {
	const { id } = req.params
	try {
		const result = await pool.query(`
			SELECT AVG(distance_m) FROM journey_data WHERE departure_station_id = $1
		`,
		[id]
		)
		res.json(result.rows[0].avg)
	} catch (error) {
		console.error('Error counting avg starts', error)
	}
})

stationRouter.get('/info/departures/may/avg/:id', async (req, res) => {
	const { id } = req.params
	try {
		const result = await pool.query(`
			SELECT AVG(distance_m) FROM may_journey_data WHERE departure_station_id = $1
		`,
		[id]
		)
		res.json(result.rows[0].avg)
	} catch (error) {
		console.error('Error counting avg starts', error)
	}
})

stationRouter.get('/info/departures/june/avg/:id', async (req, res) => {
	const { id } = req.params
	try {
		const result = await pool.query(`
			SELECT AVG(distance_m) FROM june_journey_data WHERE departure_station_id = $1
		`,
		[id]
		)
		res.json(result.rows[0].avg)
	} catch (error) {
		console.error('Error counting avg starts', error)
	}
})

stationRouter.get('/info/departures/july/avg/:id', async (req, res) => {
	const { id } = req.params
	try {
		const result = await pool.query(`
			SELECT AVG(distance_m) FROM july_journey_data WHERE departure_station_id = $1
		`,
		[id]
		)
		res.json(result.rows[0].avg)
	} catch (error) {
		console.error('Error counting avg starts', error)
	}
})

stationRouter.get('/info/returns/all/avg/:id', async (req, res) => {
	const { id } = req.params
	try {
		const result = await pool.query(
			`SELECT AVG(distance_m) FROM journey_data WHERE return_station_id = $1`,
			[id]
		)
		res.json(result.rows[0].avg)
	} catch (error) {
		console.error('Error counting svg returns', error)
	}
})

stationRouter.get('/info/returns/may/avg/:id', async (req, res) => {
	const { id } = req.params
	try {
		const result = await pool.query(
			`SELECT AVG(distance_m) FROM may_journey_data WHERE return_station_id = $1`,
			[id]
		)
		res.json(result.rows[0].avg)
	} catch (error) {
		console.error('Error counting svg returns', error)
	}
})

stationRouter.get('/info/returns/june/avg/:id', async (req, res) => {
	const { id } = req.params
	try {
		const result = await pool.query(
			`SELECT AVG(distance_m) FROM june_journey_data WHERE return_station_id = $1`,
			[id]
		)
		res.json(result.rows[0].avg)
	} catch (error) {
		console.error('Error counting svg returns', error)
	}
})

stationRouter.get('/info/returns/july/avg/:id', async (req, res) => {
	const { id } = req.params
	try {
		const result = await pool.query(
			`SELECT AVG(distance_m) FROM july_journey_data WHERE return_station_id = $1`,
			[id]
		)
		res.json(result.rows[0].avg)
	} catch (error) {
		console.error('Error counting svg returns', error)
	}
})




module.exports = stationRouter;
