SET timezone = 'Europe/Helsinki';

-- Bike Stations

CREATE TABLE IF NOT EXISTS bike_stations (
	FID INT NOT NULL PRIMARY KEY,
	ID INT NOT NULL,
	Nimi VARCHAR(255) NOT NULL,
	Namn VARCHAR(255) NOT NULL,
	Name VARCHAR(255) NOT NULL,
	Osoite VARCHAR(255) NOT NULL,
	Adress VARCHAR(255) NOT NULL,
	Kaupunki VARCHAR(255) NOT NULL,
	Stad VARCHAR(255) NOT NULL,
	Operaattori VARCHAR(255) NOT NULL,
	Kapasiteetti INT NOT NULL,
	x FLOAT NOT NULL,
	y FLOAT NOT NULL
);

CREATE TABLE temp_bike_stations AS SELECT * FROM bike_stations WITH NO DATA;

COPY temp_bike_stations(fid, id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattori, kapasiteetti, x, y) FROM '/db/bike_stations/Helsingin_ja_Espoon_kaupunkipyora-asemat_avoin.csv' DELIMITER ',' CSV HEADER;

INSERT INTO bike_stations (fid, id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattori, kapasiteetti, x, y)
SELECT
  fid,
  id,
  nimi,
  namn,
  name,
  osoite,
  adress,
  CASE WHEN TRIM(kaupunki) = '' THEN 'Helsinki' ELSE kaupunki END,
  CASE WHEN TRIM(stad) = '' THEN 'Helsingfors' ELSE stad END,
  CASE WHEN TRIM(operaattori) = '' THEN '-' ELSE operaattori END,
  kapasiteetti,
  x,
  y
FROM temp_bike_stations;

DROP TABLE temp_bike_stations;

-- Journey Data

CREATE TABLE IF NOT EXISTS journey_data (
	id SERIAL NOT NULL PRIMARY KEY,
	departure TIMESTAMP NOT NULL,
	return TIMESTAMP NOT NULL,
	departure_station_id INT NOT NULL,
	departure_station_name VARCHAR(255) NOT NULL,
	return_station_id INT NOT NULL,
	return_station_name VARCHAR(255) NOT NULL,
	distance_m INT NOT NULL,
	duration_sec INT NOT NULL
);

CREATE TABLE temp_journey_data (
	departure TIMESTAMP NOT NULL,
	return TIMESTAMP NOT NULL,
	departure_station_id INT,
	departure_station_name VARCHAR(255),
	return_station_id INT,
	return_station_name VARCHAR(255),
	distance_m FLOAT,
	duration_sec INT
);


COPY temp_journey_data(departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_m, duration_sec) FROM '/db/journey_data/2021-05.csv' DELIMITER ',' CSV HEADER;

INSERT INTO journey_data (departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_m, duration_sec)
SELECT departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, FLOOR(distance_m), duration_sec
FROM temp_journey_data
WHERE FLOOR(distance_m) = distance_m AND duration_sec >= 10 AND distance_m >= 10;


COPY temp_journey_data(departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_m, duration_sec) FROM '/db/journey_data/2021-06.csv' DELIMITER ',' CSV HEADER;

INSERT INTO journey_data (departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_m, duration_sec)
SELECT departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, FLOOR(distance_m), duration_sec
FROM temp_journey_data
WHERE FLOOR(distance_m) = distance_m AND duration_sec >= 10 AND distance_m >= 10;


COPY temp_journey_data(departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_m, duration_sec) FROM '/db/journey_data/2021-07.csv' DELIMITER ',' CSV HEADER;

INSERT INTO journey_data (departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, distance_m, duration_sec)
SELECT departure, return, departure_station_id, departure_station_name, return_station_id, return_station_name, FLOOR(distance_m), duration_sec
FROM temp_journey_data
WHERE FLOOR(distance_m) = distance_m AND duration_sec >= 10 AND distance_m >= 10;

DROP TABLE temp_journey_data;






-- 2021-05-31T22:40:42
-- 2021-05-31T23:34:08
-- 2021-05-31T22:28:25