var date = new Date();

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

function formatDate()
{
  var hours = date.getHours();
  var min = date.getMinutes();
  var ampm = "AM";
  if(date.getHours() > 12){
    hours -= 12;
    ampm = "PM"
  }
  if(min < 10)
    $('#time').append(hours + ':0' + min + ' ' + ampm);
  else
    $('#time').append(hours + ':' + min + ' ' + ampm);

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

  formatDate();
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

