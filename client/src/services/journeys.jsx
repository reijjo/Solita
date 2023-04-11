import axios from 'axios'

const baseUrl = `http://localhost:3001/api/journeys`

const getAll = async (page, limit) => {
  const res = await axios.get(baseUrl, {
    params: {
      page: page,
      limit: limit,
    },
  });
  return res.data;
};

const journeyService = { getAll }

export default journeyService
