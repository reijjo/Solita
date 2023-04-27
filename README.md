# Solita
Helsinki City Bike App

## This is the pre-assignment for Solita Dev Academy Finland 2023.
* Let's imagine that you have received an interesting project offer to create a UI and a backend service for displaying data from journeys made with city bikes in the Helsinki Capital area.

### The exercise
* https://github.com/solita/dev-academy-2023-exercise


## Technologies:

* ReactJs
* NodeJs with Express
* Docker
* PostgreSQL
* PgAdmin
* Tailwind CSS

## How to use:

<details>
	<summary>Prerequisites</summary>

* You must have Docker installed and running on your computer:
https://docs.docker.com/get-docker/

</details>


<details>
	<summary>Configurations</summary>

* Rename 'SOLITAenv' file in server folder to '.env'
	* Change POSTGRES_USER, POSTGRES_PASSWORD, PGADMIN_DEFAULT_EMAIL and PGADMIN_DEFAULT_PASSWORD to whatever you want
* Change the "Username" in db/servers.json file to same than your POSTGRES_USER in your .env file
* Insert your Google Maps Api Key in FRONTENV file in your client folder and rename 'FRONTENV' to '.env'
	
<details>
	<summary> To obtain a Google Maps API key, you need to follow these steps: </summary>
	
* Go to the Google Cloud Console (https://console.cloud.google.com/).
* If you don't have a project yet, create one by clicking the "Select a Project" dropdown menu and then clicking the "New Project" button.
* Once you have a project, click on the project name to go to the project dashboard.
* In the left sidebar, click on "APIs & Services" and then "Credentials."
* On the Credentials page, click on "Create credentials" and select "API key."
* Copy the API key from the "API keys" section.
* Note that you may need to enable the Google Maps API for your project before you can create an API key. You can do this by clicking on the "Library" tab in the "APIs & Services" section and searching for the Google Maps API you want to use (e.g. "Maps JavaScript API," "Places API," etc.). Once you find the API, click on it and then click the "Enable" button.
	</details>

Also, keep in mind that some APIs may require billing information and a payment method to be set up before you can use them.
* Unzip all the .zip files in db/journey_data folder to the same folder
</details>

<details>
	<summary>How to run</summary>

* Open terminal in to the projects root folder and: 'docker-compose up' and wait a couple of minutes that everything is up and running.
* Open your browser and:
	* Frontend: http://localhost:3000
	* Backend: http://localhost:3001
	* Database: http://localhost:8080
		* Login to pgAdmin with your credentials (email and password from your .env file)
		* Tables are in: Server Group 1 => myProject => Schemas => public => Tables

</details>

<details>
	<summary>Tests</summary>

## Using Cypress for end to end testing for this project
### First have the app up and running
* Running Cypress on the background
	* Open new terminal in the frontend folder => npm run cypress:open
	* New window pops up. Choose E2E Testing => Choose your browser (I suggest Chrome) => run the tests by clicking test file
### Or
* Running all the tests at once
	* Open new terminal in the frontend folder => npm run test:e2e

</details>
