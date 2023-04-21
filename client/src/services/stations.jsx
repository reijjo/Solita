import axios from "axios";

const baseUrl = `http://localhost:3001/api/stations`;

const getAll = async (limit, offset) => {
  const res = await axios.get(`${baseUrl}/all?limit=${limit}&offset=${offset}`);
  return res.data;
};

const getStation = async (id) => {
  const res = await axios.get(`${baseUrl}/info/${id}`);
  return res.data;
};

const getEspoo = async (limit, offset) => {
  const res = await axios.get(
    `${baseUrl}/espoo?limit=${limit}&offset=${offset}`
  );
  return res.data;
};

const getHelsinki = async (limit, offset) => {
  const res = await axios.get(
    `${baseUrl}/helsinki?limit=${limit}&offset=${offset}`
  );
  return res.data;
};

// DEPARTURES

const getAllDepartures = async (id) => {
  const res = await axios.get(`${baseUrl}/info/departures/all/${id}`);
  return res.data;
};

const getMayDepartures = async (id) => {
  const res = await axios.get(`${baseUrl}/info/departures/may/${id}`);
  return res.data;
};

const getJuneDepartures = async (id) => {
  const res = await axios.get(`${baseUrl}/info/departures/june/${id}`);
  return res.data;
};

const getJulyDepartures = async (id) => {
  const res = await axios.get(`${baseUrl}/info/departures/july/${id}`);
  return res.data;
};


// RETURNS

const getAllReturns = async (id) => {
  const res = await axios.get(`${baseUrl}/info/returns/all/${id}`);
  return res.data;
};

const getMayReturns = async (id) => {
  const res = await axios.get(`${baseUrl}/info/returns/may/${id}`);
  return res.data;
};

const getJuneReturns = async (id) => {
  const res = await axios.get(`${baseUrl}/info/returns/june/${id}`);
  return res.data;
};

const getJulyReturns = async (id) => {
  const res = await axios.get(`${baseUrl}/info/returns/july/${id}`);
  return res.data;
};

const getAllTopReturns = async (id) => {
  const res = await axios.get(`${baseUrl}/info/returns/all/top/${id}`);
  return res.data;
};

const getMayTopReturns = async (id) => {
  const res = await axios.get(`${baseUrl}/info/returns/may/top/${id}`);
  return res.data;
};

const getJuneTopReturns = async (id) => {
  const res = await axios.get(`${baseUrl}/info/returns/june/top/${id}`);
  return res.data;
};

const getJulyTopReturns = async (id) => {
  const res = await axios.get(`${baseUrl}/info/returns/july/top/${id}`);
  return res.data;
};

const getAllTopDepart = async (id) => {
  const res = await axios.get(`${baseUrl}/info/departures/all/top/${id}`);
  return res.data;
};

const getMayTopDepart = async (id) => {
  const res = await axios.get(`${baseUrl}/info/departures/may/top/${id}`);
  return res.data;
};

const getJuneTopDepart = async (id) => {
  const res = await axios.get(`${baseUrl}/info/departures/june/top/${id}`);
  return res.data;
};

const getJulyTopDepart = async (id) => {
  const res = await axios.get(`${baseUrl}/info/departures/july/top/${id}`);
  return res.data;
};

// SEARCH

const searchAll = async (query) => {
	const res = await axios.get(`${baseUrl}/search/all?q=${query}`)
	return res.data
}

const searchEspoo = async (query) => {
	const res = await axios.get(`${baseUrl}/search/espoo?q=${query}`)
	return res.data
}

const searchHelsinki = async (query) => {
	const res = await axios.get(`${baseUrl}/search/helsinki?q=${query}`)
	return res.data
}

const stationService = {
  getAll,
  getStation,
  getEspoo,
  getHelsinki,
  getAllDepartures,
  getMayDepartures,
  getJuneDepartures,
  getJulyDepartures,
  getAllReturns,
  getMayReturns,
  getJuneReturns,
  getJulyReturns,
  getAllTopReturns,
  getMayTopReturns,
  getJuneTopReturns,
  getJulyTopReturns,
  getAllTopDepart,
  getMayTopDepart,
  getJuneTopDepart,
  getJulyTopDepart,
  searchAll,
  searchEspoo,
  searchHelsinki,
};

export default stationService;
