require('dotenv').config()

let PORT = process.env.PORT

let POSTGRES_USER = process.env.POSTGRES_USER
let POSTGRES_DB = process.env.POSTGRES_DB
let PGADMIN_DEFAULT_PASSWORD = process.env.PGADMIN_DEFAULT_PASSWORD
let PGHOST = process.env.PGHOST
let PGPORT = process.env.PGPORT
let GOOGLE_MAPS = process.env.GOOGLE_MAPS;

module.exports = {
  PORT,
  POSTGRES_USER,
  PGHOST,
  POSTGRES_DB,
  PGADMIN_DEFAULT_PASSWORD,
  PGPORT,
  GOOGLE_MAPS,
};