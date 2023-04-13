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

const journeyService = { getAll }

export default journeyService
