/*
Getting some data

Create a file called iss.js. In it, write a simple node program that will output the latitude 
and longitude of the International Space Station.

Practice your google-fu by searching for “iss api” and figuring out the correct URL to use.
Hint: there are many options and they are all good :)

Notice that the values provided by the API are very precise. Round off the values to two decimal 
digits for a nicer display. Hint: toFixed

Save/commit/push

*/


/*
{
iss_position: {
latitude: 50.89072863776784,
longitude: 163.76072482325245
},
message: "success",
timestamp: 1468262030
}
*/


var request = require('request');
var url = "http://api.open-notify.org/iss-now.json";
request(url, function(err, response) {
    if (err) {
        console.log('there was an error');
    }
    else {
        var obj = JSON.parse(response.body);
        var lat = obj.iss_position.latitude.toFixed(2);
        var long = obj.iss_position.longitude.toFixed(2);
        return lat,long
    }
});


