const journeyRouter = require('express').Router()
const { pool } = require('../utils/dbConnection')

// journeyRouter.get('/', async (req, res) => {
// 	try {
//     const result = await pool.query(
//       // `SELECT * FROM journey_data`
//       `SELECT * FROM journey_data WHERE departure_station_id = $1 AND return_station_id = $2 AND duration_sec < 400`,
//       [94, 100]
//     );
//     res.json(result.rows);
//     //res.send(result)
//   }
// 	catch (error) {
// 		console.error('Error fetching journeys:', error)
// 	}
// })
journeyRouter.get('/', async (req, res) => {
	const { limit, offset } = req.query;
	try {
    const result = await pool.query(
      `SELECT * FROM journey_data ORDER BY departure_time LIMIT  $1 OFFSET $2`,
      [Number(limit), Number(offset)]
      // `SELECT * FROM journey_data WHERE departure_station_id = $1 AND return_station_id = $2 AND duration_sec < 400 ORDER BY departure_time LIMIT $3 OFFSET $4`,
      // [94, 100, Number(limit), Number(offset)]
    );
    res.json(result.rows);
    //res.send(result)
  }
	catch (error) {
		console.error('Error fetching journeys:', error)
	}
})

module.exports = journeyRouter
