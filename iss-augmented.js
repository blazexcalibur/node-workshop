/*
    Augmenting our application

Create a file called iss-augmented.js. It will be similar to iss.js but more difficult!

Augment your ISS application to tell the user how “far” the ISS is from them. Here is how you will do it:

Using the prompt module, ask the user to enter their location (e.g. “montreal”)

Using Google’s Geolocation API, find out the latitude and longitude of the provided location. Here is how:

This URL: https://maps.googleapis.com/maps/api/geocode/json?address=montreal will show the lat/long for montreal

Explore this URL in your web browser to figure out where the lat/lng is located. Try to pass different values for “address” for educational purposes :)

When you are comfortable with finding the location based on an input address, you can then calculate the distance between the ISS and the user:

Look at this URL: http://www.movable-type.co.uk/scripts/latlong.html

It specifies a formula for calculating the distance. Scroll the page to the JavaScript portion, and create a function that uses the provided code. You don’t need to understand what is going on in there, it is very mathy!

NOTE: In order for this code to work, you’ll need to add the following code at the beginning of your program:

  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }
Finally, display a message to the user telling them what their “distance” to the ISS is.

Save/commit/push

*/

var prompt = require('prompt');
var city = "";

prompt.get(['userCity'], function(err, answers) {
    if (err) {
        console.log('there was an error');
    }
    else {
        city = answers.userCity;
        var userUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city;

        var request = require('request');
        var userLat;
        var userLng;
        
        request(userUrl, function(err, response) {

            if (err) {
                console.log('there was an error');
            }
            else {
                var obj = JSON.parse(response.body);
                userLat = obj.results[0].geometry.location.lat;
                userLng = obj.results[0].geometry.location.lng;
                //console.log(obj.results[0].geometry.location);

                var issUrl = "http://api.open-notify.org/iss-now.json";
                var issLat;
                var issLng;
                request(issUrl, function(err, response) {

                    if (err) {
                        console.log('there was an error');
                    }
                    else {
                        var obj = JSON.parse(response.body);
                        issLat = obj.iss_position.latitude;
                        issLng = obj.iss_position.longitude;
                        //console.log("isslat :" + obj.iss_position.latitude.toFixed(2) + " isslong : " + obj.iss_position.longitude.toFixed(2));
                    }
                    
                     console.log(userLat + " " + userLng + " " + issLat + " " + issLng);
                    Number.prototype.toRadians = function() {
                        return this * Math.PI / 180;
                    } 
                     
                    var R = 6371e3; // metres
                    var φ1 = userLat.toRadians();
                    var φ2 = issLat.toRadians();
                    var Δφ = (issLat-userLat).toRadians();
                    var Δλ = (issLng-userLng).toRadians();

                    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                    var d = R * c;
                    
                    console.log("your are " + (d/1000).toFixed(2) + "km away from the ISS!");
                    
                });
            }
            
        });


       


    }
});
