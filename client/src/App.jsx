import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Nav from './components/Navbar'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Foot from './components/Footer'
import Stations from './components/Stations'

const App = () => {
	return (
		<div className="min-h-screen wrapper bg-gradient-to-t from-blue-200 to-blue-100">
			<Router>
				<Header />
				<Nav />
				<div className='flex h-screen rounded-sm'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/stations' element={<Stations />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
					</div>
				<Foot />
			</Router>
		</div>
	)
}
export default App;
