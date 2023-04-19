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

const getAllDepartures = async (id) => {
  const res = await axios.get(`${baseUrl}/info/departures/all/${id}`);
  return res.data;
};

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

const getAllTopDepart = async (id) => {
  const res = await axios.get(`${baseUrl}/info/departures/all/top/${id}`);
  return res.data;
};

const stationService = {
  getAll,
  getStation,
  getEspoo,
  getHelsinki,
  getAllDepartures,
  getAllReturns,
  getMayReturns,
  getJuneReturns,
  getJulyReturns,
  getAllTopReturns,
  getAllTopDepart,
};

export default stationService;
