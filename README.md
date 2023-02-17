This App allows the user to select a city from a list and to view the seven day weather forecast for that city
The current location's weather is displayed when the App is started
An autocomplete search button is installed

The openweathermap.org API provides a free service but is limited to certain services
To get cities, I used an API to mapbox - api.mapbox.com/geocoding,
I found a writeup by Wendy de Kock (https://javascript.plainenglish.io/create-a-simple-city-autocomplete-field-in-react-f7675d249c74) which described the use of mapbox.
Previously I have written an autocomplete search from scratch in a messenger application. When a user types the '@' symbol in a message, a list of participants on the topic is shown in a drop down list. As the user types the name directly following the '@' symbol, the list is narrowed down. The user may select from the list at any time. It is fairly complex and needs to take into account user actions beside typing - the backspace, movement to centre of field with mouse, pressing delete. At first these were programmed indicidually but then they were handled using a regex pattern for the name and letting React handle keyboard input. Mapbox geolocation and its searh facility work efficiently.

attributions
cloudy with sun
<a href="https://www.flaticon.com/free-icons/weather" title="weather icons">Weather icons created by iconixar - Flaticon</a>
cloudy with rain
<a href="https://www.flaticon.com/free-icons/rain" title="rain icons">Rain icons created by iconixar - Flaticon</a>
sun
<a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Freepik - Flaticon</a>
snow
<a href="https://www.flaticon.com/free-icons/snow" title="snow icons">Snow icons created by Freepik - Flaticon</a>
cloud
<a href="https://www.flaticon.com/free-icons/weather" title="weather icons">Weather icons created by All_Dee - Flaticon</a>
rain
<a href="https://www.flaticon.com/free-icons/rain" title="rain icons">Rain icons created by Freepik - Flaticon</a>
