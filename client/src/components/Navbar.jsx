import { Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Nav = () => {
	return (
    <Navbar
      fluid={true}
      //rounded={true}
      className="bg-grey-50"
    >
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link
          className="transition-colors duration-200 hover:text-blue-500"
          to="/"
        >
          Journeys
        </Link>
        <Link
          className="transition-colors duration-200 hover:text-blue-500"
          to="/stations"
        >
          Stations
        </Link>
        <Link
          className="transition-colors duration-200 hover:text-blue-500"
          to="/extra"
        >
          EXTRA (add station)
        </Link>
        <Link
          className="transition-colors duration-200 hover:text-blue-500"
          to="/surprise"
        >
          SURPRISE (add journey)
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav
