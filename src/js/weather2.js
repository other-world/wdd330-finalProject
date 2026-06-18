/* 
Get Location Data (from mountianLocations.json) 
Load into array as location objects 
if selection = "All" 
    foreach location { 
        getForecast(location) 
        buildSimpleCard()  -- display condensed forecast details in a card 
    }
else 
    getForecast(location) 
    display condensed forecast details in a card 
    Insert detailed information into card
*/

const locationFile = "/json/mountainLocations.json";
const currentTemp = document.querySelector('#weatherPage');
let apiURL = "";
let locationSelection = "All";

init();

async function init(){
    let locations = await openWeatherLocations(locationFile);
    let locationsArray = locations.timpLocations;
    console.log(locationsArray);

    locationsArray.forEach(element => {
        const forecast = await getForecast(element);
        console.log(forecast);
        //cardHTML = buildSimpleCard(forecast, locationsArray);
        //console.log(cardHTML);
    });
}

/* Add listeners for the radio buttons
   There's got to be a better way, but
   this works for now.                 */
document.addEventListener('click', function (event) {
    if (event.target.value == 'All') {
        openWeatherLocations("All");
    }
    else if (event.target.value == 'Summit') {
        openWeatherLocations("Summit");
    } 
    else if (event.target.value == 'StewartFalls') {
        openWeatherLocations("StewartFalls");
    } 
    else if (event.target.value == 'Timpooneke') {
        openWeatherLocations("Timpooneke");
    } 
    else if (event.target.value == 'AspenGrove'){
        openWeatherLocations("AspenGrove");
    }
}, false);

async function openWeatherLocations(locationFile) {
    try {
      const response = await fetch(locationFile);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const locations = await response.json();
      return locations;
    }
  
    catch (error) {
      console.error(error.message);
    }
}

//Gets weather data for one location.
async function getForecast(location){
    try {
        const response = await fetch(apiURL);
        if (response.ok) {
            let forecastData =  await response.json();
            console.log(forecastData);
            return forecastData;
        }
    }
    catch (error) {
        console.error(error.message);
    }
}

//Builds the card with the shared/basic weather info.
function buildSimpleCard(location, weatherData) {
    const condensedLocation = location.replace(/\s/g, "");
    const newCard = document.createElement("section");

    newCard.setAttribute("class", "weathercard");
    newCard.setAttribute("id", `${condensedLocation}Weather`);
        const thisLocation = document.createElement("h3");
        thisLocation.innerHTML = `${location}`;
        newCard.appendChild(thisLocation); 

        const chill = calculateWindChill(weatherData.properties.periods[0].temperature, weatherData.properties.periods[0].windSpeed);


        const icon = document.createElement("img");
        icon.setAttribute("src", `${weatherData.properties.periods[0].icon}`);
        icon.setAttribute("alt", `Weather Icon`);
        icon.setAttribute("width", "150");
        icon.setAttribute("height", "150");
        icon.setAttribute("loading", "lazy");

        newCard.appendChild(icon);

        const temperature = document.createElement("p");
        temperature.innerHTML = `<b>Current Temp:</b> ${weatherData.properties.periods[0].temperature}°F`;
        newCard.appendChild(temperature);

        const humidity = document.createElement("p");
        humidity.innerHTML = `<b>Humidity:</b> ${weatherData.properties.periods[0].relativeHumidity}°F`;
        newCard.appendChild(humidity);

        const windspeed = document.createElement("p");
        windspeed.innerHTML = `<b>Windspeed:</b> ${weatherData.properties.periods[0].windSpeed} ${weatherData.properties.periods[0].windDirection}`;
        newCard.appendChild(windspeed);


        const windchill = document.createElement("p");
        windchill.innerHTML = `<b>WindChill:</b> ${chill}°F`;
        newCard.appendChild(windchill);

        return newCard;
}
  
//Adds the extended forecast section to an existing card.

function addDetailedForecast(card, forecast) {
    appendData = document.createElement("section");
    appendData.setAttribute("id", "weatherDetails");
        const forecastSummary = document.createElement("p");
        forecastSummary.innerHTML = `forecast.properties.periods[0].detailedForecast`;
    return appendData;
}

function calculateWindChill(temperature, windspeed){
    const temp = Number(temperature);
    const windArray = (windspeed.split(" ")); 
    const chill = Math.round(35.74 + (0.6215 * temp) - (35.75 * (Number(windArray[0])**0.16)) + (0.4275 * temp * (Number(windArray[0])**0.16)));

    // if the array is longer, there's a range of windspeed, we'll take colder temp and return that
    if (windArray.length == 4){
        const chill = Math.round(35.74 + (0.6215 * temp) - (35.75 * (Number(windArray[2])**0.16)) + (0.4275 * temp * (Number(windArray[2])**0.16)));
    }
    
    return (chill);
}