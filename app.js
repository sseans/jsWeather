// Global Variables
const key = 'a56b35b061c95a78d4ce7e5d294e0094';
const iconURL = 'http://openweathermap.org/img/wn/'

// Selectors
    // Input Selector
    const inputField = document.querySelector('#inputField')
    // Button Selector
    const inputButton = document.querySelector('#inputButton')
    // Container Selector
    const tileContainer = document.querySelector('.tileContainer')

// Event Listeners
inputButton.addEventListener('click', insertCityName)
inputField.addEventListener('keypress', function(keyPress){
                                            if (keyPress.key === 'Enter') {
                                                insertCityName()
                                            }
                                        }
)
// Functions
function insertCityName(event) {
    let cityNameSelected = inputField.value;
    weatherBalloon(cityNameSelected)
    // Resets inputfield value so you can search again
    inputField.value = '';
}

function weatherBalloon(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
      buildWeatherSquare(data)
    })
    .catch(function() {
      // catch any errors
    });
}

function buildWeatherSquare(d) {
  // Creates new tile
  const newTile = document.createElement('div')
  newTile.className = 'tile'
  tileContainer.appendChild(newTile)
  // Returns template string & adds it to the tile html
  let tileTemplate = `${buildWeatherDataTemplate(d)}`
  newTile.innerHTML = tileTemplate
}

function buildWeatherDataTemplate(d) {
  // Calculates celcius from kelvin
  var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	
  return `
    <div id="weatherLogo" class="tile__weatherLogo">
      <img class="tile__icon" src="${iconURL + d.weather[0].icon}@2x.png">
    </div>
    <div id="tile__weatherData">
      <h1 id="temp">${celcius + '&deg;'}</h1>
      <h3 id="description">${d.weather[0].description}</h1>
      <h4 id="location">${d.name}</h1>
    </div>
  `
}
