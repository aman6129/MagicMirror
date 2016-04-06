// Docs at http://simpleweatherjs.com

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

/* 
* Test Locations
* Austin lat/long: 30.2676,-97.74298
* Austin WOEID: 2357536
*/
$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    // loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      console.log(weather.code);
      html = '<h2><i class="wi wi-yahoo-'+weather.code+'"></i> '+weather.temp+'&deg;</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.alt.temp+'&deg;C</li></ul>'; 

      for(var i = 0; i < 5; ++i) {
             html += '<p>'+weather.forecast[i].date+': '+weather.forecast[i].high+ '/' + weather.forecast[i].low + '</p>';
           }
      $('#location').append('<p>' + weather.city + ', ' + weather.region + '</p>');
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

