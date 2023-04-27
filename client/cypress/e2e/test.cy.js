/* eslint-disable no-undef */

describe("Simple Test ", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Journeys");
    cy.contains("Stations");
    cy.contains("EXTRA");
    cy.contains("SURPRISE");
  });

  it("backend works?", function () {
    cy.request("GET", "http://localhost:3001/api/test").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq("HELLO FROM THE BACKEND!?!?");
    });
  });
});

describe("Journeys and Stations ok", function () {
  it("Basic Journeys", function () {
    cy.visit("http://localhost:3000");
    cy.get("button").contains("Show More").click();
    cy.get("button").contains("Show Less").click();
    cy.get(".journey-card").eq(0).as("firstCard").should("contain", "id: 1");
    cy.get(".journey-card").eq(1).as("secondCard").should("contain", "id: 2");
    cy.get(".journey-card").eq(2).as("thirdCard").should("contain", "id: 3");
  });

  it("Filtering Journeys", function () {
    cy.visit("http://localhost:3000");
    cy.get("button").contains("Search By:").click();
    cy.get("input[name=dep_station]").type("viis");
    cy.get(".journey-card").eq(0).as("firstCard").should("contain", "id: 4");
    cy.get(".journey-card").eq(1).as("secondCard").should("contain", "id: 5");
    cy.get("#min_duration").check();
    cy.get(".journey-card").eq(0).as("firstCard").should("contain", "id: 30");
    cy.get(".journey-card").eq(1).as("secondCard").should("contain", "id: 5");
  });

  it("Basic Stations", function () {
    cy.visit("http://localhost:3000/stations");
    cy.get(".station-card").eq(0).should("contain", "Kaivopuisto");
    cy.get(".station-card").eq(1).should("contain", "Laivasillankatu");
  });

  it("Search Stations", function () {
    cy.visit("http://localhost:3000/stations");
    cy.get("input[name=searchStation]").type("ora");
    cy.get(".station-card").eq(0).should("contain", "Oravannahkatori");
    cy.contains("div", "Oravannahkatori").click();
    cy.contains("Total Journeys Starting From Here: 1181 kpl");
  });
});

describe("Adding Station And Journey", function () {
  const newStation = {
    id: 9999,
    nimi: "Ratamestarinkatu",
    namn: "Ratamestarinkatu",
    name_eng: "Ratamestarinkatu",
    osoite: "Ratamestarinkatu 11",
    adress: "Ratamestarinkatu 11",
    kaupunki: "Helsinki",
    stad: "Helsingfors",
    operaattori: "-",
    kapasiteetti: "1",
    x: 60.2015936,
    y: 24.9394656,
    fid: 9999,
  };

  it("Adding Station", function () {
    cy.visit("http://localhost:3000/stations");
    cy.get("input[name=searchStation]").type("Ratamestari");
    cy.should("not.contain", "Ratamestarinkatu");
    cy.request(
      "POST",
      `http://localhost:3001/api/extra/addStation`,
      newStation
    );
    cy.get("input[name=searchStation]").type("n");
    cy.get("div").contains("Ratamestarinkatu").click();
    cy.get("div").should(
      "not.contain",
      "Total Journeys Starting From Here: 1 kpl"
    );
    cy.get("div").contains("Total Journeys Starting From Here: 0 kpl");
  });

  it("Deleting New Station", async function () {
    const maxIdResponse = await cy.request(
      "GET",
      "http://localhost:3001/api/extra/addStation/max"
    );
    const maxId = maxIdResponse.body.maxId;
    cy.request("DELETE", `http://localhost:3001/api/stations/info/${maxId}`);
  });
});