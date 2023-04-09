# Solita
Helsinki City Bike App

## What is this project about?

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
	* Change POSTGRES_USER, POSTGRES_PASSWORD, PGADMIN_DEFAULT_EMAIL and PGADMIN_DEFAULT_PASSWORD to what ever you want
* Change the "Username" in db/servers.json file to same than your POSTGRES_USER in your .env file
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
</details>
