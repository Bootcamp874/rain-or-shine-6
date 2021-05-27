/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
search in city format****
THEN I am presented with current and future conditions for that city and that city is added to the search history
local storage to save searched cities
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather 
conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

I need an API KEY and store it as a variable past in combination of letters and numbers.
parameters of the api are latitude and longitude of city 
call fetch on the url and get back the weather data that is needed 


*/


const apiKey = "4976aa93895edd3d5773c067d42ca850";
let latitude;
let longitude;


/*
fetch makes a call to the server
pass in a url
callback function


$("#btn").click(function(){
  
});
*/


/*
the geocoder takes in an address and gives back a longitude and an latitude then 
the weather api takes in the longitude and latitude then gives you the weather data
get the data to show on the html 
*/

const searchtext = $("#search-text");
const searched = document.getElementById("search-button");

function forecast(cityName) {

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data[0].lat);
      // console.log(data[0].lon);

      let latitude = data[0].lat;
      let longitude = data[0].lon;
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`).then(response => response.json())
        .then(data => {
          // this is the second callback function for the second fetch 
          console.log(data);



          for (let i = 0; i < 6; i++) {
            // loop
            // taking in the info from the weather api 
            let temperature = data.daily[i].temp.day;
            let humidity = data.daily[i].humidity;
            let wind = data.daily[i].wind_speed;
            let icon = data.daily[i].weather[0].icon;
            console.log(icon);
            // loop through this
            // using jquery to append to the html
            const iconPicture = $(`#icon-${i}`);
            const tempText = $(`#temperature-${i}`);
            const windY = $(`#wind-${i}`);
            const humid = $(`#humidity-${i}`);

            //loop throught this also
            iconPicture.attr('src', `http://openweathermap.org/img/w/${icon}.png`);
            tempText.text(temperature);
            windY.text(wind);
            humid.text(humidity);

          }
        });


    });
}
searched.addEventListener('click', function (event) {
  event.preventDefault();
  let cityName = searchtext.val();
  forecast(cityName);

  // contacts the server and asks for something
  // in url replace state, country code, city name
  // use template literals to substitute parts of the string with values inside a variable
  console.log(cityName);
});

const searchedCity = $('#recent-search');
$(document).ready(function () {

  const cityButton = $(document.createElement('button')).prop({
    type: 'button',
    innerHTML: 'Seattle',
    class: 'btn-styled'
  });
  searchedCity.append(
    cityButton
  );
  cityButton.click(function () {
    forecast('Seattle');
  })
});

// moment().add(10, 'days').calendar();
console.log(moment().add(1, 'days').calendar());

// moment().format('l'); 
// $(document).ready(function() {
//     searchedCity.append('<button class="btn-styled" type="button">Seattle</button');
// });