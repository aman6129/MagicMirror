var month = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
var headlines;
var baseColor = "#ff000";

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

function formatDate()
{
  var date = new Date();
  var hours = date.getHours();
  var min = date.getMinutes();
  var ampm = "AM";

  if(date.getHours() > 12){
    hours -= 12;
  }

  if(date.getHours() >= 12){
    ampm = "PM";
  }

  if(min < 10)
    min = "0" + min;
  if(hours < 10)
    hours = "0" + hours;

  $('#time').html(hours + ':' + min + ' ' + ampm);

  t = setTimeout(formatDate,1000);

}

function getMessage(temp){
  if(temp >= 80){
    baseColor = "#F38262";
    return 'it is hot!';
  }
  else if(temp >= 65){
    baseColor = "#F3C662";
    return 'shorts weather'
  }
  else if(temp >= 50){
    baseColor = "#799CE5";
    return 'kinda chilly'
  }
  else if(temp >= 30){
    baseColor = "#B2F0F9";
    return 'might wanna wrap up'
  }
  else{
    baseColor="#CFE2E7";
    return 'ts freezing outside!'
  }
}

function displayHeadlines(headlines){
  // console.log(headlines)
  for(var i = 0; i < 5; ++i){
    var html = '<div id="h-' + i + '" class="headline-container"><div class="headline">' + headlines[i].title + ':</div>';
        html += '<span class="abstract">' + headlines[i].abstract + '</span></div>';

    $('#news').append(html);
    $('#h-' + i).css('background-color', shadeColor(baseColor, -10 * i));
  }
}

$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
formatDate();

});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      $(".weather-big").html('<i class="wi wi-yahoo-' + weather.code + '"></i>&nbsp' + weather.temp + '&deg');
      $(".message").html(getMessage(weather.temp));
      $("#location").html(weather.city + ', ' + weather.region );
      for(var i = 1; i < 5; ++i){
        var id = "#day-"+i;
        var date = new Date();
        var html = '<div class="date-wrapper"><div class="date-info">' + month[date.getMonth()] + ' ' + (date.getDate() + i) + '</div>'
            html += '<div class="date-info"><i class="wi wi-yahoo-' + weather.forecast[i-1].code + '"></i></div>'
            html += '<div class="date-info">' + weather.forecast[i-1].high + '&deg / ' + weather.forecast[i-1].low + '&deg</div></div>'

        $(id).css('background-color', shadeColor(baseColor, -10* (i)));
        $("#main-weather-wrapper").css('background-color', baseColor);
        $(id).html(html);

        // setTimeout(loadWeather(location, woeid), 6000);
      }

      $.get("http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=a6fcc58d29d8425f287b0bc5e6b0d86c:14:74943760",
      function( data ) {
        console.log(data);
        headlines = data.results;
        displayHeadlines(headlines)
      });

    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
      // setTimeout(loadWeather(location, woeid), 1000);
    }
  });
}

