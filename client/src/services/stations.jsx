import axios from "axios";

const baseUrl = `http://localhost:3001/api/stations`;

const getAll = async (limit, offset) => {
  const res = await axios.get(`${baseUrl}?limit=${limit}&offset=${offset}`);
  return res.data;
};

const stationService = { getAll };

export default stationService;
