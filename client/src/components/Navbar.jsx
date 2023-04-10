import { Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Nav = () => {
	return (
		<Navbar
			fluid={true}
			//rounded={true}
			className='nav-custom-bg'
		>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Link
					className='transition-colors duration-200 hover:text-green-500'
					to="/"
					//active={true}
				>
					Journeys
				</Link>
				<Link
					className='transition-colors duration-200 hover:text-green-500'
					to="/stations"
					//active={true}
				>
					Stations
				</Link>
				{/*<Navbar.Link
					href="/"
					//active={true}
				>
					Journeys
				</Navbar.Link>*/}
				{/*<Navbar.Link
					href='/stations'
				>
					Stations
				</Navbar.Link>*/}
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Nav
