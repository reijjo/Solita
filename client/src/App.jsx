import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Nav from './components/Navbar'
import Home from './components/journeys/Home'
import May from "./components/journeys/May";
import June from "./components/journeys/June";
import July from "./components/journeys/July";
import Foot from "./components/Footer";
import Stations from "./components/stations/Stations";
import Espoo from "./components/stations/Espoo";
import Helsinki from "./components/stations/Helsinki";
import StationInfo from "./components/stations/StationInfo";
import StationInfoMay from "./components/stations/StationInfoMay";
import StationInfoJune from "./components/stations/StationInfoJune";
import StationInfoJuly from "./components/stations/StationInfoJuly";
import Extra from "./components/Extra";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-t from-blue-200 to-blue-100">
      <Router>
        <Header />
        <Nav />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/may" element={<May />} />
            <Route path="/june" element={<June />} />
            <Route path="/july" element={<July />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/stations/espoo" element={<Espoo />} />
            <Route path="/stations/helsinki" element={<Helsinki />} />
            <Route path="/stations/info/:id" element={<StationInfo />} />
            <Route path="/stations/info/may/:id" element={<StationInfoMay />} />
            <Route
              path="/stations/info/june/:id"
              element={<StationInfoJune />}
            />
            <Route
              path="/stations/info/july/:id"
              element={<StationInfoJuly />}
            />
            <Route path="/extra" element={<Extra />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <Foot />
      </Router>
    </div>
  );
};
export default App;
