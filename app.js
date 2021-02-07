// Global Variables
const key = 'a56b35b061c95a78d4ce7e5d294e0094';
const iconURL = 'http://openweathermap.org/img/wn/'

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
    inputField.value = '';
}

function weatherBalloon( cityName ) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      drawWeather(data);
      console.log(data);
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
    console.log(d)

    let imgCode = `<img class="cloud" src="${iconUrl + d.weather[0].icon}@2x.png">`;
    document.getElementById('weatherLogo').innerHTML = imgCode




    // if (d.weather[0].id >= 200 && d.weather[0].id <= 232) {
    //     let imgCode = '11d'
    // } else if (d.weather[0].id >= 300 && d.weather[0].id <= 321) {
    //     let imgCode = '09d'
    // } else if (d.weather[0].id >= 500 && d.weather[0].id <= 504) {
    //     let imgCode = '10d'
    // } else if (d.weather[0].id == 511) {
    //     let imgCode = '13d'
    // } else if (d.weather[0].id >= 520 && d.weather[0].id <= 531) {
    //     let imgCode = '09d'
    // } else if (d.weather[0].id >= 600 && d.weather[0].id <= 622) {
    //     let imgCode = '13d'
    // } else if (d.weather[0].id >= 701 && d.weather[0].id <= 781) {
    //     let imgCode = '50d'
    // } else if (d.weather[0].id == 800) {
    //     let imgCode = '01d'
    // } else if (d.weather[0].id == 801) {
    //     let imgCode = '02d'
    // } else if (d.weather[0].id == 802) {
    //     let imgCode = '03d'
    // } else if (d.weather[0].id >= 803 && d.weather[0].id <= 804) {
    //     let imgCode = '04d'
    // } 
    // console.log('poop');
    
    // document.getElementById('weatherLogo').innerHTML = `<img class="cloud" src="${iconUrl + imageCode}@2x.png">`
}