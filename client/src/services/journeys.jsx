import axios from 'axios'

const baseUrl = `http://localhost:3001/api/journeys`

// const getAll = async () => {
//   const res = await axios.get(baseUrl);
//   return res.data;
// };

const getAll = async (limit, offset) => {
  const res = await axios.get(`${baseUrl}?limit=${limit}&offset=${offset}`);
  return res.data;
};

const getMay = async (limit, offset) => {
  const res = await axios.get(`${baseUrl}/may?limit=${limit}&offset=${offset}`);
  return res.data;
};

const getJune = async (limit, offset) => {
  const res = await axios.get(
    `${baseUrl}/june?limit=${limit}&offset=${offset}`
  );
  return res.data;
};

const getJuly = async (limit, offset) => {
  const res = await axios.get(
    `${baseUrl}/july?limit=${limit}&offset=${offset}`
  );
  return res.data;
};

const journeyService = { getAll, getMay, getJune, getJuly };

export default journeyService
