import { useEffect, useState } from "react"

import journeyService from "../services/journeys"

const Home = () => {
	const [journeys, setJourneys] = useState([])

	//useEffect(() => {
	//	journeyService.getAll()
	//	.then((response) => {
	//		setJourneys(response)
	//	})
	//}, [])

	useEffect(() => {
		const response = async () => {
			try {
				const data = await journeyService.getAll()
				setJourneys(data)
			}
			catch (error) {
				console.error('Error fetching journeys', error)
			}
		}
		response()
	}, [])

	console.log('nyt alkaa tapahtuu', journeys)

	return (
		<div className='flex h-screen rounded-sm text-cyan-700'>
			HELLO

		</div>
	)
}

export default Home
