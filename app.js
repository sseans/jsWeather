// Global Variables

// Selectors
    // Input Selector
    const inputField = document.querySelector('#inputField')
    // Button Selector
    const inputButton = document.querySelector('#inputButton')

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
    let cityNameSelected = document.getElementById('inputField').value;
    weatherBalloon( cityNameSelected )
    document.getElementById('inputfield').value = '';
}

function weatherBalloon( cityName ) {
    var key = 'a56b35b061c95a78d4ce7e5d294e0094';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      drawWeather(data);
    })
    .catch(function() {
      // catch any errors
    });
  }

function drawWeather( d ) {
	var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
	document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
	document.getElementById('location').innerHTML = d.name;
}