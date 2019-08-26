# Weather-Website

This is my very first project which fetches the weather conditions of any identified area using node.js . 
My motive of working on this project is to learn how to use github. It is hoisted on heroku, the link to the website is:

http://common-weather-app.herokuapp.com

# Features

* A request to mapbox.com API is sent to get co-ordinates i.e latitude and longitude of a place
* A request to darksky.com API is sent to fetch real time weather forecast information at a particular location co-ordinate 
* Using node.js these requests are asynchronously sent and the data is returned to the user

# Stack
* Express Framework - To set up the server Environment
* HandleBars - For dynamic templating
