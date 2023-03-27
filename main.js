"use strict"

const button = document.getElementById('button');

let lon, lat;

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;
        })
    }
});

document.getElementById('datos').style.visibility = "hidden";

button.addEventListener('click', () => {

    let temperaturaValor = document.getElementById('temperatura');
    let descripcion = document.getElementById('descripcion');
    let ubicacion = document.getElementById('ubicacion');
    let icono = document.getElementById('icono');

    document.getElementById('datos').style.visibility = "visible";

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=e14803fbce5200c38e4569947d384b79`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.list[5]);
            let temp = Math.round(data.list[0].main.temp);
            temperaturaValor.textContent = `${temp}ºC`;

            let desc = data.list[5].weather[0].description;
            descripcion.textContent = desc.toUpperCase();

            ubicacion.textContent = data.city.name;

            switch (data.list[5].weather[0].main) {
                case 'Thunderstorm':
                    icono.src = 'animated/thunder.svg'
                    break;
                case 'Drizzle':
                    icono.src = 'animated/rainy-2.svg'
                    break;
                case 'Rain':
                    icono.src = 'animated/rainy-7.svg'
                    break;
                case 'Snow':
                    icono.src = 'animated/snowy-6.svg'
                    break;
                case 'Clear':
                    icono.src = 'animated/day.svg'
                    break;
                case 'Atmosphere':
                    icono.src = 'animated/weather.svg'
                    break;
                case 'Clouds':
                    icono.src = 'animated/cloudy-day-1.svg'
                    break;
                default:
                    icono.src = 'animated/cloudy-day-1.svg'
                    break;
            }
        })
        .catch(error => console.error(error.message));

});
