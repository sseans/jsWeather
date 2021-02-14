// Global Variables
const key = 'a56b35b061c95a78d4ce7e5d294e0094';
const iconURL = 'http://openweathermap.org/img/wn/'
let favouritesArray;

// Selectors
  // Input Selector
  const inputField = document.querySelector('#inputField')
  // Button Selector
  const inputButton = document.querySelector('#inputButton')
  // Container Selector
  const tileContainer = document.querySelector('.tileContainer')
  const scrollHider = document.querySelector('.scrollhider')
  const favTileContainer = document.querySelector('.favourites')
  const favScrollHider = document.querySelector('.favourites__scrollhider')
  
// Event Listeners
document.addEventListener('DOMContentLoaded', checkLocalStorage)
inputButton.addEventListener('click', () => insertCityName(event, scrollHider))
inputField.addEventListener('keypress', function(keyPress){
                                            if (keyPress.key === 'Enter') {
                                                insertCityName(event, scrollHider)
                                            }
                                        })
tileContainer.addEventListener('click', actionCheckTileContainer)
favTileContainer.addEventListener('click', actionCheckFavContainer)

// Check which button on the tile was pressed inside Tile Container
  function actionCheckTileContainer(e) {
    const target = e.target
    // Remove Tile
    if (target.classList[0] == "tile__remove") {
      // Navigates to target the tile itself
      const targetParent = target.parentElement
      const targetTile = targetParent.parentElement
      targetTile.remove();   

    // Favourite Tile
    } else if (target.classList[0] == "tile__fav") {
      // Navigates to target the tile itself
      const targetParent = target.parentElement
      const targetTile = targetParent.parentElement
      favScrollHider.appendChild(targetTile)
      // Toggle favourite class
      targetTile.classList.toggle('favourite')
      // Add Location data to Favourites Array
      const targetLocation = targetTile.querySelector('#location').innerHTML
      favouritesArray.push(targetLocation)
      console.log(favouritesArray);
      updateLocalStorage()
    }
  }

// Check which button on the tile was pressed inside favourites tile Container
  function actionCheckFavContainer(e) {
    const target = e.target
    // Unfavourite Tile
    if (target.classList[0] == "tile__fav") {
      // Navigates to target the tile itself
      const targetParent = target.parentElement
      const targetTile = targetParent.parentElement
      // Remove Location data from Favourites Array
      const targetLocation = targetTile.querySelector('#location').innerHTML
      console.log(favouritesArray);
      const index = favouritesArray.indexOf(targetLocation)
      favouritesArray.splice(index, 1)
      console.log(favouritesArray);
      // Removes Tile
      targetTile.remove(); 
      updateLocalStorage()  
    } 
  }

// Check local Storage to see if favourites already exist
  function checkLocalStorage() {
    if (localStorage.getItem('favourites') === null) {
      favouritesArray = []
    } else {
      // Parses localStorage JSON to create an array and assigns it to variable
      favouritesArray = JSON.parse(localStorage.getItem('favourites'))
    }
    buildFavouritesOnStartUp()
  }

// Build favourites list from startup
  function buildFavouritesOnStartUp() {
    // Uses Map to build Tiles from Favourites
    favouritesArray.map(x => fetchFunction(x, favScrollHider))
    // Adds Delay so that fetchfunction can fully complete
    setTimeout(() => {
      let builtElements = document.querySelectorAll('#location')      
      // Identifies TargetTiles and moves them to Favourites
      builtElements.forEach(element => {
        let targetParent = element.parentElement
        let targetTile = targetParent.parentElement
        targetTile.classList.toggle('favourite')
      });
    }, 300)
  }

// Add tile to favourites local Storage
  function updateLocalStorage() {
    localStorage.setItem('favourites', JSON.stringify(favouritesArray))
  }


// // Draggable Slider Variable + Event Listeners + functions
// let isDown = false;                     
// let startX;
// let scrollLeft;

// tileContainer.addEventListener('mousedown', () => {
//   isDown = true;
// });

// tileContainer.addEventListener('mouseleave', () => {
//   isDown = false;
  
// });

// tileContainer.addEventListener('mouseup', () => {
//   isDown = false;

// });

// tileContainer.addEventListener('mousemove', () => {
//   console.log(isDown);
//   console.log('Do Work!');
  
  
// });

// Fetching Openweathermap API Functions
  function insertCityName(event, appendLocation) {
      let cityNameSelected = inputField.value;
      fetchFunction(cityNameSelected, appendLocation)
      // Resets inputfield value so you can search again
      inputField.value = '';
  }

  function fetchFunction(cityName, appendLocation) {
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key)  
      .then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data) {
        console.log(data);
        buildWeatherSquare(data, appendLocation)
      })
      .catch(function() {
        // catch any errors
      });
  }

// Building divs & adding weather data functions
  function buildWeatherSquare(d, appendLocation) {
    if (d.cod == "404") {
      console.log('City Name Not Valid');
      return
    } else {
      // Creates new tile
      const newTile = document.createElement('div')
      newTile.className = 'tile'
      appendLocation.appendChild(newTile)
      // Returns template string & adds it to the tile html
      let tileTemplate = `${buildWeatherDataTemplate(d)}`
      newTile.innerHTML = tileTemplate
    }    
  }

  function buildWeatherDataTemplate(d) {
    // Calculates celcius from kelvin
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    
    return `
      <div class="tile__tools">
        <div class="tile__fav">
          <i class="far fa-star"></i>
        </div>
        <div class="tile__remove">
          <i class="far fa-times-circle"></i>
        </div>
      </div>
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
