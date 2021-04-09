let button = document.querySelector('.button')
let input = document.querySelector('.inputValue')
!input.value && getWeatherByCity('Вінниця')
let myMap
let options
let marker
let info
let zoom = 10
let weatherModel

button.addEventListener('click', function () {
  getWeatherByCity(input.value)
})

input.addEventListener('keypress', function (e) {
  if (e.which === 13) {
    e.preventDefault()
    getWeatherByCity(input.value)
  }
})

function initMap() {
  options = {
    center: { lat: weatherModel.coord.lat, lng: weatherModel.coord.lon },
    zoom: zoom,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#fff' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#fff' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#fff' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#fff' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ff0000' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#ff0000' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ff0000' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#ff0000' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#ff0000' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#ff0000' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#fff' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#fff' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#1289a4' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#1289a4' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#1289a4' }],
      },
    ],
  }
  myMap = new google.maps.Map(document.getElementById('map'), options)

  createMarker(
    weatherModel.coord.lat,
    weatherModel.coord.lon,
    weatherModel.name,
    weatherModel.weather[0].icon
  )
  addInfo(
    `Country:${weatherModel.sys.country}<br>City: ${
      weatherModel.name
    };<br>Temp: ${weatherModel.main.temp - 273.5}<br>Clouds: ${
      weatherModel.clouds.all
    }%;<br>Wind: ${weatherModel.wind.speed}m/s`
  )
}

function getWeatherByCoordinates(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1b5ee5a1a74d624a74750350327ea372`
  )
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        )
        return
      }

      response.json().then(function (data) {
        return data
      })
    })
    .catch((error) => {
      console.log('Fetch Error :-S', error)
    })
}

function getWeatherByCity(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1b5ee5a1a74d624a74750350327ea372`
  )
    .then((response) => {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        )
        return
      }

      response.json().then(function (data) {
        weatherModel = data
        createMap()
      })
    })
    .catch((error) => {
      console.log('Fetch Error :-S', error)
    })
}

function createMap() {
  let script = document.createElement('script')
  script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyAGcyHM-HORq-qmKrHmfjiifY7jZJPlVYI&callback=initMap'
  script.async = false
  document.body.append(script)
}

function createMarker(lat, lng, title, iconCode) {
  marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: myMap,
    title: title,
    icon: `http://openweathermap.org/img/wn/${iconCode}.png`,
  })
}

function addInfo(content) {
  info = new google.maps.InfoWindow({
    content: content,
  })
}
