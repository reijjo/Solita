import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Nav from './components/Navbar'
import Home from './components/Home'
import May from "./components/May";
import June from "./components/June";
import July from "./components/July";
import NotFound from "./components/NotFound";
import Foot from "./components/Footer";
import Stations from "./components/Stations";

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Foot />
      </Router>
    </div>
  );
};
export default App;
