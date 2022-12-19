const API = {
  key: "0202c58c14364ba991f90539221412",
  base: "https://api.weatherapi.com/v1/current.json"
}

const input = document.querySelector('.input');
const info = document.querySelector('.info');
const container = document.querySelector('.container-sm');


input.addEventListener('keypress', async function (event) {
  if (event.keyCode === 13 && event.target.value) {
    let inputValue = `${event.target.value}`;
    await getFetch(inputValue)
  }
})

async function getFetch(query) {
  try {
    const response = await fetch(`${API.base}?key=${API.key}&q=${query}`);
    const data =  await response.json();
    const value = data.location;
    const current = data.current;
    const city = value.name;
    const country = value.country;
    const date = new Date(value.localtime).toLocaleString('en-us', {month: 'long', year: 'numeric', weekday: 'long', day: 'numeric'});
    const time = value.localtime.split(' ').pop([]);
    const src = current.condition.icon;
    const degree = Math.floor(current.temp_c);
    const sky = current.condition.text;
    const feelsLike = Math.floor(current.feelslike_c);
    const humidity = current.humidity;
    const wind = current.wind_kph;

    
    console.log(value, current)
    info.style.display = 'none';
    container.innerHTML = `
      <div class="place">
                    <p class="city">${city}, ${country}</p>
                    <p class="date">${date}</p>
                    <p class="time">${time}</p>
                </div>
                <div class="degree">
                    <img src="${src}" alt="icon">
                    <p class="degree-now"><span>${degree}</span>°C</p>
                    <p class="sun">${sky}</p>
                </div>
                <div class="extra-info">
                    <p class="feels-like">Feels like: <span class="feels-like-span">${feelsLike}</span>C</p>
                    <p class="humidity">Humidity: <span class="humidity-span">${humidity}</span>%</p>
                    <p class="wind">Wind: <span class="wind-span">${wind}</span>kph</p>
                </div>
    `
  } catch (e) {
    info.innerHTML = 'No matching location found';
  }
}




