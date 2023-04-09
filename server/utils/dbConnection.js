const config = require('./config')
const { Pool } = require('pg')

const pool = new Pool({
	user: config.POSTGRES_USER,
	host: config.PGHOST,
	database: config.POSTGRES_DB,
	password: config.PGADMIN_DEFAULT_PASSWORD,
	port: config.PGPORT
})

const connectDB = () => {
	pool.connect((err, client, release) => {
		if (err) {
			console.log('Error acquiring client', err.stack)
			console.log('Retrying in 5 seconds...')
			setTimeout(connectDB, 5000)
		}
		else {
			console.log(`Connected to database ${config.POSTGRES_DB}`)
		}
	})
}

module.exports = {
	pool, connectDB
}