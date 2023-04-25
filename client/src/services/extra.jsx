import axios from "axios";

const baseUrl = `http://localhost:3001/api/extra`;

const addStation = async (newObject) => {
  const res = await axios.post(`${baseUrl}/addStation`, newObject);
  return res.data;
};

const addJourney = async (newObject) => {
  const res = await axios.post(`${baseUrl}/addJourney`, newObject);
  return res.data;
};

const extraService = { addStation, addJourney };

export default extraService;
