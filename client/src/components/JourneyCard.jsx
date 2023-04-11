const JourneyCard = ({ journeys }) => {
	const kilometers = (journeys.distance_m / 1000).toFixed(2)
	const minutes = Math.floor(journeys.duration_sec / 60)
	const seconds = String(journeys.duration_sec % 60).padStart(2, "0")

	const formatDate = (date) => {
		const dateObj = new Date(date)
		const day = String(dateObj.getUTCDate()).padStart(2, "0")
		const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0")
		const year = dateObj.getUTCFullYear()

		const hours = String(dateObj.getUTCHours()).padStart(2, "0")
		const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0")
		const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0")

		return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
	}

	return (
    <div className="journey-card m-6 rounded-2xl bg-white p-6">
      id: {journeys.id}
      <div>
        Departure Station: {journeys.departure_station_name} <br />
        Leaving at: {formatDate(journeys.departure_time)}
      </div>
      <hr />
      <div>
        Return Station: {journeys.return_station_name} <br />
        Returning at: {formatDate(journeys.return_time)}
      </div>
      <hr />
      <div>Covered Distance: {kilometers} km</div>
      <div>
        Duration: {minutes}:{seconds} minutes
      </div>
    </div>
  );
}

export default JourneyCard
